import { useState, useEffect } from "react";
import { Menu, X, HeartPulse, Settings, LogOut, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenBooking: () => void;
  phone: string;
  user: any;
  isAdmin: boolean;
  isAdminModeActive: boolean;
  setIsAdminModeActive: (val: boolean) => void;
  onLogin: () => void;
  onLogout: () => void;
  authError?: string | null;
  onClearAuthError?: () => void;
}

export default function Navbar({
  onOpenBooking,
  phone,
  user,
  isAdmin,
  isAdminModeActive,
  setIsAdminModeActive,
  onLogin,
  onLogout,
  authError,
  onClearAuthError
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const activePhone = phone || "(800) 559-2648";

  return (
    <>
      <nav
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/85 backdrop-blur-md border-b border-white/5 py-4 shadow-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div id="nav-container" className="max-w-[1200px] mx-auto px-6 lg:px-[60px] flex justify-between items-center">
          
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-[8px] flex items-center justify-center transition-all duration-200 group-hover:bg-teal-primary/20 group-hover:border-teal-primary/40 group-hover:scale-105">
              <HeartPulse className="w-4 h-4 text-white group-hover:text-teal-primary transition-colors" />
            </div>
            <div className="text-left">
              <span className="font-bold text-[1.1rem] tracking-[-0.01em] text-white">
                DENTORA
              </span>
              <p className="text-[0.52rem] font-[600] tracking-[0.15em] text-teal-primary uppercase leading-tight -mt-0.5">
                Dental Clinic
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-[0.75rem] font-medium tracking-wide text-white/70 hover:text-white hover:scale-105 transition-all duration-150 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-[0.75rem] font-medium tracking-wide text-white/70 hover:text-white hover:scale-105 transition-all duration-150 cursor-pointer"
            >
              About Clinic
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-[0.75rem] font-medium tracking-wide text-white/70 hover:text-white hover:scale-105 transition-all duration-150 cursor-pointer"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-[0.75rem] font-medium tracking-wide text-white/70 hover:text-white hover:scale-105 transition-all duration-150 cursor-pointer"
            >
              Common FAQ
            </button>

            {/* Authentication state keys */}
            {isAdmin && (
              <button
                onClick={() => setIsAdminModeActive(!isAdminModeActive)}
                className={`text-[0.72rem] font-bold tracking-wide flex items-center gap-1.5 py-1 px-2.5 rounded-full border transition-all duration-150 cursor-pointer ${
                  isAdminModeActive 
                    ? "bg-teal-primary/15 border-teal-primary/30 text-teal-primary" 
                    : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                }`}
              >
                <Settings className={`w-3 h-3 ${isAdminModeActive ? "animate-spin" : ""}`} />
                {isAdminModeActive ? "Editor Active" : "Open Editor"}
              </button>
            )}

            {!user && (
              <button
                onClick={onLogin}
                className="text-[0.66rem] font-medium tracking-[0.05em] text-white/30 hover:text-white/80 hover:underline cursor-pointer"
              >
                Admin Sign In
              </button>
            )}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${phone}`}
              className="flex flex-col items-end group"
              aria-label="Call clinic phone"
            >
              <span className="text-[0.55rem] tracking-[0.1em] text-white/40 uppercase">
                24/7 SUPPORT
              </span>
              <span className="text-[0.78rem] font-medium text-white/85 group-hover:text-teal-primary transition-colors font-mono">
                {activePhone}
              </span>
            </a>
            
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-1.5 bg-teal-primary hover:bg-teal-primary/95 text-white font-bold text-[0.72rem] tracking-wide rounded-full px-5 py-2.5 transition-all duration-150 shadow-lg shadow-teal-primary/10 hover:shadow-teal-primary/20 hover:scale-102 cursor-pointer active:scale-98"
            >
              Book a Call
            </button>

            {user && (
              <button
                onClick={onLogout}
                title="Logout of admin section"
                className="p-1 text-white/40 hover:text-red-400 cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-white hover:bg-white/5 rounded-full p-2.5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-18 bg-slate-950/95 backdrop-blur-xl z-30 border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6 flex flex-col">
              <button
                onClick={() => scrollToSection("services")}
                className="text-left font-bold text-lg text-white/85 hover:text-teal-primary transition-colors"
              >
                Our Dental Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left font-bold text-lg text-white/85 hover:text-teal-primary transition-colors"
              >
                About Our Care
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left font-bold text-lg text-white/85 hover:text-teal-primary transition-colors"
              >
                What Patient's Say
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left font-bold text-lg text-white/85 hover:text-teal-primary transition-colors"
              >
                Clinic FAQ
              </button>

              {isAdmin && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsAdminModeActive(!isAdminModeActive);
                  }}
                  className="w-full flex items-center justify-between font-bold text-lg text-amber-400"
                >
                  <span>{isAdminModeActive ? "✓ Active Admin Editor" : "✏️ Open Admin Panel"}</span>
                </button>
              )}

              <div className="h-px bg-white/10 my-4" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.62rem] tracking-wider text-white/40 uppercase font-mono">
                    Call 24/7 Hotline
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5 font-mono">
                    {activePhone}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="bg-teal-primary hover:bg-teal-primary/95 text-white font-bold text-xs rounded-full px-6 py-3 transition-transform"
                >
                  Book Instant Visit
                </button>
              </div>

              {user ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="text-left text-xs text-red-400 font-bold hover:underline"
                >
                  Sign Out as Admin ({user.email})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogin();
                  }}
                  className="text-left text-xs text-teal-primary hover:underline"
                >
                  Admin Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-24 right-4 z-50 max-w-[320px] w-full bg-slate-900/95 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 shadow-2xl flex items-start gap-3.5"
          >
            <div className="p-1 px-2 bg-amber-500/10 border border-amber-400/20 text-amber-400 rounded-lg text-sm shrink-0 font-bold">
              ⚠️
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-amber-400 font-sans tracking-wide uppercase">Sign-In Notice</h4>
              <p className="text-[11px] text-white/85 leading-relaxed mt-1 font-sans">{authError}</p>
            </div>
            {onClearAuthError && (
              <button
                onClick={onClearAuthError}
                className="p-1 text-white/35 hover:text-white/85 transition-colors bg-white/5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
