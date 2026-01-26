import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronRight, Star, ShoppingBag, Truck, Shield, Award, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { cn } from "@/lib/utils";
import OrderModal from '../components/OrderModal';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";

const SLIDE_COUNT = 12;

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === id);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, setIsCartOpen, totalItems } = useCart();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDE_COUNT);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
    }

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            title: product.title,
            price: product.price,
            grade: product.grade,
            image: product.image
        }, quantity);
        toast.success(`Added ${quantity} ${product.title} to cart!`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30 font-sans text-gray-900">
            {/* Navigation Breadcrumb */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-20 backdrop-blur-sm bg-white/95">
                <div className="container mx-auto px-4 py-3 md:py-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Link to="/makhana" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900" aria-label="Go back">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                    <Link to="/makhana" className="hover:text-orange-600 transition-colors">Makhana</Link>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                    <div className="flex-1 truncate">{product.title}</div>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-6 md:py-12 pb-24 md:pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16">

                    {/* Visual Section */}
                    <div className="space-y-4 md:space-y-6">
                        {/* Main Product Image */}
                        <div className="relative aspect-square bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-100 p-4 md:p-8 group text-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 mx-auto"
                            />
                            <div className="absolute top-3 left-3 md:top-6 md:left-6 flex flex-col gap-2">
                                <span className="bg-green-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg backdrop-blur-sm bg-opacity-95 flex items-center gap-1">
                                    <Award className="w-3 h-3" />
                                    100% Organic
                                </span>
                                <span className="bg-orange-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg backdrop-blur-sm bg-opacity-95">
                                    {product.grade}
                                </span>
                            </div>
                        </div>

                        {/* Secondary Image */}
                        {product.secondaryImage && (
                            <div className="relative aspect-video bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                <img
                                    src={product.secondaryImage}
                                    alt={`${product.title} Back View`}
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                                    Package Back
                                </div>
                            </div>
                        )}

                        {/* Farm Slideshow */}
                        <div className="bg-gradient-to-br from-orange-50 to-green-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-orange-100/50 shadow-sm">
                            <h4 className="text-xs md:text-sm font-bold text-orange-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                From Our Farms to You
                            </h4>
                            <div className="relative w-full aspect-[2/1] bg-white rounded-xl overflow-hidden shadow-md border border-white">
                                {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "absolute inset-0 transition-opacity duration-700 ease-in-out",
                                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                        )}
                                    >
                                        <img
                                            src={`/assets/makhana-slides/slide-${String(index + 1).padStart(2, '0')}.jpg`}
                                            alt="Farm slide"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-20 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col">
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
                            </div>
                            <span className="text-xs md:text-sm text-gray-600 font-medium">(128 Verified Reviews)</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 md:mb-5 leading-tight">
                            {product.title}
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8 border-l-4 border-orange-400 pl-4 md:pl-6 italic bg-white/70 py-3 rounded-r-lg shadow-sm">
                            {product.description}
                        </p>

                        {/* Nutritional Info Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 md:mb-8">
                            {product.nutritionalInfo.map((info, idx) => (
                                <div key={idx} className="bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm text-center transform hover:-translate-y-1 transition-all cursor-default">
                                    <div className="text-[10px] md:text-xs text-green-700 font-bold uppercase tracking-wider mb-1">{info.label}</div>
                                    <div className="text-base md:text-xl font-bold text-gray-900">{info.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Price & Quantity & Packaging */}
                        <div className="bg-gradient-to-r from-white to-green-50/50 p-4 md:p-6 rounded-2xl border border-gray-100 shadow-md mb-6 md:mb-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div>
                                        <span className="block text-xs md:text-sm text-gray-600 font-medium mb-1">Price per Unit</span>
                                        <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                            {product.price}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs md:text-sm text-gray-600 font-medium">Quantity</span>
                                            <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                                                Total: {product.weightInGrams * quantity >= 1000
                                                    ? `${(product.weightInGrams * quantity / 1000).toFixed(1)} kg`
                                                    : `${product.weightInGrams * quantity} g`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 bg-gray-100 px-3 py-2 rounded-xl border border-gray-200">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="p-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm transition-all active:scale-90"
                                            >
                                                <Minus className="w-5 h-5 font-bold" />
                                            </button>
                                            <span className="text-xl font-black w-8 text-center text-gray-900">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="p-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm transition-all active:scale-90"
                                            >
                                                <Plus className="w-5 h-5 font-bold" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-100"></div>

                                <div>
                                    <span className="block text-xs md:text-sm text-gray-600 font-medium mb-2">Available Packs</span>
                                    <div className="flex flex-wrap gap-2">
                                        {product.packaging.map(pack => (
                                            <span key={pack} className="text-xs font-bold px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all cursor-pointer shadow-sm">
                                                {pack}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="fixed bottom-0 left-0 right-0 md:static bg-white/95 backdrop-blur-md md:bg-transparent p-4 md:p-0 border-t md:border-0 border-gray-200 z-30 shadow-lg md:shadow-none space-y-3">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-white border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 font-bold py-4 md:py-5 rounded-xl md:rounded-2xl shadow-sm text-lg md:text-xl flex items-center justify-center gap-3 group transition-all transform active:scale-95"
                                >
                                    <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => setIsOrderModalOpen(true)}
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 md:py-5 rounded-xl md:rounded-2xl shadow-2xl shadow-orange-500/30 text-lg md:text-xl flex items-center justify-center gap-3 group transition-all transform active:scale-95 hover:scale-[1.02]"
                                >
                                    Buy Now
                                </button>
                            </div>
                            <p className="text-center text-xs md:text-sm text-green-700 font-medium flex items-center justify-center gap-2">
                                <Truck className="w-3 h-3 md:w-4 md:h-4" /> Free Shipping on orders above ₹999
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 md:mt-12 mb-20 md:mb-0">
                            {product.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-orange-50/50 to-green-50/50 border border-orange-100/50 rounded-xl hover:bg-orange-100/50 transition-all shadow-sm">
                                    <div className="p-2 bg-white rounded-full shadow-sm">
                                        <Shield className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                                    </div>
                                    <span className="font-medium text-gray-800 text-sm md:text-base">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Order Modal */}
            {product && (
                <OrderModal
                    isOpen={isOrderModalOpen}
                    onClose={() => setIsOrderModalOpen(false)}
                    items={[{
                        title: product.title,
                        price: product.price,
                        grade: product.grade,
                        quantity: quantity
                    }]}
                />
            )}
        </div>
    );
};

export default ProductDetail;
