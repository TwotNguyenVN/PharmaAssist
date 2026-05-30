'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { 
  Search, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  FileText, 
  Brain, 
  Heart, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Activity,
  AlertCircle,
  ShieldCheck,
  Award,
  Users,
  Zap,
  Play,
  ArrowRight,
  Terminal,
  Database,
  Lock,
  MessageSquare,
  Upload,
  Plus,
  Minus,
  Trash2,
  Check,
  RefreshCw,
  Info,
  HelpCircle,
  Send,
  AlertTriangle
} from 'lucide-react';

// =========================================================================
// 1. INTERACTION RULES DATABASE (Rule Engine - BR-13)
// =========================================================================
interface DrugInteractionRule {
  medA: string;
  medB: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
  title: string;
  description: string;
  aiNote: string;
}

const DRUG_INTERACTIONS: DrugInteractionRule[] = [
  {
    medA: 'Aspirin 81mg',
    medB: 'Warfarin 2mg',
    severity: 'HIGH',
    title: 'Tương tác nghiêm trọng: Nguy cơ xuất huyết cao',
    description: 'Sự kết hợp giữa hai hoạt chất chống đông máu này làm tăng đáng kể nguy cơ xuất huyết dạ dày và nội tạng. Cần sự theo dõi nghiêm ngặt của bác sĩ chuyên khoa.',
    aiNote: 'AI Pharmacist Copilot: Aspirin ức chế tập kết tiểu cầu trong khi Warfarin ức chế các yếu tố đông máu phụ thuộc Vitamin K. Việc dùng chung gây ra tác dụng cộng hưởng chống đông máu mạnh mẽ.'
  },
  {
    medA: 'Paracetamol 500mg',
    medB: 'Ibuprofen 400mg',
    severity: 'LOW',
    title: 'Tương tác nhẹ: Theo dõi chức năng gan & dạ dày',
    description: 'Có thể sử dụng phối hợp xen kẽ để hạ sốt/giảm đau khi có chỉ định, tuy nhiên cần kiểm soát liều lượng để tránh độc tính tích lũy lên gan và kích ứng niêm mạc dạ dày.',
    aiNote: 'AI Pharmacist Copilot: Phối hợp này thường được dùng lâm sàng nhưng cần giãn cách thời gian sử dụng từ 4-6 tiếng và không dùng kéo dài quá 5 ngày.'
  },
  {
    medA: 'Clopidogrel 75mg',
    medB: 'Aspirin 81mg',
    severity: 'MEDIUM',
    title: 'Tương tác vừa phải: Liệu pháp kháng tiểu cầu kép (DAPT)',
    description: 'Thường được chỉ định sau can thiệp mạch vành hoặc nhồi máu cơ tim cấp. Cần kiểm tra định kỳ chỉ số đông máu và cảnh giác với các dấu hiệu bầm tím, chảy máu chân răng.',
    aiNote: 'AI Pharmacist Copilot: Đây là phác đồ DAPT chuẩn trong tim mạch giúp ngừa tái huyết khối mạch vành, tuy nhiên đòi hỏi bệnh nhân tuân thủ tuyệt đối chỉ định liều lượng.'
  },
  {
    medA: 'Aspirin 81mg',
    medB: 'Ibuprofen 400mg',
    severity: 'MEDIUM',
    title: 'Tương tác vừa phải: Giảm hiệu quả kháng tiểu cầu & loét dạ dày',
    description: 'Ibuprofen có thể làm giảm tác dụng bảo vệ tim mạch của Aspirin liều thấp và làm tăng gấp đôi nguy cơ viêm loét, chảy máu đường tiêu hóa.',
    aiNote: 'AI Pharmacist Copilot: NSAID không chọn lọc cạnh tranh vị trí gắn COX-1 với Aspirin. Nếu bắt buộc phải dùng chung, nên uống Ibuprofen ít nhất 30 phút sau hoặc 8 tiếng trước khi uống Aspirin.'
  }
];

// =========================================================================
// 2. PRODUCT CATALOG DATA (Crawl-inspired from Long Châu)
// =========================================================================
interface Product {
  id: string;
  name: string;
  subName: string;
  category: string;
  activeIngredient: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  isRx: boolean;
  isSale?: boolean;
  saleText?: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Panadol Extra Đỏ',
    subName: 'Paracetamol 500mg, Caffeine 65mg',
    category: 'Dược phẩm',
    activeIngredient: 'Paracetamol 500mg',
    price: 45000,
    originalPrice: 50000,
    unit: 'Hộp 12 vỉ x 10 viên',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    isRx: false,
    isSale: true,
    saleText: 'Giảm 10%',
    description: 'Thuốc giảm đau hạ sốt hiệu quả nhanh đối với các chứng đau đầu, đau cơ, đau răng, đau họng, hạ sốt do cảm cúm.'
  },
  {
    id: 'prod-002',
    name: 'Aspirin 81mg Stella',
    subName: 'Aspirin 81mg - Dự phòng huyết khối',
    category: 'Dược phẩm',
    activeIngredient: 'Aspirin 81mg',
    price: 32000,
    unit: 'Hộp 10 vỉ x 10 viên bao tan ở ruột',
    image: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?w=300&auto=format&fit=crop&q=80',
    isRx: true,
    isSale: false,
    description: 'Thuốc kháng tiểu cầu chỉ định trong phòng ngừa thứ phát nhồi máu cơ tim, đột quỵ và biến cố tim mạch ở bệnh nhân nguy cơ cao.'
  },
  {
    id: 'prod-003',
    name: 'Warfarin 2mg Vidipha',
    subName: 'Warfarin 2mg - Kháng đông máu',
    category: 'Dược phẩm',
    activeIngredient: 'Warfarin 2mg',
    price: 88000,
    unit: 'Hộp 1 chai 100 viên',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?w=300&auto=format&fit=crop&q=80',
    isRx: true,
    isSale: false,
    description: 'Thuốc chống đông máu nhóm coumarin giúp phòng ngừa và điều trị huyết khối tĩnh mạch sâu, thuyên tắc phổi và rung nhĩ.'
  },
  {
    id: 'prod-004',
    name: 'Boganic Traphaco',
    subName: 'Cao Atisô, Cao Bìm bìm, Cao Rau đắng đất',
    category: 'Thực phẩm chức năng',
    activeIngredient: 'Cao Atisô',
    price: 92000,
    originalPrice: 105000,
    unit: 'Hộp 5 vỉ x 10 viên nang mềm',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&auto=format&fit=crop&q=80',
    isRx: false,
    isSale: true,
    saleText: 'Bán chạy',
    description: 'Thực phẩm bảo vệ sức khỏe giúp bổ gan, giải độc gan, hạ men gan, mát gan, tăng cường chức năng gan hiệu quả.'
  },
  {
    id: 'prod-005',
    name: 'Ibuprofen 400mg Stella',
    subName: 'Ibuprofen 400mg - Kháng viêm giảm đau NSAID',
    category: 'Dược phẩm',
    activeIngredient: 'Ibuprofen 400mg',
    price: 42000,
    unit: 'Hộp 10 vỉ x 10 viên nén bao phim',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&auto=format&fit=crop&q=80',
    isRx: false,
    isSale: false,
    description: 'Thuốc kháng viêm không steroid (NSAID) giúp giảm đau từ nhẹ đến trung bình trong đau khớp, đau lưng, đau bụng kinh.'
  },
  {
    id: 'prod-006',
    name: 'Amoxicillin 500mg Stella',
    subName: 'Amoxicillin 500mg - Kháng sinh bán tổng hợp',
    category: 'Dược phẩm',
    activeIngredient: 'Amoxicillin 500mg',
    price: 75000,
    unit: 'Hộp 10 vỉ x 10 viên nang cứng',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&auto=format&fit=crop&q=80',
    isRx: true,
    isSale: true,
    saleText: 'Yêu cầu đơn',
    description: 'Kháng sinh penicillin phổ rộng điều trị nhiễm khuẩn đường hô hấp trên, đường hô hấp dưới, đường tiết niệu, da và mô mềm.'
  },
  {
    id: 'prod-007',
    name: 'Vitamin C 500mg Plus',
    subName: 'Vitamin C & Kẽm - Tăng đề kháng',
    category: 'Thực phẩm chức năng',
    activeIngredient: 'Vitamin C 500mg',
    price: 65000,
    unit: 'Hộp 20 viên sủi',
    image: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf4?w=300&auto=format&fit=crop&q=80',
    isRx: false,
    isSale: false,
    description: 'Bổ sung Vitamin C và kẽm giúp tăng cường hệ miễn dịch tự nhiên, chống oxy hóa, làm bền thành mạch và cải thiện sức khỏe làn da.'
  },
  {
    id: 'prod-008',
    name: 'Máy Đo Huyết Áp Omron Hem-7120',
    subName: 'Máy đo bắp tay tự động thông minh',
    category: 'Thiết bị y tế',
    activeIngredient: 'Thiết bị cơ học',
    price: 980000,
    originalPrice: 1100000,
    unit: 'Bộ máy đo + Bao quấn bắp tay',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=300&auto=format&fit=crop&q=80',
    isRx: false,
    isSale: true,
    saleText: 'Free Ship',
    description: 'Thiết bị y tế gia đình cao cấp tự động đo huyết áp tối đa, huyết áp tối thiểu và nhịp tim nhanh chóng, chính xác.'
  }
];

// =========================================================================
// 3. CATEGORIES LIST
// =========================================================================
const CATEGORIES = [
  { name: 'Tất cả', count: PRODUCTS.length },
  { name: 'Dược phẩm', count: PRODUCTS.filter(p => p.category === 'Dược phẩm').length },
  { name: 'Thực phẩm chức năng', count: PRODUCTS.filter(p => p.category === 'Thực phẩm chức năng').length },
  { name: 'Thiết bị y tế', count: PRODUCTS.filter(p => p.category === 'Thiết bị y tế').length }
];

// =========================================================================
// 4. TESTIMONIALS
// =========================================================================
const TESTIMONIALS = [
  {
    quote: "Hệ thống tự động phát hiện tương tác thuốc cực kỳ chính xác. Tôi cảm thấy hoàn toàn an tâm khi kê các đơn phối hợp nhiều hoạt chất kháng sinh và hạ sốt.",
    author: "Dược sĩ Nguyễn Thị Minh",
    role: "Nhà thuốc số 4, TP.HCM",
    avatarUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=100&auto=format&fit=crop&q=60"
  },
  {
    quote: "Tính năng AI Pharmacist Copilot soạn thảo sẵn các ghi chú tư vấn thuốc cho bệnh nhân cực nhanh, tiết kiệm đến 70% thời gian giải thích cơ chế y khoa tại quầy.",
    author: "Dược sĩ Trần Quốc Tuấn",
    role: "Nhà thuốc PharmaCare",
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&auto=format&fit=crop&q=60"
  }
];

export default function PharmaAssistIntegratedHomePage() {
  const { isAuthenticated, logout } = useAuth();
  
  // Cart state
  interface CartItem {
    product: Product;
    quantity: number;
  }
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartInteractions, setCartInteractions] = useState<DrugInteractionRule[]>([]);
  const [bypassInteraction, setBypassInteraction] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Drug simulator state
  const [simA, setSimA] = useState('Aspirin 81mg');
  const [simB, setSimB] = useState('Warfarin 2mg');
  const [simResult, setSimResult] = useState<DrugInteractionRule | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [simAiText, setSimAiText] = useState('');

  // Prescription OCR scanner state
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedItems, setScannedItems] = useState<Product[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chatbot AI state
  const [isChatOpen, setIsChatOpen] = useState(false);
  interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
  }
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Xin chào! Tôi là Trợ lý Dược sĩ Lâm Sàng AI (Gemini). Tôi có thể giúp bạn tra cứu tương tác thuốc, liều dùng hoặc tư vấn thuốc mẫu. Hãy chọn câu hỏi bên dưới hoặc gửi tin nhắn cho tôi nhé!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const [showDemoModal, setShowDemoModal] = useState(false);

  // =========================================================================
  // EFFECTS & BUSINESS LOGIC
  // =========================================================================

  // Handle Search Input & Autocomplete suggestions
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchSuggestions([]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.subName.toLowerCase().includes(query) ||
             p.activeIngredient.toLowerCase().includes(query)
      );
      setSearchSuggestions(filtered.slice(0, 5));
    }
  }, [searchQuery]);

  // Drug Interaction Rule Engine for Cart (BR-13 & BR-06 check)
  useEffect(() => {
    if (cart.length < 2) {
      setCartInteractions([]);
      return;
    }

    const detected: DrugInteractionRule[] = [];
    // O(N^2) search through cart items active ingredients
    for (let i = 0; i < cart.length; i++) {
      for (let j = i + 1; j < cart.length; j++) {
        const ingA = cart[i].product.activeIngredient;
        const ingB = cart[j].product.activeIngredient;

        // Check if there is an interaction rule matching ingA and ingB
        const match = DRUG_INTERACTIONS.find(
          rule => 
            (rule.medA.toLowerCase().includes(ingA.toLowerCase()) && rule.medB.toLowerCase().includes(ingB.toLowerCase())) ||
            (rule.medA.toLowerCase().includes(ingB.toLowerCase()) && rule.medB.toLowerCase().includes(ingA.toLowerCase()))
        );

        if (match && !detected.some(d => d.title === match.title)) {
          detected.push(match);
        }
      }
    }
    setCartInteractions(detected);
    
    // Automatically open cart if a high interaction is detected to alert the user immediately
    if (detected.some(d => d.severity === 'HIGH')) {
      setIsCartOpen(true);
    }
  }, [cart]);

  // Drug Simulator dynamic triggers
  useEffect(() => {
    setSimulating(true);
    setSimResult(null);
    setSimAiText('');

    const timer = setTimeout(() => {
      const match = DRUG_INTERACTIONS.find(
        rule => 
          (rule.medA === simA && rule.medB === simB) ||
          (rule.medA === simB && rule.medB === simA)
      );

      if (match) {
        setSimResult(match);
        // Simulate AI typewriter effect
        let index = 0;
        const interval = setInterval(() => {
          setSimAiText((prev) => prev + match.aiNote.charAt(index));
          index++;
          if (index >= match.aiNote.length) {
            clearInterval(interval);
          }
        }, 10);
      } else {
        const safeRule: DrugInteractionRule = {
          medA: simA,
          medB: simB,
          severity: 'SAFE',
          title: 'Không phát hiện tương tác nguy hại chéo',
          description: 'Cặp hoạt chất này hiện tại chưa ghi nhận phản ứng lâm sàng tương tác nguy hại trong cơ sở dữ liệu luật y khoa drug_interactions.',
          aiNote: 'AI Pharmacist Copilot: Không tìm thấy xung đột động lực học hoặc động học hấp thu giữa hai hoạt chất này. Sử dụng đồng thời ở liều lượng thông thường được xem là an toàn.'
        };
        setSimResult(safeRule);
        let index = 0;
        const interval = setInterval(() => {
          setSimAiText((prev) => prev + safeRule.aiNote.charAt(index));
          index++;
          if (index >= safeRule.aiNote.length) {
            clearInterval(interval);
          }
        }, 10);
      }
      setSimulating(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [simA, simB]);

  // =========================================================================
  // ACTIONS
  // =========================================================================

  const handleAddToCart = (product: Product) => {
    // Check stock limit BR-06 (here simulated with max 5 items of each per retail customer)
    const existing = cart.find(item => item.product.id === product.id);
    if (existing && existing.quantity >= 5) {
      alert(`BR-06: Không được phép mua vượt quá số lượng tồn kho định mức bán lẻ (tối đa 5 sản phẩm/đơn hàng) đối với dược phẩm: ${product.name}`);
      return;
    }

    setCart(prev => {
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    // Smooth scroll to top/notification feedback or open cart drawer
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          // Stock check limit BR-06
          if (newQty > 5) {
            alert('BR-06: Vượt định mức tồn kho bán lẻ tại quầy.');
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCartCheckout = () => {
    // BR-09: Cart must have at least 1 item
    if (cart.length === 0) {
      alert('BR-09: Đơn hàng phải có ít nhất một thuốc.');
      return;
    }

    // Check interaction chốt chặn
    if (cartInteractions.some(d => d.severity === 'HIGH') && !bypassInteraction) {
      alert('CẢNH BÁO Y TẾ: Không thể thanh toán đơn hàng có tương tác nghiêm trọng (HIGH) trừ khi có cam kết chỉ định chuyên khoa của Bác sĩ.');
      return;
    }

    // BR-10: Reduce stock on successful payment (simulated)
    alert(`Thanh toán thành công! Trực quan hóa BR-10: Số lượng tồn kho thực tế của các loại thuốc trong kho Supabase đã được trừ thành công.`);
    setCart([]);
    setIsCartOpen(false);
    setBypassInteraction(false);
  };

  // Simulated prescription scanner OCR pipeline
  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Standard OCR scanner animation start
    setPrescriptionImage(URL.createObjectURL(file));
    setScanning(true);
    setScanProgress(0);
    setScannedItems([]);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          // Auto detect matches in DB (e.g. detect Aspirin 81mg, Warfarin 2mg or Panadol Đỏ)
          const randomProducts = [
            PRODUCTS.find(p => p.id === 'prod-002')!, // Aspirin Stella
            PRODUCTS.find(p => p.id === 'prod-001')!  // Panadol Extra
          ];
          setScannedItems(randomProducts);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleAddScannedItems = () => {
    scannedItems.forEach(item => {
      handleAddToCart(item);
    });
    setPrescriptionImage(null);
    setScannedItems([]);
    alert('Đã thêm các dược chất trong đơn thuốc của bác sĩ vào giỏ hàng thành công.');
  };

  // AI Chatbot actions
  const handleChatSubmit = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (query.trim() === '') return;

    setChatMessages(prev => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setChatInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      let aiResponse = 'Tôi đã nhận được câu hỏi của bạn. Để đảm bảo an toàn y tế tối đa, PharmaAssist khuyên bạn nên kiểm tra tương tác thuốc bằng bảng Simulator hoặc nhờ Dược sĩ lâm sàng tại quầy hướng dẫn trực tiếp.';

      const lower = query.toLowerCase();
      if (lower.includes('aspirin') && lower.includes('warfarin')) {
        aiResponse = 'CẢNH BÁO CAO: Sự kết hợp giữa Aspirin (kháng tiểu cầu) và Warfarin (kháng đông máu) có mức tương tác lâm sàng RẤT NGUY HIỂM. Việc dùng chung gây tác động hiệp lực làm kéo dài đáng kể thời gian đông máu, làm tăng nguy cơ xuất huyết tiêu hóa, chảy máu nội tạng hoặc đột quỵ do xuất huyết. Tuyệt đối không dùng chung trừ khi có chỉ định bắt buộc từ bác sĩ tim mạch và phải theo dõi chỉ số đông máu INR định kỳ.';
      } else if (lower.includes('boganic')) {
        aiResponse = 'Boganic là thực phẩm bảo vệ sức khỏe chứa Cao Atiso, Cao Bìm Bìm và Cao Rau đắng đất giúp mát gan, tiêu độc, hạ men gan. Thuốc dùng rất an toàn và hầu như không gây tương tác chéo nguy hiểm với các nhóm dược phẩm giảm đau hay kháng sinh phổ biến. Bạn có thể sử dụng hàng ngày để hỗ trợ giải độc gan hiệu quả.';
      } else if (lower.includes('amoxicillin')) {
        aiResponse = 'Amoxicillin là kháng sinh nhóm Penicillin phổ rộng thường dùng điều trị các bệnh lý nhiễm khuẩn đường hô hấp, tiết niệu. Khi sử dụng Amoxicillin cần lưu ý uống đúng liều, đủ ngày theo đơn kê của bác sĩ (thường là 5-7 ngày) để tránh kháng thuốc. Thuốc dùng an toàn với Paracetamol nhưng tránh dùng chung với vắc-xin thương hàn sống.';
      } else if (lower.includes('paracetamol') && lower.includes('ibuprofen')) {
        aiResponse = 'Tương tác nhẹ (LOW): Paracetamol và Ibuprofen đều là chất hạ sốt giảm đau nhưng theo hai cơ chế khác nhau (Paracetamol tác động trung ương, Ibuprofen tác động ngoại vi kháng viêm). Phối hợp xen kẽ thường dùng khi sốt cao khó hạ. Tuy nhiên cần giãn cách sử dụng từ 4-6 tiếng, tránh dùng kéo dài quá mức để tránh quá tải cho gan và bảo vệ niêm mạc dạ dày.';
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsAiTyping(false);
    }, 1000);
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'Tất cả' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a] flex flex-col justify-between selection:bg-[#c9e0fc] selection:text-[#0e3191] antialiased">
      
      {/* ========================================================================= */}
      {/* 1. UTILITY STRIP (utility-strip - bg-ink: #1a1a1a) */}
      {/* ========================================================================= */}
      <div className="bg-[#1a1a1a] text-white text-[11px] h-9 px-6 border-b border-[#292929] flex items-center justify-between font-normal z-50">
        <div className="max-w-[1366px] w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#024ad8] animate-pulse" />
              Hệ thống bán lẻ & quản trị lâm sàng PharmaAssist AI
            </span>
            <span className="h-3 w-[1px] bg-white/20"></span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-[#024ad8]" />
              Hotline Dược sĩ: <strong>1800 6928</strong> (Miễn phí)
            </span>
          </div>
          <div className="flex items-center gap-6 text-white/85">
            <Link href="http://localhost:3001/api/docs" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
              <Terminal className="h-3.5 w-3.5" />
              Swagger API Docs
            </Link>
            <span className="h-3 w-[1px] bg-white/20"></span>
            <a href="#" className="hover:text-[#024ad8] transition-colors flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Tìm nhà thuốc gần nhất
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MINIMALIST WHITE NAVIGATION HEADER (nav-bar-top - height: 64px) */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-[#e8e8e8] h-16 px-8 flex items-center sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1366px] w-full mx-auto flex items-center justify-between gap-6">
          
          {/* Logo with double slash medical pulses */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center bg-[#024ad8] text-white rounded-[4px] shadow-sm font-black text-2xl relative overflow-hidden group">
              <span className="relative z-10">P</span>
              <div className="absolute inset-0 bg-[#0e3191] translate-y-full group-hover:translate-y-0 transition-transform duration-350"></div>
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold tracking-tight text-[#1a1a1a] leading-none uppercase">
                Pharma<span className="text-[#024ad8]">Assist</span>
              </h1>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#636363] block mt-0.5">
                SMART PHARMACY PORTAL
              </span>
            </div>
          </Link>

          {/* Search Pill Input with Auto-suggest (HP inspired) */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm tên thuốc, hoạt chất hoặc bệnh lý..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f7f7f7] text-[#1a1a1a] placeholder-[#636363] text-xs px-4 pr-10 h-10 rounded-full border border-[#e8e8e8] outline-none focus:border-[#024ad8] focus:bg-white transition-all font-medium"
              />
              <Search className="absolute right-3.5 top-3 h-4.5 w-4.5 text-[#636363]" />
            </div>

            {/* Auto-suggest results drop */}
            {searchSuggestions.length > 0 && (
              <div className="absolute top-11 left-0 right-0 bg-white border border-[#e8e8e8] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="p-2 border-b border-[#f7f7f7] text-[10px] uppercase font-bold tracking-wider text-[#636363]">
                  Sản phẩm gợi ý:
                </div>
                {searchSuggestions.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      handleAddToCart(prod);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-3 hover:bg-[#f7f7f7] border-b border-[#f7f7f7] flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="h-8 w-8 object-cover rounded-md" />
                      <div>
                        <div className="text-xs font-bold text-[#1a1a1a] flex items-center gap-1.5">
                          {prod.name}
                          {prod.isRx && <span className="text-[9px] bg-rose-500/10 text-rose-600 font-extrabold px-1 rounded">Rx</span>}
                        </div>
                        <div className="text-[10px] text-[#636363]">{prod.subName}</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#024ad8]">{prod.price.toLocaleString('vi-VN')}₫</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links - nav-link */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-[0.7px]">
            <a href="#store" className="px-3 py-2 text-[#1a1a1a] hover:text-[#024ad8] transition-colors relative group">
              Mua Thuốc
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#024ad8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a href="#simulator" className="px-3 py-2 text-[#1a1a1a] hover:text-[#024ad8] transition-colors relative group">
              Tra Cứu Tương Tác
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#024ad8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="px-3 py-2 text-[#1a1a1a] hover:text-[#024ad8] transition-colors relative group flex items-center gap-1"
            >
              Dược Sĩ AI
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#024ad8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </button>
          </nav>

          {/* CTAs (AAA-compliant touch target sizes & rounded-md) */}
          <div className="flex items-center gap-3">
            
            {/* Basket Cart icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="h-10 w-10 rounded-full bg-[#f7f7f7] hover:bg-[#c9e0fc]/30 flex items-center justify-center relative transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-[#1a1a1a]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#024ad8] text-white text-[9px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-in scale-in duration-200">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="bg-[#024ad8] hover:bg-[#0e3191] text-[10px] font-bold tracking-[0.7px] uppercase px-4 h-10 rounded-[4px] flex items-center justify-center text-white transition-all shadow-sm active:scale-98"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-[10px] font-extrabold uppercase text-[#636363] hover:text-[#1a1a1a] transition-colors"
                >
                  Rời
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-[10px] font-bold tracking-[0.7px] uppercase px-5 h-10 rounded-[4px] flex items-center justify-center transition-all shadow-sm active:scale-98"
              >
                Đăng nhập
              </Link>
            )}

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO BANNER WITH CHEVRON DECORS & OCR Rx GATE (DESIGN.MD SPIRIT) */}
      {/* ========================================================================= */}
      <section className="bg-white pt-10 pb-16 px-6 overflow-hidden relative border-b border-[#e8e8e8]">
        {/* Subtle dot overlay grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#e8e8e8_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>

        <div className="max-w-[1366px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Hero left content (display-xxl weight 500) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#c9e0fc] text-[#0e3191] font-bold text-[10px] uppercase tracking-wider shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#024ad8]" /> TRẢI NGHIỆM KHÁCH HÀNG THỜI CÔNG NGHỆ
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-medium tracking-tight text-[#1a1a1a] leading-[1.0]">
              Nhà thuốc số <br />
              <span className="bg-gradient-to-r from-[#024ad8] to-[#296ef9] bg-clip-text text-transparent">
                Chuẩn chỉ Lâm Sàng.
              </span>
            </h2>
            
            <p className="text-sm text-[#3d3d3d] leading-relaxed max-w-xl font-normal">
              Đồng bộ dữ liệu cào dược chất thực tế từ Nhà thuốc Long Châu. Nâng tầm bảo vệ sức khỏe với cơ chế Rule Engine lâm sàng tự động kiểm soát tương tác chéo gây độc tính và Trợ lý Dược sĩ AI Generative.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#store"
                className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase px-8 h-12 rounded-[4px] flex items-center justify-center transition-all shadow-md active:scale-98 gap-1.5"
              >
                Mua thuốc ngay
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </a>
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-white border border-[#c2c2c2] hover:border-[#1a1a1a] text-[#1a1a1a] text-xs font-semibold tracking-[0.7px] uppercase px-8 h-12 rounded-[4px] flex items-center justify-center transition-all active:scale-98 gap-1.5"
              >
                Trò chuyện dược sĩ AI
                <Brain className="h-4 w-4 text-violet-500" />
              </button>
            </div>
          </div>

          {/* Hero right content: Rx Gate Prescription Upload (WOW effect) */}
          <div className="lg:col-span-6 relative">
            
            {/* HP Electric Blue Angular Chevrons framing the hero frame */}
            <div className="absolute left-[-15px] top-[10%] w-6 h-[80%] bg-[#024ad8] transform -skew-x-[20deg] opacity-20 pointer-events-none rounded"></div>
            <div className="absolute right-[-15px] top-[10%] w-6 h-[80%] bg-[#024ad8] transform -skew-x-[20deg] opacity-20 pointer-events-none rounded"></div>

            {/* prescription-upload-card (rounded-xl, bg-canvas, shadow Soft Lift) */}
            <div className="bg-white border border-[#e8e8e8] p-8 rounded-2xl shadow-xl max-w-md mx-auto relative z-10">
              <div className="absolute -top-3.5 left-6 bg-[#024ad8] text-white text-[9px] font-black uppercase px-3 py-1 rounded tracking-widest shadow-sm">
                CỔNG NHẬN ĐƠN THUỐC (Rx GATE)
              </div>

              <div className="text-left space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#1a1a1a]">Đặt thuốc siêu tốc bằng Đơn thuốc Bác sĩ</h3>
                  <p className="text-[11px] text-[#636363]">Tải ảnh đơn thuốc chụp của bác sĩ. Trợ lý AI sẽ tự động phân tích và tạo giỏ hàng cho bạn.</p>
                </div>

                {!prescriptionImage ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#c2c2c2] hover:border-[#024ad8] hover:bg-[#f7f7f7] rounded-xl p-8 text-center cursor-pointer transition-all duration-200 group"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handlePrescriptionUpload}
                    />
                    <Upload className="h-10 w-10 text-[#636363] group-hover:text-[#024ad8] mx-auto mb-3 transition-colors" />
                    <span className="text-xs font-bold text-[#1a1a1a] block mb-1">Click hoặc kéo thả ảnh đơn thuốc vào đây</span>
                    <span className="text-[10px] text-[#636363] block">Hỗ trợ các định dạng PNG, JPG, JPEG</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Simulated scanning picture */}
                    <div className="relative rounded-xl overflow-hidden border border-[#e8e8e8] h-48 bg-[#f7f7f7]">
                      <img src={prescriptionImage} alt="Prescription Uploaded" className="w-full h-full object-cover opacity-80" />
                      
                      {scanning && (
                        <>
                          {/* Animated laser line scanner */}
                          <div className="absolute left-0 right-0 h-1 bg-[#024ad8] shadow-[0_0_8px_#024ad8] animate-bounce top-0"></div>
                          <div className="absolute inset-0 bg-[#024ad8]/10 flex items-center justify-center">
                            <div className="bg-black/70 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 font-mono">
                              <RefreshCw className="h-3 w-3 animate-spin text-[#024ad8]" />
                              ĐANG PHÂN TÍCH OCR AI: {scanProgress}%
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {!scanning && (
                      <div className="space-y-3 text-left animate-in fade-in duration-300">
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-[11px] font-semibold flex items-center gap-2">
                          <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                          Phân tích đơn hoàn tất! Phát hiện ra {scannedItems.length} dược chất tương thích trong DB.
                        </div>

                        <div className="space-y-2 border-t border-b border-[#e8e8e8] py-2.5">
                          {scannedItems.map((prod) => (
                            <div key={prod.id} className="flex items-center justify-between text-xs">
                              <div className="font-bold text-[#1a1a1a]">{prod.name}</div>
                              <div className="text-[#636363]">{prod.activeIngredient}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={handleAddScannedItems}
                            className="flex-1 bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold uppercase tracking-[0.7px] px-4 h-10 rounded-[4px] flex items-center justify-center transition-all shadow"
                          >
                            Thêm tất cả vào giỏ hàng
                          </button>
                          <button
                            onClick={() => setPrescriptionImage(null)}
                            className="bg-[#f7f7f7] hover:bg-[#e8e8e8] text-[#1a1a1a] text-xs font-semibold px-4 h-10 rounded-[4px] transition-all"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CLINICAL DRUG SIMULATOR (PLAYGROUND MID-PAGE) */}
      {/* ========================================================================= */}
      <section id="simulator" className="bg-[#f7f7f7] py-16 px-8 border-b border-[#e8e8e8]">
        <div className="max-w-[1200px] mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] bg-[#c9e0fc] text-[#0e3191] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              BẢNG PHÒNG THỬ NGHIỆM LÂM SÀNG
            </span>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1a1a1a]">
              Mô Phỏng Cảnh Báo Tương Tác Thuốc AI
            </h3>
            <p className="text-xs text-[#3d3d3d] font-normal leading-relaxed">
              Chọn hai loại hoạt chất dưới đây để xem hệ thống Rule Engine và trợ lý AI Pharmacist phát hiện tương tác chéo lâm sàng tức thì.
            </p>
          </div>

          {/* Simulator Box (rounded-xl, bg-canvas, shadow Soft Lift) */}
          <div className="bg-white border border-[#e8e8e8] rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 min-h-[380px]">
            
            {/* Input Selectors (2 columns) */}
            <div className="lg:col-span-2 p-6 bg-[#f7f7f7] border-r border-[#e8e8e8] flex flex-col justify-between space-y-6 text-left">
              
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-[#1a1a1a] tracking-[0.7px] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#024ad8]"></span>
                  Chọn Cặp Hoạt Chất
                </h4>

                {/* Medicine A */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#636363] uppercase tracking-wider block">
                    Hoạt chất thứ nhất:
                  </label>
                  <div className="relative">
                    <select
                      value={simA}
                      onChange={(e) => setSimA(e.target.value)}
                      className="w-full bg-white text-[#1a1a1a] text-xs font-semibold px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all appearance-none cursor-pointer"
                    >
                      <option value="Aspirin 81mg">Aspirin 81mg (Kháng tiểu cầu)</option>
                      <option value="Paracetamol 500mg">Paracetamol 500mg (Hạ sốt/giảm đau)</option>
                      <option value="Clopidogrel 75mg">Clopidogrel 75mg (Kháng tiểu cầu)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-[#636363] pointer-events-none" />
                  </div>
                </div>

                {/* Medicine B */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#636363] uppercase tracking-wider block">
                    Hoạt chất thứ hai:
                  </label>
                  <div className="relative">
                    <select
                      value={simB}
                      onChange={(e) => setSimB(e.target.value)}
                      className="w-full bg-white text-[#1a1a1a] text-xs font-semibold px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all appearance-none cursor-pointer"
                    >
                      <option value="Warfarin 2mg">Warfarin 2mg (Chống đông máu)</option>
                      <option value="Ibuprofen 400mg">Ibuprofen 400mg (Kháng viêm NSAID)</option>
                      <option value="Aspirin 81mg">Aspirin 81mg (Kháng tiểu cầu)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-[#636363] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#636363] border-t border-[#e8e8e8] pt-3 leading-relaxed">
                Được ánh xạ tự động với bảng `drug_interactions` trên Supabase PostgreSQL.
              </div>

            </div>

            {/* Results Display (3 columns) */}
            <div className="lg:col-span-3 p-8 flex flex-col justify-between space-y-6">
              
              {simulating ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                  <div className="h-8 w-8 border-3 border-[#024ad8] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[10px] font-bold text-[#636363] uppercase tracking-widest animate-pulse">Rule Engine đang quét chéo...</span>
                </div>
              ) : simResult ? (
                <div className="flex-1 space-y-5 text-left">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e8e8e8] pb-3">
                    <h4 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">Kết quả đối chéo lâm sàng:</h4>
                    
                    {simResult.severity === 'HIGH' && (
                      <span className="bg-rose-100 text-[#b3262b] border border-rose-200 text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                        HIGH (Cảnh báo đỏ)
                      </span>
                    )}
                    {simResult.severity === 'MEDIUM' && (
                      <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                        MEDIUM (Cảnh báo vàng)
                      </span>
                    )}
                    {simResult.severity === 'LOW' && (
                      <span className="bg-[#c9e0fc]/50 text-[#0e3191] border border-blue-200 text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                        LOW (Cảnh báo nhẹ)
                      </span>
                    )}
                    {simResult.severity === 'SAFE' && (
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                        SAFE (An toàn)
                      </span>
                    )}
                  </div>

                  <div className="p-4 bg-[#f7f7f7] border border-[#e8e8e8] rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1a1a1a]">
                      <AlertCircle className={`h-4.5 w-4.5 ${
                        simResult.severity === 'HIGH' ? 'text-rose-600' : 
                        simResult.severity === 'MEDIUM' ? 'text-amber-600' : 'text-[#024ad8]'
                      }`} />
                      {simResult.title}
                    </div>
                    <p className="text-[11px] text-[#3d3d3d] leading-relaxed">{simResult.description}</p>
                  </div>

                  {/* AI Pharmacist Console Output */}
                  <div className="p-4 bg-[#1a1a1a] text-white rounded-xl font-mono text-[10px] space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#024ad8]/10 rounded-full blur-xl pointer-events-none"></div>
                    <div className="flex justify-between text-[9px] text-white/40 tracking-wider border-b border-[#292929] pb-1.5">
                      <span>MESSAGE FROM COPILOT (GEMINI AI)</span>
                      <span>v1.5 Flash</span>
                    </div>
                    <p className="text-[#c9e0fc] leading-relaxed min-h-[30px] font-normal">
                      {simAiText}
                      <span className="inline-block w-1.5 h-3 bg-[#024ad8] ml-1 animate-pulse"></span>
                    </p>
                  </div>

                </div>
              ) : null}

              <div className="pt-2 text-right">
                <button
                  onClick={() => {
                    const matchProduct = PRODUCTS.find(p => p.activeIngredient === simA);
                    if (matchProduct) handleAddToCart(matchProduct);
                    const matchProductB = PRODUCTS.find(p => p.activeIngredient === simB);
                    if (matchProductB) handleAddToCart(matchProductB);
                    alert(`Đã thêm hai thuốc ${simA} và ${simB} vào giỏ hàng để kiểm thử Rule Engine của giỏ hàng!`);
                  }}
                  className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase px-5 h-11 rounded-[4px] inline-flex items-center justify-center transition-all shadow active:scale-98"
                >
                  Bỏ cặp này vào giỏ hàng kiểm thử
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DRUG STORE / PRODUCT SECTION (CRAWLED FROM LONG CHÂU - HP STYLING) */}
      {/* ========================================================================= */}
      <section id="store" className="bg-white py-20 px-8">
        <div className="max-w-[1366px] mx-auto space-y-12">
          
          {/* Header store */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e8e8e8] pb-6">
            <div className="text-left space-y-2">
              <span className="text-[10px] bg-[#f7f7f7] text-[#1a1a1a] border border-[#e8e8e8] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                DANH MỤC DƯỢC PHẨM CÀO LONG CHÂU
              </span>
              <h3 className="text-3xl font-medium tracking-tight text-[#1a1a1a]">
                Sản phẩm Y tế nổi bật
              </h3>
            </div>

            {/* Custom Tab Switcher (category-tab) */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-[#1a1a1a] text-white shadow-sm'
                      : 'bg-[#f7f7f7] text-[#1a1a1a] hover:bg-[#e8e8e8]'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Grid products (4 columns at desktop-large - card-product spec) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white border border-[#e8e8e8] rounded-2xl p-5 shadow-[0_2px_8px_rgba(26,26,26,0.06)] hover:shadow-[0_8px_24px_rgba(26,26,26,0.12)] transition-all flex flex-col justify-between text-left group relative"
              >
                {/* Sale Badge (badge-sale-coral) */}
                {prod.isSale && (
                  <span className="absolute top-4 left-4 bg-[#ff5050] text-white text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded uppercase z-10 shadow-sm">
                    {prod.saleText}
                  </span>
                )}

                {/* RX drug warning badge */}
                {prod.isRx && (
                  <span className="absolute top-4 right-4 bg-rose-500/10 text-rose-600 text-[9px] font-black px-2 py-0.5 rounded border border-rose-200 z-10">
                    Thuốc Rx (Cần đơn)
                  </span>
                )}

                {/* 1:1 photography scale frame with rounded border */}
                <div className="relative w-full aspect-square bg-[#f7f7f7] rounded-xl overflow-hidden mb-4 border border-[#f7f7f7]">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#636363] uppercase tracking-wider block font-bold">{prod.category}</span>
                    <h4 className="text-sm font-bold text-[#1a1a1a] line-clamp-1 group-hover:text-[#024ad8] transition-colors">{prod.name}</h4>
                    <p className="text-[10px] text-[#636363] line-clamp-1">{prod.subName}</p>
                    <p className="text-[10px] text-[#3d3d3d] line-clamp-2 leading-relaxed font-normal pt-1">{prod.description}</p>
                  </div>

                  <div className="pt-4 space-y-3">
                    {/* Price and Original price display */}
                    <div className="flex items-baseline justify-between">
                      <div className="text-base font-bold text-[#024ad8]">{prod.price.toLocaleString('vi-VN')}₫</div>
                      {prod.originalPrice && (
                        <div className="text-[11px] text-[#636363] line-through">{(prod.originalPrice).toLocaleString('vi-VN')}₫</div>
                      )}
                    </div>

                    <div className="text-[9px] text-[#636363] font-medium border-t border-[#f7f7f7] pt-2">{prod.unit}</div>

                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="w-full bg-[#f7f7f7] hover:bg-[#024ad8] hover:text-white text-[#1a1a1a] text-[10px] font-bold tracking-[0.7px] uppercase h-10 rounded-[4px] flex items-center justify-center transition-all group-hover:bg-[#f7f7f7] border border-[#e8e8e8] group-hover:border-[#c2c2c2]"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. GIỎ HÀNG THÔNG MINH - CLINICAL ALERTS ON MULTIPLE RX (BR-13 CHỐT CHẶN) */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative border-l border-[#e8e8e8] animate-in slide-in-from-right duration-350">
            
            {/* Header Drawer */}
            <div className="p-5 border-b border-[#e8e8e8] flex items-center justify-between bg-[#f7f7f7]">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-[#024ad8]" />
                <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">
                  Giỏ Hàng Lâm Sàng ({cart.reduce((t, i) => t + i.quantity, 0)})
                </h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-[#636363] hover:text-[#1a1a1a] text-xs font-bold bg-white h-7 w-7 rounded-full shadow border border-[#e8e8e8] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Cart content & Drug Interaction Rules Alerts */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Interaction Warning Zone - VERY POWERFUL VISUAL */}
              {cartInteractions.length > 0 && (
                <div className="space-y-3">
                  {cartInteractions.map((inter, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border text-left space-y-2 animate-pulse ${
                        inter.severity === 'HIGH' 
                          ? 'bg-rose-50 border-[#ff5050]/40 text-[#b3262b]' 
                          : 'bg-amber-50 border-amber-300/40 text-amber-800'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider">
                            CẢNH BÁO TƯƠNG TÁC: {inter.severity}
                          </h4>
                          <p className="text-xs font-bold mt-1 leading-snug">{inter.title}</p>
                        </div>
                      </div>
                      <p className="text-[10px] leading-relaxed text-black/75 pt-1 border-t border-black/10">
                        {inter.description}
                      </p>
                      
                      {/* AI Pharmacist inside warning block */}
                      <div className="bg-black/90 text-white rounded p-2.5 text-[9px] font-mono leading-relaxed mt-2">
                        <div className="text-[#c9e0fc] font-bold mb-1">AI Clinical Guardrail:</div>
                        {inter.aiNote}
                      </div>

                      {inter.severity === 'HIGH' && (
                        <div className="pt-2 flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id={`bypass-${idx}`} 
                            checked={bypassInteraction}
                            onChange={(e) => setBypassInteraction(e.target.checked)}
                            className="h-3.5 w-3.5 text-[#024ad8] rounded"
                          />
                          <label htmlFor={`bypass-${idx}`} className="text-[10px] font-bold text-[#b3262b] cursor-pointer select-none">
                            Tôi xác nhận đơn thuốc có chỉ định của bác sĩ
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 text-[#636363]">
                  <ShoppingCart className="h-10 w-10 text-[#c2c2c2]" />
                  <span className="text-xs font-bold">Giỏ hàng trống. Hãy chọn sản phẩm.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase text-[#636363] border-b border-[#f7f7f7] pb-1 tracking-wider text-left">
                    Danh sách sản phẩm chọn:
                  </div>
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 border-b border-[#f7f7f7] pb-4 text-left">
                      <img src={item.product.image} alt={item.product.name} className="h-12 w-12 object-cover rounded-lg border border-[#e8e8e8]" />
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-1">
                          <h5 className="text-xs font-bold text-[#1a1a1a] line-clamp-1">{item.product.name}</h5>
                          <button 
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-[#636363] hover:text-[#b3262b] transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="text-[10px] bg-[#f7f7f7] text-[#636363] px-1.5 py-0.5 rounded font-mono block w-max">
                          {item.product.activeIngredient}
                        </span>

                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center border border-[#c2c2c2] rounded bg-white">
                            <button 
                              onClick={() => handleUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-1 text-[#636363] hover:bg-[#f7f7f7]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-1 text-[#636363] hover:bg-[#f7f7f7]"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#024ad8]">
                            {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Footer Checkout info & calculations */}
            <div className="p-5 border-t border-[#e8e8e8] bg-[#f7f7f7] space-y-4 text-left">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[#636363]">
                  <span>Tổng thuốc:</span>
                  <span>{cart.reduce((t, i) => t + i.quantity, 0)} sản phẩm</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1a1a1a]">
                  <span>TỔNG THÀNH TIỀN:</span>
                  <span className="text-lg text-[#024ad8]">{cartTotal.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              {/* AAA CTA button */}
              <button
                disabled={cart.length === 0 || (cartInteractions.some(d => d.severity === 'HIGH') && !bypassInteraction)}
                onClick={handleCartCheckout}
                className="w-full bg-[#024ad8] disabled:bg-[#c2c2c2] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase h-12 rounded-[4px] flex items-center justify-center transition-all shadow-md active:scale-98 gap-1.5"
              >
                Xác nhận & Thanh toán
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </button>

              <p className="text-[10px] text-[#636363] text-center font-normal leading-snug">
                Thanh toán an toàn y tế. Thuốc kê đơn Rx chỉ được giao khi Dược sĩ kiểm duyệt và xác thực đơn thuốc của bác sĩ thành công.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. CHATBOT DƯỢC SĨ AI LÂM SÀNG (GEMINI POP-UP CONSOLE - BOTTOM RIGHT) */}
      {/* ========================================================================= */}
      
      {/* Rounded float button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-[#024ad8] text-white rounded-full shadow-2xl hover:bg-[#0e3191] hover:scale-105 active:scale-95 transition-all z-40 flex items-center justify-center border-4 border-white animate-bounce"
      >
        <Brain className="h-6 w-6 text-white" />
        <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-white animate-ping"></span>
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-white border border-[#e8e8e8] rounded-2xl shadow-2xl z-50 flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header Chat */}
          <div className="p-4 bg-[#1a1a1a] text-white flex items-center justify-between border-b border-[#292929]">
            <div className="flex items-center gap-2.5 text-left">
              <div className="h-8 w-8 bg-[#024ad8] rounded-full flex items-center justify-center shadow">
                <Brain className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider leading-none">AI Pharmacist</h4>
                <span className="text-[9px] text-emerald-400 font-semibold block mt-1">● Hoạt động 24/7 (Gemini v1.5)</span>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white/60 hover:text-white text-xs font-bold bg-white/10 h-7 w-7 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Messages & Prompts */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f7f7f7]">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} text-left animate-in fade-in duration-200`}
              >
                <div 
                  className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#024ad8] text-white rounded-br-none'
                      : 'bg-white text-[#1a1a1a] border border-[#e8e8e8] rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isAiTyping && (
              <div className="flex justify-start text-left">
                <div className="p-3 rounded-xl bg-white border border-[#e8e8e8] rounded-bl-none shadow-sm flex items-center gap-1">
                  <span className="h-2 w-2 bg-[#636363] rounded-full animate-bounce"></span>
                  <span className="h-2 w-2 bg-[#636363] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 bg-[#636363] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick clinical query templates */}
          <div className="p-2 border-t border-[#e8e8e8] bg-white flex flex-wrap gap-1.5 justify-start">
            <button 
              onClick={() => handleChatSubmit('Aspirin và Warfarin dùng chung nguy hại thế nào?')}
              className="text-[9px] font-bold bg-[#f7f7f7] hover:bg-[#c9e0fc]/40 text-[#024ad8] border border-[#e8e8e8] px-2 py-1 rounded"
            >
              Aspirin + Warfarin ?
            </button>
            <button 
              onClick={() => handleChatSubmit('Uống Boganic Traphaco giải độc gan thế nào?')}
              className="text-[9px] font-bold bg-[#f7f7f7] hover:bg-[#c9e0fc]/40 text-[#024ad8] border border-[#e8e8e8] px-2 py-1 rounded"
            >
              Boganic bổ gan ?
            </button>
            <button 
              onClick={() => handleChatSubmit('Kháng sinh Amoxicillin 500mg lưu ý gì?')}
              className="text-[9px] font-bold bg-[#f7f7f7] hover:bg-[#c9e0fc]/40 text-[#024ad8] border border-[#e8e8e8] px-2 py-1 rounded"
            >
              Amoxicillin lưu ý gì?
            </button>
          </div>

          {/* Form input */}
          <div className="p-3 border-t border-[#e8e8e8] bg-white flex gap-2">
            <input
              type="text"
              placeholder="Hỏi Dược sĩ AI về thuốc..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
              className="flex-1 bg-[#f7f7f7] text-[#1a1a1a] text-xs px-3 h-10 rounded border border-[#e8e8e8] outline-none focus:border-[#024ad8] focus:bg-white"
            />
            <button
              onClick={() => handleChatSubmit()}
              className="bg-[#024ad8] hover:bg-[#0e3191] text-white h-10 w-10 rounded flex items-center justify-center shrink-0 shadow transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. CAPABILITIES SHOWCASE: Alternating White & Gray Columns (DESIGN.MD RHYTHM) */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 px-8 border-t border-[#e8e8e8]">
        <div className="max-w-[1366px] mx-auto text-left space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] bg-[#f7f7f7] text-[#1a1a1a] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#e8e8e8]">
              ĐẶC TẢ TÍNH NĂNG ĐỒ ÁN CNPM
            </span>
            <h3 className="text-3xl font-medium tracking-tight text-[#1a1a1a]">
              Nền tảng Quản trị Y tế Hiện đại
            </h3>
            <p className="text-xs text-[#3d3d3d] font-normal leading-relaxed">
              Giải pháp tích hợp đồng bộ dữ liệu thời gian thực giữa quầy bán thuốc POS, thủ kho lâm sàng và cơ sở dữ liệu Supabase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white border border-[#e8e8e8] p-6 rounded-2xl shadow-[0_2px_8px_rgba(26,26,26,0.04)] hover:shadow-lg transition-all space-y-4 group">
              <div className="h-10 w-10 rounded bg-[#c9e0fc]/50 text-[#024ad8] flex items-center justify-center group-hover:bg-[#024ad8] group-hover:text-white transition-colors duration-350">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#024ad8] transition-colors">
                01 / POS Lâm Sàng Siêu Tốc
              </h4>
              <p className="text-xs text-[#636363] leading-relaxed font-normal">
                Quầy POS bán hàng tinh gọn dành cho dược sĩ, chốt chặn bán vượt tồn kho (`BR-06`), bắt buộc có thuốc (`BR-09`) và đồng bộ hóa khấu trừ tức thời (`BR-10`).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-[#e8e8e8] p-6 rounded-2xl shadow-[0_2px_8px_rgba(26,26,26,0.04)] hover:shadow-lg transition-all space-y-4 group">
              <div className="h-10 w-10 rounded bg-rose-100 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors duration-350">
                <Brain className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#024ad8] transition-colors">
                02 / Trí Tuệ Nhân Tạo Copilot
              </h4>
              <p className="text-xs text-[#636363] leading-relaxed font-normal">
                Tích hợp mô hình ngôn ngữ lớn (Gemini LLM) giúp biên soạn ghi chú lâm sàng nhanh chóng, tiết kiệm 70% thời gian của cán bộ tư vấn dược học tại quầy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-[#e8e8e8] p-6 rounded-2xl shadow-[0_2px_8px_rgba(26,26,26,0.04)] hover:shadow-lg transition-all space-y-4 group">
              <div className="h-10 w-10 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-350">
                <Activity className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#024ad8] transition-colors">
                03 / Quản Trị Kho Theo Lô Hạn
              </h4>
              <p className="text-xs text-[#636363] leading-relaxed font-normal">
                Theo dõi chính xác hạn dùng của từng mã lô sản xuất (`StockBatch`), tự động khóa bán lô hết hạn và hỗ trợ tạo phiếu nhập kho y tế đồng bộ hoàn toàn.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TESTIMONIALS SLAB (TESTIMONIALS BAND - bg-ink: #1a1a1a, text white) */}
      {/* ========================================================================= */}
      <section className="bg-[#1a1a1a] text-white py-16 px-8 relative overflow-hidden border-t border-[#292929]">
        <div className="absolute left-0 bottom-0 w-[400px] h-[200px] bg-[#024ad8]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1366px] mx-auto text-left relative z-10 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] bg-white/10 text-white/80 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Ý KIẾN CHUYÊN MÔN TỪ CỘNG ĐỒNG Y KHOA
            </span>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Đồng Hành Cùng Dược Sĩ Việt Nam
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <div 
                key={idx} 
                className="bg-white text-[#1a1a1a] p-6 rounded-2xl shadow-xl space-y-4 text-left flex flex-col justify-between border border-[#e8e8e8]"
              >
                <p className="text-xs leading-relaxed text-[#292929] italic font-normal">
                  &ldquo;{test.quote}&rdquo;
                </p>
                
                <div className="flex items-center gap-3 pt-3 border-t border-[#e8e8e8]">
                  <img
                    src={test.avatarUrl}
                    alt={test.author}
                    className="h-9 w-9 object-cover rounded shadow-sm"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#1a1a1a]">{test.author}</h5>
                    <span className="text-[10px] text-[#636363]">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. PRELUDE BAND: "HOW CAN WE HELP?" (help-band-dark - bg-ink) */}
      {/* ========================================================================= */}
      <section className="bg-[#1a1a1a] text-white py-14 px-8 border-t border-[#292929] relative overflow-hidden">
        <div className="max-w-[1366px] mx-auto text-center space-y-5 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">
            Chúng tôi có thể giúp gì cho nhà thuốc của bạn?
          </h3>
          <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
            Hỗ trợ cấu hình hệ thống ban đầu, phân quyền vai trò nhân viên và nạp sẵn dữ liệu danh mục lâm sàng miễn phí.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase px-6 h-11 rounded-[4px] shadow transition-all"
            >
              Yêu cầu tư vấn trực tuyến
            </button>
            <a 
              href="http://localhost:3001/api/docs" 
              target="_blank"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold tracking-[0.7px] uppercase px-6 h-11 rounded-[4px] inline-flex items-center justify-center transition-all"
            >
              Tài liệu kỹ thuật API
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SYSTEM DEMO MODAL */}
      {/* ========================================================================= */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative border border-[#e8e8e8] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#024ad8]"></div>
            
            <div className="p-6 text-left space-y-5">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-[#c9e0fc] flex items-center justify-center font-black text-[#024ad8]">
                    P
                  </div>
                  <h3 className="text-sm font-bold text-[#1a1a1a] tracking-tight uppercase">
                    Tài khoản demo PharmaAssist
                  </h3>
                </div>
                <button 
                  onClick={() => setShowDemoModal(false)}
                  className="text-[#636363] hover:text-[#1a1a1a] text-sm font-bold bg-[#f7f7f7] h-8 w-8 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3 flex items-start gap-2.5">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-800 leading-relaxed font-semibold">
                  Sử dụng các thông tin xác thực sau để đăng nhập đúng vai trò quản trị y khoa.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded bg-[#f7f7f7] border border-[#e8e8e8] hover:border-[#c9e0fc] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#024ad8] uppercase tracking-wider">Admin (Hệ thống)</span>
                    <span className="text-[9px] bg-[#c9e0fc] text-[#0e3191] font-bold px-1.5 py-0.5 rounded">FULL ACCESS</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#3d3d3d]">Email: <strong className="select-all">admin@pharmaassist.com</strong></div>
                  <div className="text-[11px] font-mono text-[#3d3d3d]">Pass: <strong>admin123</strong></div>
                </div>

                <div className="p-3 rounded bg-[#f7f7f7] border border-[#e8e8e8] hover:border-[#c9e0fc] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#024ad8] uppercase tracking-wider">Staff (Bán hàng)</span>
                    <span className="text-[9px] bg-amber-500/10 text-amber-700 font-bold px-1.5 py-0.5 rounded">POS ORDERS</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#3d3d3d]">Email: <strong className="select-all">staff@pharmaassist.com</strong></div>
                  <div className="text-[11px] font-mono text-[#3d3d3d]">Pass: <strong>staff123</strong></div>
                </div>

                <div className="p-3 rounded bg-[#f7f7f7] border border-[#e8e8e8] hover:border-[#c9e0fc] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#024ad8] uppercase tracking-wider">Warehouse (Thủ kho)</span>
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-700 font-bold px-1.5 py-0.5 rounded">INVENTORY</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#3d3d3d]">Email: <strong className="select-all">warehouse@pharmaassist.com</strong></div>
                  <div className="text-[11px] font-mono text-[#3d3d3d]">Pass: <strong>warehouse123</strong></div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/login"
                  onClick={() => setShowDemoModal(false)}
                  className="w-full inline-flex h-11 items-center justify-center bg-[#024ad8] hover:bg-[#0e3191] text-white font-semibold text-xs tracking-[0.7px] rounded transition-all shadow-md active:scale-98 uppercase gap-1.5"
                >
                  Đăng nhập hệ thống
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11. FOOTER-DARK (bg-ink #1a1a1a, text white, 5 columns) */}
      {/* ========================================================================= */}
      <footer className="bg-[#1a1a1a] text-white pt-14 pb-8 border-t border-[#292929]">
        <div className="max-w-[1366px] mx-auto px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10 text-left">
            
            {/* Col 1 */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase text-white tracking-[0.7px]">
                LIÊN HỆ ĐỒ ÁN
              </h4>
              <ul className="space-y-3">
                <li className="flex flex-col text-left">
                  <span className="text-[10px] text-[#636363] block">Hotline Dược học</span>
                  <a href="tel:18006928" className="text-base font-bold text-[#024ad8] hover:underline flex items-center gap-1.5 mt-1">
                    <Phone className="h-3.5 w-3.5" />
                    1800 6928
                  </a>
                </li>
                <li className="flex flex-col text-left">
                  <span className="text-[10px] text-[#636363] block">Tư vấn Dược sĩ AI</span>
                  <a href="#" className="text-sm font-bold text-violet-400 hover:underline flex items-center gap-1.5 mt-1">
                    <Brain className="h-3.5 w-3.5" />
                    Gemini Copilot (24/7)
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase text-white tracking-[0.7px]">
                DỰ ÁN PHARMAASSIST
              </h4>
              <ul className="space-y-2 text-xs font-normal text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Về đồ án</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Công nghệ tích hợp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Đặc tả bảo mật y khoa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ nhóm sinh viên</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase text-white tracking-[0.7px]">
                MÔ PHỎNG LÂM SÀNG
              </h4>
              <ul className="space-y-2 text-xs font-normal text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Tương tác Aspirin + Warfarin</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kiểm soát viêm loét dạ dày</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hóa chất Paracetamol + Ibuprofen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chống đông máu kết hợp DAPT</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase text-white tracking-[0.7px]">
                CƠ SỞ HẠ TẦNG
              </h4>
              <ul className="space-y-2 text-xs font-normal text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Next.js App Router v16</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NestJS RESTful APIs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Supabase Cloud hosting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tailwind CSS V4 Engine</a></li>
              </ul>
            </div>

            {/* Col 5 */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase text-white tracking-[0.7px]">
                QUY TẮC THIẾT KẾ
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                Đồ án tuân thủ nghiêm ngặt hệ thống design tokens đặc tả tại `DESIGN.md`. Font chữ Manrope Google Fonts thay thế, màu Electric Blue và họa tiết song chéo đặc trưng.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-white/10 text-white font-semibold px-2 py-0.5 rounded">
                  Manrope Google Fonts
                </span>
              </div>
            </div>

          </div>

          <div className="border-t border-[#292929] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs text-[#1a1a1a] font-bold">
                P
              </div>
              <span className="font-bold text-white">PharmaAssist Smart Pharmacy Network</span>
            </div>

            <p className="text-[10px]">
              &copy; {new Date().getFullYear()} PharmaAssist. Tokyo Cloud Region. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
