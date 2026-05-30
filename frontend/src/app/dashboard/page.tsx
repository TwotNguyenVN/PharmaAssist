'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { 
  User, 
  Shield, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Pill, 
  Layers, 
  CheckCircle2, 
  RefreshCw,
  BellRing,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  CartesianGrid, 
  Legend 
} from 'recharts';

// Mock telemetry data for the premium dashboard
const REVENUE_DATA = [
  { day: 'T2', revenue: 4200000 },
  { day: 'T3', revenue: 5800000 },
  { day: 'T4', revenue: 4900000 },
  { day: 'T5', revenue: 7200000 },
  { day: 'T6', revenue: 8900000 },
  { day: 'T7', revenue: 12500000 },
  { day: 'CN', revenue: 10200000 },
];

const CLINICAL_WARNINGS_DATA = [
  { name: 'Kháng sinh', 'Tương tác cao': 4, 'Tương tác trung bình': 12, 'Khác': 25 },
  { name: 'Tim mạch', 'Tương tác cao': 8, 'Tương tác trung bình': 18, 'Khác': 14 },
  { name: 'Giảm đau', 'Tương tác cao': 2, 'Tương tác trung bình': 24, 'Khác': 48 },
  { name: 'Tiểu đường', 'Tương tác cao': 5, 'Tương tác trung bình': 9, 'Khác': 19 },
];

const RECENT_WARNING_LOGS = [
  {
    time: '14:32 Hôm nay',
    drugs: 'Clopidogrel 75mg + Aspirin 81mg',
    severity: 'MEDIUM',
    message: 'Nguy cơ xuất huyết huyết khối mạch vành. Đã được xác nhận bởi dược sĩ.',
    pharmacist: 'Dược sĩ Trần Quốc Tuấn'
  },
  {
    time: '11:15 Hôm nay',
    drugs: 'Aspirin 81mg + Warfarin 2mg',
    severity: 'HIGH',
    message: 'Tương tác đặc biệt nguy hiểm. Rule engine tự động khóa xuất đơn, yêu cầu thay đổi phác đồ.',
    pharmacist: 'Dược sĩ Nguyễn Thị Minh'
  },
  {
    time: 'Hôm qua',
    drugs: 'Paracetamol 500mg + Ibuprofen 400mg',
    severity: 'LOW',
    message: 'Theo dõi liều lượng tích lũy tránh độc tính gan. Đã nhắc nhở bệnh nhân giãn cách 4 tiếng.',
    pharmacist: 'Dược sĩ Trần Quốc Tuấn'
  }
];

export default function RebuiltDashboardPage() {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get primary role string for display
  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : user?.roles?.includes('WAREHOUSE') 
      ? 'Quản lý kho' 
      : 'Nhân viên bán hàng';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Format currency helper
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <RouteGuard allowedRoles={['ADMIN', 'STAFF', 'WAREHOUSE']}>
      <div className="flex min-h-screen bg-[#f7f7f7] font-sans antialiased text-[#1a1a1a]">
        
        {/* Dynamic Sidebar based on roles */}
        <Sidebar currentPath="/dashboard" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Header Strip matching DESIGN.md layout */}
          <header className="h-16 bg-white border-b border-[#e8e8e8] flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-[0.7px]">
                Tổng quan hệ thống
              </h1>
              <span className="text-[10px] bg-[#c9e0fc] text-[#0e3191] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Real-time Sync
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleRefresh}
                className="p-2 hover:bg-[#f7f7f7] rounded border border-[#e8e8e8] text-[#636363] hover:text-[#1a1a1a] transition-all"
                title="Tải lại dữ liệu"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              
              <div className="flex items-center space-x-2 text-xs text-[#3d3d3d] bg-[#f7f7f7] px-3 py-1.5 rounded border border-[#e8e8e8] shadow-sm">
                <User className="h-4 w-4 text-[#636363]" />
                <span className="font-semibold truncate max-w-[150px]">{user?.email}</span>
                <span className="text-[#e8e8e8]">|</span>
                <Shield className="h-3 w-3 text-[#024ad8] inline" />
                <span className="font-bold text-[#024ad8] uppercase tracking-wider">{displayRole}</span>
              </div>
            </div>
          </header>

          <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto relative">
            
            {/* Top Stat Summary Cards - 4 Columns */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              
              {/* Stat 1 */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm hover:shadow-[0_2px_8px_rgba(26,26,26,0.08)] transition-all relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#024ad8] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Doanh thu tuần này</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-[#c9e0fc]/40 text-[#024ad8] flex items-center justify-center">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1a1a1a]">59.700.000 đ</div>
                  <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    +18.5% so với tuần trước
                  </p>
                </CardContent>
              </Card>

              {/* Stat 2 */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm hover:shadow-[0_2px_8px_rgba(26,26,26,0.08)] transition-all relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#024ad8] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Hóa đơn POS (Hôm nay)</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1a1a1a]">48 Đơn hàng</div>
                  <p className="text-[10px] text-[#636363] mt-1">Tất cả đều được đối soát an toàn y tế</p>
                </CardContent>
              </Card>

              {/* Stat 3 */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm hover:shadow-[0_2px_8px_rgba(26,26,26,0.08)] transition-all relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#024ad8] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Tổng danh mục thuốc</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                    <Pill className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1a1a1a]">1.450 Hoạt chất</div>
                  <p className="text-[10px] text-violet-600 font-semibold mt-1">
                    Đã đồng bộ CSV Seed Long Châu
                  </p>
                </CardContent>
              </Card>

              {/* Stat 4 */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm hover:shadow-[0_2px_8px_rgba(26,26,26,0.08)] transition-all relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#024ad8] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Cảnh báo y khoa nguy hại</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-rose-600">3 Phát hiện</div>
                  <p className="text-[10px] text-rose-600 font-semibold mt-1 animate-pulse">
                    Yêu cầu Dược sĩ rà soát thủ công
                  </p>
                </CardContent>
              </Card>

            </div>

            {/* Dynamic Interactive Recharts Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              
              {/* Chart 1: Revenue Area Chart */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-6 space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">
                    Biểu đồ doanh thu 7 ngày qua
                  </h3>
                  <p className="text-[11px] text-[#636363]">
                    Thống kê doanh số tích lũy tại quầy POS và đơn đặt hàng trực tuyến.
                  </p>
                </div>

                <div className="h-72 w-full font-mono text-[10px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#024ad8" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#024ad8" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                      <XAxis dataKey="day" stroke="#636363" />
                      <YAxis tickFormatter={(v) => `${v/1000000}M`} stroke="#636363" />
                      <Tooltip formatter={(value: any) => formatVND(value)} />
                      <Area type="monotone" dataKey="revenue" stroke="#024ad8" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Chart 2: Drug interaction stack bar chart */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-6 space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">
                    Phân bổ cảnh báo lâm sàng theo nhóm bệnh
                  </h3>
                  <p className="text-[11px] text-[#636363]">
                    Số lượng vụ đối soát tương tác thuốc được phát hiện tự động bởi Rule Engine.
                  </p>
                </div>

                <div className="h-72 w-full font-mono text-[10px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CLINICAL_WARNINGS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                      <XAxis dataKey="name" stroke="#636363" />
                      <YAxis stroke="#636363" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Tương tác cao" stackId="a" fill="#b3262b" />
                      <Bar dataKey="Tương tác trung bình" stackId="a" fill="#d97706" />
                      <Bar dataKey="Khác" stackId="a" fill="#024ad8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

            </div>

            {/* Bottom Grid: Recent High-severity interaction logs & Role specifics */}
            <div className="grid gap-6 lg:grid-cols-3">
              
              {/* Col 1 & 2: Recent clinical interaction warnings list */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-6 lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-3">
                  <div>
                    <h3 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider flex items-center gap-1.5">
                      <BellRing className="h-4.5 w-4.5 text-[#024ad8]" />
                      Nhật ký cảnh báo lâm sàng gần đây
                    </h3>
                    <p className="text-[11px] text-[#636363]">
                      Danh sách đối soát phát hiện tự động khi lập hóa đơn y tế.
                    </p>
                  </div>
                  
                  <span className="text-[9px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded uppercase">
                    Cần rà soát gấp
                  </span>
                </div>

                <div className="space-y-4">
                  {RECENT_WARNING_LOGS.map((log, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-[#f7f7f7] border border-[#e8e8e8] hover:border-[#c9e0fc] transition-all space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <strong className="text-[#1a1a1a] font-bold">{log.drugs}</strong>
                        
                        {log.severity === 'HIGH' ? (
                          <span className="bg-[#f9d4d2] text-[#b3262b] text-[9px] font-black px-2 py-0.5 rounded border border-[#ff5050]/20">
                            HIGH
                          </span>
                        ) : log.severity === 'MEDIUM' ? (
                          <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-0.5 rounded border border-amber-300/20">
                            MEDIUM
                          </span>
                        ) : (
                          <span className="bg-[#c9e0fc]/40 text-[#0e3191] text-[9px] font-black px-2 py-0.5 rounded">
                            LOW
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-[#3d3d3d] leading-relaxed font-normal">
                        {log.message}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-[#636363] border-t border-[#e8e8e8] pt-2 mt-1">
                        <span>Thời gian: {log.time}</span>
                        <span>Dược sĩ xử lý: <strong className="text-[#1a1a1a]">{log.pharmacist}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Col 3: Role Action Board (Dynamic access guide) */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-6 space-y-5 text-left relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#024ad8]/5 rounded-full pointer-events-none"></div>
                
                <div className="border-b border-[#e8e8e8] pb-3">
                  <h3 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4.5 w-4.5 text-[#024ad8]" />
                    Chỉ dẫn nhiệm vụ
                  </h3>
                  <p className="text-[11px] text-[#636363]">
                    Các lối tắt công việc gợi ý dựa trên phân quyền tài khoản của bạn.
                  </p>
                </div>

                <div className="space-y-4">
                  {user?.roles?.includes('ADMIN') && (
                    <div className="space-y-3">
                      <div className="p-3 bg-[#c9e0fc]/20 border border-[#c9e0fc] rounded-lg">
                        <h4 className="text-xs font-bold text-[#0e3191] uppercase">Quản trị viên hệ thống</h4>
                        <p className="text-[11px] text-[#3d3d3d] mt-1 leading-relaxed">
                          Bạn có quyền rà soát toàn bộ nhật ký y tế, cấp quyền cho nhân viên và cấu hình quy tắc tương tác thuốc lâm sàng.
                        </p>
                      </div>
                      
                      <ul className="space-y-2 text-xs font-medium text-[#1a1a1a]">
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#024ad8]"></span>
                          <a href="/medicines" className="hover:text-[#024ad8] hover:underline">Quản lý cấu hình danh mục & Y khoa</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#024ad8]"></span>
                          <a href="#" className="hover:text-[#024ad8] hover:underline">Xem hệ thống Audit logs API</a>
                        </li>
                      </ul>
                    </div>
                  )}

                  {user?.roles?.includes('STAFF') && (
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <h4 className="text-xs font-bold text-emerald-800 uppercase">Dược sĩ trực quầy</h4>
                        <p className="text-[11px] text-[#3d3d3d] mt-1 leading-relaxed">
                          Ưu tiên lập hóa đơn bán lẻ tại màn hình POS và kiểm tra phản ứng tương tác lâm sàng.
                        </p>
                      </div>

                      <ul className="space-y-2 text-xs font-medium text-[#1a1a1a]">
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <a href="/sales" className="hover:text-[#024ad8] hover:underline">Mở quầy POS lập đơn mới</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <a href="#" className="hover:text-[#024ad8] hover:underline">Xét duyệt đơn thuốc y khoa gửi lên</a>
                        </li>
                      </ul>
                    </div>
                  )}

                  {user?.roles?.includes('WAREHOUSE') && (
                    <div className="space-y-3">
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <h4 className="text-xs font-bold text-amber-800 uppercase">Quản lý kho hàng</h4>
                        <p className="text-[11px] text-[#3d3d3d] mt-1 leading-relaxed">
                          Ưu tiên rà soát các thẻ kho, lô hàng sắp hết hạn sử dụng để tiến hành xả kho hoặc hủy.
                        </p>
                      </div>

                      <ul className="space-y-2 text-xs font-medium text-[#1a1a1a]">
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                          <a href="/inventory" className="hover:text-[#024ad8] hover:underline">Mở thẻ kho & Nhập lô mới</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                          <a href="#" className="hover:text-[#024ad8] hover:underline">Quản lý hạn sử dụng chi tiết</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </Card>

            </div>

          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
