/**
 * Step 02: Collect product links from category pages.
 */

import { chromium, type Page } from 'playwright';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs';

import { readJson, writeJson, ensureDir } from './utils/file.js';
import { logInfo, logError, logWarn } from './utils/logger.js';
import { randomDelay, delay } from './utils/delay.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '../');

// Load env
const envPath = path.join(ROOT_DIR, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] ? match[2].trim() : '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (process.env[key] === undefined) process.env[key] = value;
    }
  });
}

interface CategoryUrlDef {
  categoryCode: string;
  categoryName: string;
  url: string;
  enabled: boolean;
}

interface CategoryRaw {
  category_code: string;
  category_name: string;
  category_url: string;
  parent_category_code: string | null;
  level: number;
}

interface ProductLinkRaw {
  category_code: string;
  category_name: string;
  category_url: string;
  product_name: string | null;
  product_url: string;
  image_url: string | null;
  price_text: string | null;
  collected_at: string;
}

async function autoScrollAndLoadMore(page: Page, maxScrolls: number, maxClicks: number) {
  let scrollCount = 0;
  let clickCount = 0;
  let lastHeight = await page.evaluate(() => document.body.scrollHeight);
  
  while (scrollCount < maxScrolls) {
    // Scroll down 80% of window height
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
    await delay(600);
    
    // Attempt to click "Load More" / "Xem thêm"
    try {
      const buttons = await page.locator('button, a').filter({ hasText: /xem thêm|tải thêm|hiển thị thêm/i }).all();
      for (const btn of buttons) {
        if (await btn.isVisible() && clickCount < maxClicks) {
          await btn.click({ force: true });
          clickCount++;
          await delay(2000); // Wait for new products to render
          break; 
        }
      }
    } catch (e) {
      // ignore
    }

    const newHeight = await page.evaluate(() => document.body.scrollHeight);
    if (newHeight === lastHeight) {
      await delay(1000);
      if (await page.evaluate(() => document.body.scrollHeight) === lastHeight) {
         break; // Reached bottom
      }
    }
    lastHeight = newHeight;
    scrollCount++;
  }
}

async function extractProductLinks(page: Page, cat: CategoryRaw, baseUrl: string): Promise<ProductLinkRaw[]> {
  const collectedAt = new Date().toISOString();
  
  const links = await page.evaluate(({ cat, baseUrl, collectedAt }) => {
    const results: any[] = [];
    const anchors = Array.from(document.querySelectorAll('a'));
    
    for (const a of anchors) {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('javascript:')) continue;
      
      let fullUrl = href;
      if (!href.startsWith('http')) {
        if (!href.startsWith('/')) fullUrl = '/' + href;
        fullUrl = baseUrl + fullUrl;
      }
      
      // Keep within domain and look for typical product patterns (.html or ends with a number)
      if (fullUrl.startsWith(baseUrl) && (fullUrl.includes('.html') || fullUrl.match(/-\d+$/))) {
        
        let name = a.textContent?.replace(/\s+/g, ' ').trim() || '';
        // If the text is generic, try grabbing the title
        if (name.toLowerCase() === 'xem thêm' || name.toLowerCase() === 'chi tiết') {
           name = a.getAttribute('title') || '';
        }

        const img = a.querySelector('img');
        const imageUrl = img ? (img.getAttribute('src') || img.getAttribute('data-src')) : null;

        let priceText = null;
        let parent: HTMLElement | null = a.parentElement;
        let depth = 0;
        // Search up to 3 levels up for a price element
        while (parent && depth < 3) {
           const textNodes = Array.from(parent.querySelectorAll('*')).map(el => el.textContent || '');
           const priceEl = textNodes.find(t => (t.includes('đ') || t.includes('₫') || t.includes('VNĐ')) && t.match(/\d/));
           if (priceEl) {
             priceText = priceEl.replace(/\s+/g, ' ').trim();
             break;
           }
           parent = parent.parentElement;
           depth++;
        }

        if (name.length > 3 || fullUrl) {
          results.push({
            category_code: cat.category_code,
            category_name: cat.category_name,
            category_url: cat.category_url,
            product_name: name.length > 0 ? name : null,
            product_url: fullUrl.split('?')[0].split('#')[0], // remove query/hash
            image_url: imageUrl,
            price_text: priceText,
            collected_at: collectedAt
          });
        }
      }
    }
    return results;
  }, { cat, baseUrl, collectedAt });
  
  return links;
}

async function main(): Promise<void> {
  logInfo('=== Step 02: Collect Product Links ===');
  
  const headlessEnv = process.env.HEADLESS !== 'false';
  const minDelay = parseInt(process.env.REQUEST_DELAY_RANDOM_MIN_MS ?? '2000', 10);
  const maxDelay = parseInt(process.env.REQUEST_DELAY_RANDOM_MAX_MS ?? '5000', 10);
  const maxScrollRounds = parseInt(process.env.MAX_SCROLL_ROUNDS ?? '30', 10);
  const maxLoadMore = parseInt(process.env.MAX_LOAD_MORE_CLICKS ?? '30', 10);
  const mode = process.env.CRAWL_MODE ?? 'sample';
  const maxProducts = parseInt(process.env.MAX_PRODUCTS ?? '200', 10);

  const rawCategoriesPath = path.join(ROOT_DIR, 'data/raw/categories.raw.json');
  const urlsPath = path.join(ROOT_DIR, 'category_urls.json');
  
  let allCats: CategoryRaw[] = [];
  if (fs.existsSync(rawCategoriesPath)) {
    allCats = readJson<CategoryRaw[]>(rawCategoriesPath, []);
  } else {
    logWarn(`categories.raw.json not found. Falling back to category_urls.json`);
    const defs = readJson<CategoryUrlDef[]>(urlsPath, []);
    allCats = defs.filter(d => d.enabled).map(d => ({
      category_code: d.categoryCode,
      category_name: d.categoryName,
      category_url: d.url,
      parent_category_code: null,
      level: 1
    }));
  }

  if (allCats.length === 0) {
    logError('No categories to crawl.');
    return;
  }

  // Filter: If a category has children in the dataset, skip it (prioritize leaf categories)
  const parentCodes = new Set(allCats.map(c => c.parent_category_code).filter(Boolean));
  const toCrawl = allCats.filter(cat => !parentCodes.has(cat.category_code));

  logInfo(`Found ${toCrawl.length} leaf categories to crawl (mode: ${mode}).`);

  logInfo(`Launching browser (headless: ${headlessEnv})`);
  const browser = await chromium.launch({ headless: headlessEnv });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const uniqueLinks = new Map<string, ProductLinkRaw>();
  const duplicateUrls: string[] = [];
  let errorCount = 0;

  for (const cat of toCrawl) {
    if (mode === 'sample' && uniqueLinks.size >= maxProducts) {
      logInfo(`Reached MAX_PRODUCTS (${maxProducts}) in sample mode. Stopping early.`);
      break;
    }

    logInfo(`Crawling category: ${cat.category_name} (${cat.category_url})`);
    
    try {
      await page.goto(cat.category_url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      const baseUrl = new URL(cat.category_url).origin;
      await autoScrollAndLoadMore(page, maxScrollRounds, maxLoadMore);
      
      const extracted = await extractProductLinks(page, cat, baseUrl);
      
      let newCount = 0;
      for (const link of extracted) {
        if (uniqueLinks.has(link.product_url)) {
          duplicateUrls.push(link.product_url);
        } else {
          uniqueLinks.set(link.product_url, link);
          newCount++;
        }
      }
      
      logInfo(`Found ${extracted.length} links (${newCount} new). Total unique: ${uniqueLinks.size}, Duplicates: ${duplicateUrls.length}`);
      
    } catch (err) {
      logError(`Error processing category ${cat.category_name}`, err);
      errorCount++;
    }

    logInfo(`Waiting for next category...`);
    await randomDelay(minDelay, maxDelay);
  }

  await browser.close();

  // Export results
  const outLinksPath = path.join(ROOT_DIR, 'data/raw/product_links.raw.json');
  const outDuplicatesPath = path.join(ROOT_DIR, 'data/state/duplicate_urls.json');
  
  ensureDir(path.dirname(outLinksPath));
  ensureDir(path.dirname(outDuplicatesPath));
  
  let finalLinks = Array.from(uniqueLinks.values());
  if (mode === 'sample' && finalLinks.length > maxProducts) {
    finalLinks = finalLinks.slice(0, maxProducts);
  }
  
  writeJson(outLinksPath, finalLinks);
  writeJson(outDuplicatesPath, duplicateUrls);

  logInfo('=== Link Collection Summary ===');
  logInfo(`Total Categories Processed: ${toCrawl.length - errorCount}/${toCrawl.length}`);
  logInfo(`Total Unique Links: ${finalLinks.length}`);
  logInfo(`Total Duplicates: ${duplicateUrls.length}`);
  logInfo(`Total Errors: ${errorCount}`);
  logInfo(`Results saved to: ${outLinksPath}`);
  logInfo('=== End Step 02 ===');
}

main().catch((err) => {
  logError('Fatal error in collect:links', err);
  process.exit(1);
});
