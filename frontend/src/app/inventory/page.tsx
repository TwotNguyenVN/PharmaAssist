'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Shield } from 'lucide-react';

export default function InventoryPage() {
  const { user } = useAuth();

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Quản lý kho';

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        {/* Dynamic Sidebar based on roles */}
        <Sidebar currentPath="/inventory" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8">
            <h1 className="text-base font-bold text-ink uppercase tracking-wider">
              Tồn kho
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-charcoal bg-cloud px-3 py-1.5 rounded-md border border-hairline">
                <User className="h-4 w-4 text-graphite" />
                <span className="font-medium truncate max-w-[150px]">{user?.email}</span>
                <span className="text-gray-300">|</span>
                <Shield className="h-3 w-3 text-primary inline" />
                <span className="font-semibold text-primary">{displayRole}</span>
              </div>
            </div>
          </header>

          <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto">
            <Card className="bg-white border border-hairline rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
              <CardHeader className="pl-8 pt-6">
                <CardTitle className="text-lg font-bold text-ink">Quản lý tồn kho & Hạn sử dụng</CardTitle>
              </CardHeader>
              <CardContent className="pl-8 pb-8">
                <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                  <span className="text-5xl">📦</span>
                  <div>
                    <h3 className="font-bold text-ink text-lg">Chức năng quản lý tồn kho</h3>
                    <p className="text-sm text-graphite max-w-sm mt-1 leading-relaxed">
                      Phân hệ theo dõi số lượng tồn kho và cảnh báo hạn sử dụng thuốc thuộc **Sprint 1** (Inventory Foundation). Hiện tại trang đang được thiết lập để giữ chỗ và phân quyền truy cập thành công.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
