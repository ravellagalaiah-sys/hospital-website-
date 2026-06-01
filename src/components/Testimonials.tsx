import { motion } from "motion/react";
import { Star, MessageSquare } from "lucide-react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  content: {
    heading: string;
    subtitle: string;
    items: Testimonial[];
  };
}

export default function Testimonials({ content }: TestimonialsProps) {
  if (!content) return null;

  const activeItems = content.items || [];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="testimonials" className="bg-white py-24 px-6 lg:px-[60px] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Centered Header */}
        <div className="text-center mb-16">
          <span className="text-[0.62rem] font-[600] tracking-[0.2em] text-teal-primary uppercase block sub-label animate-fade-in">
            {content.subtitle || "PATIENT REVIEWS"}
          </span>
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold letter-spacing-[-0.025em] text-slate-900 mt-2.5 font-sans">
            {content.heading || "Don't take our word for it."}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-warning-gold fill-warning-gold" />
              ))}
            </div>
            <p className="text-[0.82rem] font-medium text-slate-700">
              <span className="font-bold text-slate-900">4.9 average</span> from 1,200+ verified ratings
            </p>
          </div>
        </div>

        {/* Testimonials Grid Card Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeItems.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="bg-surface-light rounded-3xl p-8 border border-slate-200/50 flex flex-col justify-between relative group hover:shadow-xl hover:shadow-slate-300/[0.15] hover:border-slate-300/40 transition-all duration-300"
            >
              {/* Message Square water mark */}
              <MessageSquare className="absolute top-6 right-8 w-8 h-8 text-slate-300/25 pointer-events-none group-hover:text-teal-primary/10 transition-colors duration-300" />

              <div>
                {/* 5 Stars Rating Row */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-warning-gold fill-warning-gold" />
                  ))}
                </div>

                {/* Patient Quote */}
                <p className="text-[0.9rem] text-slate-800 font-light leading-[1.8] tracking-wide relative z-10 italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Patient Profile */}
              <div className="flex items-center gap-3.5 mt-8 pt-5 border-t border-slate-200/50">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-white shrink-0 shadow-md">
                  <img
                    src={review.avatarUrl}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-[0.82rem] font-bold text-slate-900 leading-tight">
                    {review.name}
                  </h4>
                  <p className="text-[0.68rem] text-muted-grey mt-0.5">
                    {review.role} · <span className="font-semibold text-teal-primary/95">{review.source}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
