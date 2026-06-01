import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, Phone, Mail, CheckCircle2, Award, Clock } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedService = "" }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [service, setService] = useState(preselectedService || "Checkup");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate real API dispatch for lead capture
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("09:00");
    setService("Checkup");
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-slate-900 border border-teal-primary/20 shadow-2xl z-10"
          >
            {/* Elegant Top Design Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-primary" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <div className="p-8 pt-10">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 bg-teal-primary/10 border border-teal-primary/25 rounded-full px-3 py-1 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-primary animate-pulse" />
                    <span className="text-[0.62rem] font-[600] tracking-[0.1em] text-teal-primary uppercase sans-semibold">
                      DIRECT CONSULTATION
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Book Your Appointment
                  </h3>
                  <p className="text-xs text-white/55 mt-1">
                    Free evaluation & customized plan with zero hidden fees.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Service selection */}
                  <div>
                    <label className="block text-[0.68rem] font-[600] uppercase tracking-wider text-white/55 mb-1.5">
                      Service Requested
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-teal-primary transition-colors cursor-pointer appearance-none"
                    >
                      <option value="Checkup">Smile Assessment & Check-Up</option>
                      <option value="Cleaning">Dental Scaling & Cleaning</option>
                      <option value="Whitening">Laser Teeth Whitening</option>
                      <option value="Implants">Titanium Dental Implant</option>
                      <option value="Veneers">Premium Veneers & Crowns</option>
                      <option value="Emergency">Same-Day Emergency Treatment</option>
                    </select>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="block text-[0.68rem] font-[600] uppercase tracking-wider text-white/55 mb-1.5">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        required
                        type="text"
                        placeholder="John Carter"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-teal-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Phone field */}
                    <div>
                      <label className="block text-[0.68rem] font-[600] uppercase tracking-wider text-white/55 mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          required
                          type="tel"
                          placeholder="(555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-teal-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="block text-[0.68rem] font-[600] uppercase tracking-wider text-white/55 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-teal-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Date field */}
                    <div>
                      <label className="block text-[0.68rem] font-[600] uppercase tracking-wider text-white/55 mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          required
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-teal-primary transition-colors cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Time selection */}
                    <div>
                      <label className="block text-[0.68rem] font-[600] uppercase tracking-wider text-white/55 mb-1.5">
                        Preferred Time Range
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-teal-primary transition-colors cursor-pointer appearance-none"
                        >
                          <option value="09:00">Morning (9 AM - 12 PM)</option>
                          <option value="13:00">Afternoon (1 PM - 4 PM)</option>
                          <option value="17:00">Late Afternoon (4 PM - 7 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submission Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full inline-flex items-center justify-center gap-2 bg-teal-primary hover:bg-teal-primary/90 text-white rounded-full py-4 text-xs font-bold leading-none cursor-pointer transition-colors disabled:opacity-50 select-none shadow-lg shadow-teal-primary/20"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Scheduling Your Consult...
                        </>
                      ) : (
                        "Request Free Appointment"
                      )}
                    </button>
                    <div className="mt-3 flex items-center justify-center gap-4 text-[0.68rem] text-white/40">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-primary" />
                        Instant confirmation
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-teal-primary" />
                        HIPPA Secure
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center"
              >
                <div className="w-16 h-16 bg-teal-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-primary/20">
                  <CheckCircle2 className="w-8 h-8 text-teal-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Appointment Requested!
                </h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto mb-8 leading-relaxed">
                  Excellent choice, <span className="text-teal-primary font-semibold">{name}</span>! Our clinic coordinators will review your slot for <span className="font-medium text-white">{date}</span> and text you within 15 minutes to finalize.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white rounded-full px-8 py-3 text-xs font-bold transition-colors"
                >
                  Return to Home
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
