import { HeartPulse, Instagram, Facebook, Globe, Shield } from "lucide-react";

interface FooterProps {
  onOpenBooking: (serviceName?: string) => void;
  content: {
    address: string;
    phone: string;
    email: string;
    hours: string[];
    bottomText: string;
  };
}

export default function Footer({ onOpenBooking, content }: FooterProps) {
  if (!content) return null;

  const handleScrollToSegment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const activeHours = content.hours || [];

  return (
    <footer className="bg-[#0a1520] text-white/80 pt-16 pb-12 px-6 lg:px-[60px] border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Foot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          
          {/* Col 1 - Brand - col span 4 */}
          <div className="lg:col-span-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 text-left mb-5 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-[8px] flex items-center justify-center transition-all duration-200 group-hover:bg-teal-primary/20 group-hover:border-teal-primary/40">
                <HeartPulse className="w-4 h-4 text-teal-primary" />
              </div>
              <div>
                <span className="font-extrabold text-[1.1rem] tracking-[-0.01em] text-white block">
                  DENTORA
                </span>
                <p className="text-[0.62rem] font-light tracking-[0.12em] text-white/40 uppercase leading-none mt-0.5">
                  Your Family's Dental Clinic
                </p>
              </div>
            </button>

            <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
              {content.address || "Providing state-of-the-art diagnostic imaging, cosmetic restoration, and top-tier preventive hygiene care to Portland families."}
            </p>

            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-white/90">
                <span className="font-semibold text-teal-primary">Phone:</span>
                <a href={`tel:${content.phone}`} className="hover:text-teal-primary transition-colors">
                  {content.phone || "(800) 559-2648"}
                </a>
              </p>
              <p className="flex items-center gap-2 text-white/50">
                <span className="font-semibold text-white/90">Email:</span>
                <a href={`mailto:${content.email}`} className="hover:text-white transition-colors">
                  {content.email || "hello@dentoraclinic.com"}
                </a>
              </p>
            </div>
          </div>

          {/* Col 2 - Services - col span 3 */}
          <div className="lg:col-span-3">
            <h4 className="text-[0.62rem] font-bold tracking-[0.2em] text-teal-primary uppercase mb-5 sub-label">
              OUR SERVICES
            </h4>
            <div className="space-y-3">
              {[
                { name: "Dental Check-Up", title: "Dental Check-Up" },
                { name: "Teeth Cleaning", title: "Teeth Cleaning" },
                { name: "Laser Whitening", title: "Tooth Whitening" },
                { name: "Dental Implants", title: "Dental Implants" },
                { name: "Crowns & Veneers", title: "Veneers & Crowns" },
                { name: "Emergency Care", title: "Emergency Care" }
              ].map((link, i) => (
                <button
                  key={i}
                  onClick={() => onOpenBooking(link.title)}
                  className="text-xs text-white/60 hover:text-white block transition-colors text-left cursor-pointer focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 - Clinic Info - col span 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.62rem] font-bold tracking-[0.2em] text-teal-primary uppercase mb-5 sub-label">
              CLINIC INFO
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => handleScrollToSegment("about")}
                className="text-xs text-white/60 hover:text-white block transition-colors text-left cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => handleScrollToSegment("services")}
                className="text-xs text-white/60 hover:text-white block transition-colors text-left cursor-pointer"
              >
                Our Treatments
              </button>
              <button
                onClick={() => handleScrollToSegment("testimonials")}
                className="text-xs text-white/60 hover:text-white block transition-colors text-left cursor-pointer"
              >
                Patient Reviews
              </button>
              <button
                onClick={() => handleScrollToSegment("faq")}
                className="text-xs text-white/60 hover:text-white block transition-colors text-left cursor-pointer"
              >
                Common FAQs
              </button>
            </div>
          </div>

          {/* Col 4 - Opening Hours - col span 3 */}
          <div className="lg:col-span-3">
            <h4 className="text-[0.62rem] font-bold tracking-[0.2em] text-teal-primary uppercase mb-5 sub-label">
              CLINIC HOURS
            </h4>
            <div className="space-y-2 text-xs font-light text-white/65">
              {activeHours.map((hourLine, index) => (
                <p key={index} className="text-white/80">
                  {hourLine}
                </p>
              ))}
              
              <div className="h-px bg-white/10 my-3" />
              
              <p className="text-white/80 font-medium">
                24/7 Dental Emergency Line:
              </p>
              <p className="text-white font-bold leading-none text-teal-primary">
                {content.phone || "(800) 559-2648"}
              </p>
            </div>

            {/* Social media icons */}
            <div className="flex gap-4 mt-5">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Globe, label: "Google Business" },
                { icon: Shield, label: "ADA Seal" }
              ].map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href="#"
                    aria-label={`Visit Dentora's ${soc.label}`}
                    className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all duration-150"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Divider & Copyright segment */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs font-light">
          <p>{content.bottomText || "© 2026 Dentora Dental Clinic. All rights reserved."}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/55 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/55 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
