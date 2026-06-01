import { useState } from "react";
import { motion } from "motion/react";
import { CalendarRange, ClipboardList, ShieldCheck, Heart } from "lucide-react";

const steps = [
  {
    id: "smile",
    label: "Smile Assessment",
    sub: "Diagnosis & 3D Imaging",
    icon: CalendarRange
  },
  {
    id: "planning",
    label: "Care Planning",
    sub: "Transparent Flat Pricing",
    icon: ClipboardList
  },
  {
    id: "process",
    label: "Treatment Process",
    sub: "Pain-Free Procedures",
    icon: ShieldCheck
  },
  {
    id: "maintenance",
    label: "Dental Maintenance",
    sub: "Lifetime Support Plan",
    icon: Heart
  }
];

export default function ProgressSteps() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-white border-b border-border-light/70 overflow-x-auto scrollbar-none select-none">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[60px]">
        <div className="grid grid-cols-4 min-w-[700px] relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeIdx === idx;
            
            return (
              <button
                key={step.id}
                onClick={() => setActiveIdx(idx)}
                className="py-6 px-6 text-left border-r border-border-light/40 last:border-r-0 cursor-pointer focus:outline-none group relative transition-colors duration-200"
                aria-label={`View step ${idx + 1}: ${step.label}`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-teal-primary/5 border-teal-primary/20 text-teal-primary scale-102"
                        : "bg-slate-50 border-border-light/20 text-muted-grey group-hover:text-teal-primary group-hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span
                      className={`block text-[0.68rem] font-[700] tracking-[0.1em] uppercase transition-colors ${
                        isActive ? "text-teal-primary" : "text-muted-grey"
                      }`}
                    >
                      Step 0{idx + 1}
                    </span>
                    <h4
                      className={`text-[0.88rem] font-[700] tracking-tight mt-0.5 transition-colors ${
                        isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p className="text-[0.72rem] text-muted-grey/80 font-light tracking-wide mt-0.5">
                      {step.sub}
                    </p>
                  </div>
                </div>

                {/* Animated Bottom Slider Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeStepLine"
                    className="absolute bottom-0 left-0 right-0 h-0.75 bg-teal-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

        </div>
      </div>
    </section>
  );
}
