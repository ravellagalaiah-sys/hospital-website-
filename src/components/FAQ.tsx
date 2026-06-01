import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "../types";

interface FAQProps {
  content: {
    heading: string;
    subtitle: string;
    items: FAQItem[];
  };
}

export default function FAQ({ content }: FAQProps) {
  if (!content) return null;

  const activeItems = content.items || [];
  const [openId, setOpenId] = useState<string | null>(activeItems[0]?.id || "faq1");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-surface-light py-24 px-6 lg:px-[60px] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Centered Narrow Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[0.62rem] font-[600] tracking-[0.2em] text-teal-primary uppercase block sub-label animate-fade-in">
            {content.subtitle || "FAQ"}
          </span>
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold letter-spacing-[-0.025em] text-slate-900 mt-2.5 font-sans">
            {content.heading || "Common questions, clear answers."}
          </h2>
          <p className="text-[0.82rem] text-muted-grey mt-2">
            Got another question? Message our front clinic team for immediate help anytime.
          </p>
        </div>

        {/* FAQ Accordion List - narrow container max-w-3xl */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-slate-200/50 shadow-xl shadow-slate-200/20">
          {activeItems.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`py-5 border-b border-border-light/60 last:border-b-0 last:pb-0 first:pt-0 transition-all duration-300 ${
                  isOpen ? "bg-slate-50/20 px-1" : ""
                }`}
              >
                {/* Question Trigger Row */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex justify-between items-center text-left cursor-pointer gap-4 group focus:outline-none"
                  aria-expanded={isOpen}
                  aria-label={`Toggle answers for ${faq.question}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-4.5 h-4.5 shrink-0 transition-colors ${isOpen ? "text-teal-primary" : "text-muted-grey/60 group-hover:text-teal-primary/60"}`} />
                    <span className="text-[0.92rem] font-[600] text-slate-900 leading-snug group-hover:text-teal-primary transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-teal-primary/5 flex items-center justify-center shrink-0 border border-slate-200/30 transition-all duration-200">
                    <ChevronDown
                      className={`w-4.5 h-4.5 text-teal-primary transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Answer Content Panel - Animated Heights */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pl-7.5 pr-2 pt-3.5 text-[0.82rem] text-muted-grey font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
