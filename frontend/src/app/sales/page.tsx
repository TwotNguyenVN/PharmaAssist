'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { 
  User, 
  Shield, 
  Search, 
  ShoppingCart, 
  Trash2, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  Upload, 
  CreditCard,
  FileImage,
  DollarSign,
  Sparkles,
  Sparkle
} from 'lucide-react';

// Mock catalog with live quantities to validate BR-06
const POS_CATALOG = [
  { id: 1, code: 'MED-001', name: 'Aspirin 81mg', ingredient: 'Acetylsalicylic Acid', stock: 120, price: 1200, requiresRx: true },
  { id: 2, code: 'MED-002', name: 'Paracetamol 500mg', ingredient: 'Acetaminophen', stock: 15, price: 500, requiresRx: false },
  { id: 3, code: 'MED-003', name: 'Clopidogrel 75mg', ingredient: 'Clopidogrel Bisulfate', stock: 350, price: 5200, requiresRx: true },
  { id: 4, code: 'MED-004', name: 'Warfarin 2mg', ingredient: 'Warfarin Sodium', stock: 95, price: 2100, requiresRx: true },
  { id: 5, code: 'MED-005', name: 'Ibuprofen 400mg', ingredient: 'Ibuprofen', stock: 180, price: 950, requiresRx: false },
  { id: 6, code: 'MED-006', name: 'Amoxicillin 500mg', ingredient: 'Amoxicillin Trihydrate', stock: 80, price: 3000, requiresRx: true }
];

export default function ClinicalPOSPage() {
  const { user } = useAuth();
  const [catalog, setCatalog] = useState(POS_CATALOG);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [prescriptionPreview, setPrescriptionPreview] = useState<string | null>(null);
  
  // Checkout stats
  const [cashPaid, setCashPaid] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [posError, setPosError] = useState<string | null>(null);
  
  // Interactive clinical states
  const [interactionAlert, setInteractionAlert] = useState<any | null>(null);
  const [aiNote, setAiNote] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const displayRole = user?.roles?.includes('ADMIN') ? 'Quản trị viên' : 'Nhân viên bán hàng';

  // Search logic
  const filteredCatalog = catalog.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ingredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cart operations
  const addToCart = (item: any) => {
    setPosError(null);
    const existing = cart.find(c => c.id === item.id);
    
    // BR-06: Do not allow overselling stock
    if (existing) {
      if (existing.quantity + 1 > item.stock) {
        setPosError(`[BR-06] Lỗi: Không thể bán vượt số lượng tồn kho vật lý (${item.stock} hộp)!`);
        return;
      }
      setCart(prev => prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      if (1 > item.stock) {
        setPosError(`[BR-06] Lỗi: Thuốc ${item.name} đã hết tồn kho vật lý!`);
        return;
      }
      setCart(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, val: number) => {
    setPosError(null);
    const item = catalog.find(i => i.id === id);
    if (!item) return;

    if (val <= 0) {
      removeFromCart(id);
      return;
    }

    // BR-06 check
    if (val > item.stock) {
      setPosError(`[BR-06] Lỗi: Không thể vượt quá số lượng tồn kho của lô (${item.stock} hộp)!`);
      return;
    }

    setCart(prev => prev.map(c => c.id === id ? { ...c, quantity: val } : c));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  // BR-13 Check clinical interactions when cart changes
  useEffect(() => {
    const ingredientsInCart = cart.map(c => c.ingredient);
    
    if (ingredientsInCart.includes('Acetylsalicylic Acid') && ingredientsInCart.includes('Warfarin Sodium')) {
      setInteractionAlert({
        severity: 'HIGH',
        title: 'Tương Tác Nguy Hiểm Cấp Độ Đỏ (Aspirin + Warfarin)',
        desc: 'Warfarin là thuốc kháng vitamin K cường độ mạnh. Sử dụng kết hợp với Aspirin làm tăng nguy cơ xuất huyết tiêu hóa và chảy máu nội sọ nguy kịch lên gấp 4 lần. Rule Engine khuyến cáo thay đổi thuốc thay thế.'
      });
      triggerAiPharmacist('Acetylsalicylic Acid', 'Warfarin Sodium');
    } else if (ingredientsInCart.includes('Clopidogrel Bisulfate') && ingredientsInCart.includes('Acetylsalicylic Acid')) {
      setInteractionAlert({
        severity: 'MEDIUM',
        title: 'Cảnh Báo Tương Tác Kép (Clopidogrel + Aspirin)',
        desc: 'Liệu pháp chống kết tập tiểu cầu kép (DAPT) tăng hiệu quả bảo vệ tim mạch nhưng tăng nguy cơ xuất huyết dạ dày. Khuyến cáo Dược sĩ hướng dẫn dùng kèm thuốc bao che dạ dày PPI (như Omeprazole) vào buổi sáng cách nhau 1 giờ.'
      });
      triggerAiPharmacist('Clopidogrel Bisulfate', 'Acetylsalicylic Acid');
    } else {
      setInteractionAlert(null);
      setAiNote('');
    }
  }, [cart]);

  // AI Pharmacist terminal logic
  const triggerAiPharmacist = (ing1: string, ing2: string) => {
    setIsAiLoading(true);
    setAiNote('Hệ thống đang gọi Clinical AI Engine...');
    setTimeout(() => {
      setIsAiLoading(false);
      setAiNote(
        `>>> CLINICAL AI PHARMACIST REPORT\n` +
        `>>> Đối tượng tương tác: ${ing1} & ${ing2}\n` +
        `-----------------------------------------\n` +
        `[Cơ chế Dược động học]: Gây cạnh tranh liên kết protein huyết tương chéo, kéo dài thời gian đông máu PT/INR.\n\n` +
        `[Khuyến nghị lâm sàng]:\n` +
        `1. Đo chỉ số INR định kỳ (ngưỡng an toàn 2.0 - 3.0).\n` +
        `2. Không uống thuốc lúc đói, uống kèm nhiều nước.\n` +
        `3. Giãn cách thời gian uống giữa 2 loại ít nhất 2 giờ.\n` +
        `4. Nhắc nhở bệnh nhân theo dõi các triệu chứng chảy máu chân răng hoặc bầm tím da.`
      );
    }, 850);
  };

  // Rx Gate detection
  const requiresRxApproval = cart.some(c => c.requiresRx);

  // File Upload emulation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPrescriptionFile(file);
      setPrescriptionPreview(URL.createObjectURL(file));
    }
  };

  // Checkout process
  const totalCost = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const changeDue = cashPaid ? Number(cashPaid) - totalCost : 0;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setPosError(null);

    // BR-09: Cart must have at least one medicine
    if (cart.length === 0) {
      setPosError('[BR-09] Lỗi: Đơn hàng y tế phải chứa ít nhất 1 loại thuốc để thanh toán!');
      return;
    }

    // Rx Gate Check
    if (requiresRxApproval && !prescriptionFile) {
      setPosError('Lỗi: Đơn hàng chứa thuốc kê đơn đặc trị (Rx). Vui lòng tải lên ảnh chụp Đơn thuốc của Bác sĩ để tiếp tục.');
      return;
    }

    // Cash Paid validation
    if (cashPaid && Number(cashPaid) < totalCost) {
      setPosError('Lỗi: Số tiền khách trả không đủ để hoàn tất thanh toán hóa đơn.');
      return;
    }

    // BR-10: Complete successfully and deduct physical quantities
    setCatalog(prev => prev.map(item => {
      const cartItem = cart.find(c => c.id === item.id);
      if (cartItem) {
        return { ...item, stock: item.stock - cartItem.quantity };
      }
      return item;
    }));

    setPaymentSuccess(true);
    setCart([]);
    setPrescriptionFile(null);
    setPrescriptionPreview(null);
    setCashPaid('');
  };

  return (
    <RouteGuard allowedRoles={['ADMIN', 'STAFF']}>
      <div className="flex min-h-screen bg-[#f7f7f7] font-sans antialiased text-[#1a1a1a]">
        
        {/* Sidebar */}
        <Sidebar currentPath="/sales" />

        {/* Workstation Container */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Header */}
          <header className="h-16 bg-white border-b border-[#e8e8e8] flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-[0.7px]">
                Quầy POS Bán Lẻ Lâm Sàng
              </h1>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300/20 uppercase tracking-wider">
                Cashier Open
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

          <main className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-y-auto max-w-[1440px] w-full mx-auto">
            
            {/* LEFT COLUMN: Drug search and list selection (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product selector card */}
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-sm p-6 text-left">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">Chọn thuốc vào toa bán lẻ</CardTitle>
                  <CardDescription className="text-xs text-[#636363]">Nhấp đúp chuột hoặc bấm dấu (+) để xếp thuốc vào giỏ hàng POS.</CardDescription>
                </CardHeader>
                
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-[#636363]" />
                    <input
                      type="text"
                      placeholder="Tìm thuốc nhanh theo tên, mã hoặc hoạt chất..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#f7f7f7] text-[#1a1a1a] text-xs px-10 py-3.5 rounded border border-[#c2c2c2] outline-none focus:bg-white focus:border-[#1a1a1a] transition-all"
                    />
                  </div>

                  {/* Catalog grid */}
                  <div className="grid gap-3 sm:grid-cols-2 max-h-[360px] overflow-y-auto pr-1">
                    {filteredCatalog.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => addToCart(item)}
                        className="p-4 rounded-xl border border-[#e8e8e8] hover:border-[#024ad8] hover:shadow-sm transition-all cursor-pointer bg-white relative flex flex-col justify-between text-left group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-[#636363]">{item.code}</span>
                            {item.requiresRx ? (
                              <span className="bg-[#f9d4d2] text-[#b3262b] text-[8px] font-black px-1.5 py-0.5 rounded tracking-wide">
                                Rx
                              </span>
                            ) : (
                              <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black px-1.5 py-0.5 rounded tracking-wide">
                                OTC
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-[#1a1a1a] group-hover:text-[#024ad8]">{item.name}</h4>
                          <p className="text-[10px] text-[#636363] italic truncate">Hoạt chất: {item.ingredient}</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#f7f7f7] text-xs">
                          <span className="font-bold text-[#1a1a1a]">{(item.price).toLocaleString('vi-VN')} đ</span>
                          <span className={`text-[10px] ${item.stock <= 20 ? 'text-rose-600 font-bold' : 'text-[#636363]'}`}>
                            Kho: {item.stock} hộp
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </Card>

              {/* Live clinical warning system - BR-13 triggers */}
              {interactionAlert && (
                <div className="bg-rose-50 border-2 border-[#b3262b] rounded-2xl p-5 text-left relative overflow-hidden animate-bounce-short">
                  <div className="absolute right-0 bottom-0 opacity-10 text-[120px] pointer-events-none">⚠️</div>
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="h-6 w-6 text-[#b3262b] shrink-0 mt-0.5" />
                    <div className="space-y-1 z-10">
                      <h4 className="text-xs font-black uppercase text-[#b3262b] tracking-[0.7px]">
                        {interactionAlert.title}
                      </h4>
                      <p className="text-xs text-[#1a1a1a] font-semibold leading-relaxed">
                        {interactionAlert.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Typewriter AI Pharmacist clinical copilot console */}
              {aiNote && (
                <Card className="bg-[#1a1a1a] text-white border border-[#292929] rounded-2xl shadow-xl overflow-hidden text-left font-mono">
                  <div className="bg-[#292929] px-4 py-2 flex items-center justify-between border-b border-[#383838]">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-[10px] font-bold text-[#a1a1a1] uppercase tracking-wider flex items-center gap-1">
                        <Sparkle className="h-3 w-3 text-emerald-400" />
                        AI Pharmacist Terminal Console
                      </span>
                    </div>
                    <span className="text-[9px] text-emerald-400">Gemini-2.0-Flash-Active</span>
                  </div>
                  <CardContent className="p-5 text-[11px] leading-relaxed whitespace-pre-wrap text-emerald-400 font-medium">
                    {isAiLoading ? (
                      <div className="flex items-center gap-2 text-white">
                        <span className="h-3 w-3 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                        Đang truy xuất thông tin lâm sàng...
                      </div>
                    ) : (
                      aiNote
                    )}
                  </CardContent>
                </Card>
              )}

            </div>

            {/* RIGHT COLUMN: POS Cart checkout list and Rx Gates (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <Card className="bg-white border border-[#e8e8e8] rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[580px] text-left relative">
                {paymentSuccess && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-in fade-in duration-200">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-sm">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a1a] text-base uppercase tracking-wider">Hóa đơn hoàn tất!</h3>
                      <p className="text-xs text-[#636363] max-w-xs mt-1 leading-relaxed">
                        [BR-10] Đã thanh toán thành công và tự động trừ số lượng tồn kho vật lý của từng lô thuốc tương ứng.
                      </p>
                    </div>
                    <button 
                      onClick={() => setPaymentSuccess(false)}
                      className="bg-[#024ad8] hover:bg-[#0e3191] text-white text-xs font-semibold tracking-[0.7px] uppercase px-5 h-10 rounded-[4px] shadow transition-all"
                    >
                      Tiếp tục đơn tiếp theo
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-3">
                    <h3 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider flex items-center gap-1">
                      <ShoppingCart className="h-4.5 w-4.5 text-[#024ad8]" />
                      Giỏ hàng POS ({cart.length})
                    </h3>
                    <button 
                      onClick={() => setCart([])}
                      className="text-xs text-rose-600 font-semibold hover:underline"
                    >
                      Xóa giỏ
                    </button>
                  </div>

                  {/* Errors panel */}
                  {posError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-medium flex gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{posError}</span>
                    </div>
                  )}

                  {/* Cart items list */}
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {cart.length > 0 ? (
                      cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-3 p-3 bg-[#f7f7f7] rounded-xl border border-[#e8e8e8]">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-[#1a1a1a] truncate">{item.name}</h4>
                            <p className="text-[10px] text-[#636363] truncate">Đơn giá: {item.price.toLocaleString('vi-VN')} đ</p>
                          </div>
                          
                          {/* Qty adjustments */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 bg-white border border-[#c2c2c2] hover:bg-[#f7f7f7] rounded text-xs font-bold flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-[#1a1a1a] min-w-[20px] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 bg-white border border-[#c2c2c2] hover:bg-[#f7f7f7] rounded text-xs font-bold flex items-center justify-center"
                            >
                              +
                            </button>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 hover:bg-rose-100 text-rose-600 rounded"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-[#636363]">
                        Giỏ hàng trống. Hãy chọn thuốc bên trái.
                      </div>
                    )}
                  </div>

                  {/* Rx Gate upload block */}
                  {requiresRxApproval && (
                    <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl space-y-3">
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="h-4.5 w-4.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide">Yêu cầu Đơn thuốc lâm sàng (Rx)</h4>
                          <p className="text-[10px] text-[#3d3d3d] mt-0.5 leading-relaxed font-normal">
                            Đơn hàng chứa thuốc kê đơn bắt buộc. Hãy chụp/tải tệp đơn thuốc lên hệ thống trước khi duyệt.
                          </p>
                        </div>
                      </div>

                      {/* File Select */}
                      {!prescriptionPreview ? (
                        <label className="border-2 border-dashed border-amber-400/40 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-amber-100/30 transition-all">
                          <Upload className="h-6 w-6 text-amber-600 mb-1" />
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Tải đơn thuốc (.JPG/.PNG)</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileChange}
                          />
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-2.5 bg-white rounded border border-amber-200">
                          <div className="flex items-center gap-2 text-[10px] text-[#1a1a1a] font-bold truncate">
                            <FileImage className="h-4.5 w-4.5 text-amber-600" />
                            <span className="truncate">{prescriptionFile?.name}</span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => {
                              setPrescriptionFile(null);
                              setPrescriptionPreview(null);
                            }}
                            className="text-[10px] font-bold text-rose-600 uppercase hover:underline"
                          >
                            Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Subtotals & Payment action */}
                <div className="border-t border-[#e8e8e8] pt-4 mt-6 space-y-4">
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-[#636363]">
                      <span>Tổng cộng đơn:</span>
                      <span>{totalCost.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex justify-between text-[#636363]">
                      <span>Thuế VAT (5%):</span>
                      <span>{(totalCost * 0.05).toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-[#1a1a1a] border-t border-[#f7f7f7] pt-2">
                      <span>Phải thanh toán:</span>
                      <span>{(totalCost * 1.05).toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>

                  {/* Cash paid input */}
                  {cart.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 items-center">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#636363] uppercase tracking-wider">Tiền khách đưa (đ):</label>
                        <input
                          type="number"
                          placeholder="Ví dụ: 100000"
                          value={cashPaid}
                          onChange={(e) => setCashPaid(e.target.value)}
                          className="w-full bg-[#f7f7f7] text-[#1a1a1a] text-xs px-3 py-2 rounded border border-[#c2c2c2] outline-none focus:bg-white"
                        />
                      </div>
                      
                      <div className="space-y-1 text-right">
                        <span className="text-[10px] font-bold text-[#636363] uppercase tracking-wider block">Tiền trả lại khách:</span>
                        <span className={`text-sm font-bold block ${changeDue < 0 ? 'text-rose-600' : 'text-[#1a1a1a]'}`}>
                          {changeDue >= 0 ? `${changeDue.toLocaleString('vi-VN')} đ` : 'Chưa đủ tiền'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Submit checkout (4px sharp Electric Blue) */}
                  <button
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className={`w-full text-xs font-bold tracking-[0.7px] uppercase h-12 rounded-[4px] shadow transition-all active:scale-98 flex items-center justify-center gap-2 ${
                      cart.length === 0 
                        ? 'bg-[#c2c2c2] text-white cursor-not-allowed' 
                        : 'bg-[#024ad8] hover:bg-[#0e3191] text-white'
                    }`}
                  >
                    <CreditCard className="h-4.5 w-4.5" />
                    Thanh toán POS & Trừ Kho
                  </button>

                </div>

              </Card>

            </div>

          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
