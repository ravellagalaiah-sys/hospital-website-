// Sticky mobile bottom book now button
interface MobileBookButtonProps {
  onOpenBooking: () => void;
  phone?: string;
}

export default function MobileBookButton({ onOpenBooking, phone }: MobileBookButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[50] md:hidden bg-[#0a1520]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-3">
      <a
        href={`tel:${phone || "(800) 559-2648"}`}
        className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-sm rounded-full py-3 hover:bg-white/15 transition-colors"
      >
        📞 Call Now
      </a>
      <button
        onClick={onOpenBooking}
        className="flex-1 flex items-center justify-center gap-2 text-white font-bold text-sm rounded-full py-3 transition-colors"
        style={{ background: "#0bb8b8" }}
      >
        📅 Book Now
      </button>
    </div>
  );
}
