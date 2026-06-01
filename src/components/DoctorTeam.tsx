interface Doctor { id: number; name: string; role: string; exp: string; spec: string; emoji: string; }

export default function DoctorTeam({ team }: { team: Doctor[] }) {
  return (
    <section className="py-20 px-6 lg:px-[60px] bg-[#060c14]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.62rem] font-bold tracking-[0.2em] text-teal-primary uppercase mb-3">OUR SPECIALISTS</p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Meet Our Expert Team</h2>
          <p className="text-white/50 text-sm mt-2 max-w-lg mx-auto">Board-certified dental professionals committed to your comfort and care.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((doc) => (
            <div key={doc.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-teal-primary/40 transition-all duration-200 group">
              <div className="w-20 h-20 rounded-full bg-teal-primary/10 border-2 border-teal-primary/30 flex items-center justify-center mx-auto mb-4 text-4xl group-hover:border-teal-primary/60 transition-colors">{doc.emoji}</div>
              <h3 className="text-white font-bold text-sm">{doc.name}</h3>
              <p className="text-teal-primary text-xs font-semibold mt-1">{doc.role}</p>
              <p className="text-white/40 text-xs mt-1">{doc.spec}</p>
              <div className="mt-3 bg-teal-primary/10 rounded-full px-3 py-1 inline-block">
                <p className="text-teal-primary text-xs font-bold">{doc.exp} Experience</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
