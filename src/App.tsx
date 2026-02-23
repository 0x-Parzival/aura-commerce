import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import GlassCard from "./components/GlassCard";
import MakhanaListing from "./pages/MakhanaListing";
import ProductDetail from "./pages/ProductDetail";
import ContactUs from "./pages/ContactUs";
import AdminPage from "./pages/AdminPage";
import { CartProvider, useCart } from "./context/CartContext";
import { useState } from "react";
import CartDrawer from "./components/CartDrawer";
import { ShoppingCart } from "lucide-react";

const queryClient = new QueryClient();

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100 font-sans text-gray-900">
      {/* Background Image - Makhana Field */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/makhana-harvest-bg.png')" }}
      />

      {/* Overlay for "white translucent glassy vibe" and blurring the background as requested */}
      <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-md" />

      {/* Main Content Container - Maximize space as requested */}
      <div className="relative z-10 w-full h-full flex flex-col p-4 md:p-8 lg:p-10 w-full mx-auto">

        {/* Header */}
        <header className="flex justify-between items-center mb-4 xl:mb-6 px-2 md:px-4">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Official Logo */}
            <img src="/assets/logo.jpeg" alt="Genus Agro Logo" className="h-12 md:h-16 w-auto mix-blend-multiply rounded-lg" />
            <div className="flex flex-col">
              {/* Updated Title: Genus (Orange), Agro Food (Green) */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#e2c044] tracking-tight whitespace-nowrap">
                Genus <span className="text-[#2d6a4f]">Agro Food</span>
              </h1>
              <span className="text-[10px] md:text-xs lg:text-sm font-medium text-[#2d6a4f] uppercase tracking-widest hidden md:block">
                Agro Foods
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/contact">
              <div className="text-gray-800 font-bold hover:text-white cursor-pointer transition-all duration-300 bg-white/30 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl backdrop-blur-md border border-white/50 hover:bg-orange-500 hover:border-orange-500 shadow-sm text-xs md:text-base whitespace-nowrap">
                Contact
              </div>
            </Link>
          </div>
        </header>

        {/* Content Area - Horizontal Scroll on Mobile, Full Layout on Desktop */}
        <main className="flex-1 flex overflow-x-auto snap-x snap-mandatory md:overflow-visible md:justify-center md:items-center gap-4 xl:gap-8 perspective-container w-full md:w-[90%] mx-auto pb-8 md:pb-0 px-4 md:px-0 no-scrollbar">
          {/* Card 1: Makhana */}
          <Link to="/makhana" className='contents'>
            <GlassCard
              image="/assets/banner.jpeg"
              video="/videos/makhana.mp4"
              title="Makhana"
              description="Genus Agro brings the best quality makhana straight from the heart of Bihar. Our fox nuts are organic, large, and popped to perfection."
              buttonText="Buy Now"
              isAvailable={true}
              className="md:flex-1 h-[70vh] md:h-[78vh] w-[85vw] md:w-auto flex-none snap-center max-w-none"
            />
          </Link>

          {/* Card 2: Tea */}
          <GlassCard
            image="/assets/tea.png"
            title="Tea"
            description="Genus Agro imports the finest quality teas from the misty hills of Darjeeling. Experience the aromatic blend of premium leaves."
            buttonText="Unavailable"
            isAvailable={false}
            className="md:flex-1 h-[70vh] md:h-[78vh] w-[85vw] md:w-auto flex-none snap-center max-w-none"
          />

          {/* Card 3: Jaggery */}
          <GlassCard
            image="/assets/jaggery.png"
            title="Jaggery"
            description="Genus Agro brings the best quality jaggery from Muzaffarnagar. Our artisanal gur is chemical-free and retains natural richness."
            buttonText="Unavailable"
            isAvailable={false}
            className="md:flex-1 h-[70vh] md:h-[78vh] w-[85vw] md:w-auto flex-none snap-center max-w-none"
          />
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <CartProvider>
        <BrowserRouter>
          <GlobalCartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Legacy Product Page for PDF extraction specific request, kept for reference if needed, but linking to new listing */}
            <Route path="/makhana" element={<MakhanaListing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const GlobalCartDrawer = () => {
  const { isCartOpen, setIsCartOpen } = useCart();
  return <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />;
};

export default App;
