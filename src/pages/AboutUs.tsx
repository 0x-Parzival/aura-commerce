import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Leaf, 
    ShieldCheck, 
    Globe, 
    Award, 
    Truck, 
    Users, 
    TrendingUp,
    CheckCircle2,
    Building2,
    Heart,
    ShoppingCart,
    Package,
    Tag,
    Shield,
    Phone,
    Mail,
    MapPin,
    ArrowRight
} from 'lucide-react';
import { cn } from "@/lib/utils";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden relative">
            {/* Background Decorations */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] -right-[5%] w-[40%] h-[40%] bg-orange-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-green-200/20 rounded-full blur-3xl" />
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
                </div>
            </nav>

            <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
                
                {/* Hero Section */}
                <section className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100 mb-6 shadow-sm">
                        <Award className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-bold text-orange-800 uppercase tracking-widest">Trusted Makhana Supplier from Bihar</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Healthy Nutrition. Honest Roots. <br />
                        <span className="bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">Global Reach.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed italic max-w-3xl mx-auto">
                        "At Genus Agro Food, we bring you the finest quality makhana directly from the fields of Bihar. 
                        We are a family-driven business built on trust, tradition, and taste."
                    </p>
                </section>

                {/* KPI Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
                    {[
                        { label: "Years Of Experience", value: "10" },
                        { label: "Product Category", value: "20" },
                        { label: "Natural & Vegan", value: "100%" },
                        { label: "Happy Clients", value: "3000+" }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white/40 backdrop-blur-md border border-white/60 p-6 md:p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all">
                            <p className="text-3xl md:text-5xl font-black text-orange-600 mb-2">{stat.value}</p>
                            <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Why Choose Us */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Genus Agro?</h2>
                        <p className="text-gray-600">When you buy from us, you get premium quality and unmatched service.</p>
                        <div className="h-1.5 w-20 bg-orange-500 rounded-full mx-auto mt-4"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: Truck, title: "Home Delivery", desc: "Available across India." },
                                { icon: Tag, title: "Lowest Prices", desc: "Guaranteed best market rates." },
                                { icon: ShieldCheck, title: "Certified & Safe", desc: "FSSAI Approved & ISO Certified." },
                                { icon: Globe, title: "Export Quality", desc: "100% Natural & Export-ready." },
                                { icon: Building2, title: "Govt Trusted", desc: "Trusted by government agencies." },
                                { icon: Package, title: "Wide Range", desc: "Raw or Flavored available." },
                                { icon: Shield, title: "Food-Grade", desc: "High-quality packaging only." },
                                { icon: Heart, title: "Bihar's Heart", desc: "Sourced from Darbhanga & Mithila." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/50 hover:bg-white/50 transition-all shadow-sm flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                        <item.icon className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-xs text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-5">
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                                <img src="/assets/products/makhana-combo-real.jpg" alt="Our Premium Range" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                                    <p className="text-white font-bold text-xl italic">"Premium, export-quality fox nuts packed with nutrition."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Strength */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <TrendingUp className="text-orange-500" />
                                Our Strength in Bihar!
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                <p>
                                    We started as a fox nut supplier in Bihar and grew into a trusted lotus seed supplier. 
                                    Over the years, our network expanded to makhana wholesale and now we serve as a 
                                    leading makhana bulk supplier in the region.
                                </p>
                                <p>
                                    With our roots in tradition, we became a known phool makhana supplier and earned the 
                                    trust of buyers as the best in the business. We are also proud to serve health-conscious 
                                    customers as an organic makhana supplier.
                                </p>
                                <p>
                                    Strong networks and consistent quality help us operate as reliable makhana manufacturers 
                                    and distributors across the state.
                                </p>
                            </div>
                            
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl overflow-hidden shadow-lg h-32">
                                    <img src="/assets/products/makhana-bulk.jpg" alt="Bulk Makhana" className="w-full h-full object-cover" />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg h-32">
                                    <img src="/assets/products/makhana-loose-detailed.png" alt="Makhana Quality" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                                <img src="/assets/makhana-harvest-bg.png" alt="Bihar Fields" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-10 -left-10 bg-green-600 text-white p-6 rounded-3xl shadow-xl hidden md:block rotate-[-5deg]">
                                    <p className="font-bold text-xl">Darbhanga</p>
                                    <p className="text-xs uppercase tracking-widest opacity-80 text-center">Our Heartland</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who We Work With */}
                <section className="bg-gradient-to-br from-green-900 to-green-800 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden mb-24">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Partner With</h2>
                            <p className="text-green-50/80 text-lg leading-relaxed mb-10">
                                We supply both bulk and customized packaging as a responsible manufacturer and trader.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    { icon: Building2, label: "Wholesale Order" },
                                    { icon: ShoppingCart, label: "Retail Chains" },
                                    { icon: Award, label: "Private Label" },
                                    { icon: Truck, label: "Supermarkets" }
                                ].map((p, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all cursor-default">
                                        <p.icon className="w-5 h-5 text-orange-400" />
                                        <span className="font-medium">{p.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                                <h3 className="text-xl font-bold mb-4 text-orange-400 italic font-display">"Bihar's Pride, Globally Recognised"</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full border-2 border-orange-400 overflow-hidden">
                                        <img src="/assets/amarjeet.png" alt="Amarjeet Kumar" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Amarjeet Kumar</p>
                                        <p className="text-xs text-green-200 uppercase tracking-widest">Founder & Visionary</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-5 space-y-6">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                                <img src="/assets/products/makhana-biharbhog-real.png" alt="Traditional Branded Packaging" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                                <img src="/assets/products/makhana-bulk.jpg" alt="Bulk Logistics" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enquire CTA */}
                <section className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold mb-6">Ready to Partner with Bihar's Best?</h2>
                    <p className="text-gray-600 mb-10 text-lg">
                        Whether you need bulk raw makhana or customized private labels, 
                        Genus Agro Food delivers perfection in every bag.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-orange-500/30 hover:scale-105 active:scale-95 group">
                        Contact Us Today
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </section>

            </main>

            {/* Comprehensive Footer with Quick Links */}
            <footer className="bg-white border-t border-gray-100 relative z-10">
                <div className="container mx-auto px-4 pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Column 1: About */}
                        <div className="space-y-6">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-green-600 flex items-center justify-center text-white font-bold">G</div>
                                <span className="font-bold text-2xl tracking-tight text-gray-900">Genus <span className="text-green-700">Agro</span></span>
                            </Link>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Looking for a snack that's light, healthy, and absolutely delicious? 
                                Choose Genus Agro – your trusted source for premium, export-quality fox nuts. 
                                Packed with protein, fiber, and essential minerals.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-all cursor-pointer">
                                    <Globe className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-6 pb-2 border-b-2 border-orange-500 w-fit">Quick Links</h4>
                            <ul className="space-y-4">
                                {[
                                    { label: "Home", to: "/" },
                                    { label: "About Us", to: "/about" },
                                    { label: "Products", to: "/makhana" },
                                    { label: "Contact Us", to: "/contact" },
                                    { label: "Admin Panel", to: "/admin" }
                                ].map((link, idx) => (
                                    <li key={idx}>
                                        <Link to={link.to} className="text-gray-600 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contact Info */}
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-6 pb-2 border-b-2 border-green-600 w-fit">Contact Us</h4>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-600">Sector 62, Noida, Uttar Pradesh, India</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                    <a href="mailto:Sales@genusagrofoods.com" className="text-gray-600 hover:text-orange-600 transition-colors">Sales@genusagrofoods.com</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-600">+91 98739 61111</span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: More Links */}
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-6 pb-2 border-b-2 border-orange-500 w-fit">Special Requests</h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/contact" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Bulk Raw Makhana Order</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">B2B Partnership Enquiry</Link>
                                </li>
                                <li>
                                    <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                        <p className="text-xs text-orange-800 font-bold mb-2">WHATSAPP US</p>
                                        <p className="text-sm font-black text-gray-900">+91 98739 61111</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
                        <p>© 2026 Genus Agro Food. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span className="hover:text-orange-600 cursor-pointer transition-colors">Terms of Service</span>
                            <span className="hover:text-orange-600 cursor-pointer transition-colors">Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
