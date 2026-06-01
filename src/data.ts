import { Service, ProcessStep, Testimonial, FAQItem, Doctor } from "./types";

export const SERVICES: Service[] = [
  {
    id: "checkup",
    priceTag: "FROM $80",
    title: "Dental Check-Up",
    description: "Comprehensive examination of your teeth, gums, and jaw. Includes digital X-rays and a full treatment plan designed for your ongoing health.",
    imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=80",
    category: "General"
  },
  {
    id: "cleaning",
    priceTag: "FROM $120",
    title: "Teeth Cleaning",
    description: "Professional scaling and polishing to remove plaque, tartar, and surface stains, helping you maintain extremely fresh breath and optimal gum health.",
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&q=80",
    category: "Preventive"
  },
  {
    id: "whitening",
    priceTag: "FROM $299",
    title: "Tooth Whitening",
    description: "Professional in-office treatments or customized take-home whitening plans to brighten your beautiful smile by up to 8 full shades safely.",
    imageUrl: "https://images.unsplash.com/photo-1513412534083-c43bca4d37af?auto=format&fit=crop&w=600&q=80",
    category: "Cosmetic"
  },
  {
    id: "implants",
    priceTag: "FROM $1,800",
    title: "Dental Implants",
    description: "Permanent, incredibly natural-looking replacements for missing teeth—surgically anchored and premium-crafted to last you a lifetime.",
    imageUrl: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=600&q=80",
    category: "Surgical"
  },
  {
    id: "veneers",
    priceTag: "FROM $650",
    title: "Veneers & Crowns",
    description: "Premium porcelain shells and protective custom crowns shaped perfectly to restore pristine looks, color, alignment, and maximum strength.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    category: "Cosmetic"
  },
  {
    id: "emergency",
    priceTag: "SAME DAY",
    title: "Emergency Care",
    description: "Urgent care for excruciating toothaches, broken teeth, lost fillings, injuries, or swelling. We have immediate space reserved for you today.",
    imageUrl: "https://images.unsplash.com/photo-1579684469051-7848af8b1b1a?auto=format&fit=crop&w=600&q=80",
    category: "Emergency"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "step1",
    stepNumber: "01",
    title: "Book Online",
    description: "Fill out our quick form or call us—we'll confirm your optimal appointment slot within the hour with zero stress.",
    imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "step2",
    stepNumber: "02",
    title: "Welcome Visit",
    description: "Arrive at your scheduled time, enjoy a tea in our modern lobby, meet your dentist, and discuss your history comfortably.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "step3",
    stepNumber: "03",
    title: "Smile Assessment",
    description: "Safe 3D digital X-rays, painless comprehensive mapping, and a visual treatment timeline with flat, transparent prices.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "step4",
    stepNumber: "04",
    title: "Treatment & Care",
    description: "Gentle treatment with warm blankets and noise-canceling headphones. We review outcomes together and follow up to ensure joy.",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=400&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "review1",
    stars: 5,
    quote: "I've been going to Dentora for two years and I won't go anywhere else. They explained every step of my treatment clearly and I never felt pressured. Best dental experience I've had.",
    name: "Emily K.",
    role: "Patient",
    source: "Verified Google Review",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "review2",
    stars: 5,
    quote: "As someone who used to dread the dentist, Dentora completely changed my experience. Painless, quick, and the results were incredible. My smile has never looked better.",
    name: "Marcus T.",
    role: "Patient",
    source: "Verified Google Review",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "review3",
    stars: 5,
    quote: "Brought my whole family here after a recommendation. The team is patient and gentle with my kids, which means everything. We're Dentora patients for life.",
    name: "Sarah L.",
    role: "Patient",
    source: "Verified Google Review",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "Do you accept new patients?",
    answer: "Yes—we're always welcoming new patients and their families. You can reserve your spot online, call our front team directly, or visit us in person. Same-day appointments are frequently available for urgent matters."
  },
  {
    id: "faq2",
    question: "Is dental treatment painful at Dentora?",
    answer: "We prioritize your physical and emotional comfort above all. All procedures use highly calibrated local anesthetics so you don't feel pain. We also offer warming blankets, noise-canceling headphones, and mild sedation options for anxious patients."
  },
  {
    id: "faq3",
    question: "How often should I come in for a check-up and clean?",
    answer: "We advise scheduling a routine clean and diagnostic check-up every 6 months. Some patients with active gum care programs may benefit from visiting every 3 or 4 months—your personal dentist will customize this recommendation."
  },
  {
    id: "faq4",
    question: "Do you offer flexible payment plans?",
    answer: "Absolutely. We strongly believe everyone deserves top-tier care. We offer structural custom payment plans and work closely with leading healthcare lending platforms. Ask us about our 0% interest financing programs."
  },
  {
    id: "faq5",
    question: "What should I do in the case of a dental emergency?",
    answer: "Call our prioritized hotline immediately at (800) 559-2648. We reserve guaranteed daily emergency slots so you can get treated, eliminate pain, and restore your peaceful wellbeing on the exact same day."
  },
  {
    id: "faq6",
    question: "Can children be patients at Dentora?",
    answer: "Yes, we love working with families! We specialize in pediatric dental care, helping children from their very first tooth develop happy, healthy habits and learn that the dentist's office is a friendly, wonderful place."
  },
  {
    id: "faq7",
    question: "How long do typical treatments take?",
    answer: "Most routine dental examinations and professional cleanings take between 45 to 60 minutes. Complex treatments like implants or custom veneers are spread across a few targeted visits—we'll outline your complete time budget at the start."
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-cartier",
    name: "Dr. Daniel Carter",
    role: "Lead Dental Specialist",
    rating: 4.9,
    reviewsCount: 40,
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=400&q=80",
    specialties: ["Cosmetic Dentistry", "Oral Surgery", "Implantology"]
  }
];
