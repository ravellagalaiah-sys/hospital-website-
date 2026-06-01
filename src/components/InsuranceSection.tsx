interface InsuranceContent {
  heading: string; subtitle: string;
  paymentOptions: { icon: string; label: string; desc: string }[];
  insurers: string[];
  footerNote: string;
}

export default function InsuranceSection({ content }: { content: InsuranceContent }) {
  return (
    <section className="py-20 px-6 lg:px-[60px] bg-[#0a1520]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.62rem] font-bold tracking-[0.2em] text-teal-primary uppercase mb-3">{content.subtitle}</p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{content.heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {content.paymentOptions.map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-teal-primary/30 transition-colors">
              <div className="text-3xl mb-2">{p.icon}</div>
              <p className="text-white font-bold text-sm">{p.label}</p>
              <p className="text-white/40 text-xs mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="border border-white/10 rounded-2xl p-6">
          <p className="text-center text-white/40 text-xs uppercase tracking-widest font-bold mb-5">Accepted Insurance Partners</p>
          <div className="flex flex-wrap justify-center gap-3">
            {content.insurers.map((name, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/60 text-xs font-semibold hover:text-white hover:bg-white/10 transition-colors">{name}</div>
            ))}
          </div>
          <p className="text-center text-white/30 text-xs mt-5">{content.footerNote}</p>
        </div>
      </div>
    </section>
  );
}
