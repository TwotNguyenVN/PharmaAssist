'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { 
  LayoutDashboard, 
  Pill, 
  Package, 
  ShoppingCart, 
  LogOut, 
  User,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface SidebarProps {
  currentPath: string;
}

export function Sidebar({ currentPath }: SidebarProps) {
  const { user, logout, hasRole } = useAuth();
  const router = useRouter();

  // Define navigation items with their required roles
  const navItems = [
    {
      label: 'Tổng quan',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['ADMIN', 'STAFF', 'WAREHOUSE'],
    },
    {
      label: 'Bán hàng (POS)',
      path: '/sales',
      icon: ShoppingCart,
      roles: ['ADMIN', 'STAFF'],
    },
    {
      label: 'Quản lý thuốc',
      path: '/medicines',
      icon: Pill,
      roles: ['ADMIN', 'WAREHOUSE'],
    },
    {
      label: 'Tồn kho',
      path: '/inventory',
      icon: Package,
      roles: ['ADMIN', 'WAREHOUSE'],
    },
  ];

  // Filter navigation items based on user roles
  const visibleItems = navItems.filter(item => hasRole(item.roles));

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Get primary role string for display
  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : user?.roles?.includes('WAREHOUSE') 
      ? 'Quản lý kho' 
      : 'Nhân viên bán hàng';

  return (
    <aside className="w-64 bg-cloud border-r border-hairline flex flex-col h-screen sticky top-0 hidden md:flex">
      {/* Brand logo section */}
      <div className="h-16 flex items-center px-6 border-b border-hairline bg-white">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="text-xl font-semibold tracking-tight text-ink font-sans">
            Pharma<span className="text-primary font-bold">Assist</span>
          </span>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {visibleItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all font-sans",
                isActive 
                  ? "bg-primary text-white font-medium shadow-sm" 
                  : "text-charcoal hover:bg-fog hover:text-ink"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-graphite")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User profile and logout section */}
      <div className="p-4 border-t border-hairline bg-white space-y-3">
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-cloud">
          <div className="h-9 w-9 rounded-full bg-primary-soft flex items-center justify-center text-primary-deep">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-ink truncate font-sans">
              {user?.fullName || 'Nhân viên'}
            </p>
            <p className="text-[10px] text-graphite truncate font-sans flex items-center gap-0.5">
              <Shield className="h-3 w-3 text-primary inline" />
              {displayRole}
            </p>
          </div>
        </div>

        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start text-charcoal hover:text-error hover:bg-bloom-rose/40 font-sans text-sm h-10 rounded-md border border-transparent hover:border-bloom-coral/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </aside>
  );
}
