import React from 'react';
import { ConfigStep } from '../types/configurator';

interface HeaderProps {
  currentStep: ConfigStep;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSelectStep: (step: ConfigStep) => void;
  onOpenAdvisor: () => void;
  onSaveConfig: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  theme,
  onToggleTheme,
  onSelectStep,
  onOpenAdvisor,
  onSaveConfig
}) => {
  const steps: { step: ConfigStep; label: string }[] = [
    { step: 1, label: 'System Size' },
    { step: 2, label: 'Camera Models' },
    { step: 3, label: 'NVR & Storage' },
    { step: 4, label: 'PoE & Network' },
    { step: 5, label: 'Review & Quote' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-panel/90 backdrop-blur-2xl border-b border-border-hairline shadow-sm transition-colors duration-200">
      <div className="h-16 w-full px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Studio Subtitle */}
        <div className="flex items-center gap-3.5 flex-shrink-0 cursor-pointer" onClick={() => onSelectStep(1)}>
          <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-brand-gold/40 flex items-center justify-center shadow-[0_0_12px_rgba(245,166,35,0.25)]">
            <span className="font-mono text-[14px] font-bold text-brand-gold tracking-tight">4C</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sans font-semibold tracking-wide text-text-primary text-[14px]">4COVR PRODUCT STUDIO</span>
              <span className="px-1.5 py-0.2 bg-brand-gold/15 text-brand-gold font-mono text-[9px] rounded tracking-wider uppercase font-semibold">Pro V4</span>
            </div>
            <span className="font-mono text-[10px] text-brand-amber tracking-widest uppercase">INTELLIGENT SECURITY ARCHITECTURE</span>
          </div>
        </div>

        {/* 5-Step Configurator Navigation */}
        <nav className="hidden xl:flex items-center gap-1 lg:gap-2 h-full text-[13px] font-sans">
          {steps.map(({ step, label }) => {
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;

            return (
              <button
                key={step}
                type="button"
                onClick={() => onSelectStep(step)}
                className={`h-full inline-flex items-center gap-2 px-3 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'text-text-primary border-brand-gold font-medium bg-brand-gold/5'
                    : 'text-text-muted hover:text-text-primary border-transparent'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-brand-gold text-white shadow-[0_0_10px_rgba(245,166,35,0.4)]'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-surface-container-high text-text-muted'
                  }`}
                >
                  {isCompleted ? '✓' : step}
                </span>
                <span className={isActive ? 'text-brand-gold font-medium' : ''}>
                  {step}. {label}
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse ml-0.5" />}
              </button>
            );
          })}
        </nav>

        {/* Top Right Action Cluster */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-muted hover:text-text-primary text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            <span className="material-symbols-outlined text-[17px] text-brand-gold">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
            <span className="font-mono text-xs hidden md:inline">
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenAdvisor}
            className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-muted hover:text-text-primary text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-brand-gold">support_agent</span>
            <span className="hidden sm:inline">Support / Advisor</span>
          </button>
          
          <button
            type="button"
            onClick={onSaveConfig}
            className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-muted hover:text-text-primary text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">bookmark_border</span>
            <span className="hidden sm:inline">Save Config</span>
          </button>
          
          <div 
            onClick={onOpenAdvisor}
            className="w-8 h-8 rounded-full bg-surface-container-high border border-brand-gold/50 flex items-center justify-center cursor-pointer hover:border-brand-gold transition-colors shadow-sm"
            title="User Profile / Advisor"
          >
            <span className="material-symbols-outlined text-text-primary text-[17px]">person</span>
          </div>
        </div>
      </div>

      {/* Mobile Step Switcher Bar */}
      <div className="xl:hidden flex items-center justify-between px-4 py-2 border-t border-border-hairline bg-surface-panel/95 overflow-x-auto gap-2 text-xs">
        {steps.map(({ step, label }) => {
          const isActive = currentStep === step;
          return (
            <button
              key={step}
              type="button"
              onClick={() => onSelectStep(step)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full whitespace-nowrap text-xs ${
                isActive
                  ? 'bg-brand-gold text-white font-bold shadow-sm'
                  : 'bg-surface-container text-text-muted'
              }`}
            >
              <span>{step}.</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
