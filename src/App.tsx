import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProgressSteps from "./components/ProgressSteps";
import AboutStats from "./components/AboutStats";
import ServicesGrid from "./components/ServicesGrid";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import PhotoCTABanner from "./components/PhotoCTABanner";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import AdminEditor from "./components/AdminEditor";
import { useLiveContent } from "./hooks/useLiveContent";
import EmergencyBanner from "./components/EmergencyBanner";
import WhatsAppButton from "./components/WhatsAppButton";
import AIChatbot from "./components/AIChatbot";
import MapSection from "./components/MapSection";
import BeforeAfterGallery from "./components/BeforeAfterGallery";
import DoctorTeam from "./components/DoctorTeam";
import InsuranceSection from "./components/InsuranceSection";
import MobileBookButton from "./components/MobileBookButton";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");

  const {
    content, isDbLoaded, user, isAdmin, isAdminModeActive,
    setIsAdminModeActive, loginWithGoogle, logout,
    updateContent, saveStatus, errorMessage, authError, setAuthError
  } = useLiveContent();

  const handleOpenBooking = (serviceName = "") => {
    let selectionKey = "Checkup";
    if (serviceName) {
      if (serviceName.includes("Check-Up")) selectionKey = "Checkup";
      else if (serviceName.includes("Cleaning")) selectionKey = "Cleaning";
      else if (serviceName.includes("Whitening")) selectionKey = "Whitening";
      else if (serviceName.includes("Implants")) selectionKey = "Implants";
      else if (serviceName.includes("Veneers") || serviceName.includes("Crowns")) selectionKey = "Veneers";
      else if (serviceName.includes("Emergency")) selectionKey = "Emergency";
    }
    setPreselectedService(selectionKey);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-teal-primary selection:text-white">

      {/* Emergency Banner */}
      <EmergencyBanner
        phone={content.footer.phone}
        message={content.emergencyBanner?.message}
        enabled={content.emergencyBanner?.enabled !== false}
      />

      {/* Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        phone={content.footer.phone}
        user={user} isAdmin={isAdmin}
        isAdminModeActive={isAdminModeActive}
        setIsAdminModeActive={setIsAdminModeActive}
        onLogin={loginWithGoogle} onLogout={logout}
        authError={authError}
        onClearAuthError={() => setAuthError(null)}
      />

      <Hero onOpenBooking={() => handleOpenBooking()} content={content.hero} />
      <ProgressSteps />

      <main>
        <AboutStats content={content.about} />
        <ServicesGrid onOpenBooking={(name) => handleOpenBooking(name)} services={content.services} />
        <BeforeAfterGallery cases={content.beforeAfter?.cases || []} />
        <WhyChooseUs onOpenBooking={() => handleOpenBooking()} content={content.whyChooseUs} />
        <DoctorTeam team={content.doctors?.team || []} />
        <Process content={content.process} />
        <Testimonials content={content.testimonials} />
        <InsuranceSection content={content.insurance} />
        <PhotoCTABanner onOpenBooking={() => handleOpenBooking()} phone={content.footer.phone} />
        <MapSection content={content.mapSection} />
        <FAQ content={content.faqs} />
        <FinalCTA onOpenBooking={() => handleOpenBooking()} content={content.finalCta} />
      </main>

      <Footer onOpenBooking={(name) => handleOpenBooking(name)} content={content.footer} />

      <BookingModal isOpen={isBookingOpen} onClose={() => { setIsBookingOpen(false); setPreselectedService(""); }} preselectedService={preselectedService} />

      {isAdmin && isAdminModeActive && (
        <AdminEditor content={content} onSave={updateContent} onClose={() => setIsAdminModeActive(false)} saveStatus={saveStatus} errorMessage={errorMessage} />
      )}

      <AIChatbot clinicName="Dentora Dental Clinic" phone={content.footer.phone} services={content.services?.map((s: any) => s.title) || []} />
      <WhatsAppButton phone={content.footer.phone} />
      <MobileBookButton onOpenBooking={() => handleOpenBooking()} phone={content.footer.phone} />
    </div>
  );
}
