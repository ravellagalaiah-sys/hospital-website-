// Floating WhatsApp button with pulse animation
export default function WhatsAppButton({ phone }: { phone?: string }) {
  const waNumber = (phone || "(800) 559-2648").replace(/\D/g, "");
  const waLink = `https://wa.me/${waNumber}?text=Hi Dentora! I would like to book an appointment.`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping" />
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="white">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.646 4.828 1.776 6.858L2 30l7.338-1.742A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.834-1.594l-.418-.248-4.332 1.03.978-4.21-.27-.432A11.463 11.463 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.674c-.344-.172-2.036-1.004-2.352-1.118-.316-.114-.546-.172-.776.172-.23.344-.89 1.118-1.09 1.348-.2.23-.4.258-.744.086-.344-.172-1.452-.536-2.766-1.706-1.022-.912-1.712-2.036-1.912-2.38-.2-.344-.022-.53.15-.7.154-.154.344-.402.516-.602.172-.2.23-.344.344-.574.114-.23.058-.43-.028-.602-.086-.172-.776-1.87-1.064-2.562-.28-.672-.564-.58-.776-.59-.2-.01-.43-.012-.66-.012-.23 0-.602.086-.918.43-.316.344-1.204 1.176-1.204 2.868s1.232 3.326 1.404 3.556c.172.23 2.426 3.706 5.878 5.196.822.354 1.464.566 1.964.724.824.262 1.574.224 2.168.136.66-.098 2.036-.832 2.322-1.636.286-.804.286-1.492.2-1.636-.084-.144-.314-.23-.658-.402z"/>
          </svg>
        </div>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Chat on WhatsApp
        </span>
      </div>
    </a>
  );
}
