import { useState, useEffect, useRef } from "react";
import { Star, Award, ShieldAlert } from "lucide-react";

interface AboutStatsProps {
  content: {
    heading: string;
    subtitle: string;
    highlightText: string;
    description: string;
    doctorName: string;
    doctorTitle: string;
    doctorQuote: string;
    doctorImageUrl: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
}

// Highly robust animated counter that parses any complex text input safely (decimals, integers, units, stars)
function AnimatedCounter({ targetString, delay = 0 }: { targetString: string; delay?: number }) {
  const numericMatch = targetString ? targetString.match(/[\d.]+/) : null;
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = targetString ? targetString.replace(/[\d.]+/, "") : "";

  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    hasAnimated.current = false; // Reset on target changes
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          setTimeout(() => {
            let startTimestamp: number | null = null;
            const duration = 1200;

            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              setCount(easeOutCubic * numericValue);

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCount(numericValue);
              }
            };
            window.requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [numericValue, delay, targetString]);

  const isFloat = targetString ? targetString.includes(".") : false;
  const formattedCount = isFloat ? count.toFixed(1) : Math.floor(count);

  return <span ref={elementRef}>{formattedCount}{suffix}</span>;
}

export default function AboutStats({ content }: AboutStatsProps) {
  if (!content) return null;

  return (
    <section id="about" className="bg-white py-24 px-6 lg:px-[60px] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-[0.62rem] font-[600] tracking-[0.2em] text-teal-primary uppercase block animate-fade-in">
            {content.subtitle || "OUR CLINICAL VISION"}
          </span>
        </div>

        {/* Large Editorial Statement */}
        <h2 className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold leading-[1.3] tracking-[-0.02em] text-slate-900 max-w-[850px] mb-14">
          {content.heading || "Uncompromising biological integrity for your smile."}
        </h2>

        {/* Stats Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-10 py-10 border-t border-b border-border-light/70 mb-14">
          
          {/* Left indicator label */}
          <div className="max-w-[140px] leading-[1.6]">
            <p className="text-[0.72rem] font-medium tracking-wide text-muted-grey">
              {content.highlightText || "At Dentora, we don't just treat symptoms. We practice holistic, biocompatible dentistry."}
            </p>
          </div>

          {/* Stats count boxes */}
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            
            {/* Stat 1 */}
            <div className="min-w-[100px]">
              <div className="text-[2.8rem] font-[800] tracking-[-0.035em] text-slate-900 leading-none">
                <AnimatedCounter targetString={content.stat1Number || "15+"} />
              </div>
              <p className="text-[0.72rem] text-muted-grey font-medium mt-1 uppercase tracking-wider">
                {content.stat1Label || "Years Excellence"}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="min-w-[100px]">
              <div className="text-[2.8rem] font-[800] tracking-[-0.035em] text-slate-900 leading-none">
                <AnimatedCounter targetString={content.stat2Number || "4.9★"} />
              </div>
              <p className="text-[0.72rem] text-muted-grey font-medium mt-1 uppercase tracking-wider">
                {content.stat2Label || "Lead Dentist"}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="min-w-[100px]">
              <div className="text-[2.8rem] font-[800] tracking-[-0.035em] text-slate-900 leading-none">
                <AnimatedCounter targetString={content.stat3Number || "10k+"} />
              </div>
              <p className="text-[0.72rem] text-muted-grey font-medium mt-1 uppercase tracking-wider">
                {content.stat3Label || "Happy Patients"}
              </p>
            </div>

          </div>

          {/* Right small gorgeous clinic photo */}
          <div className="mt-4 lg:mt-0 lg:ml-auto w-full max-w-[280px] h-[150px] rounded-2xl overflow-hidden relative shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80"
              alt="Immersive beautiful modern dental clinic suite and chair"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

        {/* Doctor and clinical credentials bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50 border border-border-light/40 rounded-2xl p-6">
          
          {/* Active Doctor profile card wrapper */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-teal-primary/30 shrink-0">
              <img
                src={content.doctorImageUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=400&q=80"}
                alt={content.doctorName || "Dr. Daniel Carter"}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-[1rem] font-bold text-slate-900 leading-tight">
                  {content.doctorName || "Dr. Daniel Carter"}
                </h4>
                <div className="flex items-center bg-teal-primary/10 border border-teal-primary/20 px-2 py-0.5 rounded-full">
                  <span className="text-[0.6rem] font-bold text-teal-primary">
                    ★ 4.9 Verified
                  </span>
                </div>
              </div>
              <p className="text-[0.75rem] text-muted-grey mt-0.75">
                {content.doctorTitle || "Lead Dental Specialist"}
              </p>
              <div className="mt-1">
                <span className="text-[0.68rem] italic text-slate-600 font-serif leading-relaxed block max-w-sm">
                  &ldquo;{content.doctorQuote}&rdquo;
                </span>
              </div>
            </div>
          </div>

          {/* Quick Clinic Badges */}
          <div className="flex items-center gap-6 text-left border-t sm:border-t-0 pt-4 sm:pt-0 border-border-light/60">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-teal-primary/5 text-teal-primary rounded-lg border border-teal-primary/10">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[0.68rem] font-[700] text-slate-900 leading-relaxed uppercase tracking-wider">
                  Board Certified
                </span>
                <span className="block text-[0.62rem] text-muted-grey -mt-0.5">
                  Top Dental Awards
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-teal-primary/5 text-teal-primary rounded-lg border border-teal-primary/10">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[0.68rem] font-[700] text-slate-900 leading-relaxed uppercase tracking-wider">
                  Sterilized safety
                </span>
                <span className="block text-[0.62rem] text-muted-grey -mt-0.5">
                  100% ADA Safety Compliant
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
