import React from 'react';
import { SystemConfiguration } from '../types/configurator';
import { CalculatedPricing, formatCurrency } from '../utils/calculations';

interface QuoteModalProps {
  isOpen: boolean;
  config: SystemConfiguration;
  pricing: CalculatedPricing;
  onClose: () => void;
  onSendToEngineering: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  config,
  pricing,
  onClose,
  onSendToEngineering
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const totalCameras = config.allocatedCameras.reduce((sum, item) => sum + item.qty, 0) || config.totalCameraTarget;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-surface-panel border border-border-hairline rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Quote Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border-hairline">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-brand-gold/40 flex items-center justify-center shadow-[0_0_12px_rgba(245,166,35,0.2)]">
              <span className="font-mono text-base font-bold text-brand-gold">4C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-text-primary text-base tracking-wide">
                4COVR ARCHITECTURAL QUOTE
              </span>
              <span className="font-mono text-[11px] text-brand-gold font-medium">
                QUOTE REF: #4C-2025-Q892
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Metadata Strip */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-surface-container-lowest border border-border-hairline text-[11px] font-mono">
          <div>
            <span className="text-text-muted uppercase">Issue Date</span>
            <p className="text-text-primary font-medium mt-0.5">{todayStr}</p>
          </div>
          <div>
            <span className="text-text-muted uppercase">Valid Through</span>
            <p className="text-text-primary font-medium mt-0.5">30 Calendar Days</p>
          </div>
          <div>
            <span className="text-text-muted uppercase">Configuration</span>
            <p className="text-brand-gold font-medium mt-0.5">{totalCameras}CH Studio System</p>
          </div>
        </div>

        {/* Itemized Table in Modal */}
        <div className="flex flex-col gap-1.5 text-[12px]">
          <div className="flex items-center justify-between pb-1 text-text-muted font-mono text-[10px] uppercase border-b border-border-hairline">
            <span>Component Scope</span>
            <span>Amount</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border-hairline/40">
            <span className="text-text-primary">
              {totalCameras}× AI Cameras ({config.allocatedCameras.map(c => `${c.qty}× ${c.name}`).join(', ')})
            </span>
            <span className="font-mono text-text-primary font-medium">
              {formatCurrency(pricing.cameraSubtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border-hairline/40">
            <span className="text-text-primary">
              Quantum Core NVR + {pricing.totalStorageTB}TB Enterprise Pro CMR Storage
            </span>
            <span className="font-mono text-text-primary font-medium">
              {formatCurrency(pricing.step3Subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border-hairline/40">
            <span className="text-text-primary">
              Enterprise PoE Switch ({pricing.networkPowerBudgetW}W &lt;1ms Wire-Speed Backplane)
            </span>
            <span className="font-mono text-text-primary font-medium">
              {formatCurrency(pricing.poeSubtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border-hairline/40">
            <span className="text-text-primary">
              Installation Accessories ({totalCameras}× {config.accessories.cableLength} Cat6 Cables, {config.accessories.junctionBoxesCount}× IP66 Boxes)
            </span>
            <span className="font-mono text-text-primary font-medium">
              {formatCurrency(pricing.accessoriesSubtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border-hairline/40">
            <span className="text-emerald-400">
              4COVR Express Ground Shipping & Pre-Deployment Staging
            </span>
            <span className="font-mono text-emerald-400 font-medium">
              Complimentary ($0)
            </span>
          </div>
        </div>

        {/* Grand Total In Modal */}
        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-brand-gold/30 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-primary">Official Total Quotation</span>
            <span className="text-[11px] text-text-muted">
              Hardware price locked with 3-Year Advanced Replacement SLA
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-2xl font-bold text-brand-gold">
              {formatCurrency(pricing.systemTotal)}
            </span>
            <span className="font-mono text-xs text-text-muted">USD</span>
          </div>
        </div>

        {/* Quote Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-highest border border-border-hairline text-text-primary text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print / Save as PDF</span>
          </button>

          <button
            type="button"
            onClick={onSendToEngineering}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-[#d98b16] hover:brightness-110 text-white font-semibold text-[13px] shadow-lg flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">mail</span>
            <span>Email Quote to Engineering</span>
          </button>
        </div>
      </div>
    </div>
  );
};
