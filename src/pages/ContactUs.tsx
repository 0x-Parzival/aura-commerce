import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, Globe, Heart, Building2, ArrowLeft } from 'lucide-react';
import { cn } from "@/lib/utils";

const ContactUs = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const isFormValid = formData.name && formData.email && formData.subject && formData.message;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct mailto link
        // This opens the user's default email client, effectively sending "from the id of the person who is sending the mail"
        const mailtoLink = `mailto:Sales@genusagrofoods.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`
        )}`;

        window.location.href = mailtoLink;
    };

    // Reusing the simple text inputs but styled for glassmorphism
    const InputField = ({ name, placeholder, type = "text", rows }: { name: string, placeholder: string, type?: string, rows?: number }) => (
        <div className="relative group">
            {rows ? (
                <textarea
                    name={name}
                    rows={rows}
                    placeholder={placeholder}
                    value={(formData as any)[name]}
                    onChange={handleInputChange}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/40 transition-all resize-none"
                    required
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={(formData as any)[name]}
                    onChange={handleInputChange}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/40 transition-all"
                    required
                />
            )}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden relative">
            {/* Background */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/makhana-harvest-bg.png')" }}
            />
            <div className="fixed inset-0 z-0 bg-white/40 backdrop-blur-xl" />

            {/* Navigation Breadcrumb */}
            <nav className="relative z-10 container mx-auto px-4 py-6 flex items-center gap-2 text-sm text-gray-600">
                <Link to="/" className="p-2 -ml-2 hover:bg-white/50 rounded-full transition-colors text-gray-900" aria-label="Go back">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link to="/" className="hover:text-orange-600 font-medium">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-bold">Contact Us</span>
            </nav>

            <main className="relative z-10 container mx-auto px-4 pb-20">

                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-[#2d6a4f] tracking-tight">
                        Get in <span className="text-[#e2c044]">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        We'd love to hear from you. Reach out to us for enquiries, collaborations, or just to say hello.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Founder Spotlight & Info */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Founder Card */}
                        <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <div className="flex flex-col items-center text-center">
                                <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden mb-6 relative">
                                    <img src="/assets/amarjeet.png" alt="Amarjeet Kumar" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Amarjeet Kumar</h2>
                                <p className="text-orange-600 font-medium tracking-wide uppercase text-xs mb-4">Visionary Philanthropist & Social Entrepreneur</p>

                                <blockquote className="italic text-gray-600 mb-6 text-sm relative px-4">
                                    <span className="text-4xl text-orange-200 absolute top-0 left-0 -translate-y-2">"</span>
                                    Service is the cement that binds life with love and trust.
                                    <span className="text-4xl text-orange-200 absolute bottom-0 right-0 translate-y-4">"</span>
                                </blockquote>

                                {/* Personal Website Button */}
                                <a href="https://bhumiharamarjeet.com/" target="_blank" rel="noreferrer" className="mb-6 inline-flex items-center gap-2 px-6 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold hover:bg-orange-200 transition-colors">
                                    <Globe className="w-4 h-4" />
                                    Visit Personal Website
                                </a>

                                {/* Social Links */}
                                <div className="flex gap-4">
                                    {[
                                        { icon: Facebook, href: "https://www.facebook.com/Amarjeet.don" },
                                        { icon: Instagram, href: "https://www.instagram.com/bhumihar_amarjeet/" },
                                        { icon: Linkedin, href: "https://www.linkedin.com/in/amarjeet-kumar-202b7522" },
                                        { icon: Twitter, href: "https://x.com/amarjee23243086" },
                                    ].map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Organization Links */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href="https://genusagrofoods.com/" target="_blank" rel="noreferrer" className="bg-white/30 backdrop-blur-md border border-white/50 p-6 rounded-2xl hover:bg-white/50 transition-all group cursor-pointer shadow-lg">
                                <Building2 className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-gray-900 mb-1">Genus Agro</h3>
                                <p className="text-xs text-gray-600">Premium Makhana & Agro Products</p>
                            </a>
                            <a href="https://aathmikafoundation.in/" target="_blank" rel="noreferrer" className="bg-white/30 backdrop-blur-md border border-white/50 p-6 rounded-2xl hover:bg-white/50 transition-all group cursor-pointer shadow-lg">
                                <Heart className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-gray-900 mb-1">Aathmika Foundation</h3>
                                <p className="text-xs text-gray-600">Empowering Social Change</p>
                            </a>
                        </div>

                    </div>

                    {/* Right Column: Contact Form & Info */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Contact Form Card */}
                        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 lg:p-12 shadow-2xl relative">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField name="name" placeholder="Your Name" />
                                    <InputField name="email" placeholder="Email Address" type="email" />
                                </div>
                                <InputField name="subject" placeholder="Subject" />
                                <InputField name="message" placeholder="Message" rows={4} />

                                <button
                                    className={cn(
                                        "w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]",
                                        !isFormValid && "opacity-50 cursor-not-allowed hover:bg-orange-500 hover:scale-100"
                                    )}
                                    disabled={!isFormValid}
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/30 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex items-start gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-green-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Visit Us</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Indira Gandhi Pratishthan<br />
                                        Sector 62, Noida<br />
                                        Uttar Pradesh, India
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/30 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex items-start gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-orange-500">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                                    <p className="text-sm text-gray-600 mb-1">+91 98739 61111</p>
                                    <p className="text-xs text-gray-500">Mon - Sat, 9am - 7pm</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default ContactUs;
