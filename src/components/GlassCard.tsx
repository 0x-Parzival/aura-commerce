import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface GlassCardProps {
    image: string;
    video?: string;
    title: string;
    description: string;
    buttonText: string;
    isAvailable: boolean;
    className?: string;
}

const GlassCard = ({ image, video, title, description, buttonText, isAvailable, className }: GlassCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const targetRotate = useRef({ x: 0, y: 0 });

    const angle = 20;

    const lerp = (start: number, end: number, amount: number) => {
        return (1 - amount) * start + amount * end;
    };

    const remap = (value: number, oldMax: number, newMax: number) => {
        const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
        return Math.min(Math.max(newValue, -newMax), newMax);
    };

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Auto-play video on mobile devices
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile && video && videoRef.current) {
            setIsPlaying(true);
            videoRef.current.play().catch(e => console.log("Video autoplay failed", e));
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const centerX = (rect.left + rect.right) / 2;
            const centerY = (rect.top + rect.bottom) / 2;
            const posX = e.pageX - centerX;
            const posY = e.pageY - centerY;
            const x = remap(posX, rect.width / 2, angle);
            const y = remap(posY, rect.height / 2, angle);

            targetRotate.current = { x, y: -y };
        };

        const handleMouseEnter = () => {
            if (video && videoRef.current && !isMobile) {
                setIsPlaying(true);
                videoRef.current.play().catch(e => console.log("Video play failed", e));
            }
        };

        const handleMouseOut = () => {
            targetRotate.current = { x: 0, y: 0 };
            if (video && videoRef.current && !isMobile) {
                setIsPlaying(false);
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseOut);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseOut);
        };
    }, [video]);

    useEffect(() => {
        let animationFrameId: number;

        const update = () => {
            setRotate(prev => ({
                x: lerp(prev.x, targetRotate.current.x, 0.1),
                y: lerp(prev.y, targetRotate.current.y, 0.1)
            }));
            animationFrameId = requestAnimationFrame(update);
        };

        update();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div
            ref={cardRef}
            className={cn("relative rounded-xl perspective-1000 preserve-3d cursor-pointer", className)}
            style={{
                transform: `perspective(1000px) rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            {/* Glass Content */}
            <div
                className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-xl overflow-hidden flex flex-col items-center p-6 text-center z-10 transition-all duration-300 group hover:shadow-2xl"
            >
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-4 bg-white/50 shadow-inner translate-z-10 relative">
                    <img
                        src={image}
                        alt={title}
                        className={cn(
                            "w-full h-full object-cover transform transition-transform duration-500 absolute inset-0",
                            isPlaying ? "opacity-0" : "opacity-100 group-hover:scale-110"
                        )}
                    />
                    {video && (
                        <video
                            ref={videoRef}
                            src={video}
                            muted
                            loop
                            playsInline
                            className={cn(
                                "w-full h-full object-cover absolute inset-0 transition-opacity duration-300",
                                isPlaying ? "opacity-100" : "opacity-0"
                            )}
                        />
                    )}
                </div>

                <p className="text-gray-800 font-medium text-sm mb-auto leading-relaxed transform translate-z-20">
                    {description}
                </p>

                <button
                    className={cn(
                        "mt-4 px-8 py-2 rounded font-semibold text-white uppercase text-sm tracking-wide shadow-md transform translate-z-30 transition-all duration-300 hover:scale-110 active:scale-95",
                        isAvailable
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-gray-400 cursor-not-allowed"
                    )}
                    disabled={!isAvailable}
                >
                    {buttonText}
                </button>
            </div>

            {/* Decorative pseudo-3D layers inspired by reference */}
            <div
                className="absolute inset-4 rounded-xl border-4 border-[#e2c044] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    transform: `translateZ(-20px) rotateX(${rotate.y * 0.5}deg) rotateY(${rotate.x * 0.5}deg)`
                }}
            />
        </div>
    );
};

export default GlassCard;
