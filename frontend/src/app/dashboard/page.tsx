'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { User, Shield, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  // Get primary role string for display
  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : user?.roles?.includes('WAREHOUSE') 
      ? 'Quản lý kho' 
      : 'Nhân viên bán hàng';

  return (
    <RouteGuard allowedRoles={['ADMIN', 'STAFF', 'WAREHOUSE']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        {/* Dynamic Sidebar based on roles */}
        <Sidebar currentPath="/dashboard" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8">
            <h1 className="text-base font-bold text-ink uppercase tracking-wider">
              Tổng quan hệ thống
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

          <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto">
            {/* Quick Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white border border-hairline rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-semibold text-graphite uppercase tracking-wider">Doanh thu hôm nay</CardTitle>
                  <span className="text-lg">💰</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-ink">0 đ</div>
                  <p className="text-xs text-graphite mt-1">Hóa đơn đã thanh toán</p>
                </CardContent>
              </Card>
              <Card className="bg-white border border-hairline rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-semibold text-graphite uppercase tracking-wider">Số đơn bán ra</CardTitle>
                  <span className="text-lg">📦</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-ink">0</div>
                  <p className="text-xs text-graphite mt-1">Đơn bán lẻ thành công</p>
                </CardContent>
              </Card>
              <Card className="bg-white border border-hairline rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-semibold text-graphite uppercase tracking-wider">Thuốc trong kho</CardTitle>
                  <span className="text-lg">💊</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-ink">0</div>
                  <p className="text-xs text-graphite mt-1">Danh mục thuốc hoạt động</p>
                </CardContent>
              </Card>
              <Card className="bg-white border border-hairline rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-semibold text-graphite uppercase tracking-wider">Cảnh báo hết hạn</CardTitle>
                  <span className="text-lg">⚠️</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-ink">0</div>
                  <p className="text-xs text-graphite mt-1">Lô thuốc cần xử lý gấp</p>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Welcome Details */}
            <Card className="w-full bg-white border border-hairline rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
              <CardHeader className="pl-8 pt-6">
                <CardTitle className="text-lg font-bold text-ink">
                  Chào mừng quay trở lại, {user?.fullName || 'Dược sĩ'}!
                </CardTitle>
                <CardDescription className="text-sm text-graphite">
                  Hệ thống PharmaAssist đã kết nối thành công với database thông qua NestJS Backend (JWT).
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-5 pl-8 pb-8 font-sans">
                <p className="text-sm text-charcoal leading-relaxed">
                  Bảng điều khiển của bạn sẽ cập nhật các chỉ số hoạt động của nhà thuốc theo thời gian thực từ Supabase Realtime khi các phân hệ Bán hàng (POS) và Tồn kho được triển khai ở các Sprint tiếp theo.
                </p>
                
                <div className="bg-primary-soft/30 border border-primary-soft rounded-lg p-4 text-sm text-primary-deep flex items-start space-x-3">
                  <span className="text-base mt-0.5">ℹ️</span>
                  <div>
                    <p className="font-bold text-ink">Thông tin phân quyền hiện tại:</p>
                    <p className="text-xs text-charcoal mt-1 leading-relaxed">
                      Dựa trên vai trò <span className="font-semibold">{displayRole}</span>, menu Sidebar đã tự động tinh chỉnh để chỉ hiển thị các chức năng bạn có quyền thao tác. 
                      Trình bảo vệ RouteGuard cũng đã được thiết lập để ngăn chặn các truy cập URL trái phép.
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
