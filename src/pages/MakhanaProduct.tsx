import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';

// Assuming slides are named slide-01.jpg, slide-02.jpg etc. 
// We will determine the exact count or just loop a safe number
const SLIDE_COUNT = 12;

const MakhanaProduct = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % SLIDE_COUNT);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
    };

    // Auto-advance slideshow
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
            {/* Background with blur (borrowed from Home) */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('/assets/makhana-harvest-bg.png')" }}
            />

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Navigation */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Makhana</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Slideshow */}
                    <div className="space-y-4">
                        <div className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group">
                            {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "absolute inset-0 transition-opacity duration-700 ease-in-out",
                                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                    )}
                                >
                                    <img
                                        // Adjust filename padding logic if needed (pdftoppm usually outputs slide-01.jpg)
                                        src={`/assets/makhana-slides/slide-${String(index + 1).padStart(2, '0')}.jpg`}
                                        alt={`Overview Slide ${index + 1}`}
                                        className="w-full h-full object-contain bg-white"
                                    />
                                </div>
                            ))}

                            {/* Controls */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 opacity-0 group-hover:opacity-100"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-800" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 opacity-0 group-hover:opacity-100"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-800" />
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            index === currentSlide ? "bg-orange-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-500 italic">
                            Slides from our Global Excellence presentation
                        </p>
                    </div>

                    {/* Right Column: Details */}
                    <div className="flex flex-col space-y-8 bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-lg">
                        <div>
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold tracking-wider uppercase rounded-full mb-4">
                                Premium Export Quality
                            </span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 leading-tight">
                                Organic Bihar <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                                    Fox Nuts (Makhana)
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed text-balance">
                                Sourced directly from the pristine wetlands of Bihar, our Makhana is hand-picked, naturally popped, and carefully graded to ensure
                                maximum crunch and nutrition. A perfect guilt-free snack for the health-conscious modern lifestyle.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-green-700 mb-1">100%</div>
                                <div className="text-sm text-gray-500 font-medium">Organic & Natural</div>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-orange-600 mb-1">Premium</div>
                                <div className="text-sm text-gray-500 font-medium">5A+ Grade Size</div>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-blue-600 mb-1">Bihar</div>
                                <div className="text-sm text-gray-500 font-medium">GI Tagged Origin</div>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-purple-600 mb-1">Superfood</div>
                                <div className="text-sm text-gray-500 font-medium">Rich in Protein</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900">Key Benefits:</h3>
                            <ul className="space-y-2">
                                {["Low Calorie & High Fiber", "Gluten-Free & Vegan Friendly", "Rich in Antioxidants (Kaempferol)", "Supports Heart Health"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-green-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-gray-200/60">
                            <button className="w-full btn-premium py-4 text-lg shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:-translate-y-1">
                                Place Bulk Order
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-3">
                                Available in various packaging sizes (250g, 500g, 1kg, Bulk)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakhanaProduct;
