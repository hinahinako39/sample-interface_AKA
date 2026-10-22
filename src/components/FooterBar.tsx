import React from 'react';
import { ConfigStep } from '../types/configurator';
import { CalculatedPricing, formatCurrency } from '../utils/calculations';

interface FooterBarProps {
  currentStep: ConfigStep;
  pricing: CalculatedPricing;
  targetCameras: number;
  nvrCh: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSaveDraft: () => void;
  onOpenAdvisor: () => void;
}

export const FooterBar: React.FC<FooterBarProps> = ({
  currentStep,
  pricing,
  targetCameras,
  nvrCh,
  onNextStep,
  onPrevStep,
  onSaveDraft,
  onOpenAdvisor
}) => {
  const getStepTitles = (step: ConfigStep) => {
    switch (step) {
      case 1:
        return { next: 'Next: Camera Models', prev: '' };
      case 2:
        return { next: 'Next: NVR & Storage', prev: 'Step 1: System Size' };
      case 3:
        return { next: 'Next: PoE & Network', prev: 'Step 2: Camera Models' };
      case 4:
        return { next: 'Next: Summary & Quote', prev: 'Step 3: Storage' };
      case 5:
        return { next: 'Generate My Quote', prev: 'Step 4: PoE Setup' };
    }
  };

  const titles = getStepTitles(currentStep);

  // Determine which price to highlight based on step
  let stepSubtotalLabel = 'Estimated System Total';
  let stepSubtotalValue = pricing.systemTotal;

  if (currentStep === 1) {
    stepSubtotalLabel = 'Estimated System Total';
    stepSubtotalValue = pricing.step1BasePrice;
  } else if (currentStep === 2) {
    stepSubtotalLabel = 'Camera Mix Subtotal';
    stepSubtotalValue = pricing.cameraSubtotal;
  } else if (currentStep === 3) {
    stepSubtotalLabel = 'Step 3 Subtotal (NVR + HDD)';
    stepSubtotalValue = pricing.step3Subtotal;
  } else if (currentStep === 4) {
    stepSubtotalLabel = 'Step 4 Subtotal (PoE Switch)';
    stepSubtotalValue = pricing.poeSubtotal;
  }

  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 bg-surface-stage/95 backdrop-blur-2xl border-t border-border-hairline shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.8)]">
      <div className="h-20 w-full px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Left price & specs summary */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                {stepSubtotalLabel}:
              </span>
              <span className="font-mono text-xl lg:text-2xl text-text-primary font-bold">
                {formatCurrency(stepSubtotalValue)}
              </span>
              {currentStep !== 1 && (
                <span className="font-mono text-xs text-text-muted hidden sm:inline">
                  (Sys Total: <strong className="text-brand-gold">{formatCurrency(pricing.systemTotal)}</strong>)
                </span>
              )}
              <span className="font-mono text-[10px] text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.5 rounded ml-1 hidden sm:inline-block">
                Hardware + Lifetime OS
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[10px] text-brand-gold font-medium tracking-wide">
                4COVR Pro Lease Option:
              </span>
              <span className="font-sans text-xs text-text-muted">
                Or complete system from <strong className="text-text-primary font-mono">${pricing.monthlyLease}/mo</strong>
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-border-hairline hidden md:block" />

          {/* Dynamic spec pill */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-lg bg-surface-container text-text-secondary font-mono text-xs tracking-wider flex items-center gap-2 border border-border-hairline">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span>
                {pricing.allocatedCameraQty || targetCameras}× 4K AI Cameras | {nvrCh}-CH Quantum NVR | {pricing.totalStorageTB}TB Enterprise Storage
              </span>
            </div>
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={onPrevStep}
              className="px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-primary font-sans text-xs transition-all font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span className="hidden sm:inline">{titles.prev}</span>
            </button>
          )}

          {currentStep === 1 ? (
            <button
              type="button"
              onClick={onOpenAdvisor}
              className="hidden sm:flex px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-primary font-sans text-xs transition-all font-medium cursor-pointer"
            >
              Schedule Expert Consultation
            </button>
          ) : (
            <button
              type="button"
              onClick={onSaveDraft}
              className="hidden sm:flex px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-muted hover:text-text-primary font-sans text-xs transition-all font-medium cursor-pointer"
            >
              Save Draft
            </button>
          )}

          <button
            type="button"
            onClick={onNextStep}
            className="px-6 py-2.5 rounded-full bg-brand-gold hover:bg-brand-gold/90 text-white transition-all font-sans text-xs font-bold tracking-wide shadow-[0_0_18px_rgba(245,166,35,0.4)] flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>{titles.next}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
