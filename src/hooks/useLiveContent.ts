import { useState, useEffect } from "react";
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  getDoc 
} from "firebase/firestore";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  User 
} from "firebase/auth";
import { db, auth, googleProvider, handleFirestoreError, OperationType } from "../firebase";
import { SERVICES, PROCESS_STEPS, TESTIMONIALS, FAQS } from "../data";
import { Service, ProcessStep, Testimonial, FAQItem } from "../types";

export interface LiveContent {
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    bgImage: string;
  };
  about: {
    heading: string;
    subtitle: string;
    highlightText: string;
    description: string;
    doctorName: string;
    doctorTitle: string;
    doctorQuote: string;
    doctorImageUrl: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
  whyChooseUs: {
    heading: string;
    subtitle: string;
    checklistTitle: string;
    checklistItems: string[];
    bgImage: string;
  };
  services: Service[];
  process: {
    heading: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  testimonials: {
    heading: string;
    subtitle: string;
    items: Testimonial[];
  };
  faqs: {
    heading: string;
    subtitle: string;
    items: FAQItem[];
  };
  finalCta: {
    heading: string;
    subtitle: string;
    ctaText: string;
    bgImage: string;
  };
  footer: {
    address: string;
    phone: string;
    email: string;
    hours: string[];
    bottomText: string;
  };
  beforeAfter: {
    cases: {
      id: number;
      label: string;
      beforeText: string;
      afterText: string;
      beforeColor: string;
      afterColor: string;
    }[];
  };
  doctors: {
    team: {
      id: number;
      name: string;
      role: string;
      exp: string;
      spec: string;
      emoji: string;
    }[];
  };
  insurance: {
    heading: string;
    subtitle: string;
    paymentOptions: {
      icon: string;
      label: string;
      desc: string;
    }[];
    insurers: string[];
    footerNote: string;
  };
  mapSection: {
    heading: string;
    subtitle: string;
    mapEmbedUrl: string;
    infoCards: {
      icon: string;
      label: string;
      value: string;
    }[];
  };
  emergencyBanner: {
    enabled: boolean;
    message: string;
  };
}

// Complete, rich default dataset matching original dental presentation context
export const DEFAULT_LIVE_CONTENT: LiveContent = {
  hero: {
    badge: "MODERN BIOMIMETIC CLINIC",
    heading: "The absolute pinnacle of high-end biological dentistry.",
    subheading: "An ultra-premium dental experience matching surgical perfection with absolute physical and sensory wellness.",
    ctaPrimary: "Secure Appointment",
    ctaSecondary: "Explore Clinical Services",
    bgImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80"
  },
  about: {
    heading: "Uncompromising biological integrity for your smile.",
    subtitle: "OUR CLINICAL VISION",
    highlightText: "At Dentora, we don't just treat symptoms. We practice holistic, biocompatible dentistry that respects the intricate connection between your oral health and systemic biological vitality.",
    description: "Every treatment protocol is custom-crafted to absolute biological parameters. We use only tooth-colored, metal-free, and non-toxic materials, backed by rigorous scientific alignment and modern low-radiation diagnostic technologies.",
    doctorName: "Dr. Daniel Carter",
    doctorTitle: "Lead Dental Biomimetic Specialist",
    doctorQuote: "Biological dentistry is not a trend; it is the absolute baseline of modern healthcare. We treat the whole being, starting with a pristine, beautiful smile.",
    doctorImageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&h=600&q=80",
    stat1Number: "15+",
    stat1Label: "Years Excellence",
    stat2Number: "4.9★",
    stat2Label: "Lead Dentist",
    stat3Number: "10k+",
    stat3Label: "Happy Patients"
  },
  whyChooseUs: {
    heading: "Surgical precision framed by absolute patient safety.",
    subtitle: "WHY DENTORA",
    checklistTitle: "THE CLINICAL CORE",
    checklistItems: [
      "100% Biocompatible Materials & Metal-Free Restorations",
      "Biological Extraction Protocols & PRF Healing Acceleration",
      "Ultra-Low Radiation Digital 3D CBCT Scanning Systems",
      "Comprehensive Mercury Amalgam Safe Removal Protocol (SMART)",
      "Ozone Therapy & Laser Sterilization for Gentle Treatments",
      "Stress-Free Environmental Soundscapes & Grounding Mats"
    ],
    bgImage: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=1000&q=80"
  },
  services: SERVICES,
  process: {
    heading: "Your biological onboarding standard.",
    subtitle: "PATIENT JOURNEY",
    steps: PROCESS_STEPS
  },
  testimonials: {
    heading: "What our patients say.",
    subtitle: "VERIFIED STORIES",
    items: TESTIMONIALS
  },
  faqs: {
    heading: "Frequently Asked Questions",
    subtitle: "HELPING YOU CHOOSE WELL",
    items: FAQS
  },
  finalCta: {
    heading: "Step into biologically aligned healthcare.",
    subtitle: "EXPERIENCE THE DENTORA STANDARD",
    ctaText: "A holistic journey to oral and systemic vitality starting today.",
    bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80"
  },
  footer: {
    address: "742 Evergreen Terrace, Suite 100, Capital City",
    phone: "(800) 559-2648",
    email: "concierge@dentora-clinic.com",
    hours: [
      "Mon - Thu: 08:00 AM - 05:00 PM",
      "Friday: 08:00 AM - 02:00 PM",
      "Saturday - Sunday: Closed"
    ],
    bottomText: "© 2026 Dentora Biological Dental Clinic. All Rights Reserved. Crafted for holistic wellbeing."
  },
  beforeAfter: {
    cases: [
      { id: 1, label: "Teeth Whitening", beforeText: "Stained", afterText: "Bright White", beforeColor: "#78350f", afterColor: "#e2e8f0" },
      { id: 2, label: "Dental Implants", beforeText: "Missing Tooth", afterText: "Natural Look", beforeColor: "#374151", afterColor: "#0d9488" },
      { id: 3, label: "Veneers", beforeText: "Chipped", afterText: "Perfect Smile", beforeColor: "#7c2d12", afterColor: "#cbd5e1" }
    ]
  },
  doctors: {
    team: [
      { id: 1, name: "Dr. Priya Sharma", role: "Chief Dental Surgeon", exp: "15+ Years", spec: "Implants & Cosmetic", emoji: "👩‍⚕️" },
      { id: 2, name: "Dr. Rajan Mehta", role: "Orthodontist", exp: "12+ Years", spec: "Braces & Aligners", emoji: "👨‍⚕️" },
      { id: 3, name: "Dr. Anitha Rao", role: "Periodontist", exp: "10+ Years", spec: "Gum Treatment", emoji: "👩‍⚕️" },
      { id: 4, name: "Dr. Suresh Kumar", role: "Endodontist", exp: "8+ Years", spec: "Root Canal", emoji: "👨‍⚕️" }
    ]
  },
  insurance: {
    heading: "Insurance & Payment Options",
    subtitle: "HASSLE-FREE PAYMENTS",
    paymentOptions: [
      { icon: "💳", label: "All Cards", desc: "Visa, Mastercard, Amex, Rupay" },
      { icon: "📱", label: "UPI / GPay", desc: "PhonePe, Paytm, BHIM, GPay" },
      { icon: "🏦", label: "EMI Plans", desc: "0% EMI up to 12 months" },
      { icon: "🛡️", label: "Insurance", desc: "All major insurers accepted" }
    ],
    insurers: ["Star Health", "ICICI Lombard", "HDFC ERGO", "Bajaj Allianz", "New India", "United India", "Aditya Birla", "Niva Bupa"],
    footerNote: "Don't see your insurer? Call us — we work with most providers."
  },
  mapSection: {
    heading: "Our Location",
    subtitle: "FIND US",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3282722083396!2d78.48569!3d17.44611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzQ2LjAiTiA3OMKwMjknMDguNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
    infoCards: [
      { icon: "📍", label: "Address", value: "742 Evergreen Terrace, Capital City" },
      { icon: "🕐", label: "Mon–Fri", value: "8:00 AM – 7:00 PM" },
      { icon: "🚨", label: "Emergency", value: "Same-day slots available" }
    ]
  },
  emergencyBanner: {
    enabled: true,
    message: "DENTAL EMERGENCY? We have same-day slots reserved!"
  }
};

const DOC_ID = "homepage";

export function useLiveContent() {
  const [content, setContent] = useState<LiveContent>(DEFAULT_LIVE_CONTENT);
  const [isDbLoaded, setIsDbLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModeActive, setIsAdminModeActive] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"synced" | "saving" | "error">("synced");
  const [errorMessage, setErrorMessage] = useState("");

  const [authError, setAuthError] = useState<string | null>(null);

  // 1. Authenticate with Google
  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") {
        console.warn("User cancelled the sign-in flow by closing the Google credential popup.");
        setAuthError("Sign-in window closed. Please try again to edit live content.");
      } else if (err?.code === "auth/popup-blocked") {
        console.warn("Google credentials popup was blocked by browser filters.");
        setAuthError("Login popup blocked. Please allow popups for this app to sign in.");
      } else {
        console.warn("Authentication process encountered an error:", err);
        setAuthError(err instanceof Error ? err.message : "Authentication failed. Please try again.");
      }
    }
  };

  // 2. Clear Session
  const logout = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
      setIsAdminModeActive(false);
    } catch (err) {
      console.warn("Auth signout failed slightly:", err);
    }
  };

  // 3. Save updates to a specific section inside Firestore
  const updateContent = async (newContent: LiveContent) => {
    if (!isAdmin) {
      console.warn("Unauthorized modification block called");
      return;
    }
    setSaveStatus("saving");
    try {
      const docRef = doc(db, "site_content", DOC_ID);
      await setDoc(docRef, newContent);
      setSaveStatus("synced");
    } catch (err) {
      setSaveStatus("error");
      setErrorMessage(err instanceof Error ? err.message : String(err));
      handleFirestoreError(err, OperationType.UPDATE, `site_content/${DOC_ID}`);
    }
  };

  // 4. Update a single field inside our sections
  const updateField = async <T extends keyof LiveContent>(
    section: T,
    data: LiveContent[T]
  ) => {
    if (!isAdmin) return;
    setSaveStatus("saving");
    try {
      const docRef = doc(db, "site_content", DOC_ID);
      const updated = { ...content, [section]: data };
      await setDoc(docRef, updated);
      setSaveStatus("synced");
    } catch (err) {
      setSaveStatus("error");
      setErrorMessage(err instanceof Error ? err.message : String(err));
      handleFirestoreError(err, OperationType.UPDATE, `site_content/${DOC_ID}`);
    }
  };

  // Connect listener to Firestore `site_content/homepage` and populates/seeds if null
  useEffect(() => {
    const docRef = doc(db, "site_content", DOC_ID);
    
    const unsubscribe = onSnapshot(docRef, async (snap) => {
      if (snap.exists()) {
        setContent(snap.data() as LiveContent);
        setIsDbLoaded(true);
      } else {
        // Document does not exist yet (first-time provisioning setup). Let's seed it.
        try {
          // Temporarily seed default content
          await setDoc(docRef, DEFAULT_LIVE_CONTENT);
          setContent(DEFAULT_LIVE_CONTENT);
          setIsDbLoaded(true);
        } catch (err) {
          console.warn("Initial seeding skipped (unauthenticated public client view). Fallback to default memory state.");
          setContent(DEFAULT_LIVE_CONTENT);
          setIsDbLoaded(true);
        }
      }
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
      // Fallback to local default simulation is automatic via previous state
    });

    return () => unsubscribe();
  }, []);

  // Track Firebase Auth user profile state and check admin rights
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user is the bootstrapped admin (bypassing strict verification for quick deployment testing)
        if (currentUser.email === "pragnyasri2204@gmail.com") {
          setIsAdmin(true);
          setIsAdminModeActive(true); // Auto-enable mode
        } else {
          // Fallback: see if admin document exists in /admins/
          try {
            const adminDocRef = doc(db, "admins", currentUser.uid);
            const adminSnap = await getDoc(adminDocRef);
            if (adminSnap.exists()) {
              setIsAdmin(true);
              setIsAdminModeActive(true);
            } else {
              setIsAdmin(false);
              setIsAdminModeActive(false);
            }
          } catch (e) {
            setIsAdmin(false);
            setIsAdminModeActive(false);
          }
        }
      } else {
        setIsAdmin(false);
        setIsAdminModeActive(false);
      }
    });

    return () => unsubAuth();
  }, []);

  return {
    content,
    isDbLoaded,
    user,
    isAdmin,
    isAdminModeActive,
    setIsAdminModeActive,
    loginWithGoogle,
    logout,
    updateContent,
    updateField,
    saveStatus,
    errorMessage,
    authError,
    setAuthError
  };
}
