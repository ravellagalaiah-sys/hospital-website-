import { useState } from "react";
import { 
  X, Save, AlertTriangle, RefreshCw, Layout, Info, HelpCircle, 
  ChevronRight, Users, MessageSquare, Briefcase, Plus, Trash2, CheckCircle 
} from "lucide-react";
import { LiveContent } from "../hooks/useLiveContent";

interface AdminEditorProps {
  content: LiveContent;
  onSave: (newContent: LiveContent) => void;
  onClose: () => void;
  saveStatus: "synced" | "saving" | "error";
  errorMessage: string;
}

type TabType = "hero" | "about" | "why" | "services" | "process" | "testimonials" | "faqs" | "footer" | "doctors" | "beforeafter" | "insurance" | "map" | "emergency";

export default function AdminEditor({
  content,
  onSave,
  onClose,
  saveStatus,
  errorMessage
}: AdminEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [formState, setFormState] = useState<LiveContent>(JSON.parse(JSON.stringify(content)));

  const handleFieldChange = (section: keyof LiveContent, key: string, value: any) => {
    setFormState(prev => {
      const updated = { ...prev };
      (updated[section] as any)[key] = value;
      return updated;
    });
  };

  const handleArrayItemChange = (section: "services" | "process" | "testimonials" | "faqs", idx: number, key: string, value: any) => {
    setFormState(prev => {
      const updated = { ...prev };
      const arr = [...(updated[section] as any[])];
      arr[idx] = { ...arr[idx], [key]: value };
      updated[section] = arr as any;
      return updated;
    });
  };

  const handleAddArrayItem = (section: "services" | "process" | "testimonials" | "faqs") => {
    setFormState(prev => {
      const updated = { ...prev };
      const arr = [...(updated[section] as any[])];
      
      const newItems: Record<string, any> = {
        services: {
          id: `service_${Date.now()}`,
          title: "New Dental Service",
          description: "Our high precision dental therapy explanation.",
          category: "Preventive",
          price: "$99",
          iconName: "Sparkles",
          longDesc: "Deep biological holistic treatment details.",
          details: ["Gentle approach", "Biomedical treatment"]
        },
        process: {
          id: `step_${Date.now()}`,
          stepNumber: `0${arr.length + 1}`,
          title: "New Onboarding Step",
          description: "Step details here",
          imageUrl: "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&w=400&q=80"
        },
        testimonials: {
          id: `review_${Date.now()}`,
          name: "John Miller",
          role: "Holistic Health Advocate",
          quote: "The care received here is absolutely second to none.",
          stars: 5,
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
          source: "Google Reviews"
        },
        faqs: {
          id: `faq_${Date.now()}`,
          question: "New dynamic question guidelines?",
          answer: "Our clinical team takes safety guidelines very seriously."
        }
      };

      arr.push(newItems[section]);
      updated[section] = arr as any;
      return updated;
    });
  };

  const handleRemoveArrayItem = (section: "services" | "process" | "testimonials" | "faqs", idx: number) => {
    setFormState(prev => {
      const updated = { ...prev };
      const arr = [...(updated[section] as any[])];
      arr.splice(idx, 1);
      updated[section] = arr as any;
      return updated;
    });
  };

  const handleAddChecklistItem = () => {
    setFormState(prev => {
      const updated = { ...prev };
      const items = [...updated.whyChooseUs.checklistItems];
      items.push("New dental quality standard assurance");
      updated.whyChooseUs.checklistItems = items;
      return updated;
    });
  };

  const handleRemoveChecklistItem = (idx: number) => {
    setFormState(prev => {
      const updated = { ...prev };
      const items = [...updated.whyChooseUs.checklistItems];
      items.splice(idx, 1);
      updated.whyChooseUs.checklistItems = items;
      return updated;
    });
  };

  const handleChecklistItemChange = (idx: number, val: string) => {
    setFormState(prev => {
      const updated = { ...prev };
      const items = [...updated.whyChooseUs.checklistItems];
      items[idx] = val;
      updated.whyChooseUs.checklistItems = items;
      return updated;
    });
  };

  const handleAddHourLine = () => {
    setFormState(prev => {
      const updated = { ...prev };
      const hours = [...updated.footer.hours];
      hours.push("Saturday: 09:00 AM - 04:00 PM");
      updated.footer.hours = hours;
      return updated;
    });
  };

  const handleRemoveHourLine = (idx: number) => {
    setFormState(prev => {
      const updated = { ...prev };
      const hours = [...updated.footer.hours];
      hours.splice(idx, 1);
      updated.footer.hours = hours;
      return updated;
    });
  };

  const handleHourLineChange = (idx: number, val: string) => {
    setFormState(prev => {
      const updated = { ...prev };
      const hours = [...updated.footer.hours];
      hours[idx] = val;
      updated.footer.hours = hours;
      return updated;
    });
  };

  const handleSaveClick = () => {
    onSave(formState);
  };

  const tabs = [
    { id: "hero", label: "Hero Banner", icon: Layout },
    { id: "about", label: "About Clinic", icon: Info },
    { id: "why", label: "Why Choose Us", icon: CheckCircle },
    { id: "services", label: "Dental services", icon: Briefcase },
    { id: "process", label: "Workflow steps", icon: ChevronRight },
    { id: "testimonials", label: "Patient Reviews", icon: MessageSquare },
    { id: "faqs", label: "FAQs questions", icon: HelpCircle },
    { id: "footer", label: "Footer contact", icon: Users }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex justify-end">
      {/* Sliding editor workspace drawer */}
      <div className="w-full max-w-4xl bg-[#0a111b] h-full shadow-2xl border-l border-white/10 flex flex-col justify-between overflow-hidden text-white font-sans animate-slide-in">
        
        {/* Header toolbar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="text-lg font-bold text-white tracking-tight">Real-Time Sync Editorial Panel</h2>
            </div>
            <p className="text-xs text-white/45 mt-0.5">
              Updates publish instantly to all connected user devices.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Sync status widget banner */}
            {saveStatus === "saving" && (
              <span className="text-xs text-amber-500 font-mono flex items-center gap-1 bg-amber-500/10 py-1 px-3 rounded-full border border-amber-500/20">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Publishing live...
              </span>
            )}
            {saveStatus === "synced" && (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 bg-emerald-400/10 py-1 px-3 rounded-full border border-emerald-400/20">
                <CheckCircle className="w-3.5 h-3.5" />
                Live: All Devices Synced
              </span>
            )}
            {saveStatus === "error" && (
              <span className="text-xs text-red-400 font-mono flex items-center gap-1 bg-red-400/10 py-1 px-3 rounded-full border border-red-400/20" title={errorMessage}>
                <AlertTriangle className="w-3.5 h-3.5" />
                Sync Failed
              </span>
            )}

            <button
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors cursor-pointer text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content body wrapper split with tab-column */}
        <div className="flex-1 flex overflow-hidden">
          {/* Tab Selection panel on left */}
          <div className="w-[220px] bg-slate-950/20 border-r border-white/5 p-4 space-y-1.5 overflow-y-auto shrink-0">
            {tabs.map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-left text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                    activeTab === tab.id 
                      ? "bg-amber-400/10 border-l-[3px] border-amber-400 text-amber-400 shadow-sm" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Content on right */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            
            {/* HERO SECTION TAB */}
            {activeTab === "hero" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-b border-white/5 pb-2">Hero Welcome Content</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Top Banner Badge COPY</label>
                  <input
                    type="text"
                    value={formState.hero.badge}
                    onChange={(e) => handleFieldChange("hero", "badge", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Primary Hero Headline Text</label>
                  <textarea
                    rows={2}
                    value={formState.hero.heading}
                    onChange={(e) => handleFieldChange("hero", "heading", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 font-sans">Subheading Statement Copy</label>
                  <textarea
                    rows={3}
                    value={formState.hero.subheading}
                    onChange={(e) => handleFieldChange("hero", "subheading", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Book Appointment Button Text</label>
                  <input
                    type="text"
                    value={formState.hero.ctaPrimary}
                    onChange={(e) => handleFieldChange("hero", "ctaPrimary", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Hero Background Image URL (Unsplash/Direct link)</label>
                  <input
                    type="text"
                    value={formState.hero.bgImage}
                    onChange={(e) => handleFieldChange("hero", "bgImage", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none transition-colors text-white"
                  />
                </div>
              </div>
            )}

            {/* ABOUT CLINIC TAB */}
            {activeTab === "about" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-b border-white/5 pb-2">About & Vision Content</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Upper Subtitle Quote Label</label>
                    <input
                      type="text"
                      value={formState.about.subtitle}
                      onChange={(e) => handleFieldChange("about", "subtitle", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Main Section Headline</label>
                    <input
                      type="text"
                      value={formState.about.heading}
                      onChange={(e) => handleFieldChange("about", "heading", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 font-sans">Highlighted Bold Intro Paragraph</label>
                  <textarea
                    rows={3}
                    value={formState.about.highlightText}
                    onChange={(e) => handleFieldChange("about", "highlightText", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Secondary Details text (supports multiline values)</label>
                  <textarea
                    rows={3}
                    value={formState.about.description}
                    onChange={(e) => handleFieldChange("about", "description", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                  />
                </div>

                <h4 className="text-xs font-bold text-amber-200 mt-6 block uppercase tracking-wide">Doctor Profile Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Doctor Full Name</label>
                    <input
                      type="text"
                      value={formState.about.doctorName}
                      onChange={(e) => handleFieldChange("about", "doctorName", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Doctor Title Label</label>
                    <input
                      type="text"
                      value={formState.about.doctorTitle}
                      onChange={(e) => handleFieldChange("about", "doctorTitle", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Doctor Signature Quote</label>
                  <input
                    type="text"
                    value={formState.about.doctorQuote}
                    onChange={(e) => handleFieldChange("about", "doctorQuote", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Doctor Avatar Image URL</label>
                  <input
                    type="text"
                    value={formState.about.doctorImageUrl}
                    onChange={(e) => handleFieldChange("about", "doctorImageUrl", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                  />
                </div>

                <h4 className="text-xs font-bold text-amber-200 mt-6 block uppercase tracking-wide">Dynamic Clinical Statistics</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[0.68rem] text-white/40 mb-1">Stat 1 Number (e.g. 15+)</label>
                    <input
                      type="text"
                      value={formState.about.stat1Number}
                      onChange={(e) => handleFieldChange("about", "stat1Number", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-2.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={formState.about.stat1Label}
                      placeholder="Label"
                      onChange={(e) => handleFieldChange("about", "stat1Label", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-2 text-xs text-white/60 mt-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.68rem] text-white/40 mb-1">Stat 2 Number (e.g. 4.9★)</label>
                    <input
                      type="text"
                      value={formState.about.stat2Number}
                      onChange={(e) => handleFieldChange("about", "stat2Number", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-2.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={formState.about.stat2Label}
                      placeholder="Label"
                      onChange={(e) => handleFieldChange("about", "stat2Label", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-2 text-xs text-white/60 mt-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.68rem] text-white/40 mb-1">Stat 3 Number (e.g. 10k+)</label>
                    <input
                      type="text"
                      value={formState.about.stat3Number}
                      onChange={(e) => handleFieldChange("about", "stat3Number", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-2.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={formState.about.stat3Label}
                      placeholder="Label"
                      onChange={(e) => handleFieldChange("about", "stat3Label", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-2 text-xs text-white/60 mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* WHY CHOOSE US TAB */}
            {activeTab === "why" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-b border-white/5 pb-2">Why Choose Us</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Subtitle category</label>
                  <input
                    type="text"
                    value={formState.whyChooseUs.subtitle}
                    onChange={(e) => handleFieldChange("whyChooseUs", "subtitle", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Section Main Heading</label>
                  <textarea
                    rows={2}
                    value={formState.whyChooseUs.heading}
                    onChange={(e) => handleFieldChange("whyChooseUs", "heading", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Under text summary / checklist title</label>
                  <input
                    type="text"
                    value={formState.whyChooseUs.checklistTitle}
                    onChange={(e) => handleFieldChange("whyChooseUs", "checklistTitle", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                  />
                </div>

                {/* Editable Checklist Items list */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-white/50">Core Clinical Checklist</label>
                    <button
                      type="button"
                      onClick={handleAddChecklistItem}
                      className="flex items-center gap-1.5 text-[0.7rem] bg-amber-400 text-slate-950 font-bold py-1 px-3 rounded-md hover:bg-amber-300 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add point
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formState.whyChooseUs.checklistItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="text-xs text-amber-400 font-mono w-4 font-bold shrink-0">{idx + 1}</span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleChecklistItemChange(idx, e.target.value)}
                          className="flex-1 bg-[#0d1622]/80 rounded-lg border border-white/10 py-2 px-3 text-xs focus:border-amber-400 outline-none text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveChecklistItem(idx)}
                          className="p-1 px-2 text-white/35 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Patient presentation Image Url</label>
                  <input
                    type="text"
                    value={formState.whyChooseUs.bgImage}
                    onChange={(e) => handleFieldChange("whyChooseUs", "bgImage", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                  />
                </div>
              </div>
            )}

            {/* CLINICAL SERVICES TAB */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">Treatments Catalog</h3>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("services")}
                    className="flex items-center gap-1.5 text-xs bg-amber-400 text-slate-950 font-bold py-1.5 px-4 rounded-full hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    New Dental Service
                  </button>
                </div>

                <div className="space-y-4">
                  {formState.services.map((srv, idx) => (
                    <div key={srv.id} className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("services", idx)}
                        className="absolute top-4 right-4 p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors cursor-pointer"
                        title="Delete service category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-3 pr-10">
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Service title</label>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => handleArrayItemChange("services", idx, "title", e.target.value)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Category tab (e.g. Preventive, Cosmetic)</label>
                          <input
                            type="text"
                            value={srv.category}
                            onChange={(e) => handleArrayItemChange("services", idx, "category", e.target.value)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-white">
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1 font-sans">Headline brief</label>
                          <input
                            type="text"
                            value={srv.description}
                            onChange={(e) => handleArrayItemChange("services", idx, "description", e.target.value)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1 font-sans">Price bracket / Starting scale</label>
                          <input
                            type="text"
                            value={srv.price}
                            onChange={(e) => handleArrayItemChange("services", idx, "price", e.target.value)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-mono mb-1 font-sans">Clinical Deep explanation & detail summary</label>
                        <textarea
                          rows={2}
                          value={srv.longDesc}
                          onChange={(e) => handleArrayItemChange("services", idx, "longDesc", e.target.value)}
                          className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROCESS TAB */}
            {activeTab === "process" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">Onboarding steps</h3>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("process")}
                    className="flex items-center gap-1.5 text-xs bg-amber-400 text-slate-950 font-bold py-1.5 px-4 rounded-full hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    New step
                  </button>
                </div>

                <div className="space-y-4">
                  {formState.process.steps.map((st, idx) => (
                    <div key={st.id} className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("process", idx)}
                        className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                        title="Remove onboarding step card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-3 gap-3 pr-10">
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Step # (e.g. 01)</label>
                          <input
                            type="text"
                            value={st.stepNumber}
                            onChange={(e) => handleArrayItemChange("process", idx, "stepNumber", e.target.value)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1 font-sans">Workflow point title</label>
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => handleArrayItemChange("process", idx, "title", e.target.value)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-mono mb-1 font-sans">Full item description statement</label>
                        <textarea
                          rows={2}
                          value={st.description}
                          onChange={(e) => handleArrayItemChange("process", idx, "description", e.target.value)}
                          className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Process image URL illustration</label>
                        <input
                          type="text"
                          value={st.imageUrl}
                          onChange={(e) => handleArrayItemChange("process", idx, "imageUrl", e.target.value)}
                          className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === "testimonials" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">Verified Reviews</h3>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("testimonials")}
                    className="flex items-center gap-1.5 text-xs bg-amber-400 text-slate-950 font-bold py-1.5 px-4 rounded-full hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    New review
                  </button>
                </div>

                <div className="space-y-4">
                  {formState.testimonials.items.map((rev, idx) => (
                    <div key={rev.id} className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("testimonials", idx)}
                        className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                        title="Remove patient review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-3 pr-10">
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Patient name</label>
                          <input
                            type="text"
                            value={rev.name}
                            onChange={(e) => handleArrayItemChange("testimonials", idx, "name", e.target.value)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Condition/Role label</label>
                          <input
                            type="text"
                            value={rev.role}
                            onChange={(e) => handleArrayItemChange("testimonials", idx, "role", e.target.value)}
                            className="w-full bg-[#0d1622]/85 rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Patient quote / statement</label>
                        <textarea
                          rows={2}
                          value={rev.quote}
                          onChange={(e) => handleArrayItemChange("testimonials", idx, "quote", e.target.value)}
                          className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3 pr-10">
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Stars count (1-5)</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={rev.stars}
                            onChange={(e) => handleArrayItemChange("testimonials", idx, "stars", parseInt(e.target.value) || 5)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[10px] text-white/40 uppercase font-mono mb-1 font-sans">Source network label (e.g. Google Reviews)</label>
                          <input
                            type="text"
                            value={rev.source}
                            onChange={(e) => handleArrayItemChange("testimonials", idx, "source", e.target.value)}
                            className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-mono mb-1">Avatar / Patient photo URL</label>
                        <input
                          type="text"
                          value={rev.avatarUrl}
                          onChange={(e) => handleArrayItemChange("testimonials", idx, "avatarUrl", e.target.value)}
                          className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQS TAB */}
            {activeTab === "faqs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">FAQ Accordions</h3>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("faqs")}
                    className="flex items-center gap-1.5 text-xs bg-amber-400 text-slate-950 font-bold py-1.5 px-4 rounded-full hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    New FAQ
                  </button>
                </div>

                <div className="space-y-4">
                  {formState.faqs.items.map((fq, idx) => (
                    <div key={fq.id} className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("faqs", idx)}
                        className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                        title="Remove FAQ element"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="pr-10">
                        <label className="block text-[10px] text-white/40 uppercase font-mono mb-1 font-sans">Dental treatment/clinic question</label>
                        <input
                          type="text"
                          value={fq.question}
                          onChange={(e) => handleArrayItemChange("faqs", idx, "question", e.target.value)}
                          className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-mono mb-1 font-sans">Detailed clinical response/answer</label>
                        <textarea
                          rows={3}
                          value={fq.answer}
                          onChange={(e) => handleArrayItemChange("faqs", idx, "answer", e.target.value)}
                          className="w-full bg-[#0d1622] rounded-lg border border-white/10 py-1.5 px-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOOTER TAB */}
  
          {activeTab === "doctors" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Doctor Team</h3>
                <button onClick={() => {
                  const updated = { ...formState };
                  if (!updated.doctors) updated.doctors = { team: [] };
                  updated.doctors.team.push({ id: Date.now(), name: "Dr. New Doctor", role: "Specialist", exp: "5+ Years", spec: "General Dentistry", emoji: "👨‍⚕️" });
                  setFormState(updated);
                }} className="text-xs bg-teal-primary/20 text-teal-primary px-3 py-1 rounded-full hover:bg-teal-primary/30 transition-colors">+ Add Doctor</button>
              </div>
              {(formState.doctors?.team || []).map((doc: any, i: number) => (
                <div key={doc.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/60 font-bold">Doctor {i + 1}</span>
                    <button onClick={() => {
                      const updated = { ...formState };
                      updated.doctors.team.splice(i, 1);
                      setFormState({ ...updated });
                    }} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                  </div>
                  {[
                    { key: "name", label: "Name" }, { key: "role", label: "Role" },
                    { key: "exp", label: "Experience" }, { key: "spec", label: "Specialization" }, { key: "emoji", label: "Emoji" }
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-xs text-white/50 block mb-1">{label}</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-primary/50"
                        value={(doc as any)[key] || ""} onChange={e => {
                          const updated = { ...formState };
                          updated.doctors.team[i] = { ...updated.doctors.team[i], [key]: e.target.value };
                          setFormState({ ...updated });
                        }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === "beforeafter" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Before & After Cases</h3>
                <button onClick={() => {
                  const updated = { ...formState };
                  if (!updated.beforeAfter) updated.beforeAfter = { cases: [] };
                  updated.beforeAfter.cases.push({ id: Date.now(), label: "New Case", beforeText: "Before", afterText: "After", beforeColor: "#374151", afterColor: "#0d9488" });
                  setFormState({ ...updated });
                }} className="text-xs bg-teal-primary/20 text-teal-primary px-3 py-1 rounded-full hover:bg-teal-primary/30 transition-colors">+ Add Case</button>
              </div>
              {(formState.beforeAfter?.cases || []).map((c: any, i: number) => (
                <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/60 font-bold">Case {i + 1}</span>
                    <button onClick={() => {
                      const updated = { ...formState };
                      updated.beforeAfter.cases.splice(i, 1);
                      setFormState({ ...updated });
                    }} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                  </div>
                  {[
                    { key: "label", label: "Tab Label" }, { key: "beforeText", label: "Before Text" },
                    { key: "afterText", label: "After Text" }, { key: "beforeColor", label: "Before Color (hex)" },
                    { key: "afterColor", label: "After Color (hex)" }
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-xs text-white/50 block mb-1">{label}</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-primary/50"
                        value={(c as any)[key] || ""} onChange={e => {
                          const updated = { ...formState };
                          updated.beforeAfter.cases[i] = { ...updated.beforeAfter.cases[i], [key]: e.target.value };
                          setFormState({ ...updated });
                        }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === "insurance" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Insurance & Payment</h3>
              {[{ key: "heading", label: "Section Heading" }, { key: "subtitle", label: "Subtitle" }, { key: "footerNote", label: "Footer Note" }].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs text-white/50 block mb-1">{label}</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-primary/50"
                    value={(formState.insurance as any)?.[key] || ""} onChange={e => {
                      const updated = { ...formState, insurance: { ...formState.insurance, [key]: e.target.value } };
                      setFormState(updated as any);
                    }} />
                </div>
              ))}
              <div>
                <label className="text-xs text-white/50 block mb-1">Insurance Partners (comma separated)</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-primary/50 resize-none" rows={3}
                  value={(formState.insurance?.insurers || []).join(", ")} onChange={e => {
                    const updated = { ...formState, insurance: { ...formState.insurance, insurers: e.target.value.split(",").map(s => s.trim()).filter(Boolean) } };
                    setFormState(updated as any);
                  }} />
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Map & Location</h3>
              {[{ key: "heading", label: "Section Heading" }, { key: "subtitle", label: "Subtitle" }, { key: "mapEmbedUrl", label: "Google Maps Embed URL" }].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs text-white/50 block mb-1">{label}</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-primary/50"
                    value={(formState.mapSection as any)?.[key] || ""} onChange={e => {
                      const updated = { ...formState, mapSection: { ...formState.mapSection, [key]: e.target.value } };
                      setFormState(updated as any);
                    }} />
                </div>
              ))}
              <div>
                <label className="text-xs text-white/50 block mb-2">Info Cards</label>
                {(formState.mapSection?.infoCards || []).map((card: any, i: number) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2 space-y-2">
                    <p className="text-xs text-white/40 font-bold">Card {i + 1}</p>
                    {[{ key: "icon", label: "Icon (emoji)" }, { key: "label", label: "Label" }, { key: "value", label: "Value" }].map(({ key, label }) => (
                      <div key={key}>
                        <label className="text-xs text-white/50 block mb-1">{label}</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none focus:border-teal-primary/50"
                          value={card[key] || ""} onChange={e => {
                            const updated = { ...formState };
                            updated.mapSection.infoCards[i] = { ...updated.mapSection.infoCards[i], [key]: e.target.value };
                            setFormState({ ...updated });
                          }} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "emergency" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Emergency Banner</h3>
              <div className="flex items-center gap-3">
                <label className="text-xs text-white/50">Show Banner</label>
                <button onClick={() => {
                  const updated = { ...formState, emergencyBanner: { ...formState.emergencyBanner, enabled: !formState.emergencyBanner?.enabled } };
                  setFormState(updated as any);
                }} className={`w-10 h-5 rounded-full transition-colors ${formState.emergencyBanner?.enabled ? "bg-teal-primary" : "bg-white/20"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white mx-0.5 transition-transform ${formState.emergencyBanner?.enabled ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Banner Message</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-primary/50"
                  value={formState.emergencyBanner?.message || ""} onChange={e => {
                    const updated = { ...formState, emergencyBanner: { ...formState.emergencyBanner, message: e.target.value } };
                    setFormState(updated as any);
                  }} />
              </div>
            </div>
          )}


          {activeTab === "footer" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-b border-white/5 pb-2">Footer, Hours & Contacts</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Full Physical Location / Address</label>
                  <input
                    type="text"
                    value={formState.footer.address}
                    onChange={(e) => handleFieldChange("footer", "address", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5 font-sans">Primary Support Phone</label>
                    <input
                      type="text"
                      value={formState.footer.phone}
                      onChange={(e) => handleFieldChange("footer", "phone", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Contact Concierge Email</label>
                    <input
                      type="text"
                      value={formState.footer.email}
                      onChange={(e) => handleFieldChange("footer", "email", e.target.value)}
                      className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white"
                    />
                  </div>
                </div>

                {/* Opening Hours list */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-white/50 font-sans">Office Opening Hours</label>
                    <button
                      type="button"
                      onClick={handleAddHourLine}
                      className="flex items-center gap-1.5 text-[0.7rem] bg-amber-400 text-slate-950 font-bold py-1 px-3 rounded-md hover:bg-amber-300 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add line
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formState.footer.hours.map((line, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="text-xs text-amber-400 font-mono w-4 font-bold shrink-0">{idx + 1}</span>
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => handleHourLineChange(idx, e.target.value)}
                          className="flex-1 bg-[#0d1622]/80 rounded-lg border border-white/10 py-2 px-3 text-xs focus:border-amber-400 outline-none text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveHourLine(idx)}
                          className="p-1 px-2 text-white/35 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 font-sans">Bottom copyright text (copyright indicators)</label>
                  <input
                    type="text"
                    value={formState.footer.bottomText}
                    onChange={(e) => handleFieldChange("footer", "bottomText", e.target.value)}
                    className="w-full bg-[#0d1622] rounded-xl border border-white/10 p-3 text-sm focus:border-amber-400 outline-none text-white font-sans"
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer actions panel */}
        <div className="p-6 border-t border-white/10 bg-slate-950/40 flex items-center justify-between">
          <p className="text-[11px] text-white/40">
            * Saving broadcasts real-time state to all active client tabs.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 hover:bg-white/5 text-xs font-bold text-white/60 hover:text-white rounded-full transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              disabled={saveStatus === "saving"}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs py-2.5 px-8 rounded-full transition-all hover:scale-102 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Publish Live Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
