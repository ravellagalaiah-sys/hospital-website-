import { motion } from "motion/react";
import { Phone, Check, ShieldCheck } from "lucide-react";

interface FinalCTAProps {
  onOpenBooking: () => void;
  content: {
    heading: string;
    subtitle: string;
    ctaText: string;
    bgImage: string;
  };
}

export default function FinalCTA({ onOpenBooking, content }: FinalCTAProps) {
  if (!content) return null;

  return (
    <section className="bg-teal-primary py-24 px-6 lg:px-[60px] relative overflow-hidden text-white">
      {/* Decorative luxury vector highlights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-white/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Centered Narrow Wrapper */}
      <div className="max-w-2xl mx-auto text-center relative z-10">
        
        {/* Sparkle Header */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 mb-5">
          <span className="text-[0.62rem] font-[700] tracking-[0.12em] text-white uppercase font-sans animate-pulse">
            {content.subtitle || "Guaranteed Smile Results"}
          </span>
        </div>

        <h2 className="text-[clamp(1.9rem,3.2vw,2.8rem)] font-extrabold tracking-[-0.03em] leading-[1.1] text-white">
          {content.heading || "Your healthiest smile starts today."}
        </h2>

         <p className="text-[0.92rem] font-light text-teal-light/85 mt-6 leading-relaxed max-w-lg mx-auto">
          {content.ctaText || "Request a free, high-precision consultation in under 2 minutes. Same-day appointments are fully available."}
        </p>

        {/* CTA Actions */}
        <div className="flex gap-4 justify-center flex-wrap mt-10">
          <button
            onClick={onOpenBooking}
            className="bg-white text-teal-primary hover:bg-slate-50 transition-all duration-250 hover:scale-102 rounded-full h-12.5 px-10 text-xs font-bold shadow-xl shadow-teal-primary/10 select-none cursor-pointer active:scale-98"
          >
            Book Free Consultation
          </button>
        </div>

      </div>
    </section>
  );
}
