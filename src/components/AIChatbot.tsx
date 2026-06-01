import React from "react";

interface AIChatbotProps {
  clinicName?: string;
  phone?: string;
  services?: string[];
}

export default function AIChatbot({ clinicName = "Dentora Dental Clinic", phone = "(800) 559-2648", services = [] }: AIChatbotProps) {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{ role: string; text: string }[]>([
    { role: "bot", text: `Hi! 👋 Welcome to ${clinicName}. How can I help you today? Ask me about our services, timings, or how to book an appointment!` }
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const servicesList = services.length > 0 ? services.join(", ") : "Dental Check-Up, Teeth Cleaning, Tooth Whitening, Dental Implants, Veneers & Crowns, Emergency Care";

  const systemPrompt = `You are a helpful patient assistant for ${clinicName}, a modern dental clinic.

Services: ${servicesList}

Contact: ${phone}
Opening Hours: Mon-Fri 8am-7pm, Sat 9am-5pm, Sun Closed
Emergency: Same-day slots available, call immediately.

Answer questions about services, appointments, pricing (say "contact us for pricing"), emergency care, and directions. Be friendly, warm, and concise. Always encourage booking. If asked about something unrelated to dentistry or the clinic, politely redirect.`;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: systemPrompt,
          messages: [{ role: "user", content: userMsg }]
        })
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please call us directly!";
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Sorry, something went wrong. Please call us or WhatsApp us directly!" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Chat bubble trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 left-6 z-[999] w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        aria-label="Chat with us"
        style={{ backgroundColor: "#0bb8b8" }}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-44 left-6 z-[999] w-80 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: "420px", background: "#0a1520", border: "1px solid rgba(11,184,184,0.3)" }}
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center gap-2" style={{ background: "#0bb8b8" }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">D</div>
            <div>
              <p className="text-white font-semibold text-sm">{clinicName}</p>
              <p className="text-white/70 text-xs">AI Assistant • Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: "280px" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                  style={{
                    background: m.role === "user" ? "#0bb8b8" : "#1a2535",
                    color: m.role === "user" ? "white" : "#e2e8f0"
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-xl text-xs text-white" style={{ background: "#1a2535" }}>Typing...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-2 flex gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <input
              className="flex-1 text-white text-xs px-3 py-2 rounded-lg outline-none"
              style={{ background: "#1a2535", border: "1px solid rgba(255,255,255,0.1)" }}
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "#0bb8b8" }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
