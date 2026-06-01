interface MapContent {
  heading: string; subtitle: string; mapEmbedUrl: string;
  infoCards: { icon: string; label: string; value: string }[];
}

export default function MapSection({ content }: { content: MapContent }) {
  return (
    <section className="py-16 px-6 lg:px-[60px] bg-[#060c14]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[0.62rem] font-bold tracking-[0.2em] text-teal-primary uppercase mb-3">{content.subtitle}</p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{content.heading}</h2>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ height: "380px" }}>
          <iframe title="Clinic Location" src={content.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.infoCards.map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wide font-semibold">{item.label}</p>
                <p className="text-sm text-white font-medium mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
