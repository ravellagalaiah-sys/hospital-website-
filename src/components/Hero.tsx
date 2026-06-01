import { motion } from "motion/react";
import { ArrowRight, Phone, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  content: {
    badge: string;
    heading: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    bgImage: string;
  };
}

const tagPills = [
  "Dental Checkup",
  "Teeth Cleaning",
  "Tooth Whitening",
  "Gum Treatment",
  "Implants",
  "Root Canal"
];

export default function Hero({ onOpenBooking, content }: HeroProps) {
  // Stagger variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: "easeOut" }
    }
  };

  const resolvedHeading = content?.heading || "Experience Comfortable Dental Care";
  const H1_WORDS = resolvedHeading.split(" ");

  return (
    <header className="relative min-h-[95vh] flex items-end justify-center overflow-hidden bg-background pt-24">
      {/* Background Hero Image */}
      <img
        src={content?.bgImage || "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1650&q=85"}
        alt="Pleasant dental examination process inside clean bright dental clinic"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-102 filter brightness-[0.70]"
        referrerPolicy="no-referrer"
      />

      {/* Graduated Dark Overlay Layer 1 (Left to Right) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/98 via-background/88 md:via-background/70 to-transparent pointer-events-none" />

      {/* Bottom Fade into Next Section Layer 2 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-10 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />

      {/* Centered Applet Content Grid */}
      <div className="relative z-20 max-w-[1200px] w-full mx-auto px-6 lg:px-[60px] pb-16 pt-24 flex flex-col items-start text-left">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Badge Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-teal-primary/10 border border-teal-primary/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-primary animate-pulse" />
            <span className="text-[0.62rem] font-bold tracking-[0.16em] text-teal-primary uppercase font-sans">
              {content?.badge || "BEST DENTAL CARE · PORTLAND, OR"}
            </span>
          </motion.div>

          {/* H1 Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.5rem,4.2vw,5.0rem)] font-[800] leading-[1.08] tracking-[-0.03em] text-white mb-6 pr-4"
          >
            {H1_WORDS.map((word, idx) => (
              <span key={idx} className="inline-block mr-3">
                {word}
              </span>
            ))}
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={itemVariants}
            className="text-[0.92rem] text-white/55 font-light leading-[1.8] max-w-sm mb-10"
          >
            {content?.subheading || "Your family's dental health, handled with extreme care. Modern diagnostic technology, warm hands, and flat transparent pricing."}
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center mb-12"
          >
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 bg-teal-primary hover:bg-teal-primary/95 text-white rounded-full py-4 px-8 text-xs font-bold transition-all duration-200 group shadow-lg shadow-teal-primary/15 cursor-pointer active:scale-98"
            >
              {content?.ctaPrimary || "Book Appointment"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white/50">
              <Phone className="w-3.5 h-3.5 text-teal-primary" />
              Or Call:{" "}
              <a href="tel:8005592648" className="text-white hover:text-teal-primary transition-colors">
                (800) 559-2648
              </a>
            </span>
          </motion.div>

          {/* Service Tag Pills */}
          <motion.div variants={itemVariants} className="space-y-2">
            <span className="text-[0.55rem] font-bold tracking-[0.15em] text-white/40 block uppercase">
              POPULAR PROCEDURES
            </span>
            <div className="flex flex-wrap gap-2">
              {tagPills.map((tag, i) => (
                <div
                  key={i}
                  className="bg-white/8 border border-white/12 rounded-full px-4 py-2 text-[0.72rem] font-medium text-white/70 backdrop-blur-xs flex items-center gap-1.5 hover:text-white hover:border-white/20 transition-all duration-200 cursor-default"
                >
                  <Sparkles className="w-3 h-3 text-teal-primary/80" />
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
