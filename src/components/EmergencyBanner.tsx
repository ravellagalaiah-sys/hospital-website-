interface EmergencyBannerProps { phone?: string; message?: string; enabled?: boolean; }

export default function EmergencyBanner({ phone, message, enabled = true }: EmergencyBannerProps) {
  if (!enabled) return null;
  const activePhone = phone || "(800) 559-2648";
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white text-center py-2 px-4 flex items-center justify-center gap-3 text-xs font-semibold tracking-wide">
      <span className="animate-pulse">🚨</span>
      <span>{message || "DENTAL EMERGENCY? We have same-day slots reserved!"}</span>
      <a href={`tel:${activePhone}`} className="bg-white text-red-600 font-extrabold px-3 py-0.5 rounded-full text-xs hover:bg-red-50 transition-colors ml-2">
        Call Now: {activePhone}
      </a>
    </div>
  );
}
