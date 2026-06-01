import { motion } from "motion/react";
import { ProcessStep } from "../types";

interface ProcessProps {
  content: {
    heading: string;
    subtitle: string;
    steps: ProcessStep[];
  };
}

export default function Process({ content }: ProcessProps) {
  if (!content) return null;

  const activeSteps = content.steps || [];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" }
    }
  };

  return (
    <section className="bg-[#0a1520] py-24 px-6 lg:px-[60px] relative overflow-hidden">
      {/* Abstract elegant ambient grids */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-primary/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Centered Header */}
        <div className="max-w-[560px] mx-auto text-center mb-18">
          <span className="text-[0.62rem] font-[600] tracking-[0.2em] text-teal-primary uppercase block sub-label animate-fade-in">
            {content.subtitle || "HOW IT WORKS"}
          </span>
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold letter-spacing-[-0.025em] text-white mt-3 font-sans">
            {content.heading || "Your journey to a healthier smile."}
          </h2>
        </div>

        {/* 4-Step Process Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activeSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.07] rounded-3xl p-6 relative transition-all duration-300 hover:border-white/[0.12] flex flex-col justify-between group"
            >
              <div>
                {/* Big Absolute Step Number */}
                <span className="absolute top-4 right-6 font-sans font-extrabold text-[3.2rem] tracking-[-0.04em] text-white/[0.04] leading-none select-none group-hover:text-teal-primary/[0.07] transition-all duration-300">
                  {step.stepNumber}
                </span>

                {/* Step Photo */}
                <div className="h-[130px] rounded-2xl overflow-hidden mb-6 border border-white/[0.04]">
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.05] group-hover:scale-104 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Title Segment */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-6.5 h-6.5 rounded-full bg-teal-primary flex items-center justify-center text-white text-[0.65rem] font-extrabold shrink-0 shadow-sm shadow-teal-primary/10">
                    {idx + 1}
                  </div>
                  <h3 className="text-[0.92rem] font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[0.78rem] text-white/50 font-light leading-[1.65]">
                  {step.description}
                </p>
              </div>

              {/* Progress Connector line on desktop */}
              {idx < activeSteps.length - 1 && (
                <div className="hidden lg:block absolute top-[110px] -right-[15px] w-[30px] h-[1px] bg-gradient-to-r from-teal-primary/45 to-transparent z-20 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
