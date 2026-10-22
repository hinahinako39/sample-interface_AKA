import React, { useState } from 'react';
import { SystemPackage } from '../types/configurator';
import { SYSTEM_PACKAGES } from '../data/configuratorData';
import { formatCurrency } from '../utils/calculations';

interface Step1SystemSizeProps {
  selectedPackageId: string;
  customCameraCount: number | null;
  onSelectPackage: (pkg: SystemPackage) => void;
  onCustomCameraChange: (count: number) => void;
  onNextStep: () => void;
}

export const Step1SystemSizePropsDefault = {};

export const Step1SystemSize: React.FC<Step1SystemSizeProps> = ({
  selectedPackageId,
  customCameraCount,
  onSelectPackage,
  onCustomCameraChange,
  onNextStep
}) => {
  const [lightingMode, setLightingMode] = useState<'studio' | 'night' | 'warm'>('studio');
  const [showCustomSlider, setShowCustomSlider] = useState<boolean>(!!customCameraCount);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Active package details
  const activePackage = SYSTEM_PACKAGES.find(p => p.id === selectedPackageId) || SYSTEM_PACKAGES[1];
  const isCustom = customCameraCount !== null;
  const currentCameraCount = isCustom ? customCameraCount : activePackage.cameras;

  // Compute dynamic stats if custom
  let currentTops = activePackage.tops;
  let currentNvrCh = activePackage.nvrCh;
  let currentNvrName = activePackage.nvr;
  let currentPrice = activePackage.price;
  let archBadge = `${activePackage.name.toUpperCase()} ARCHITECTURE`;

  if (isCustom) {
    archBadge = `CUSTOM (${currentCameraCount} CAM) ARCHITECTURE`;
    if (currentCameraCount > 32) {
      currentNvrCh = 64;
      currentNvrName = '64-Channel 4COVR Ultra Core';
      currentTops = 48.0;
      currentPrice = 1800 + currentCameraCount * 247;
    } else if (currentCameraCount > 16) {
      currentNvrCh = 32;
      currentNvrName = '32-Channel 4COVR Enterprise Core';
      currentTops = 24.0;
      currentPrice = 1100 + currentCameraCount * 247;
    } else if (currentCameraCount > 8) {
      currentNvrCh = 16;
      currentNvrName = '16-Channel 4COVR Pro Core';
      currentTops = 16.0;
      currentPrice = 750 + currentCameraCount * 247;
    } else {
      currentNvrCh = 8;
      currentNvrName = '8-Channel 4COVR Core';
      currentTops = 8.4;
      currentPrice = 490 + currentCameraCount * 247;
    }
  }

  // Lighting filter for image
  const getImageFilterStyle = () => {
    if (lightingMode === 'night') {
      return { filter: 'brightness(0.85) contrast(1.15) hue-rotate(170deg) saturate(0.6)' };
    }
    if (lightingMode === 'warm') {
      return { filter: 'brightness(1.05) contrast(1.05) sepia(0.22) saturate(1.2)' };
    }
    return { filter: 'none' };
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-9rem)] flex flex-col lg:flex-row overflow-hidden bg-surface-stage">
      {/* Left Visual Studio Showcase (approx 66%) */}
      <div className="relative flex-1 lg:min-w-0 w-full flex flex-col justify-between p-6 md:p-8 lg:p-10 select-none border-b lg:border-b-0 lg:border-r border-border-hairline">
        
        {/* Top Metrics & Dynamic Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_10px_#F5A623]" />
              <span className="font-mono text-xs text-brand-gold font-semibold uppercase tracking-widest">
                {archBadge}
              </span>
            </div>
            <h2 className="font-sans text-2xl lg:text-3xl text-text-primary font-medium mt-1 tracking-tight">
              {currentCameraCount}-Camera Active AI Surveillance Array
            </h2>
          </div>

          <div className="backdrop-blur-xl bg-surface-panel/80 border border-border-hairline px-4 py-2 rounded-full shadow-2xl flex items-center gap-4">
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] text-text-muted tracking-wider">NEURAL ENGINE</span>
              <span className="font-mono text-base text-text-primary font-semibold">
                {currentTops} <span className="text-xs font-normal text-text-muted">TOPS</span>
              </span>
            </div>
            <div className="w-px h-6 bg-border-hairline" />
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] text-text-muted tracking-wider">NVR LINK</span>
              <span className="font-mono text-base text-text-primary font-semibold">
                {currentNvrCh} <span className="text-xs font-normal text-text-muted">CH Quantum</span>
              </span>
            </div>
            <div className="w-px h-6 bg-border-hairline" />
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] text-text-muted tracking-wider">TOTAL SENSORS</span>
              <span className="font-mono text-base text-brand-gold font-semibold">
                {currentCameraCount} <span className="text-xs font-normal text-text-muted">Units</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Studio Visual Canvas */}
        <div className="relative my-auto w-full flex items-center justify-center min-h-[360px] lg:min-h-[500px]">
          {/* Studio Ambient Backlight Glow */}
          <div className="absolute w-3/4 max-w-[700px] h-64 bg-brand-gold/10 rounded-full blur-[110px] pointer-events-none transform -translate-y-6" />
          <div className="absolute bottom-2 w-4/5 max-w-[850px] h-12 bg-black/15 dark:bg-black/80 rounded-full blur-2xl pointer-events-none" />

          {/* Hero Product Image Container */}
          <div className="relative w-full max-w-5xl transition-all duration-500 ease-out">
            <img
              src="/assets/aistudio/Image_1_365e86e1.jpeg"
              alt="4COVR Intelligent Security Architecture Hardware Suite"
              style={getImageFilterStyle()}
              className="w-full h-auto object-contain max-h-[540px] mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] rounded-xl transition-all duration-500"
            />

            {/* Interactive Hotspot 1: 4K Precision Bullet */}
            <div
              className="absolute top-[32%] left-[24%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
              onMouseEnter={() => setActiveHotspot(1)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-7 h-7 rounded-full bg-brand-gold/30 animate-ping" />
                <span className="w-4 h-4 rounded-full bg-brand-gold shadow-[0_0_12px_#F5A623] flex items-center justify-center text-[10px] font-bold text-white font-mono">
                  1
                </span>
              </div>
              <div
                className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface-panel/95 border border-border-hairline px-3.5 py-2 rounded-xl shadow-2xl transition-all duration-200 pointer-events-none z-30 ${
                  activeHotspot === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="font-mono text-[10px] text-brand-gold uppercase tracking-wider font-semibold">Sensor Node 01</div>
                <div className="font-sans text-xs text-text-primary font-medium">4K Precision AI Bullet Camera</div>
                <div className="font-sans text-[11px] text-text-muted">Sony STARVIS 2™ · F1.2 Low-Light Aperture</div>
              </div>
            </div>

            {/* Interactive Hotspot 2: Turret Dome */}
            <div
              className="absolute top-[36%] left-[54%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
              onMouseEnter={() => setActiveHotspot(2)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-7 h-7 rounded-full bg-brand-gold/25 animate-pulse" />
                <span className="w-4 h-4 rounded-full bg-brand-gold shadow-[0_0_12px_#F5A623] flex items-center justify-center text-[10px] font-bold text-white font-mono">
                  2
                </span>
              </div>
              <div
                className={`absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface-panel/95 border border-border-hairline px-3.5 py-2 rounded-xl shadow-2xl transition-all duration-200 pointer-events-none z-30 ${
                  activeHotspot === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="font-mono text-[10px] text-brand-gold uppercase tracking-wider font-semibold">Sensor Node 02</div>
                <div className="font-sans text-xs text-text-primary font-medium">Ultra-Wide Turret Dome</div>
                <div className="font-sans text-[11px] text-text-muted">142° Distortion-Free Peripheral Matrix</div>
              </div>
            </div>

            {/* Interactive Hotspot 3: Quantum Core NVR Unit */}
            <div
              className="absolute bottom-[28%] right-[28%] group cursor-pointer z-20"
              onMouseEnter={() => setActiveHotspot(3)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-7 h-7 rounded-full bg-brand-gold/25 animate-pulse" />
                <span className="w-4 h-4 rounded-full bg-brand-gold shadow-[0_0_12px_#F5A623] flex items-center justify-center text-[10px] font-bold text-white font-mono">
                  3
                </span>
              </div>
              <div
                className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface-panel/95 border border-border-hairline px-3.5 py-2 rounded-xl shadow-2xl transition-all duration-200 pointer-events-none z-30 ${
                  activeHotspot === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="font-mono text-[10px] text-brand-gold uppercase tracking-wider font-semibold">Core Processor Unit</div>
                <div className="font-sans text-xs text-text-primary font-medium">4COVR Quantum Core NVR Unit</div>
                <div className="font-sans text-[11px] text-text-muted">RAID 1/5 Hardware Encryption & On-Premise AI</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Studio Control Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 z-10 pt-2">
          {/* Bottom-Left Technical Specs Strip */}
          <div className="flex items-center gap-4 text-xs font-sans text-text-secondary bg-surface-panel/70 border border-border-hairline px-4 py-2 rounded-full backdrop-blur-xl shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-gold text-[15px]">memory</span>
              <span>
                AI Compute: <strong className="text-text-primary font-medium">{currentTops} TOPS Dedicated Engine</strong>
              </span>
            </div>
            <div className="hidden md:block w-px h-3.5 bg-border-hairline" />
            <div className="hidden md:flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-gold text-[15px]">videocam</span>
              <span>
                Video: <strong className="text-text-primary font-medium">4K UHD @ 30FPS HDR</strong>
              </span>
            </div>
            <div className="hidden lg:block w-px h-3.5 bg-border-hairline" />
            <div className="hidden lg:flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-gold text-[15px]">speed</span>
              <span>
                Latency: <strong className="text-text-primary font-medium">&lt;12ms Zero-Loss Uplink</strong>
              </span>
            </div>
          </div>

          {/* Interactive Lighting Mood Toggles */}
          <div className="flex items-center gap-1.5 backdrop-blur-xl bg-surface-panel/80 border border-border-hairline px-2 py-1.5 rounded-full shadow-xl">
            <span className="font-mono text-[10px] text-text-muted px-2 uppercase tracking-wider">Lighting:</span>
            
            <button
              type="button"
              onClick={() => setLightingMode('studio')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                lightingMode === 'studio'
                  ? 'bg-surface-container-high text-brand-gold border border-brand-gold/40 shadow-sm'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-container'
              }`}
            >
              Studio Light
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('night')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                lightingMode === 'night'
                  ? 'bg-surface-container-high text-brand-gold border border-brand-gold/40 shadow-sm'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-container'
              }`}
            >
              IR Night Vision
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('warm')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                lightingMode === 'warm'
                  ? 'bg-surface-container-high text-brand-gold border border-brand-gold/40 shadow-sm'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-container'
              }`}
            >
              Ambient Warm
            </button>
          </div>
        </div>
      </div>

      {/* Right Configuration Console (approx 34%) */}
      <div className="w-full lg:w-[480px] xl:w-[500px] bg-surface-panel/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-9rem)] shadow-2xl relative z-20 border-t lg:border-t-0 border-border-hairline">
        <div className="p-6 lg:p-7 space-y-6">
          {/* Step 01 Header */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-brand-gold font-semibold tracking-wider uppercase">
                STEP 01 / 05 — SYSTEM SIZE
              </span>
              <span className="font-sans text-xs text-text-muted">Modular Commercial Grade</span>
            </div>
            <h1 className="font-sans text-2xl lg:text-3xl text-text-primary font-semibold tracking-tight">
              Build your security system.
            </h1>
            <p className="font-sans text-sm text-text-muted leading-relaxed">
              Start with the right number of cameras. Make it yours.
            </p>
          </div>

          {/* Four Primary Recommendation Cards */}
          <div className="space-y-3">
            {SYSTEM_PACKAGES.map((pkg) => {
              const isSelected = !isCustom && selectedPackageId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg)}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-300 relative border ${
                    isSelected
                      ? 'bg-surface-container-high/90 border-brand-gold shadow-[0_0_20px_rgba(245,166,35,0.18)]'
                      : 'border-border-hairline bg-surface-container-low hover:bg-surface-container hover:border-surface-container-highest'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-sans text-base text-text-primary font-semibold">
                          {pkg.name}
                        </span>
                        <span className="font-mono text-[11px] bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded font-medium">
                          {pkg.cameras} Cameras
                        </span>
                        {pkg.badge && (
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                              pkg.badgeType === 'primary'
                                ? 'bg-brand-gold text-surface-stage font-bold'
                                : 'bg-surface-container text-text-muted'
                            }`}
                          >
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-xs text-text-secondary mt-1">
                        {pkg.description}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-brand-gold text-white'
                          : 'bg-surface-container-highest text-text-muted'
                      }`}
                    >
                      {isSelected ? (
                        <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-border-hairline" />
                      )}
                    </div>
                  </div>

                  {/* Hardware Pairing Strip */}
                  <div className="mt-3 pt-2.5 border-t border-border-hairline flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-text-muted text-xs">
                      <span className="material-symbols-outlined text-brand-gold text-[15px]">dns</span>
                      <span>
                        Core: <strong className="text-text-primary font-normal">{pkg.nvr}</strong>
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-mono text-base font-semibold ${
                          isSelected ? 'text-brand-gold' : 'text-text-primary'
                        }`}
                      >
                        {formatCurrency(pkg.price)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom System Scaler / Expandable Slider */}
          <div className="rounded-xl border border-border-hairline bg-surface-container-low/80 p-4 space-y-3">
            <div
              className="flex items-center justify-between cursor-pointer select-none"
              onClick={() => setShowCustomSlider(!showCustomSlider)}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-gold text-[18px]">tune</span>
                <span className="font-sans text-sm text-text-primary font-medium">
                  Need a specific deployment scale?
                </span>
              </div>
              <span className="font-mono text-xs text-brand-gold flex items-center gap-1 font-semibold hover:underline">
                Customize Quantity
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                    showCustomSlider ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </span>
            </div>

            {showCustomSlider && (
              <div className="space-y-4 pt-2 border-t border-border-hairline">
                {/* Quick Count Pills */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-mono text-[10px] text-text-muted uppercase">Quick Select:</span>
                  <div className="flex items-center gap-1.5">
                    {[6, 12, 24, 48, 64].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => onCustomCameraChange(count)}
                        className={`px-2.5 py-1 text-xs rounded-md border font-mono transition-colors cursor-pointer ${
                          customCameraCount === count
                            ? 'bg-brand-gold text-white border-brand-gold font-bold'
                            : 'bg-surface-container hover:bg-surface-container-high text-text-secondary border-border-hairline'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider with Counter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">Precision Scale:</span>
                    <span className="font-mono text-base text-brand-gold font-bold">
                      {currentCameraCount} Cameras
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="64"
                    step="1"
                    value={currentCameraCount}
                    onChange={(e) => onCustomCameraChange(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted font-mono">
                    <span>1 Unit</span>
                    <span>16 Units</span>
                    <span>32 Units</span>
                    <span>48 Units</span>
                    <span>64 Max</span>
                  </div>
                </div>

                {/* NVR Auto-Matching Logic Box */}
                <div className="p-3 rounded-lg bg-surface-panel border border-border-hairline flex items-center justify-between text-xs">
                  <div>
                    <div className="text-text-muted text-[11px]">Recommended NVR Channel:</div>
                    <div className="text-text-primary font-medium">{currentNvrName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-text-muted text-[11px]">Calculated Cost:</div>
                    <div className="text-brand-gold font-mono text-sm font-semibold">
                      {formatCurrency(currentPrice)}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-text-muted leading-tight">
                  Channels represent NVR decoding ports. Recommended hardware provides buffer for seamless future sensor expansion.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer within Console */}
        <div className="sticky bottom-0 p-5 bg-surface-panel/95 backdrop-blur-2xl border-t border-border-hairline shadow-lg flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
              Configured System
            </span>
            <span className="font-sans text-xs text-text-primary font-medium">
              {isCustom ? `Custom (${currentCameraCount} Cam)` : activePackage.name} · {currentCameraCount} Cameras · {currentNvrCh}-CH NVR
            </span>
          </div>
          
          <button
            type="button"
            onClick={onNextStep}
            className="group px-6 py-2.5 rounded-full bg-brand-gold text-white font-sans text-xs font-bold tracking-wide flex items-center gap-2 hover:bg-brand-gold/90 transition-all duration-300 shadow-[0_0_20px_rgba(245,166,35,0.35)] cursor-pointer active:scale-95"
          >
            <span>Next: Camera Models</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
