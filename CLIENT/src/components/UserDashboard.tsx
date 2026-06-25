import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  User, 
  ShoppingBag, 
  ShieldCheck, 
  History, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle, 
  Clock, 
  Truck, 
  ChevronRight, 
  Copy, 
  Check, 
  FileText, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  CreditCard,
  Settings,
  X,
  LogOut,
  Download,
  Printer
} from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product, UserProfile } from '../types';

interface UserDashboardProps {
  wishlistCount: number;
  onScrollToSection: (sectionId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
}

interface OrderItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned';
  items: OrderItem[];
  totalPrice: number;
  trackingNumber: string;
  paymentMethod: string;
}

export default function UserDashboard({ 
  wishlistCount, 
  onScrollToSection, 
  onAddToCart,
  currentUser,
  onLogout,
  onUpdateProfile
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'profile'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  
  // --- Profile States ---
  const [profile, setProfile] = useState<UserProfile>(() => {
    return currentUser || {
      firstName: "Yasin Arafat",
      lastName: "Azad",
      email: "yasinarafatazad082@gmail.com",
      phone: "+880 1712-345678",
      street: "12/A Dhanmondi R/A",
      city: "Dhaka",
      postalCode: "1209",
      country: "Bangladesh"
    };
  });

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    }
  }, [currentUser]);

  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Pick realistic products from data
  const sampleProducts = PRODUCTS.slice(0, 3);

  // Simulated Order History
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-9284-X9",
      date: "2026-06-15",
      status: "Delivered",
      items: [
        { product: sampleProducts[0] || PRODUCTS[0], quantity: 1, selectedSize: "XL" },
        { product: sampleProducts[1] || PRODUCTS[1], quantity: 1, selectedSize: "L" }
      ],
      totalPrice: (sampleProducts[0]?.price || 3500) + (sampleProducts[1]?.price || 4200),
      trackingNumber: "TRAK-BLACK-98218",
      paymentMethod: "bKash Digital Payment"
    },
    {
      id: "ORD-1092-B2",
      date: "2026-06-22",
      status: "Processing",
      items: [
        { product: sampleProducts[2] || PRODUCTS[2], quantity: 2, selectedSize: "M" }
      ],
      totalPrice: (sampleProducts[2]?.price || 5000) * 2,
      trackingNumber: "TRAK-BLACK-10022",
      paymentMethod: "Credit / Debit Card"
    }
  ]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      onUpdateProfile(profile);
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1200);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordState.currentPassword || !passwordState.newPassword || passwordState.newPassword !== passwordState.confirmPassword) {
      setPasswordStatus('error');
      setTimeout(() => setPasswordStatus('idle'), 3000);
      return;
    }
    setPasswordStatus('success');
    setPasswordState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordStatus('idle'), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDownloadPDF = (order: Order) => {
    const doc = new jsPDF();
    
    // Header background (Black)
    doc.setFillColor(10, 10, 10);
    doc.rect(15, 15, 180, 25, 'F');
    
    // Header Accent Line (Red #D90429)
    doc.setFillColor(217, 4, 41);
    doc.rect(15, 40, 180, 2, 'F');
    
    // Header Brand text
    doc.setTextColor(245, 241, 232); // Cream white
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('STYLEE', 22, 32);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text('LUXURY STREETWEAR BD', 49, 31);
    
    doc.setFontSize(11);
    doc.setTextColor(217, 4, 41); // Red accent
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIAL CAPSULE RECEIPT', 122, 31);
    
    // Order info grid
    doc.setTextColor(110, 110, 110);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('ORDER REFERENCE', 15, 52);
    doc.text('DATE SECURED', 15, 60);
    doc.text('TRANSACTION STATUS', 15, 68);
    
    doc.text('PAYMENT METHOD', 110, 52);
    doc.text('TRACKING REFERENCE', 110, 60);
    doc.text('ACQUISITION PORTAL', 110, 68);
    
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(order.id, 55, 52);
    doc.text(order.date, 55, 60);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(217, 4, 41); // Red status text
    doc.text(order.status.toUpperCase(), 55, 68);
    
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'normal');
    doc.text(order.paymentMethod.toUpperCase(), 150, 52);
    doc.text(order.trackingNumber, 150, 60);
    doc.text('STYLEE WEB APPS', 150, 68);
    
    // Horizontal separator
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.5);
    doc.line(15, 75, 195, 75);
    
    // Client section
    doc.setTextColor(110, 110, 110);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENT SPECIFICATIONS', 15, 84);
    
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${profile.firstName} ${profile.lastName}`, 15, 91);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Email: ${profile.email}`, 15, 97);
    doc.text(`Phone: ${profile.phone}`, 15, 103);
    doc.text(`Address: ${profile.street}`, 15, 109);
    doc.text(`${profile.city}, ${profile.postalCode}, ${profile.country}`, 15, 115);
    
    // Table section
    // Header Bar
    doc.setFillColor(245, 245, 245);
    doc.rect(15, 123, 180, 8, 'F');
    
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('ITEM DESCRIPTION', 18, 128);
    doc.text('SIZE', 110, 128);
    doc.text('QTY', 132, 128);
    doc.text('UNIT PRICE', 150, 128);
    doc.text('TOTAL', 175, 128);
    
    // Table rows
    let currentY = 138;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    
    order.items.forEach((item) => {
      const name = item.product.name;
      const truncatedName = name.length > 45 ? name.substring(0, 42) + '...' : name;
      
      doc.text(truncatedName, 18, currentY);
      doc.text(item.selectedSize, 110, currentY);
      doc.text(item.quantity.toString(), 132, currentY);
      doc.text(`TAKA ${item.product.price.toLocaleString()}`, 150, currentY);
      doc.text(`৳ ${(item.product.price * item.quantity).toLocaleString()}`, 175, currentY);
      
      // Thin row divider
      doc.setDrawColor(245, 245, 245);
      doc.line(15, currentY + 4, 195, currentY + 4);
      
      currentY += 11;
    });
    
    // Summary card placement
    const summaryY = currentY + 5;
    
    // Left verification stamp
    doc.setDrawColor(217, 4, 41);
    doc.setLineWidth(0.8);
    doc.rect(15, summaryY, 80, 28, 'S');
    
    doc.setTextColor(217, 4, 41);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('STYLEE BD SECURE LOCK', 20, summaryY + 8);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 110);
    doc.text('Verified VIP Capsule Dispatch Receipt.', 20, summaryY + 14);
    doc.text('System authorized digitally, no signature needed.', 20, summaryY + 19);
    doc.setTextColor(150, 150, 150);
    doc.text(`TIME SECURED: ${new Date().toISOString().slice(0,19).replace('T', ' ')}`, 20, summaryY + 24);
    
    // Right financial breakdown
    doc.setFillColor(250, 250, 250);
    doc.rect(110, summaryY, 85, 28, 'F');
    doc.setDrawColor(235, 235, 235);
    doc.rect(110, summaryY, 85, 28, 'S');
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(110, 110, 110);
    doc.text('SUBTOTAL:', 115, summaryY + 8);
    doc.text('VIP DELIVERY:', 115, summaryY + 14);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.text(`৳ ${order.totalPrice.toLocaleString()}`, 160, summaryY + 8);
    doc.text('FREE DETECTED', 160, summaryY + 14);
    
    // Highlighted Total line
    doc.setFillColor(217, 4, 41);
    doc.rect(110, summaryY + 19, 85, 9, 'F');
    doc.setTextColor(245, 241, 232);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('TOTAL CHARGED:', 115, summaryY + 25);
    doc.text(`৳ ${order.totalPrice.toLocaleString()}`, 160, summaryY + 25);
    
    // Page Footer lines
    doc.setTextColor(180, 180, 180);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('STYLEE STREETWEAR CO. / ALL RIGHTS RESERVED 2026', 15, 282);
    doc.text('SECURE TRANSACTION ENCRYPTED VIA 256-BIT PROTOCOL', 123, 282);
    
    // Save Document
    doc.save(`STYLEE_INVOICE_${order.id}.pdf`);
  };

  const handleDownloadInvoice = (order: Order) => {
    const itemLines = order.items.map((item, index) => {
      const name = item.product.name;
      const sizeAndQty = `SIZE: ${item.selectedSize} x ${item.quantity}`;
      const price = `৳ ${(item.product.price * item.quantity).toLocaleString()}`;
      return `${index + 1}. ${name.padEnd(35)} ${sizeAndQty.padEnd(25)} ${price}`;
    }).join('\n');

    const invoiceText = `
========================================================================
                         STYLEE OFFICIAL RECEIPT
========================================================================
ACQUISITION PORTAL   : STYLEE BD
ORDER REFERENCE      : ${order.id}
DATE SECURED         : ${order.date}
TRANSACTION STATUS   : ${order.status.toUpperCase()}
PAYMENT METHOD       : ${order.paymentMethod.toUpperCase()}
TRACKING NUMBER      : ${order.trackingNumber}

------------------------------------------------------------------------
CLIENT SPECIFICATION & RECIPIENT INFORMATION
------------------------------------------------------------------------
MEMBER NAME          : ${profile.firstName} ${profile.lastName}
EMAIL ADDRESS        : ${profile.email}
PHONE SPECIFICATION  : ${profile.phone}
STREET ADDRESS       : ${profile.street}
CITY / POSTAL / CNTRY: ${profile.city}, ${profile.postalCode}, ${profile.country}

------------------------------------------------------------------------
CONSOLIDATED CAPSULES & PURCHASE BREAKDOWN
------------------------------------------------------------------------
${itemLines}

------------------------------------------------------------------------
FINANCIAL CONSOLIDATION
------------------------------------------------------------------------
SUBTOTAL             : ৳ ${order.totalPrice.toLocaleString()}
VIP SHIPPING         : FREE CAPTURED
TOTAL CHARGED        : ৳ ${order.totalPrice.toLocaleString()}

========================================================================
              THANK YOU FOR YOUR HIGH-TIER ACQUISITION.
    THIS DOC REPRESENTS AN OFFICIAL TRANSACTION SPECIFIED IN 2026.
========================================================================
`;

    const blob = new Blob([invoiceText.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `STYLEE_INVOICE_${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Status Badge Helper
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Delivered':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50';
      case 'Processing':
        return 'bg-amber-950/40 text-amber-400 border-amber-900/50';
      case 'Shipped':
        return 'bg-blue-950/40 text-blue-400 border-blue-900/50';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <div className="py-24 sm:py-32 bg-[#0A0A0A] border-t border-white/5 text-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Editorial Header Block */}
       {/* <div className="mb-12 pb-8 border-b border-white/5">
          <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
            SECURE CLIENT PORTAL
          </span>
          <h1 className="text-4xl md:text-6xl font-light font-serif tracking-tight">
            The <span className="font-extrabold font-sans italic text-[#D90429]">Registry</span>
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-3 uppercase tracking-wider">
            MEMBER ID: #ST-99204-BD / LEVEL: ELITE VIP / SECURE SESSION ENCRYPTED
          </p>
        </div> */}

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* 1. Sidebar Panel (Hidden on Mobile, Sticky on Desktop) */}
          <div className="hidden lg:flex bg-[#121212] border border-white/5 p-6 flex-col gap-6 lg:sticky lg:top-24">
            
            {/* Quick Profile Overview */}
            <div className="flex items-center gap-4 pb-6 border-b border-white/5">
              <div className="w-12 h-12 bg-zinc-900 border border-[#D90429]/40 flex items-center justify-center font-mono font-bold text-lg text-[#D90429]">
                YA
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase truncate">
                  {profile.firstName} {profile.lastName}
                </h3>
                <span className="text-[9px] font-mono uppercase bg-[#D90429]/20 text-[#D90429] px-2 py-0.5 font-bold tracking-wider inline-block mt-1">
                  VIP LEVEL II
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-3.5 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-left transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#D90429] text-white font-bold'
                    : 'bg-zinc-950/40 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <User size={14} />
                <span>OVERVIEW</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3.5 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-left transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#D90429] text-white font-bold'
                    : 'bg-zinc-950/40 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <ShoppingBag size={14} />
                <span>ORDER HISTORY</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3.5 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-left transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#D90429] text-white font-bold'
                    : 'bg-zinc-950/40 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <Settings size={14} />
                <span>PROFILE & DETAILS</span>
              </button>

              <button
                onClick={onLogout}
                className="flex items-center gap-3.5 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-left transition-all bg-zinc-950/40 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-white/5 hover:border-red-500/20 cursor-pointer"
              >
                <LogOut size={14} />
                <span>LOGOUT</span>
              </button>
            </nav>

            {/* Quick stats block inside sidebar footer */}
            <div className="bg-black/40 border border-white/5 p-4 rounded-sm mt-2">
              <span className="text-[9px] font-mono uppercase text-zinc-600 block mb-1">TOTAL LOGGED SPENT</span>
              <span className="text-lg font-mono font-bold text-[#F5F1E8]">৳ 17,700</span>
              <div className="w-full bg-zinc-900 h-[3px] mt-3 relative overflow-hidden">
                <div className="bg-[#D90429] h-full w-[72%]" />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-zinc-500 mt-1">
                <span>VIP II</span>
                <span>72% TO VIP III</span>
              </div>
            </div>

          </div>

          {/* 2. Main Content Panel */}
          <div className="lg:col-span-3 min-h-[500px]">
            
            {/* Mobile Navigation Trigger Bar */}
            <div className="lg:hidden mb-6 flex items-center justify-between bg-[#121212] border border-white/5 p-4 rounded-sm">
              <div className="flex items-center gap-3">
                {activeTab === 'overview' && <User className="text-[#D90429]" size={18} />}
                {activeTab === 'orders' && <ShoppingBag className="text-[#D90429]" size={18} />}
                {activeTab === 'profile' && <Settings className="text-[#D90429]" size={18} />}
                <div className="text-left">
                  <span className="text-[9px] font-mono uppercase text-zinc-500 block leading-none">ACTIVE WORKSPACE</span>
                  <span className="text-xs font-mono font-bold tracking-wider text-white uppercase leading-none block mt-1">
                    {activeTab === 'overview' && 'OVERVIEW'}
                    {activeTab === 'orders' && 'ORDER HISTORY'}
                    {activeTab === 'profile' && 'PROFILE & DETAILS'}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="px-4 py-2 bg-[#D90429] hover:bg-[#8B0000] text-white text-[10px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer border border-[#D90429]"
              >
                Switch Tab
              </button>
            </div>
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-8">
                
                {/* Welcome Card banner */}
                <div className="relative bg-gradient-to-r from-zinc-950 to-zinc-900 border border-white/5 p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-5">
                    <ShieldCheck size={180} />
                  </div>
                  
                  <div className="max-w-xl relative z-10">
                    <span className="text-[10px] font-mono bg-[#D90429]/10 text-[#D90429] border border-[#D90429]/20 px-2 py-0.5 rounded-sm font-semibold tracking-widest uppercase">
                      ACTIVE SECURE SESSION
                    </span>
                    <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white mt-4 uppercase tracking-tight">
                      WELCOME BACK, {profile.firstName.toUpperCase()}
                    </h2>
                    <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                      You are in the Blackout elite program. Manage your addresses, review order dispatch tracking codes, and access premium capsule releases before general public launch.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <button 
                      onClick={() => onScrollToSection('shop-page')}
                      className="px-5 py-2.5 bg-[#D90429] hover:bg-[#8B0000] text-white font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>BROWSE THE EXCLUSIVE COLLECTION</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Grid of Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#121212] border border-white/5 p-5">
                    <span className="text-[9px] font-mono text-zinc-500 tracking-wider block mb-1">REGISTERED ORDERS</span>
                    <span className="text-2xl font-mono font-bold text-white">02</span>
                    <span className="text-[9px] font-mono text-[#D90429] block mt-1">1 ACTIVE SHIPMENT</span>
                  </div>

                  <div className="bg-[#121212] border border-white/5 p-5">
                    <span className="text-[9px] font-mono text-zinc-500 tracking-wider block mb-1">WISHLISTED ITEMS</span>
                    <span className="text-2xl font-mono font-bold text-white">{wishlistCount}</span>
                    <span className="text-[9px] font-mono text-[#D90429] block mt-1">EXCLUSIVE SAVED</span>
                  </div>

                  <div className="bg-[#121212] border border-white/5 p-5">
                    <span className="text-[9px] font-mono text-zinc-500 tracking-wider block mb-1">MEMBER BENEFITS</span>
                    <span className="text-2xl font-mono font-bold text-[#D90429]">10% OFF</span>
                    <span className="text-[9px] font-mono text-zinc-500 block mt-1">COUPON: BLACKOUT10</span>
                  </div>

                  <div className="bg-[#121212] border border-white/5 p-5">
                    <span className="text-[9px] font-mono text-zinc-500 tracking-wider block mb-1">LOVELY RATING</span>
                    <span className="text-2xl font-mono font-bold text-emerald-400">9.8</span>
                    <span className="text-[9px] font-mono text-zinc-500 block mt-1">VERIFIED BUYER RATING</span>
                  </div>
                </div>

                {/* Order quick overview */}
                <div className="bg-black border border-white/5 p-6">
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/5">
                    <h3 className="text-xs font-mono font-bold tracking-widest text-[#F5F1E8] uppercase">
                      LATEST ACCOUNT LOG
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-[10px] font-mono text-[#D90429] hover:underline uppercase tracking-wider"
                    >
                      VIEW ALL DETAILS →
                    </button>
                  </div>

                  {/* Sample list of activities */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4 text-xs font-mono">
                      <div className="w-2 h-2 rounded-full bg-[#D90429] mt-1.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-white">ORDER IN TRANSIT [ORD-1092-B2]</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Order has been verified. Current Status: Processing at Dhaka hub.</p>
                      </div>
                      <span className="text-zinc-600 text-[10px]">TODAY</span>
                    </div>

                    <div className="flex items-start gap-4 text-xs font-mono">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-white">COMPLETED PACKAGE DELIVERED [ORD-9284-X9]</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Delivered to Dhanmondi home address. Courier checked out.</p>
                      </div>
                      <span className="text-zinc-600 text-[10px]">10 DAYS AGO</span>
                    </div>

                    <div className="flex items-start gap-4 text-xs font-mono">
                      <div className="w-2 h-2 rounded-full bg-zinc-600 mt-1.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-white">VIP CLEARANCE PORTAL GRANTED</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Automated algorithmic clearance issued for email registry.</p>
                      </div>
                      <span className="text-zinc-600 text-[10px]">30 DAYS AGO</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <h2 className="text-sm font-mono font-bold tracking-widest text-[#F5F1E8] uppercase">
                    ACQUISITIONS ARCHIVE
                  </h2>
                  <span className="text-xs font-mono text-zinc-500">
                    Showing {orders.length} secure logs
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="bg-[#121212] border border-white/5 p-6 hover:border-white/10 transition-all"
                    >
                      {/* Top bar of order card */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#F5F1E8]">
                            {order.id}
                          </span>
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 border ${getStatusStyle(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-zinc-500 flex items-center gap-4">
                          <span>DATE: {order.date}</span>
                          <span className="text-white font-bold">TOTAL: ৳{order.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="py-4 flex flex-col gap-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-zinc-900 border border-white/5 flex-shrink-0 overflow-hidden">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-white truncate">
                                {item.product.name}
                              </h4>
                              <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">
                                SIZE: {item.selectedSize} / QTY: {item.quantity} / PRICE: ৳{item.product.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom action panel */}
                      <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3 items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                          <Truck size={12} className="text-[#D90429]" />
                          <span>TRACKING:</span>
                          <span className="text-white select-all">{order.trackingNumber}</span>
                          <button 
                            onClick={() => copyToClipboard(order.trackingNumber)} 
                            className="text-[#D90429] hover:text-white ml-1 transition-colors"
                          >
                            {copiedCode === order.trackingNumber ? <Check size={10} /> : <Copy size={10} />}
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="px-4 py-2 bg-black hover:bg-zinc-900 border border-white/5 text-[10px] font-mono uppercase font-bold tracking-widest text-[#CFCFCF] hover:text-white transition-all cursor-pointer"
                          >
                            INVOICE DETAILS
                          </button>
                          <button
                            onClick={() => {
                              alert("Support request initiated. VIP Assistant will contact you at yasinarafatazad082@gmail.com within 30 minutes.");
                            }}
                            className="px-4 py-2 bg-[#D90429]/10 hover:bg-[#D90429]/20 text-[#D90429] text-[10px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer"
                          >
                            HELP DESK
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 3: PROFILE MANAGEMENT */}
            {activeTab === 'profile' && (
              <div className="flex flex-col gap-8">
                
                {/* Profile Form */}
                <div className="bg-[#121212] border border-white/5 p-6">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-[#F5F1E8] uppercase mb-6 pb-2 border-b border-white/5">
                    PERSONAL SPECIFICATIONS
                  </h3>

                  <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        FIRST NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.firstName}
                        onChange={e => setProfile({...profile, firstName: e.target.value})}
                        className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        LAST NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.lastName}
                        onChange={e => setProfile({...profile, lastName: e.target.value})}
                        className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        EMAIL ADDRESS (SECURED)
                      </label>
                      <input
                        type="email"
                        disabled
                        value={profile.email}
                        className="w-full bg-zinc-950/60 border border-white/5 py-3 px-4 text-xs font-mono text-zinc-500 cursor-not-allowed outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        PHONE NUMBER
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.phone}
                        onChange={e => setProfile({...profile, phone: e.target.value})}
                        className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                      />
                    </div>

                    <div className="md:col-span-2 mt-4 pb-2 border-b border-white/5">
                      <span className="text-[10px] font-mono tracking-widest text-[#D90429] uppercase font-bold block">
                        SECURE DELIVERY ADDRESS
                      </span>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        STREET ADDRESS / BUILDING / FLOOR
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.street}
                        onChange={e => setProfile({...profile, street: e.target.value})}
                        className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        CITY / PROVINCE
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.city}
                        onChange={e => setProfile({...profile, city: e.target.value})}
                        className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        POSTAL CODE
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.postalCode}
                        onChange={e => setProfile({...profile, postalCode: e.target.value})}
                        className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        COUNTRY
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.country}
                        onChange={e => setProfile({...profile, country: e.target.value})}
                        className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                      />
                    </div>

                    <div className="md:col-span-2 pt-4 flex items-center justify-between">
                      {saveStatus === 'success' && (
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle size={14} /> CHANGES SECURED SUCCESSFULLY
                        </span>
                      )}
                      {saveStatus === 'saving' && (
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider animate-pulse">
                          ENCRYPTING PROTOCOL...
                        </span>
                      )}
                      {saveStatus === 'idle' && <div />}

                      <button
                        type="submit"
                        disabled={saveStatus === 'saving'}
                        className="px-6 py-3 bg-[#D90429] hover:bg-[#8B0000] disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all ml-auto cursor-pointer"
                      >
                        SAVE SPECIFICATIONS
                      </button>
                    </div>
                  </form>
                </div>

                {/* Password Form */}
                <div className="bg-[#121212] border border-white/5 p-6">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-[#F5F1E8] uppercase mb-6 pb-2 border-b border-white/5">
                    SECURITY KEY OVERRIDE
                  </h3>

                  <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                        CURRENT ACCESS KEY
                      </label>
                      <input
                        type="password"
                        required
                        value={passwordState.currentPassword}
                        onChange={e => setPasswordState({...passwordState, currentPassword: e.target.value})}
                        className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                          NEW ACCESS KEY
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordState.newPassword}
                          onChange={e => setPasswordState({...passwordState, newPassword: e.target.value})}
                          className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">
                          CONFIRM NEW ACCESS KEY
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordState.confirmPassword}
                          onChange={e => setPasswordState({...passwordState, confirmPassword: e.target.value})}
                          className="w-full bg-black border border-white/5 py-3 px-4 text-xs font-mono text-white focus:border-[#D90429] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      {passwordStatus === 'success' && (
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                          ACCESS KEY RE-PROGRAMMED
                        </span>
                      )}
                      {passwordStatus === 'error' && (
                        <span className="text-xs font-mono text-[#D90429] uppercase tracking-wider">
                          ERROR: KEY MISMATCH OR INVALID KEY
                        </span>
                      )}
                      {passwordStatus === 'idle' && <div />}

                      <button
                        type="submit"
                        className="px-6 py-3 bg-zinc-950 hover:bg-zinc-900 text-[#D90429] border border-white/5 font-mono text-xs uppercase tracking-widest font-bold transition-all ml-auto cursor-pointer"
                      >
                        UPDATE KEYS
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Invoice Modal Details overlay */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setSelectedOrderDetails(null)} 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          />
          
          <div className="relative bg-[#0D0D0D] border border-white/10 w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setSelectedOrderDetails(null)} 
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header of invoice */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono bg-[#D90429] text-white px-2 py-0.5 font-bold uppercase">
                  OFFICIAL ARCHIVAL SPEC
                </span>
                <h3 className="text-2xl font-serif tracking-tight text-white mt-3">
                  Acquisition <span className="font-sans italic font-extrabold text-[#D90429]">Receipt</span>
                </h3>
                <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">
                  ORDER: {selectedOrderDetails.id} / ISSUED: {selectedOrderDetails.date}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-serif font-bold italic tracking-tight text-[#F5F1E8]">STYLEE</span>
                <p className="text-[9px] font-mono text-zinc-500 uppercase">DHAKA HEADQUARTERS</p>
              </div>
            </div>

            {/* Details and breakdown */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Shipping info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-zinc-600 uppercase block mb-1">RECIPIENT PORTAL</span>
                  <p className="text-white font-bold">{profile.firstName} {profile.lastName}</p>
                  <p className="text-zinc-400 mt-1">{profile.street}</p>
                  <p className="text-zinc-400">{profile.city}, {profile.postalCode}, {profile.country}</p>
                  <p className="text-zinc-500 mt-1">{profile.phone}</p>
                </div>

                <div>
                  <span className="text-[9px] text-zinc-600 uppercase block mb-1">PAYMENT & DELIVERY STATUS</span>
                  <p className="text-white">METHOD: <span className="font-bold">{selectedOrderDetails.paymentMethod}</span></p>
                  <p className="text-white mt-1">STATUS: <span className="text-[#D90429] font-bold uppercase">{selectedOrderDetails.status}</span></p>
                  <p className="text-zinc-500 mt-1">TRACKING: {selectedOrderDetails.trackingNumber}</p>
                </div>
              </div>

              {/* Items Breakdown */}
              <div>
                <span className="text-[9px] font-mono text-zinc-600 uppercase block mb-3">CONSOLIDATED CAPSULES</span>
                <div className="flex flex-col gap-3">
                  {selectedOrderDetails.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono py-2 border-b border-white/5">
                      <div>
                        <span className="text-white font-bold block">{item.product.name}</span>
                        <span className="text-[10px] text-zinc-500">SIZE: {item.selectedSize} × {item.quantity}</span>
                      </div>
                      <span className="text-[#F5F1E8] font-bold">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary line totals */}
              <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4 text-xs font-mono text-right">
                <div className="flex justify-between">
                  <span className="text-zinc-500">SUBTOTAL</span>
                  <span className="text-white">৳{selectedOrderDetails.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">DISPATCH COURIER</span>
                  <span className="text-emerald-400">FREE VIP SECURED</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-2 text-[#D90429]">
                  <span>TOTAL CHARGED</span>
                  <span>৳{selectedOrderDetails.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Bottom action panel of order details */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 mb-6">
              <button
                onClick={() => handleDownloadPDF(selectedOrderDetails)}
                className="flex-1 py-3 bg-[#D90429] hover:bg-[#8B0000] text-white text-[11px] font-mono uppercase tracking-[0.15em] font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#D90429]"
              >
                <Download size={13} />
                <span>DOWNLOAD INVOICE (.PDF)</span>
              </button>
              <button
                onClick={() => handleDownloadInvoice(selectedOrderDetails)}
                className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] font-mono uppercase tracking-[0.15em] font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/5"
              >
                <Download size={13} />
                <span>DOWNLOAD INVOICE (.TXT)</span>
              </button>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-5 py-3 bg-black hover:bg-zinc-950 text-zinc-500 hover:text-white text-[11px] font-mono uppercase tracking-[0.15em] transition-all cursor-pointer border border-white/5"
              >
                CLOSE
              </button>
            </div>

            {/* Footer stamp */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                AUTHENTIC BLACKOUT COMMERCE SPECIFICATION 2026
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation for Dashboard Tabs */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="dashboard-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              id="dashboard-drawer-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-[#0C0C0C] border-r border-white/5 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 lg:hidden"
            >
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#D90429]" />
                    <span className="text-xs font-mono tracking-widest uppercase text-white font-bold">PORTAL MENU</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Profile overview inside mobile drawer */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <div className="w-10 h-10 bg-zinc-900 border border-[#D90429]/40 flex items-center justify-center font-mono font-bold text-base text-[#D90429]">
                    YA
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase truncate">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <span className="text-[8px] font-mono uppercase bg-[#D90429]/20 text-[#D90429] px-2 py-0.5 font-bold tracking-wider inline-block mt-1">
                      VIP LEVEL II
                    </span>
                  </div>
                </div>

                {/* Tab selections */}
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('overview');
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`flex items-center gap-3.5 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-left transition-all cursor-pointer ${
                      activeTab === 'overview'
                        ? 'bg-[#D90429] text-white font-bold'
                        : 'bg-zinc-950/40 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <User size={14} />
                    <span>OVERVIEW</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('orders');
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`flex items-center gap-3.5 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-left transition-all cursor-pointer ${
                      activeTab === 'orders'
                        ? 'bg-[#D90429] text-white font-bold'
                        : 'bg-zinc-950/40 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <ShoppingBag size={14} />
                    <span>ORDER HISTORY</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`flex items-center gap-3.5 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-left transition-all cursor-pointer ${
                      activeTab === 'profile'
                        ? 'bg-[#D90429] text-white font-bold'
                        : 'bg-zinc-950/40 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <Settings size={14} />
                    <span>PROFILE & DETAILS</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileDrawerOpen(false);
                    }}
                    className="flex items-center gap-3.5 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-left transition-all bg-zinc-950/40 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-white/5 hover:border-red-500/20 cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>LOGOUT</span>
                  </button>
                </nav>
              </div>

              {/* Drawer bottom metrics block */}
              <div className="bg-black/40 border border-white/5 p-4 rounded-sm mt-auto">
                <span className="text-[8px] font-mono uppercase text-zinc-600 block mb-1">TOTAL LOGGED SPENT</span>
                <span className="text-base font-mono font-bold text-[#F5F1E8]">৳ 17,700</span>
                <div className="w-full bg-zinc-900 h-[3px] mt-2 relative overflow-hidden">
                  <div className="bg-[#D90429] h-full w-[72%]" />
                </div>
                <div className="flex justify-between text-[7px] font-mono text-zinc-500 mt-1">
                  <span>VIP II</span>
                  <span>72% TO VIP III</span>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}