import { motion } from "motion/react";
import { Check, Star, HeartHandshake } from "lucide-react";

interface WhyChooseUsProps {
  onOpenBooking: () => void;
  content: {
    heading: string;
    subtitle: string;
    checklistTitle: string;
    checklistItems: string[];
    bgImage: string;
  };
}

export default function WhyChooseUs({ onOpenBooking, content }: WhyChooseUsProps) {
  if (!content) return null;

  const activeChecklist = content.checklistItems || [];

  return (
    <section className="bg-white py-24 px-6 lg:px-[60px]">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7">
            <span className="text-[0.62rem] font-[600] tracking-[0.2em] text-teal-primary uppercase block mb-4 sub-label animate-fade-in">
              {content.subtitle || "WHY CHOOSE US"}
            </span>
            
            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-slate-900 mb-6 font-sans">
              {content.heading || "Are you looking for a dentist to give you that special smile?"}
            </h2>
            
            <p className="text-[0.85rem] text-muted-grey font-light leading-[1.8] max-w-xl mb-10">
              {content.checklistTitle || "THE CLINICAL CORE"}
            </p>

            {/* Grid Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
              {activeChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-primary/8 border border-teal-primary/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-teal-primary" />
                  </div>
                  <span className="text-[0.82rem] font-medium text-slate-800 tracking-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Call to action button */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[0.82rem] tracking-wide rounded-full py-3.5 px-8 transition-all duration-200 cursor-pointer active:scale-98 shadow-md"
            >
              Meet Our Specialist
            </button>
          </div>

          {/* Right Immersive Patient and Doctor Photo Spot */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl group border border-slate-200">
              <img
                src={content.bgImage || "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80"}
                alt="Elite dental team of caring specialists smiling in state of the art clinic"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Micro Badge Overlay 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="absolute -left-6 bottom-16 bg-white p-4.5 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3 max-w-[210px]"
            >
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500 border border-amber-100 shrink-0">
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
              <div>
                <span className="block text-[0.72rem] font-bold text-slate-900 tracking-tight">
                  1,200+ Reviews
                </span>
                <span className="block text-[0.62rem] text-muted-grey">
                  5-star verified ratings
                </span>
              </div>
            </motion.div>

            {/* Micro Badge Overlay 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -right-4 top-12 bg-slate-900 p-4 rounded-xl shadow-xl flex items-center gap-3 text-left border border-white/5"
            >
              <div className="p-2 bg-teal-primary/10 text-teal-primary rounded-lg border border-teal-primary/20">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[0.68rem] font-[700] text-white tracking-wide uppercase">
                  Care First
                </span>
                <span className="block text-[0.58rem] text-white/50">
                  Patient Komfort Guarantee
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
