"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Phone, 
  MapPin, 
  Lock, 
  Check, 
  AlertTriangle, 
  Info, 
  ArrowRight, 
  ShieldCheck, 
  Heart,
  ChevronRight,
  Sparkles,
  ClipboardList,
  FileText,
  Clock,
  X
} from "lucide-react";

// Types
interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  isAvailable: boolean;
  activeIngredient: string;
  dosageForm: string;
  description: string;
  usage: string;
  sideEffects: string;
  imageUrl?: string;
  storage?: string;
}

// Mock Categories
const MOCK_CATEGORIES = [
  { id: "pain", name: "Giảm đau - hạ sốt", count: 12 },
  { id: "flu", name: "Cảm cúm - ho", count: 8 },
  { id: "digest", name: "Tiêu hóa", count: 15 },
  { id: "vitamins", name: "Vitamin & khoáng chất", count: 24 },
  { id: "dermatology", name: "Da liễu", count: 9 },
  { id: "cardio", name: "Tim mạch - huyết áp", count: 11 },
  { id: "device", name: "Thiết bị y tế", count: 6 },
  { id: "other", name: "Sản phẩm khác", count: 14 }
];

// Mock Medicines
const MOCK_MEDICINES: Medicine[] = [
  {
    id: "MED001",
    name: "Paracetamol 500mg",
    category: "Giảm đau - hạ sốt",
    price: 1500,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Paracetamol 500mg",
    dosageForm: "Viên nén",
    description: "Thuốc giảm đau nhanh và hạ sốt hiệu quả cho người lớn và trẻ em trên 12 tuổi.",
    usage: "Uống 1-2 viên mỗi 4-6 giờ khi cần thiết, không quá 8 viên/ngày.",
    sideEffects: "Ít gặp, có thể gây dị ứng da, phát ban hoặc tổn thương gan nếu dùng quá liều kéo dài."
  },
  {
    id: "MED002",
    name: "Ibuprofen 400mg",
    category: "Giảm đau - hạ sốt",
    price: 3000,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Ibuprofen 400mg",
    dosageForm: "Viên nén bao phim",
    description: "Thuốc kháng viêm không steroid (NSAID), giảm đau và giảm viêm xương khớp hiệu quả.",
    usage: "Uống 1 viên sau ăn, ngày 2-3 lần. Không dùng cho người loét dạ dày tiến triển.",
    sideEffects: "Rối loạn tiêu hóa, đau dạ dày, buồn nôn, đau đầu, chóng mặt."
  },
  {
    id: "MED003",
    name: "Vitamin C 500mg",
    category: "Vitamin & khoáng chất",
    price: 2000,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Acid Ascorbic 500mg",
    dosageForm: "Viên sủi",
    description: "Bổ sung Vitamin C giúp tăng cường sức đề kháng, hỗ trợ hệ miễn dịch và chống oxy hóa.",
    usage: "Hòa tan 1 viên trong 200ml nước đun sôi để nguội, uống 1 viên/ngày vào buổi sáng.",
    sideEffects: "Dùng liều cao kéo dài có thể gây sỏi thận, rối loạn tiêu hóa nhẹ."
  },
  {
    id: "MED004",
    name: "Omeprazole 20mg",
    category: "Tiêu hóa",
    price: 3500,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Omeprazole 20mg",
    dosageForm: "Viên nang tan trong ruột",
    description: "Thuốc ức chế bơm proton (PPI), điều trị loét dạ dày - tá tràng và trào ngược dạ dày thực quản (GERD).",
    usage: "Uống 1 viên trước bữa ăn sáng 30 phút, nuốt nguyên viên không nhai nát.",
    sideEffects: "Đau đầu, tiêu chảy, táo bón, đau bụng, buồn nôn."
  },
  {
    id: "MED005",
    name: "Loratadine 10mg",
    category: "Cảm cúm - ho",
    price: 2500,
    unit: "viên",
    isAvailable: false,
    activeIngredient: "Loratadine 10mg",
    dosageForm: "Viên nén",
    description: "Thuốc kháng histamin thế hệ 2, điều trị viêm mũi dị ứng, hắt hơi, sổ mũi và ngứa ngáy nổi mề đay.",
    usage: "Uống 1 viên/ngày, uống cùng hoặc ngoài bữa ăn.",
    sideEffects: "Mệt mỏi, khô miệng, đau đầu nhẹ, ít gây buồn ngủ hơn thế hệ 1."
  },
  {
    id: "MED006",
    name: "Telfast 180mg",
    category: "Cảm cúm - ho",
    price: 9000,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Fexofenadine hydrochloride 180mg",
    dosageForm: "Viên nén bao phim",
    description: "Thuốc kháng dị ứng thế hệ mới hiệu quả cao, điều trị các triệu chứng viêm mũi dị ứng kéo dài.",
    usage: "Uống 1 viên/ngày với nước lọc. Không dùng chung với nước trái cây.",
    sideEffects: "Buồn ngủ nhẹ, mệt mỏi, khô miệng, đau đầu."
  },
  {
    id: "MED007",
    name: "Dung dịch sát khuẩn tay",
    category: "Sản phẩm khác",
    price: 25000,
    unit: "chai",
    isAvailable: true,
    activeIngredient: "Ethanol 70%, Glycerin, Aloe Vera",
    dosageForm: "Dung dịch xịt tay khô",
    description: "Nước rửa tay nhanh giúp diệt khuẩn 99.9% tức thì, giữ ẩm da tay mềm mại.",
    usage: "Xịt trực tiếp một lượng vừa đủ vào lòng bàn tay, xoa đều các ngón tay cho đến khi khô.",
    sideEffects: "Có thể gây khô da nếu dùng quá nhiều lần, tránh tiếp xúc trực tiếp với mắt."
  },
  {
    id: "MED008",
    name: "Nhiệt kế điện tử hồng ngoại",
    category: "Thiết bị y tế",
    price: 150000,
    unit: "cái",
    isAvailable: true,
    activeIngredient: "Cảm biến nhiệt hồng ngoại hồng ngoại",
    dosageForm: "Thiết bị điện tử cầm tay",
    description: "Đo nhiệt độ trán không tiếp xúc trong 1 giây, độ chính xác cao, có cảnh báo sốt bằng âm thanh.",
    usage: "Hướng cảm biến vào giữa trán ở khoảng cách 1-3cm, nhấn nút đo và đọc kết quả trên màn hình LCD.",
    sideEffects: "Không có tác dụng phụ y học."
  }
];

export default function HomePage() {
  const [medicines, setMedicines] = useState<Medicine[]>(MOCK_MEDICINES);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch API data
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
        
        // Fetch featured medicines
        const medRes = await fetch(`${apiBaseUrl}/products/featured`);
        if (medRes.ok) {
          const medData = await medRes.json();
          if (medData && medData.length > 0) {
            const mappedMeds = medData.map((item: any) => ({
              ...item,
              sideEffects: item.sideEffects || "Ít gặp, có thể gây dị ứng hoặc tác dụng nhẹ trên đường tiêu hóa."
            }));
            setMedicines(mappedMeds);
          }
        }

        // Fetch categories
        const catRes = await fetch(`${apiBaseUrl}/products/categories`);
        if (catRes.ok) {
          const catData = await catRes.json();
          if (catData && catData.length > 0) {
            const mappedCats = catData.map((item: any) => ({
              id: item.id,
              name: item.name,
              count: item.count || 0
            }));
            setCategories(mappedCats);
          }
        }
      } catch (err) {
        console.error("Error fetching data from API, using fallback mock data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  // Cart total count
  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  }, [cart]);

  // Filtered medicines
  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      const matchesSearch = 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory 
        ? med.category === selectedCategory 
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, medicines]);

  // Toast helper
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Add to cart handler
  const handleAddToCart = (med: Medicine, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!med.isAvailable) {
      triggerToast(`Sản phẩm ${med.name} đang tạm hết hàng.`);
      return;
    }
    setCart(prev => ({
      ...prev,
      [med.id]: (prev[med.id] || 0) + 1
    }));
    triggerToast(`Đã thêm ${med.name} vào giỏ hàng.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas font-sans text-ink">
      {/* SEO Tags (Meta-structure simulated via Next.js client-side fallback metadata or direct render) */}
      <head>
        <title>PharmaAssist - Tra Cứu Thuốc Nhanh, Mua Thuốc Thuận Tiện</title>
        <meta name="description" content="Hệ thống PharmaAssist hỗ trợ tra cứu thuốc nhanh chóng, xem danh mục nổi bật, tìm kiếm hoạt chất, mua thuốc thuận tiện và hỗ trợ cảnh báo tương tác thuốc tự động." />
      </head>

      {/* 1. TOP BAR */}
      <div className="bg-ink-soft text-white text-xs py-2 px-4 md:px-8 border-b border-charcoal">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1 font-medium hover:text-primary-soft transition-colors cursor-pointer">
              <Phone size={14} className="text-primary-bright" />
              Hotline tư vấn: <strong className="text-primary-soft">1800 6868</strong> (Miễn phí)
            </span>
            <span className="flex items-center gap-1 opacity-95">
              <MapPin size={14} className="text-primary-bright" />
              Địa chỉ: 123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM
            </span>
          </div>
          <Link 
            href="/login" 
            id="btn-staff-login-topbar"
            className="flex items-center gap-1.5 bg-charcoal hover:bg-primary-deep text-white px-3 py-1 rounded-md transition-all duration-300 text-xs border border-graphite"
          >
            <Lock size={12} className="text-primary-bright" />
            Nhân viên đăng nhập
          </Link>
        </div>
      </div>

      {/* 2. HEADER CHÍNH */}
      <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-fog shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" id="logo-link" className="flex items-center gap-2 group">
              <div className="bg-primary text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={24} />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-ink group-hover:text-primary transition-colors">
                  Pharma<span className="text-primary">Assist</span>
                </span>
                <span className="block text-[10px] text-graphite tracking-widest uppercase -mt-1">
                  AI Intelligence
                </span>
              </div>
            </Link>
            
            {/* Mobile Actions Header */}
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/cart" id="mobile-cart-btn" className="relative p-2 text-ink hover:text-primary transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bloom-coral text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/login" id="mobile-login-btn" className="p-2 text-ink hover:text-primary transition-colors">
                <User size={22} />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                id="main-search-input"
                placeholder="Tìm tên thuốc, hoạt chất, danh mục..."
                className="w-full pl-11 pr-4 py-2.5 bg-cloud border border-steel focus:border-primary focus:bg-white rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-soft"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 text-graphite pointer-events-none" size={18} />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 text-graphite hover:text-ink transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/cart" 
              id="desktop-cart-link"
              className="relative flex items-center gap-2 bg-cloud hover:bg-primary-soft text-ink hover:text-primary-deep px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium border border-fog"
            >
              <ShoppingCart size={18} />
              Giỏ hàng
              {cartCount > 0 ? (
                <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              ) : (
                <span className="text-xs text-graphite">0</span>
              )}
            </Link>
            <Link 
              href="/login" 
              id="desktop-login-link"
              className="flex items-center gap-2 bg-primary hover:bg-primary-deep text-white px-5 py-2 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
            >
              <User size={18} />
              Đăng nhập
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="bg-cloud border-t border-fog py-2 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
            <Link href="#" className="text-sm font-semibold text-primary hover:text-primary-deep transition-colors">
              Trang chủ
            </Link>
            <a href="#featured-medicines" className="text-sm font-medium text-ink-soft hover:text-primary transition-colors">
              Thuốc
            </a>
            <a href="#medicine-categories" className="text-sm font-medium text-ink-soft hover:text-primary transition-colors">
              Danh mục thuốc
            </a>
            <a href="#interaction-demo" className="text-sm font-medium text-ink-soft hover:text-primary transition-colors">
              Cảnh báo tương tác
            </a>
            <a href="#about-system" className="text-sm font-medium text-ink-soft hover:text-primary transition-colors">
              Về chúng tôi
            </a>
          </div>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1">
        
        {/* 3. HERO BANNER */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary-deep to-primary py-12 md:py-20 text-white px-4 md:px-8">
          {/* Decorative shapes resembling slashes in HP design */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none transform skew-x-12 translate-x-20 bg-gradient-to-l from-white to-transparent" />
          <div className="absolute -bottom-10 left-10 w-96 h-96 rounded-full bg-primary-bright opacity-20 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 bg-primary-bright/35 text-primary-soft text-xs font-semibold px-3 py-1 rounded-full w-fit mx-auto lg:mx-0 border border-primary-bright/50">
                <ShieldCheck size={14} className="text-white" />
                Hệ thống chuẩn hóa chuẩn CNPM
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                PharmaAssist – Tra cứu thuốc nhanh, mua thuốc thuận tiện
              </h1>
              <p className="text-base md:text-lg text-primary-soft max-w-2xl leading-relaxed">
                Hỗ trợ tra cứu hoạt chất thuốc, xem danh mục đa dạng, tạo giỏ hàng demo mua thuốc và phát hiện nhanh tương tác thuốc tự động dựa trên dữ liệu mẫu chuẩn hóa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
                <a 
                  href="#featured-medicines" 
                  className="flex items-center justify-center gap-2 bg-white text-primary hover:bg-primary-soft hover:text-primary-deep font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:scale-102"
                >
                  Tìm thuốc ngay
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="#medicine-categories" 
                  className="flex items-center justify-center gap-2 bg-primary-deep/50 hover:bg-primary-deep/80 text-white border border-primary-bright/40 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Xem danh mục
                </a>
              </div>
            </div>

            {/* Illustration panel right */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl relative">
                <div className="absolute -top-3 -left-3 bg-bloom-coral text-white p-3 rounded-2xl shadow-lg">
                  <AlertTriangle size={24} />
                </div>
                
                <h3 className="text-lg font-bold mb-4 ml-8 text-white flex items-center gap-2">
                  <Sparkles className="text-primary-soft" size={20} />
                  Mô phỏng Kiểm Tra Tương Tác
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-xs">
                    <span className="block font-semibold text-primary-soft">Thuốc A: Paracetamol 500mg</span>
                    <span className="text-white/80">Nhóm giảm đau hạ sốt rất phổ biến.</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-xs">
                    <span className="block font-semibold text-primary-soft">Thuốc B: Ibuprofen 400mg</span>
                    <span className="text-white/80">Nhóm giảm đau kháng viêm NSAID.</span>
                  </div>
                  <div className="bg-bloom-wine/80 p-3 rounded-xl border border-bloom-coral/50 text-xs flex gap-2">
                    <Info size={20} className="text-bloom-coral shrink-0" />
                    <div>
                      <strong className="text-bloom-coral block">Khuyến nghị tương tác:</strong>
                      <span className="text-white/90">Tránh dùng đồng thời lâu dài để bảo vệ dạ dày & gan của bệnh nhân.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. QUICK ACTIONS */}
        <section className="bg-cloud border-b border-fog py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-graphite font-bold text-center mb-6">
              Các tính năng nhanh
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <a 
                href="#featured-medicines" 
                className="flex flex-col items-center p-4 bg-white hover:bg-primary-soft/30 rounded-2xl border border-fog hover:border-primary-soft text-center group transition-all duration-300 hover:shadow-sm"
              >
                <div className="bg-primary-soft text-primary p-3 rounded-xl group-hover:scale-105 transition-transform duration-300 mb-3">
                  <Search size={20} />
                </div>
                <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                  Tìm thuốc
                </span>
              </a>
              <a 
                href="#medicine-categories" 
                className="flex flex-col items-center p-4 bg-white hover:bg-primary-soft/30 rounded-2xl border border-fog hover:border-primary-soft text-center group transition-all duration-300 hover:shadow-sm"
              >
                <div className="bg-primary-soft text-primary p-3 rounded-xl group-hover:scale-105 transition-transform duration-300 mb-3">
                  <ClipboardList size={20} />
                </div>
                <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                  Danh mục thuốc
                </span>
              </a>
              <Link 
                href="/cart" 
                className="flex flex-col items-center p-4 bg-white hover:bg-primary-soft/30 rounded-2xl border border-fog hover:border-primary-soft text-center group transition-all duration-300 hover:shadow-sm"
              >
                <div className="bg-primary-soft text-primary p-3 rounded-xl group-hover:scale-105 transition-transform duration-300 mb-3">
                  <ShoppingCart size={20} />
                </div>
                <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                  Xem giỏ hàng
                </span>
              </Link>
              <a 
                href="#about-system" 
                className="flex flex-col items-center p-4 bg-white hover:bg-primary-soft/30 rounded-2xl border border-fog hover:border-primary-soft text-center group transition-all duration-300 hover:shadow-sm"
              >
                <div className="bg-primary-soft text-primary p-3 rounded-xl group-hover:scale-105 transition-transform duration-300 mb-3">
                  <Phone size={20} />
                </div>
                <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                  Liên hệ dược sĩ
                </span>
              </a>
              <Link 
                href="/login" 
                className="flex flex-col items-center p-4 bg-white hover:bg-primary-soft/30 rounded-2xl border border-fog hover:border-primary-soft text-center group col-span-2 md:col-span-1 transition-all duration-300 hover:shadow-sm"
              >
                <div className="bg-charcoal text-white p-3 rounded-xl group-hover:bg-primary-deep transition-colors mb-3">
                  <Lock size={20} />
                </div>
                <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                  Đăng nhập nhân viên
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. DANH MỤC NỔI BẬT */}
        <section id="medicine-categories" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Danh mục sản phẩm</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ink mt-1">Các nhóm thuốc nổi bật</h2>
            </div>
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-primary hover:text-primary-deep font-semibold flex items-center gap-1 transition-colors"
              >
                Hiển thị tất cả thuốc
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                  className={`p-4 rounded-2xl text-center flex flex-col items-center justify-center border transition-all duration-300 hover:scale-102 hover:shadow-md ${
                    isSelected 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white border-fog text-ink hover:border-primary-soft"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl mb-3 ${isSelected ? "bg-white/20 text-white" : "bg-cloud text-primary"}`}>
                    <ClipboardList size={18} />
                  </div>
                  <span className="text-xs font-bold leading-tight block line-clamp-2">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 6. THUỐC NỔI BẬT / BÁN CHẠY */}
        <section id="featured-medicines" className="bg-cloud py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Tìm kiếm & lựa chọn</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-ink mt-1">
                  {selectedCategory ? `Thuốc thuộc: ${selectedCategory}` : "Danh sách thuốc bán chạy"}
                </h2>
              </div>
              
              <div className="text-sm text-graphite font-medium bg-white px-3 py-1.5 rounded-lg border border-fog">
                Hiển thị: <strong className="text-ink">{filteredMedicines.length}</strong> sản phẩm
              </div>
            </div>

            {filteredMedicines.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-fog shadow-sm">
                <Info size={48} className="text-steel mx-auto mb-4" />
                <h3 className="text-lg font-bold text-ink mb-1">Không tìm thấy thuốc phù hợp</h3>
                <p className="text-sm text-graphite max-w-md mx-auto">
                  Không tìm thấy thuốc nào khớp với từ khóa &ldquo;{searchTerm}&rdquo; hoặc danh mục đã chọn. Hãy thử từ khóa khác.
                </p>
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}
                  className="mt-4 bg-primary hover:bg-primary-deep text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMedicines.map((med) => (
                  <div 
                    key={med.id} 
                    onClick={() => setSelectedMedicine(med)}
                    className="bg-white rounded-2xl border border-fog hover:border-primary-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col overflow-hidden group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="bg-cloud h-40 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-3 left-3 bg-white/95 text-graphite text-[10px] font-bold px-2 py-0.5 rounded border border-fog shadow-sm z-10">
                        {med.id}
                      </div>
                      
                      {med.imageUrl ? (
                        <img 
                          src={med.imageUrl} 
                          alt={med.name} 
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="text-primary-bright opacity-25 group-hover:scale-110 transition-transform duration-500">
                          <Sparkles size={56} />
                        </div>
                      )}
                      
                      {/* Availability status tag */}
                      <div className={`absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-10 ${
                        med.isAvailable 
                          ? "bg-primary-soft text-primary-deep" 
                          : "bg-bloom-rose text-bloom-deep"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${med.isAvailable ? "bg-primary" : "bg-bloom-coral"}`} />
                        {med.isAvailable ? "Còn hàng" : "Tạm hết hàng"}
                      </div>
                    </div>

                    {/* Content info */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="mb-4">
                        <span className="text-[10px] text-graphite font-bold uppercase tracking-wider block mb-1">
                          {med.category}
                        </span>
                        <h3 className="font-bold text-ink text-base line-clamp-1 group-hover:text-primary transition-colors">
                          {med.name}
                        </h3>
                        <p className="text-xs text-graphite line-clamp-2 mt-1 min-h-[32px]">
                          {med.description}
                        </p>
                      </div>

                      <div>
                        {/* Price wrapper */}
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-lg font-extrabold text-primary">
                            {med.price.toLocaleString("vi-VN")}đ
                          </span>
                          <span className="text-[10px] text-graphite">/ {med.unit}</span>
                        </div>

                        {/* Actions buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedMedicine(med); }}
                            className="bg-cloud hover:bg-fog text-ink text-xs font-bold py-2 rounded-xl transition-all duration-300 text-center"
                          >
                            Chi tiết
                          </button>
                          <button
                            onClick={(e) => handleAddToCart(med, e)}
                            disabled={!med.isAvailable}
                            className={`flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl transition-all duration-300 ${
                              med.isAvailable 
                                ? "bg-primary hover:bg-primary-deep text-white shadow-sm" 
                                : "bg-steel text-white cursor-not-allowed"
                            }`}
                          >
                            <ShoppingCart size={12} />
                            Mua
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 7. DEMO TƯƠNG TÁC THUỐC (RULE-BASED) */}
        <section id="interaction-demo" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-fog p-6 md:p-8 shadow-sm">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1">
                <AlertTriangle size={14} className="text-primary-bright" />
                Công nghệ cốt lõi
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ink leading-tight">
                Cảnh báo tương tác thuốc tự động khi bán
              </h2>
              <p className="text-sm text-graphite leading-relaxed">
                Hệ thống PharmaAssist tích hợp công cụ kiểm tra tương tác thuốc tự động. Khi nhân viên hoặc khách hàng lựa chọn kết hợp từ 2 loại hoạt chất trở lên trong đơn thuốc, hệ thống sẽ tự động đối chiếu cơ sở dữ liệu để đưa ra cảnh báo nguy cơ tức thì.
              </p>
              <div className="space-y-2 mt-2">
                <div className="flex items-start gap-2.5">
                  <div className="bg-primary-soft text-primary p-0.5 rounded-full mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="text-xs font-medium text-ink-soft">
                    Phát hiện các hoạt chất đối kháng nhau trong đơn.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="bg-primary-soft text-primary p-0.5 rounded-full mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="text-xs font-medium text-ink-soft">
                    Phân chia mức độ cảnh báo rõ ràng: Nhẹ (LOW), Trung bình (MEDIUM), Nghiêm trọng (HIGH).
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="bg-primary-soft text-primary p-0.5 rounded-full mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="text-xs font-medium text-ink-soft">
                    Hỗ trợ dược sĩ ghi chú tư vấn trực tiếp cho người bệnh.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-cloud rounded-2xl p-6 border border-fog flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-fog pb-3">
                <span className="text-xs font-bold text-ink">Bảng tương tác thuốc mẫu (Demo)</span>
                <span className="bg-bloom-coral text-white text-[10px] font-bold px-2 py-0.5 rounded">HIGH ALERT</span>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-xl border border-fog">
                    <span className="text-[10px] text-graphite block">Hoạt chất 1</span>
                    <strong className="text-xs text-ink">Paracetamol</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-fog">
                    <span className="text-[10px] text-graphite block">Hoạt chất 2</span>
                    <strong className="text-xs text-ink">Ibuprofen</strong>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-fog flex gap-2">
                  <Info size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-ink block">Mức độ tương tác: LOW / MEDIUM</strong>
                    <span className="text-graphite">Tránh dùng phối hợp nhiều thuốc hạ sốt giảm đau cùng nhóm NSAIDs cùng lúc khi không có chỉ định chuyên môn để giảm độc tính lên gan và thận.</span>
                  </div>
                </div>

                <div className="border border-dashed border-steel p-3 rounded-xl text-center text-xs text-graphite">
                  * Hệ thống chỉ đưa ra cảnh báo mang tính chất tham khảo phần mềm.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. GIỚI THIỆU TÍNH NĂNG PHARMAASSIST */}
        <section id="about-system" className="bg-ink-soft text-white py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <span className="text-xs uppercase tracking-widest text-primary-bright font-bold">Vận hành thông minh</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Đầy đủ tính năng quản lý dược phẩm</h2>
              <p className="text-sm text-primary-soft mt-2">
                Hệ thống đáp ứng các tiêu chuẩn nghiệp vụ nhà thuốc từ cơ bản đến nâng cao.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-charcoal/50 p-6 rounded-2xl border border-graphite/40 flex flex-col gap-3">
                <div className="bg-primary-deep text-primary-soft w-10 h-10 flex items-center justify-center rounded-xl mb-2">
                  <Search size={20} />
                </div>
                <h3 className="font-bold text-white text-base">Tìm kiếm thuốc nhanh</h3>
                <p className="text-xs text-primary-soft leading-relaxed">
                  Tìm kiếm thông tin hoạt chất, hướng dẫn sử dụng, liều dùng và tác dụng phụ nhanh chóng thông qua cơ sở dữ liệu mẫu chuẩn hóa.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-2xl border border-graphite/40 flex flex-col gap-3">
                <div className="bg-primary-deep text-primary-soft w-10 h-10 flex items-center justify-center rounded-xl mb-2">
                  <ClipboardList size={20} />
                </div>
                <h3 className="font-bold text-white text-base">Quản lý đơn mua</h3>
                <p className="text-xs text-primary-soft leading-relaxed">
                  Hỗ trợ khách hàng gom thuốc vào giỏ hàng demo, xem trước đơn giá tổng, hỗ trợ xuất hóa đơn nháp phục vụ kiểm tra.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-2xl border border-graphite/40 flex flex-col gap-3">
                <div className="bg-primary-deep text-primary-soft w-10 h-10 flex items-center justify-center rounded-xl mb-2">
                  <FileText size={20} />
                </div>
                <h3 className="font-bold text-white text-base">Thanh toán & Hóa đơn</h3>
                <p className="text-xs text-primary-soft leading-relaxed">
                  Tích hợp luồng ghi nhận thanh toán tự động, in hóa đơn chuẩn mẫu với đầy đủ thông tin chi tiết từng loại thuốc đã bán.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-2xl border border-graphite/40 flex flex-col gap-3">
                <div className="bg-primary-deep text-primary-soft w-10 h-10 flex items-center justify-center rounded-xl mb-2">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="font-bold text-white text-base">Cảnh báo tương tác</h3>
                <p className="text-xs text-primary-soft leading-relaxed">
                  Công cụ tích hợp sẵn hỗ trợ so khớp tương tác chéo giữa các hoạt chất trong cùng một giỏ hàng để phát hiện nguy cơ an toàn y học.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 9. FOOTER */}
      <footer className="bg-ink text-white/90 border-t border-charcoal pt-12 pb-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-xl">
                <Sparkles size={20} />
              </div>
              <span className="text-lg font-bold text-white">
                Pharma<span className="text-primary-bright">Assist</span>
              </span>
            </Link>
            <p className="text-xs text-steel leading-relaxed max-w-sm">
              Hệ thống quản lý nhà thuốc thông minh tích hợp kiểm tra tương tác thuốc tự động và AI Pharmacist Copilot hỗ trợ dược sĩ tư vấn.
            </p>
            <span className="text-xs text-steel flex items-center gap-1.5">
              <Phone size={14} className="text-primary-bright" />
              Điện thoại: 1800 6868 (Tư vấn 24/7)
            </span>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-primary-bright font-bold">
              Danh mục
            </h4>
            <ul className="text-xs text-steel space-y-2">
              <li><a href="#featured-medicines" className="hover:text-white transition-colors">Thuốc bán chạy</a></li>
              <li><a href="#medicine-categories" className="hover:text-white transition-colors">Nhóm thuốc hạ sốt</a></li>
              <li><a href="#medicine-categories" className="hover:text-white transition-colors">Sản phẩm tiêu hóa</a></li>
              <li><a href="#medicine-categories" className="hover:text-white transition-colors">Thiết bị y tế</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-primary-bright font-bold">
              Hỗ trợ
            </h4>
            <ul className="text-xs text-steel space-y-2">
              <li><Link href="/login" className="hover:text-white transition-colors">Đăng nhập</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Xem giỏ hàng</Link></li>
              <li><a href="#interaction-demo" className="hover:text-white transition-colors">Kiểm tra tương tác</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-primary-bright font-bold">
              Bản quyền đồ án
            </h4>
            <p className="text-xs text-steel leading-relaxed">
              Môn học: <strong>Công Nghệ Phần Mềm</strong><br />
              Trường: Đại học Khoa học Tự nhiên, ĐHQG-HCM<br />
              Năm thực hiện: 2026
            </p>
          </div>

        </div>

        {/* Disclaimer section */}
        <div className="max-w-7xl mx-auto border-t border-charcoal pt-6 flex flex-col gap-4 text-center">
          <div className="bg-bloom-wine/40 border border-bloom-deep/50 rounded-2xl p-4 text-xs text-bloom-rose leading-relaxed max-w-4xl mx-auto flex items-start gap-2">
            <Info size={18} className="text-bloom-coral shrink-0 mt-0.5" />
            <p className="text-left">
              <strong>Tuyên bố miễn trừ trách nhiệm (Disclaimer):</strong> Toàn bộ dữ liệu thuốc, hoạt chất và tương tác thuốc hiển thị trên hệ thống là dữ liệu giả lập được sử dụng cho mục đích chạy thử nghiệm đồ án môn học. Thông tin thuốc và cảnh báo tương tác chỉ mang tính chất tham khảo phần mềm, hoàn toàn không thay thế cho các chẩn đoán, tư vấn chuyên môn của dược sĩ, bác sĩ hoặc chuyên gia y tế thật.
            </p>
          </div>
          
          <div className="text-[10px] text-graphite mt-2">
            &copy; {new Date().getFullYear()} PharmaAssist. All rights reserved. Designed for Academic Purpose.
          </div>
        </div>
      </footer>

      {/* 10. DETAIL MEDICINE MODAL */}
      {selectedMedicine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-fog shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-hidden animate-slideUp">
            
            {/* Modal Header */}
            <div className="bg-cloud p-6 border-b border-fog flex justify-between items-center sticky top-0 z-10">
              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">
                  {selectedMedicine.category}
                </span>
                <h2 className="text-xl font-extrabold text-ink">
                  {selectedMedicine.name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedMedicine(null)}
                className="text-graphite hover:text-ink hover:bg-fog p-1.5 rounded-full transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Image inside Modal if available */}
              {selectedMedicine.imageUrl && (
                <div className="bg-cloud h-48 w-full rounded-2xl flex items-center justify-center border border-fog overflow-hidden">
                  <img 
                    src={selectedMedicine.imageUrl} 
                    alt={selectedMedicine.name} 
                    className="h-full object-contain p-4" 
                  />
                </div>
              )}
              
              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cloud p-3 rounded-xl border border-fog">
                  <span className="text-[10px] text-graphite block">Hoạt chất chính</span>
                  <strong className="text-xs text-ink">{selectedMedicine.activeIngredient}</strong>
                </div>
                <div className="bg-cloud p-3 rounded-xl border border-fog">
                  <span className="text-[10px] text-graphite block">Dạng bào chế</span>
                  <strong className="text-xs text-ink">{selectedMedicine.dosageForm}</strong>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                  Mô tả thuốc
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed bg-cloud p-3 rounded-xl border border-fog">
                  {selectedMedicine.description}
                </p>
              </div>

               {/* Usage Instructions */}
              <div>
                <h4 className="text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                  Hướng dẫn sử dụng & Liều dùng
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed bg-cloud p-3 rounded-xl border border-fog">
                  {selectedMedicine.usage}
                </p>
              </div>

              {/* Storage Instruction if available */}
              {selectedMedicine.storage && (
                <div>
                  <h4 className="text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                    Hướng dẫn bảo quản
                  </h4>
                  <p className="text-xs text-ink-soft leading-relaxed bg-cloud p-3 rounded-xl border border-fog">
                    {selectedMedicine.storage}
                  </p>
                </div>
              )}

              {/* Side Effects */}
              <div>
                <h4 className="text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                  Tác dụng phụ có thể gặp
                </h4>
                <p className="text-xs text-bloom-deep leading-relaxed bg-bloom-rose/40 p-3 rounded-xl border border-bloom-rose">
                  {selectedMedicine.sideEffects}
                </p>
              </div>

              {/* Warning / Disclaimer inside Modal */}
              <div className="bg-bloom-wine/10 border border-bloom-coral/30 rounded-xl p-3 text-[11px] text-bloom-deep flex gap-2">
                <Info size={16} className="text-bloom-coral shrink-0 mt-0.5" />
                <span>
                  * Thuốc chỉ dùng cho mục đích chạy thử đồ án. Không tự ý áp dụng y khoa thực tế.
                </span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-cloud p-4 border-t border-fog flex justify-between items-center sticky bottom-0 z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-primary">
                  {selectedMedicine.price.toLocaleString("vi-VN")}đ
                </span>
                <span className="text-xs text-graphite">/ {selectedMedicine.unit}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMedicine(null)}
                  className="bg-white hover:bg-fog text-ink text-xs font-bold px-4 py-2.5 rounded-xl border border-fog transition-all duration-300"
                >
                  Đóng
                </button>
                <button
                  onClick={(e) => { handleAddToCart(selectedMedicine, e); setSelectedMedicine(null); }}
                  disabled={!selectedMedicine.isAvailable}
                  className={`flex items-center justify-center gap-1.5 text-xs font-bold px-6 py-2.5 rounded-xl transition-all duration-300 ${
                    selectedMedicine.isAvailable 
                      ? "bg-primary hover:bg-primary-deep text-white shadow-sm" 
                      : "bg-steel text-white cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={14} />
                  Thêm vào giỏ
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TOAST SYSTEM */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-ink text-white py-3 px-4 rounded-xl shadow-2xl border border-charcoal flex items-center justify-between gap-3 animate-slideIn">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1 rounded-md shrink-0">
              <Check size={14} />
            </div>
            <p className="text-xs font-medium">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="text-graphite hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

    </div>
  );
}
