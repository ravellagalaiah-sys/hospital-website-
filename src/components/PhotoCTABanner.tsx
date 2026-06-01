import { motion } from "motion/react";
import { ArrowRight, PhoneCall } from "lucide-react";

interface PhotoCTABannerProps {
  onOpenBooking: () => void;
  phone: string;
}

export default function PhotoCTABanner({ onOpenBooking, phone }: PhotoCTABannerProps) {
  return (
    <section className="relative h-auto md:h-[320px] py-16 md:py-0 overflow-hidden flex items-center bg-background">
      
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1513412534083-c43bca4d37af?auto=format&fit=crop&w=1500&q=80"
        alt="Joyful healthy dental patient with pristine radiant smile"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 filter brightness-[0.7] contrast-[1.05]"
        referrerPolicy="no-referrer"
      />

      {/* Dynamic left-to-right gradient overlay to guarantee text legibility */}
      <div 
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[#060c14]/95 via-[#060c14]/80 to-[#060c14]/25"
      />

      {/* Inner Centered Content Wrapper */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 lg:px-[60px] py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left textual triggers */}
        <div className="max-w-xl">
          <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold text-white tracking-[-0.025em] leading-tight font-sans">
            Ready for your best smile?
          </h2>
          <p className="text-[0.88rem] font-light text-white/70 mt-2">
            Same-day appointments available with Portland's leading clinic. No waiting list.
          </p>
        </div>

        {/* Right action controls */}
        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 bg-teal-primary hover:bg-teal-primary/95 text-white rounded-full h-12 px-8.5 text-xs font-bold transition-all duration-200 shadow-lg shadow-teal-primary/20 hover:scale-102 cursor-pointer active:scale-98"
          >
            Book Appointment
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-full h-12 px-7 text-xs font-medium transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-teal-primary" />
            {phone || "(800) 559-2648"}
          </a>
        </div>

      </div>
    </section>
  );
}
