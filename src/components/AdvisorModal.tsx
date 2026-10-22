import React, { useState } from 'react';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitConsultation: (details: { name: string; email: string; projectScope: string }) => void;
}

export const AdvisorModal: React.FC<AdvisorModalProps> = ({
  isOpen,
  onClose,
  onSubmitConsultation
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectScope, setProjectScope] = useState('Standard Residential / Boutique Commercial');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitConsultation({
      name: name || 'Authorized Client',
      email: email || 'client@example.com',
      projectScope
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-surface-panel border border-border-hairline rounded-2xl shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-hairline">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-surface-container-high border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow-sm">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-text-primary">
                4COVR Systems Advisor
              </h3>
              <p className="text-[12px] text-text-muted">
                Consult directly with a certified security systems architect.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Advisor Details Badge */}
        <div className="p-3 rounded-xl bg-surface-container-lowest border border-border-hairline flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-mono font-bold text-sm">
            SA
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-text-primary">
              Senior Architecture Engineering Desk
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">
              ● Online Now · Average response &lt;15 mins
            </span>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="text-text-muted font-mono uppercase text-[10px]">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-container border border-border-hairline text-text-primary text-xs focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-muted font-mono uppercase text-[10px]">Email Address</label>
            <input
              type="email"
              placeholder="e.g. alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-container border border-border-hairline text-text-primary text-xs focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-muted font-mono uppercase text-[10px]">Property / Facility Type</label>
            <select
              value={projectScope}
              onChange={(e) => setProjectScope(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-container border border-border-hairline text-text-primary text-xs focus:border-brand-gold focus:outline-none cursor-pointer"
            >
              <option value="Standard Residential / Boutique Commercial">Standard Residential / Boutique Commercial</option>
              <option value="Luxury Multi-Zone Estate">Luxury Multi-Zone Estate</option>
              <option value="Commercial Office / Retail Chain">Commercial Office / Retail Chain</option>
              <option value="Industrial Logistics Campus">Industrial Logistics Campus</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-muted font-mono uppercase text-[10px]">Technical Inquiries / Site Notes</label>
            <textarea
              rows={3}
              placeholder="Optional: Mention any conduit paths, extreme weather zones, or specific retention goals..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-container border border-border-hairline text-text-primary text-xs focus:border-brand-gold focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-hairline">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-text-muted hover:text-text-primary text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold text-xs shadow-lg flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px]">send</span>
              <span>Schedule Architecture Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
