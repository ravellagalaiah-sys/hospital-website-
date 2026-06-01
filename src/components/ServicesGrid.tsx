import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Service } from "../types";

interface ServicesGridProps {
  onOpenBooking: (serviceName?: string) => void;
  services: Service[];
}

export default function ServicesGrid({ onOpenBooking, services = [] }: ServicesGridProps) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category).filter(Boolean)))];

  const filteredServices = filter === "All" 
    ? services 
    : services.filter(s => s.category === filter);

  // Animation layout
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  return (
    <section id="services" className="bg-surface-light py-24 px-6 lg:px-[60px] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[0.62rem] font-[600] tracking-[0.2em] text-teal-primary uppercase block mb-3 sub-label">
              FEATURE SCHEDULING
            </span>
            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold letter-spacing-[-0.025em] leading-[1.2] text-slate-900 max-w-xl">
              Advanced Clinical Care and Biomimetic Restorations
            </h2>
          </div>
          
          <button
            onClick={() => onOpenBooking()}
            className="self-start md:self-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[0.82rem] tracking-wide rounded-full py-3.5 px-6 transition-all duration-200 cursor-pointer active:scale-98 shadow-md"
          >
            Request Custom Consultation
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-slate-200/60 overflow-x-auto scrollbar-none select-none">
          {categories.map((cat) => {
            const isSelected = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`py-2 px-4.5 text-[0.72rem] font-[600] rounded-full transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-teal-primary text-white shadow-sm shadow-teal-primary/10"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
                }`}
                aria-label={`Filter by ${cat}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Services Grid with AnimatePresence */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.article
                layout
                key={service.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl overflow-hidden border border-border-light/60 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/5 hover:border-slate-200 flex flex-col justify-between"
                onClick={() => onOpenBooking(service.title)}
              >
                <div>
                  {/* Photo Container */}
                  <div className="h-[160px] overflow-hidden relative">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover grayscale-1/10 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 origin-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Price chip */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 bg-teal-primary/8 text-teal-primary text-[0.65rem] font-bold tracking-[0.08em] px-3 py-1 rounded-full uppercase">
                        <Sparkles className="w-2.5 h-2.5" />
                        {service.priceTag}
                      </span>
                      <span className="text-[0.62rem] font-[600] tracking-wider text-muted-grey uppercase">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-[1.05rem] font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-teal-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-[0.78rem] text-muted-grey font-light leading-[1.65]">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-4.5 border-t border-slate-100 flex items-center justify-between">
                  {/* Link anchor */}
                  <span className="text-[0.78rem] font-[600] text-teal-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Book Treatment
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
