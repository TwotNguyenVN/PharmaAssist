'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { 
  User, 
  Shield, 
  Search, 
  Plus, 
  Package, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  FileSpreadsheet,
  ArrowUpDown,
  History,
  TrendingDown
} from 'lucide-react';

// Seed batches representing typical pharmacy inventory
const INITIAL_BATCHES = [
  {
    id: 1,
    medName: 'Aspirin 81mg',
    sku: 'SKU-ASP-81',
    batchNumber: 'LOT-ASP-0112',
    quantity: 120,
    minQty: 20,
    mfgDate: '2025-01-10',
    expiryDate: '2026-11-20',
    importPrice: 800,
    status: 'ACTIVE'
  },
  {
    id: 2,
    medName: 'Paracetamol 500mg',
    sku: 'SKU-PAR-500',
    batchNumber: 'LOT-PAR-2241',
    quantity: 8, // Under minimum stock (minQty: 50)
    minQty: 50,
    mfgDate: '2024-11-05',
    expiryDate: '2026-08-15',
    importPrice: 350,
    status: 'ACTIVE'
  },
  {
    id: 3,
    medName: 'Clopidogrel 75mg',
    sku: 'SKU-CLO-75',
    batchNumber: 'LOT-CLO-1092',
    quantity: 350,
    minQty: 30,
    mfgDate: '2025-03-01',
    expiryDate: '2026-06-30', // Near expiry (< 6 months)
    importPrice: 4200,
    status: 'NEAR_EXPIRY'
  },
  {
    id: 4,
    medName: 'Warfarin 2mg',
    sku: 'SKU-WAR-2',
    batchNumber: 'LOT-WAR-0081',
    quantity: 95,
    minQty: 15,
    mfgDate: '2024-05-10',
    expiryDate: '2026-12-05',
    importPrice: 1500,
    status: 'ACTIVE'
  },
  {
    id: 5,
    medName: 'Ibuprofen 400mg',
    sku: 'SKU-IBU-400',
    batchNumber: 'LOT-IBU-3190',
    quantity: 180,
    minQty: 25,
    mfgDate: '2023-10-15',
    expiryDate: '2025-10-15', // Already expired!
    importPrice: 750,
    status: 'EXPIRED'
  }
];

export default function InventoryPage() {
  const { user } = useAuth();
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showImportModal, setShowImportModal] = useState(false);

  // Form states
  const [formMedName, setFormMedName] = useState('Paracetamol 500mg');
  const [formBatchNumber, setFormBatchNumber] = useState('');
  const [formQuantity, setFormQuantity] = useState(100);
  const [formMinQty, setFormMinQty] = useState(30);
  const [formMfgDate, setFormMfgDate] = useState('2025-05-01');
  const [formExpiryDate, setFormExpiryDate] = useState('2027-05-01');
  const [formImportPrice, setFormImportPrice] = useState(500);

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Quản lý kho';

  // Stats calculation
  const totalItems = batches.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalValue = batches.reduce((acc, curr) => acc + (curr.quantity * curr.importPrice), 0);
  const lowStockCount = batches.filter(b => b.quantity <= b.minQty).length;
  const nearExpiryCount = batches.filter(b => b.status === 'NEAR_EXPIRY').length;
  const expiredCount = batches.filter(b => b.status === 'EXPIRED').length;

  // Filter batches logic
  const filteredBatches = batches.filter(b => {
    const matchesSearch = 
      b.medName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'ALL') return matchesSearch;
    if (filterStatus === 'LOW') return matchesSearch && b.quantity <= b.minQty;
    if (filterStatus === 'NEAR_EXPIRY') return matchesSearch && b.status === 'NEAR_EXPIRY';
    if (filterStatus === 'EXPIRED') return matchesSearch && b.status === 'EXPIRED';
    
    return matchesSearch;
  });

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine status based on dates
    const expiry = new Date(formExpiryDate);
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);
    
    let status = 'ACTIVE';
    if (expiry <= now) {
      status = 'EXPIRED';
    } else if (expiry <= sixMonthsFromNow) {
      status = 'NEAR_EXPIRY';
    }

    const newBatch = {
      id: batches.length + 1,
      medName: formMedName,
      sku: `SKU-${formMedName.slice(0,3).toUpperCase()}-${formImportPrice}`,
      batchNumber: formBatchNumber || `LOT-GEN-${Math.floor(1000 + Math.random() * 9000)}`,
      quantity: formQuantity,
      minQty: formMinQty,
      mfgDate: formMfgDate,
      expiryDate: formExpiryDate,
      importPrice: formImportPrice,
      status
    };

    setBatches(prev => [newBatch, ...prev]);
    setShowImportModal(false);
    // Reset form
    setFormBatchNumber('');
    setFormQuantity(100);
  };

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="flex min-h-screen bg-[#f7f7f7] font-sans antialiased text-[#1a1a1a]">
        
        {/* Dynamic Sidebar */}
        <Sidebar currentPath="/inventory" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Header */}
          <header className="h-16 bg-white border-b border-[#e8e8e8] flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-[0.7px]">
                Báo cáo & Thẻ kho
              </h1>
              <span className="text-[10px] bg-[#c9e0fc] text-[#0e3191] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Warehouse
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-[#3d3d3d] bg-[#f7f7f7] px-3 py-1.5 rounded border border-[#e8e8e8] shadow-sm">
                <User className="h-4 w-4 text-[#636363]" />
                <span className="font-semibold truncate max-w-[150px]">{user?.email}</span>
                <span className="text-[#e8e8e8]">|</span>
                <Shield className="h-3 w-3 text-[#024ad8] inline" />
                <span className="font-bold text-[#024ad8] uppercase tracking-wider">{displayRole}</span>
              </div>
            </div>
          </header>

          <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto">
            
            {/* Quick Summary Cards (Soft 16px, lift shadow) */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-5 text-left">
                <CardHeader className="p-0 pb-1">
                  <span className="text-[10px] font-bold text-[#636363] uppercase tracking-wider">Tổng số lượng hộp</span>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-[#1a1a1a]">{totalItems} hộp</div>
                  <p className="text-[10px] text-[#636363] mt-1">Giá trị tồn kho: {(totalValue).toLocaleString('vi-VN')} đ</p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-5 text-left">
                <CardHeader className="p-0 pb-1">
                  <span className="text-[10px] font-bold text-[#636363] uppercase tracking-wider">Hết hạn sử dụng</span>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-rose-600">{expiredCount} Lô thuốc</div>
                  <p className="text-[10px] text-rose-500 font-semibold mt-1">Đã tự động khóa bán hàng</p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-5 text-left">
                <CardHeader className="p-0 pb-1">
                  <span className="text-[10px] font-bold text-[#636363] uppercase tracking-wider">Cận hạn sử dụng</span>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-amber-600">{nearExpiryCount} Lô thuốc</div>
                  <p className="text-[10px] text-[#636363] mt-1">Còn lại ít hơn 6 tháng sử dụng</p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-5 text-left">
                <CardHeader className="p-0 pb-1">
                  <span className="text-[10px] font-bold text-[#636363] uppercase tracking-wider">Ngưỡng tối thiểu</span>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-violet-600">{lowStockCount} Mặt hàng</div>
                  <p className="text-[10px] text-violet-600 font-semibold mt-1">Cần lập đơn mua hàng thêm</p>
                </CardContent>
              </Card>

            </div>

            {/* Filter and control panel */}
            <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-[#636363]" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm số lô, tên sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#f7f7f7] text-[#1a1a1a] text-xs px-10 py-3.5 rounded border border-[#c2c2c2] outline-none focus:bg-white focus:border-[#1a1a1a] transition-all"
                  />
                </div>

                {/* Filter chips & button */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="inline-flex rounded-md border border-[#c2c2c2] overflow-hidden bg-white">
                    <button
                      onClick={() => setFilterStatus('ALL')}
                      className={`text-xs font-semibold px-4 py-2.5 transition-all ${
                        filterStatus === 'ALL' ? 'bg-[#1a1a1a] text-white' : 'text-[#636363] hover:bg-[#f7f7f7]'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setFilterStatus('LOW')}
                      className={`text-xs font-semibold px-4 py-2.5 transition-all flex items-center gap-1 ${
                        filterStatus === 'LOW' ? 'bg-violet-600 text-white' : 'text-[#636363] hover:bg-[#f7f7f7]'
                      }`}
                    >
                      <TrendingDown className="h-3.5 w-3.5" />
                      Dưới định mức
                    </button>
                    <button
                      onClick={() => setFilterStatus('NEAR_EXPIRY')}
                      className={`text-xs font-semibold px-4 py-2.5 transition-all flex items-center gap-1 ${
                        filterStatus === 'NEAR_EXPIRY' ? 'bg-amber-600 text-white' : 'text-[#636363] hover:bg-[#f7f7f7]'
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      Cận hạn
                    </button>
                    <button
                      onClick={() => setFilterStatus('EXPIRED')}
                      className={`text-xs font-semibold px-4 py-2.5 transition-all flex items-center gap-1 ${
                        filterStatus === 'EXPIRED' ? 'bg-rose-600 text-white' : 'text-[#636363] hover:bg-[#f7f7f7]'
                      }`}
                    >
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Đã hết hạn
                    </button>
                  </div>

                  <button 
                    onClick={() => setShowImportModal(true)}
                    className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase px-5 h-10 rounded-[4px] shadow transition-all active:scale-98 flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Nhập kho lô mới
                  </button>
                </div>

              </div>
            </Card>

            {/* Inventory table */}
            <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e8e8e8] bg-[#f7f7f7] text-[10px] font-black uppercase text-[#636363] tracking-widest">
                      <th className="px-6 py-4">Số Lô</th>
                      <th className="px-6 py-4">Tên dược phẩm</th>
                      <th className="px-6 py-4">Tồn kho hiện tại</th>
                      <th className="px-6 py-4">Định mức Min</th>
                      <th className="px-6 py-4">Ngày hết hạn</th>
                      <th className="px-6 py-4">Trạng thái y tế</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e8e8] text-xs">
                    {filteredBatches.length > 0 ? (
                      filteredBatches.map((batch) => {
                        const isLow = batch.quantity <= batch.minQty;
                        return (
                          <tr key={batch.id} className="hover:bg-[#f7f7f7]/50 transition-colors">
                            <td className="px-6 py-4 font-mono font-bold text-[#1a1a1a]">
                              {batch.batchNumber}
                            </td>
                            <td className="px-6 py-4 font-semibold text-[#1a1a1a]">
                              {batch.medName}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`font-bold ${isLow ? 'text-rose-600' : 'text-[#1a1a1a]'}`}>
                                {batch.quantity} hộp
                              </span>
                            </td>
                            <td className="px-6 py-4 text-[#636363]">
                              {batch.minQty} hộp
                            </td>
                            <td className="px-6 py-4 text-[#3d3d3d] font-mono">
                              {batch.expiryDate}
                            </td>
                            <td className="px-6 py-4">
                              {batch.status === 'EXPIRED' ? (
                                <span className="bg-[#f9d4d2] text-[#b3262b] text-[9px] font-black px-2 py-0.5 rounded border border-[#ff5050]/20 uppercase">
                                  HẾT HẠN (KHÓA)
                                </span>
                              ) : batch.status === 'NEAR_EXPIRY' ? (
                                <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-2 py-0.5 rounded border border-amber-300/20 uppercase animate-pulse">
                                  CẬN HẠN SỬ DỤNG
                                </span>
                              ) : isLow ? (
                                <span className="bg-violet-100 text-violet-800 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                                  DƯỚI ĐỊNH MỨC
                                </span>
                              ) : (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded border border-emerald-300/20 uppercase">
                                  AN TOÀN (ACTIVE)
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-[#636363]">
                          Không tìm thấy lô hàng nào khớp với điều kiện tìm kiếm.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

          </main>
        </div>
      </div>

      {/* IMPORT STOCK BATCH MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative border border-[#e8e8e8] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#024ad8]"></div>
            
            <form onSubmit={handleImportSubmit} className="p-6 text-left space-y-5">
              
              <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-[#c9e0fc] flex items-center justify-center text-[#024ad8]">
                    <Package className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1a1a1a] tracking-tight">
                    Phiếu nhập kho lô mới
                  </h3>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="text-[#636363] hover:text-[#1a1a1a] text-sm font-bold bg-[#f7f7f7] h-8 w-8 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                
                {/* Select Medicine */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Chọn loại dược phẩm:</label>
                  <select
                    value={formMedName}
                    onChange={(e) => setFormMedName(e.target.value)}
                    className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all cursor-pointer"
                  >
                    <option value="Aspirin 81mg">Aspirin 81mg</option>
                    <option value="Paracetamol 500mg">Paracetamol 500mg</option>
                    <option value="Clopidogrel 75mg">Clopidogrel 75mg</option>
                    <option value="Warfarin 2mg">Warfarin 2mg</option>
                    <option value="Ibuprofen 400mg">Ibuprofen 400mg</option>
                    <option value="Amoxicillin 500mg">Amoxicillin 500mg</option>
                  </select>
                </div>

                {/* Batch Number */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Số lô (Batch Number):</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: LOT-PAR-9921"
                    value={formBatchNumber}
                    onChange={(e) => setFormBatchNumber(e.target.value)}
                    className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all"
                  />
                </div>

                {/* Qty and Min Qty */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Số lượng nhập:</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formQuantity}
                      onChange={(e) => setFormQuantity(Number(e.target.value))}
                      className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Định mức Min:</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formMinQty}
                      onChange={(e) => setFormMinQty(Number(e.target.value))}
                      className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all"
                    />
                  </div>
                </div>

                {/* Mfg Date and Expiry Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Ngày sản xuất:</label>
                    <input
                      type="date"
                      required
                      value={formMfgDate}
                      onChange={(e) => setFormMfgDate(e.target.value)}
                      className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Ngày hết hạn:</label>
                    <input
                      type="date"
                      required
                      value={formExpiryDate}
                      onChange={(e) => setFormExpiryDate(e.target.value)}
                      className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">Đơn giá nhập (đ/hộp):</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={formImportPrice}
                    onChange={(e) => setFormImportPrice(Number(e.target.value))}
                    className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all"
                  />
                </div>

              </div>

              {/* Action buttons (4px sharp) */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8e8e8]">
                <button 
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="bg-white border border-[#c2c2c2] text-[#3d3d3d] text-xs font-semibold tracking-[0.7px] uppercase px-5 h-11 rounded-[4px] transition-all active:scale-98"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase px-6 h-11 rounded-[4px] transition-all shadow-md active:scale-98"
                >
                  Xác nhận nhập kho
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </RouteGuard>
  );
}
