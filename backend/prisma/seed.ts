import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { createClient, User as SupabaseUser } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString =
  process.env.DIRECT_URL || process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    'Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing from environment.',
  );
  process.exit(1);
}

// Initialize Supabase Admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  console.log('Starting seed process...');

  // 1. Seed Roles
  console.log('Seeding roles...');
  const adminRole = await prisma.role.upsert({
    where: { code: 'ADMIN' },
    update: {},
    create: {
      id: 1,
      code: 'ADMIN',
      name: 'ADMIN',
      description: 'System Administrator with full access',
    },
  });

  const staffRole = await prisma.role.upsert({
    where: { code: 'STAFF' },
    update: {},
    create: {
      id: 2,
      code: 'STAFF',
      name: 'STAFF',
      description: 'Pharmacy Staff with sales access',
    },
  });

  const warehouseRole = await prisma.role.upsert({
    where: { code: 'WAREHOUSE' },
    update: {},
    create: {
      id: 3,
      code: 'WAREHOUSE',
      name: 'WAREHOUSE',
      description: 'Warehouse Manager with inventory access',
    },
  });

  console.log(
    `Roles seeded: ${adminRole.name}, ${staffRole.name}, ${warehouseRole.name}`,
  );

  // 2. Prepare Demo Users
  const demoUsers = [
    {
      email: 'admin@pharmaassist.com',
      password: 'admin123',
      fullName: 'PharmaAdmin System',
      roleId: 1,
    },
    {
      email: 'staff@pharmaassist.com',
      password: 'staff123',
      fullName: 'PharmaStaff Cashier',
      roleId: 2,
    },
    {
      email: 'warehouse@pharmaassist.com',
      password: 'warehouse123',
      fullName: 'PharmaWarehouse Manager',
      roleId: 3,
    },
  ];

  for (const u of demoUsers) {
    console.log(`Checking/Creating user in Supabase Auth: ${u.email}...`);

    // Check if user already exists in Supabase Auth (by email list)
    const {
      data: { users },
      error: listError,
    } = await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      console.error(`Error listing users:`, listError);
      continue;
    }

    let authUser: SupabaseUser | undefined = users.find(
      (user) => user.email === u.email,
    );

    if (!authUser) {
      // Create user in Supabase Auth
      const {
        data: { user },
        error: createError,
      } = await supabaseAdmin.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: {
          full_name: u.fullName,
        },
      });

      if (createError) {
        console.error(
          `Failed to create auth user for ${u.email}:`,
          createError.message,
        );
        continue;
      }

      if (user) {
        authUser = user;
      }
      console.log(
        `Created auth user in Supabase for ${u.email} (ID: ${user?.id})`,
      );
    } else {
      console.log(
        `Auth user already exists in Supabase for ${u.email} (ID: ${authUser.id})`,
      );
    }

    if (authUser) {
      // 3. Ensure user exists in our public.users table (should be synced by DB trigger, but upsert to be safe)
      const userProfile = await prisma.user.upsert({
        where: { id: authUser.id },
        update: {
          email: u.email,
          fullName: u.fullName,
        },
        create: {
          id: authUser.id,
          email: u.email,
          username: u.email.split('@')[0],
          fullName: u.fullName,
          status: 'ACTIVE',
        },
      });

      // 4. Map User to Role
      const existingUserRole = await prisma.userRole.findFirst({
        where: {
          userId: userProfile.id,
          roleId: u.roleId,
        },
      });

      if (!existingUserRole) {
        await prisma.userRole.create({
          data: {
            userId: userProfile.id,
            roleId: u.roleId,
          },
        });
        console.log(`Assigned role ${u.roleId} to user ${u.email}`);
      } else {
        console.log(`Role mapping already exists for user ${u.email}`);
      }
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
