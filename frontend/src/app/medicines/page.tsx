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
  SlidersHorizontal, 
  Pill, 
  Eye, 
  Edit3, 
  ShieldAlert, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';

// Pre-seeded clinical medicines matching seed.ts and typical medical catalog
const INITIAL_MEDICINES = [
  {
    id: 1,
    code: 'MED-001',
    name: 'Aspirin 81mg',
    activeIngredient: 'Acetylsalicylic Acid',
    dosageForm: 'Viên nén bao phim',
    registrationNumber: 'VD-24512-16',
    requiresPrescription: true,
    usageNote: 'Uống sau ăn no. Tránh dùng cùng thuốc chống đông khác.',
    group: 'Thuốc chống kết tập tiểu cầu'
  },
  {
    id: 2,
    code: 'MED-002',
    name: 'Paracetamol 500mg',
    activeIngredient: 'Acetaminophen',
    dosageForm: 'Viên sủi bọt',
    registrationNumber: 'VD-18923-13',
    requiresPrescription: false,
    usageNote: 'Hạ sốt giảm đau. Không dùng quá 4g/ngày.',
    group: 'Thuốc hạ sốt, giảm đau'
  },
  {
    id: 3,
    code: 'MED-003',
    name: 'Clopidogrel 75mg',
    activeIngredient: 'Clopidogrel Bisulfate',
    dosageForm: 'Viên nén bao phim',
    registrationNumber: 'VD-21345-14',
    requiresPrescription: true,
    usageNote: 'Phòng ngừa huyết khối mạch vành. Uống sáng.',
    group: 'Thuốc chống đông & chống kết tập'
  },
  {
    id: 4,
    code: 'MED-004',
    name: 'Warfarin 2mg',
    activeIngredient: 'Warfarin Sodium',
    dosageForm: 'Viên nén',
    registrationNumber: 'VN-16503-13',
    requiresPrescription: true,
    usageNote: 'Chống đông máu. Đo chỉ số INR định kỳ.',
    group: 'Thuốc chống đông máu'
  },
  {
    id: 5,
    code: 'MED-005',
    name: 'Ibuprofen 400mg',
    activeIngredient: 'Ibuprofen',
    dosageForm: 'Viên nén',
    registrationNumber: 'VD-15201-11',
    requiresPrescription: false,
    usageNote: 'Kháng viêm giảm đau NSAID. Không uống đói.',
    group: 'Thuốc kháng viêm không Steroid'
  },
  {
    id: 6,
    code: 'MED-006',
    name: 'Amoxicillin 500mg',
    activeIngredient: 'Amoxicillin Trihydrate',
    dosageForm: 'Viên nang cứng',
    registrationNumber: 'VD-28491-18',
    requiresPrescription: true,
    usageNote: 'Kháng sinh Penicillin. Uống đúng giờ, đủ liều.',
    group: 'Thuốc kháng sinh'
  }
];

export default function MedicinesPage() {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState(INITIAL_MEDICINES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrescription, setFilterPrescription] = useState('ALL');
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Edit states
  const [editRequiresPrescription, setEditRequiresPrescription] = useState(false);
  const [editUsageNote, setEditUsageNote] = useState('');
  const [editGroup, setEditGroup] = useState('');

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Quản lý kho';

  // Filter medicines logic
  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterPrescription === 'ALL') return matchesSearch;
    if (filterPrescription === 'RX') return matchesSearch && med.requiresPrescription;
    if (filterPrescription === 'OTC') return matchesSearch && !med.requiresPrescription;
    
    return matchesSearch;
  });

  const handleOpenEdit = (med: any) => {
    setSelectedMedicine(med);
    setEditRequiresPrescription(med.requiresPrescription);
    setEditUsageNote(med.usageNote);
    setEditGroup(med.group);
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setMedicines(prev => prev.map(med => {
      if (med.id === selectedMedicine.id) {
        return {
          ...med,
          requiresPrescription: editRequiresPrescription,
          usageNote: editUsageNote,
          group: editGroup
        };
      }
      return med;
    }));
    setShowEditModal(false);
    setSelectedMedicine(null);
  };

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="flex min-h-screen bg-[#f7f7f7] font-sans antialiased text-[#1a1a1a]">
        
        {/* Dynamic Sidebar */}
        <Sidebar currentPath="/medicines" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Header */}
          <header className="h-16 bg-white border-b border-[#e8e8e8] flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-[0.7px]">
                Quản lý danh mục thuốc
              </h1>
              <span className="text-[10px] bg-[#f7f7f7] text-[#1a1a1a] font-bold px-2 py-0.5 rounded border border-[#e8e8e8] uppercase tracking-wider">
                V{medicines.length}.0
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
            
            {/* Filter and search bar card */}
            <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-[#636363]" />
                  <input
                    type="text"
                    placeholder="Tìm theo tên thuốc, số đăng ký, hoạt chất..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#f7f7f7] text-[#1a1a1a] text-xs px-10 py-3.5 rounded border border-[#c2c2c2] outline-none focus:bg-white focus:border-[#1a1a1a] transition-all"
                  />
                </div>

                {/* Filter & CTA Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  
                  {/* Category Filter chips */}
                  <div className="inline-flex rounded-md border border-[#c2c2c2] overflow-hidden bg-white">
                    <button
                      onClick={() => setFilterPrescription('ALL')}
                      className={`text-xs font-semibold px-4 py-2.5 transition-all ${
                        filterPrescription === 'ALL' ? 'bg-[#1a1a1a] text-white' : 'text-[#636363] hover:bg-[#f7f7f7]'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setFilterPrescription('RX')}
                      className={`text-xs font-semibold px-4 py-2.5 transition-all flex items-center gap-1.5 ${
                        filterPrescription === 'RX' ? 'bg-[#024ad8] text-white' : 'text-[#636363] hover:bg-[#f7f7f7]'
                      }`}
                    >
                      <ShieldAlert className="h-3.5 w-3.5" />
                      Kê đơn (Rx)
                    </button>
                    <button
                      onClick={() => setFilterPrescription('OTC')}
                      className={`text-xs font-semibold px-4 py-2.5 transition-all ${
                        filterPrescription === 'OTC' ? 'bg-emerald-600 text-white' : 'text-[#636363] hover:bg-[#f7f7f7]'
                      }`}
                    >
                      Không kê đơn (OTC)
                    </button>
                  </div>

                  <button className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase px-5 h-10 rounded-[4px] shadow transition-all active:scale-98 flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Thêm thuốc mới
                  </button>

                </div>

              </div>
            </Card>

            {/* Medicines List Table Card (card-product: rounded-xl, Soft Lift shadow) */}
            <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e8e8e8] bg-[#f7f7f7] text-[10px] font-black uppercase text-[#636363] tracking-widest">
                      <th className="px-6 py-4">Mã thuốc</th>
                      <th className="px-6 py-4">Tên thương mại</th>
                      <th className="px-6 py-4">Hoạt chất chính</th>
                      <th className="px-6 py-4">Dạng bào chế</th>
                      <th className="px-6 py-4">Phân nhóm y tế</th>
                      <th className="px-6 py-4">Phân loại đơn</th>
                      <th className="px-6 py-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e8e8] text-xs">
                    {filteredMedicines.length > 0 ? (
                      filteredMedicines.map((med) => (
                        <tr key={med.id} className="hover:bg-[#f7f7f7]/50 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-[#1a1a1a]">
                            {med.code}
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#1a1a1a]">
                            <div className="flex items-center gap-2">
                              <Pill className="h-4 w-4 text-[#024ad8] shrink-0" />
                              {med.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#3d3d3d] italic">
                            {med.activeIngredient}
                          </td>
                          <td className="px-6 py-4 text-[#3d3d3d]">
                            {med.dosageForm}
                          </td>
                          <td className="px-6 py-4 text-[#3d3d3d]">
                            {med.group}
                          </td>
                          <td className="px-6 py-4">
                            {med.requiresPrescription ? (
                              <span className="bg-[#f9d4d2] text-[#b3262b] text-[9px] font-black px-2 py-0.5 rounded border border-[#ff5050]/20 tracking-wider uppercase">
                                Bắt buộc đơn (Rx)
                              </span>
                            ) : (
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded border border-emerald-300/20 tracking-wider uppercase">
                                Không đơn (OTC)
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => handleOpenEdit(med)}
                                className="p-2 bg-[#f7f7f7] hover:bg-[#c9e0fc]/40 border border-[#e8e8e8] hover:border-[#024ad8]/20 text-[#636363] hover:text-[#024ad8] rounded transition-all"
                                title="Cấu hình luật y tế"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-[#636363]">
                          Không tìm thấy dược phẩm nào khớp với điều kiện tìm kiếm.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Rule Config Helper notice block */}
            <div className="bg-[#1a1a1a] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#292929] text-left relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-[#024ad8]/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="space-y-1 z-10">
                <h4 className="text-xs font-black uppercase text-white tracking-[0.7px] flex items-center gap-2">
                  <AlertCircle className="h-4.5 w-4.5 text-violet-400" />
                  Quy định an toàn y tế và Rule Engine
                </h4>
                <p className="text-[11px] text-white/70 leading-relaxed font-normal max-w-xl">
                  Việc cấu hình chính xác thuộc tính <strong>Rx (Kê đơn)</strong> và <strong>Tương tác chéo</strong> sẽ kích hoạt tự động các chốt chặn lâm sàng bảo vệ bệnh nhân tại màn hình quầy bán POS thời gian thực.
                </p>
              </div>
              <button 
                onClick={() => {
                  const firstMed = medicines[0];
                  handleOpenEdit(firstMed);
                }}
                className="bg-white hover:bg-[#f7f7f7] text-[#1a1a1a] text-xs font-semibold tracking-[0.7px] uppercase px-5 h-11 rounded-[4px] transition-all z-10 whitespace-nowrap shrink-0"
              >
                Mô phỏng sửa Luật y tế
              </button>
            </div>

          </main>
        </div>
      </div>

      {/* EDIT CLINICAL LAW MODAL (standard design: 4px buttons, 16px soft layout) */}
      {showEditModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative border border-[#e8e8e8] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#024ad8]"></div>
            
            <form onSubmit={handleSaveEdit} className="p-6 text-left space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-[#c9e0fc] flex items-center justify-center text-[#024ad8]">
                    <ShieldAlert className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a1a1a] tracking-tight">
                      Cấu hình quy tắc lâm sàng
                    </h3>
                    <span className="text-[9px] font-mono text-[#636363]">Mã dược phẩm: {selectedMedicine.code}</span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMedicine(null);
                  }}
                  className="text-[#636363] hover:text-[#1a1a1a] text-sm font-bold bg-[#f7f7f7] h-8 w-8 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                
                {/* Info block */}
                <div className="p-3 bg-[#f7f7f7] border border-[#e8e8e8] rounded-xl flex gap-2">
                  <Pill className="h-5 w-5 text-[#024ad8] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#1a1a1a]">{selectedMedicine.name}</div>
                    <div className="text-[10px] text-[#636363]">Hoạt chất chính: {selectedMedicine.activeIngredient}</div>
                  </div>
                </div>

                {/* Prescription Checkbox */}
                <div className="p-4 rounded-xl border border-[#e8e8e8] flex items-center justify-between hover:bg-[#f7f7f7]/30 transition-colors">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1a1a1a] flex items-center gap-1.5">
                      Bắt buộc kê đơn y khoa (Rx)
                    </label>
                    <p className="text-[10px] text-[#636363] leading-relaxed font-normal">
                      Nếu bật, nhân viên POS bắt buộc phải tải lên ảnh đơn thuốc lâm sàng mới được thanh toán hóa đơn.
                    </p>
                  </div>
                  
                  <input
                    type="checkbox"
                    checked={editRequiresPrescription}
                    onChange={(e) => setEditRequiresPrescription(e.target.checked)}
                    className="h-5 w-5 rounded border-[#c2c2c2] text-[#024ad8] focus:ring-[#024ad8] cursor-pointer"
                  />
                </div>

                {/* Group input */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">
                    Phân nhóm y tế / dược học:
                  </label>
                  <input
                    type="text"
                    value={editGroup}
                    onChange={(e) => setEditGroup(e.target.value)}
                    required
                    className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all"
                  />
                </div>

                {/* Usage note input */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#636363] uppercase tracking-wider">
                    Ghi chú hướng dẫn sử dụng / cảnh báo đặc thù:
                  </label>
                  <textarea
                    value={editUsageNote}
                    onChange={(e) => setEditUsageNote(e.target.value)}
                    rows={3}
                    className="w-full bg-white text-[#1a1a1a] text-xs px-4 py-3 rounded border border-[#c2c2c2] outline-none focus:border-[#1a1a1a] transition-all resize-none"
                  />
                </div>

              </div>

              {/* Action buttons (4px sharp) */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8e8e8]">
                <button 
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMedicine(null);
                  }}
                  className="bg-white border border-[#c2c2c2] text-[#3d3d3d] text-xs font-semibold tracking-[0.7px] uppercase px-5 h-11 rounded-[4px] transition-all active:scale-98"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase px-6 h-11 rounded-[4px] transition-all shadow-md active:scale-98"
                >
                  Lưu thay đổi y tế
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </RouteGuard>
  );
}
