import { useState } from "react";

interface BACase {
  id: number;
  label: string;
  beforeText: string;
  afterText: string;
  beforeColor: string;
  afterColor: string;
}

export default function BeforeAfterGallery({ cases }: { cases: BACase[] }) {
  const [active, setActive] = useState(0);
  const activeCase = cases[active] || cases[0];

  return (
    <section className="py-20 px-6 lg:px-[60px] bg-[#0a1520]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.62rem] font-bold tracking-[0.2em] text-teal-primary uppercase mb-3">REAL RESULTS</p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Before & After Transformations</h2>
          <p className="text-white/50 text-sm mt-2 max-w-lg mx-auto">See the life-changing results our patients experience with our advanced dental treatments.</p>
        </div>
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {cases.map((c, i) => (
            <button key={c.id} onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${active === i ? "bg-teal-primary text-white shadow-lg" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"}`}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-white/10 relative">
            <div className="h-52 flex items-center justify-center" style={{ background: activeCase.beforeColor }}>
              <div className="text-center"><p className="text-white/70 text-4xl mb-2">😟</p><p className="text-white/80 font-bold text-sm">{activeCase.beforeText}</p></div>
            </div>
            <div className="absolute top-3 left-3 bg-red-500/80 text-white text-xs font-extrabold px-3 py-1 rounded-full">BEFORE</div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-teal-primary/30 relative">
            <div className="h-52 flex items-center justify-center" style={{ background: activeCase.afterColor }}>
              <div className="text-center"><p className="text-slate-800 text-4xl mb-2">😁</p><p className="text-slate-800 font-bold text-sm">{activeCase.afterText}</p></div>
            </div>
            <div className="absolute top-3 left-3 bg-teal-primary text-white text-xs font-extrabold px-3 py-1 rounded-full">AFTER</div>
          </div>
        </div>
        <p className="text-center text-white/30 text-xs mt-6">*Results may vary. All treatments performed by licensed professionals.</p>
      </div>
    </section>
  );
}
