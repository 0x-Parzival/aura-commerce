import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Heart, ShoppingBag, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { inferSection, useMakhanaProducts, useMakhanaSettings } from '@/data/makhanaStore';
import { Product } from '@/data/products';
import { cn } from "@/lib/utils";
import { useCart } from '../context/CartContext';
import { toast } from "sonner";

const MakhanaListing = () => {
    const { addToCart, setIsCartOpen, totalItems } = useCart();
    const { items: products } = useMakhanaProducts();
    const { settings } = useMakhanaSettings();

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            productId: product.id,
            title: product.title,
            price: product.price,
            grade: product.grade,
            image: product.image
        }, 1);
        toast.success(`${product.title} added to cart!`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30 font-sans text-gray-900 overflow-x-hidden relative">
            {/* Background Decorations */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-200/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] bg-orange-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navigation */}
            <nav className="relative z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900" aria-label="Go back">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-green-600 flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">G</div>
                            <span className="font-bold text-xl tracking-tight">Genus <span className="text-green-700">Agro</span></span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 md:gap-6">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5 md:w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
                            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
                            <Link to="/contact" className="hover:text-orange-600 transition-colors">Contact</Link>
                            <Link to="/admin" className="hover:text-orange-600 transition-colors">Admin</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-12 pb-16 px-4 md:px-8 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100 mb-6 shadow-sm">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-bold text-orange-800 uppercase tracking-widest">{settings.heroBadge}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    {settings.heroTitleLine1} <br />
                    <span className="bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">{settings.heroTitleLine2}</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                    {settings.heroDescription}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-10">
                    {[
                        { icon: Leaf, label: "100% Organic", color: "text-green-600" },
                        { icon: ShieldCheck, label: "GI Tag Certified", color: "text-blue-600" },
                        { icon: Heart, label: "Heart Healthy", color: "text-red-500" }
                    ].map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-default">
                            <badge.icon className={cn("w-5 h-5", badge.color)} />
                            <span className="text-sm font-bold text-gray-800">{badge.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Grid */}
            <main className="relative z-10 container mx-auto px-4 pb-32">
                {/* Retail Section */}
                <div className="mb-20">
                    <div className="flex flex-col items-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{settings.retailTitle}</h2>
                        <div className="h-1.5 w-20 bg-orange-500 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {products.filter((p) => inferSection(p) === 'green').map((product) => (
                            <ProductCardItem key={product.id} product={product} handleAddToCart={handleAddToCart} />
                        ))}
                    </div>
                </div>

                {/* Loose Section */}
                <div className="mb-20">
                    <div className="flex flex-col items-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{settings.looseTitle}</h2>
                        <p className="text-gray-500 text-sm mb-4">{settings.looseCaption}</p>
                        <div className="h-1.5 w-20 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {products.filter((p) => inferSection(p) === 'loose').map((product) => (
                            <ProductCardItem key={product.id} product={product} handleAddToCart={handleAddToCart} />
                        ))}
                    </div>
                </div>

                {/* Commercial Section */}
                <div className="mb-8">
                    <div className="flex flex-col items-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{settings.packetTitle}</h2>
                        <div className="h-1.5 w-20 bg-orange-500 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {products.filter((p) => inferSection(p) === 'packet').map((product) => (
                            <ProductCardItem key={product.id} product={product} handleAddToCart={handleAddToCart} />
                        ))}
                    </div>
                </div>
            </main>

            <footer className="relative z-10 bg-white border-t border-gray-100 py-12 px-4 text-center">
                <p className="text-gray-400 text-sm font-medium">© 2026 Genus Agro Foods. All rights reserved.</p>
            </footer>
        </div>
    );
};

const ProductCardItem = ({ product, handleAddToCart }: { product: Product, handleAddToCart: (e: React.MouseEvent, product: Product) => void }) => (
    <div className="group relative">
        <Link to={`/product/${product.id}`} className="block h-full">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(234,88,12,0.15)] flex flex-col h-full bg-gradient-to-b from-white to-orange-50/20">
                {/* Image Container */}
                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8 bg-gray-50 group-hover:bg-white transition-colors duration-500 shadow-inner">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="bg-white/90 backdrop-blur-md text-orange-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm border border-orange-100 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            BEST SELLER
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 animate-bounce-slow">
                        <div className="bg-green-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg text-center">
                            {product.grade}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                    <div className="text-orange-600 text-[10px] font-black uppercase tracking-widest mb-2 px-1">
                        {product.subtitle}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3 px-1 group-hover:text-orange-600 transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 px-1">
                        {product.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                    <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Fixed Price</span>
                        <span className="text-2xl font-black text-gray-900">{product.price}</span>
                    </div>
                    <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:scale-110 active:scale-95 group/btn"
                    >
                        <ShoppingBag className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </Link>
    </div>
);

export default MakhanaListing;
