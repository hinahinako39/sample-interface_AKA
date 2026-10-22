import React, { useState } from 'react';
import { NVR_OPTIONS, HDD_OPTIONS } from '../data/configuratorData';
import { CalculatedPricing, formatCurrency } from '../utils/calculations';

interface Step3NvrStorageProps {
  selectedNvrId: string;
  selectedHddId: string;
  driveQty: number;
  recordingMode: 'continuous' | 'motion';
  codec: 'h265' | 'h264';
  targetRetentionDays: number;
  pricing: CalculatedPricing;
  allocatedCamerasCount: number;
  onSelectNvr: (nvrId: string) => void;
  onSelectHdd: (hddId: string) => void;
  onUpdateDriveQty: (qty: number) => void;
  onUpdateRecordingMode: (mode: 'continuous' | 'motion') => void;
  onUpdateCodec: (codec: 'h265' | 'h264') => void;
  onUpdateTargetRetention: (days: number) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const Step3NvrStorage: React.FC<Step3NvrStorageProps> = ({
  selectedNvrId,
  selectedHddId,
  driveQty,
  recordingMode,
  codec,
  targetRetentionDays,
  pricing,
  allocatedCamerasCount,
  onSelectNvr,
  onSelectHdd,
  onUpdateDriveQty,
  onUpdateRecordingMode,
  onUpdateCodec,
  onUpdateTargetRetention,
  onPrevStep,
  onNextStep
}) => {
  const [activeViewport, setActiveViewport] = useState<'recorder' | 'connections' | 'storage'>('recorder');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const selectedNvr = NVR_OPTIONS.find((n) => n.id === selectedNvrId) || NVR_OPTIONS[0];
  const selectedHdd = HDD_OPTIONS.find((h) => h.id === selectedHddId) || HDD_OPTIONS[1];

  // Auto recommendation text based on camera count
  const getAutoRecText = () => {
    if (allocatedCamerasCount <= 8) {
      return 'Auto-Recommended: 8CH NVR powers your system with zero bottleneck.';
    }
    if (allocatedCamerasCount <= 16) {
      return 'Auto-Recommended: 16CH NVR provides optimal throughput for 9-16 sensors.';
    }
    if (allocatedCamerasCount <= 32) {
      return 'Auto-Recommended: 32CH Enterprise Core with dual gigabit bus for high sensor density.';
    }
    return 'Auto-Recommended: 64CH Ultra Enterprise Core for mission-critical campus scalability.';
  };

  // Viewport image
  const getViewportImage = () => {
    switch (activeViewport) {
      case 'connections':
        return '/assets/aistudio/Image_14_30b73c3e.jpeg';
      case 'storage':
        return '/assets/aistudio/Image_8_1c787cd5.jpeg';
      case 'recorder':
      default:
        return '/assets/aistudio/Image_2_bcc268fa.jpeg';
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-9rem)] flex flex-col xl:flex-row bg-surface-stage select-none">
      {/* Left Stage (approx 68%) */}
      <div className="relative w-full xl:w-[68%] min-h-[580px] xl:h-[calc(100vh-9rem)] flex flex-col justify-between overflow-hidden p-6 lg:p-10 border-b xl:border-b-0 xl:border-r border-border-hairline">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 bg-surface-container-lowest">
          <img
            src={getViewportImage()}
            alt="4COVR Ultra Luxury NVR Architecture"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-stage via-transparent to-surface-stage/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-stage/75 via-transparent to-surface-stage/90" />
        </div>

        {/* Top Header */}
        <div className="relative z-20 flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-brand-gold uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/20">
              STEP 03 / 05 — NVR & STORAGE
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase">
              ARCHITECTURAL COMPUTING & ARCHIVE
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-sans font-light text-text-primary tracking-tight mt-1">
            Your recordings. <span className="text-brand-gold font-medium">Your control.</span>
          </h1>
          <p className="text-xs lg:text-sm text-text-muted max-w-lg leading-relaxed">
            Choose how your system records, stores, and protects every moment with zero cloud lock-in and dedicated hardware cryptography.
          </p>
        </div>

        {/* Interactive Hotspots over NVR */}
        <div className="relative z-20 self-center lg:self-start my-auto w-full max-w-2xl pointer-events-none">
          {/* Hotspot 1: Neural Processing Core */}
          <div
            className="absolute -top-16 left-[22%] pointer-events-auto group"
            onMouseEnter={() => setActiveHotspot(1)}
            onMouseLeave={() => setActiveHotspot(null)}
          >
            <button
              type="button"
              className="relative w-8 h-8 rounded-full bg-[#121417]/90 text-brand-gold flex items-center justify-center border border-brand-gold/60 shadow-[0_0_16px_rgba(245,166,35,0.4)] hover:scale-110 transition-all cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
              <span className="absolute inset-0 rounded-full animate-ping bg-brand-gold/40" />
            </button>
            <div
              className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col w-56 p-3 bg-[#121417]/95 backdrop-blur-2xl rounded-xl border border-brand-gold/30 shadow-2xl transition-all duration-200 pointer-events-none ${
                activeHotspot === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-primary">AI Neural Core</span>
                <span className="text-[10px] text-brand-gold font-mono">12.8 TOPS</span>
              </div>
              <p className="text-[11px] text-text-muted mt-1">
                On-premise person & vehicle classification without latency or monthly fees.
              </p>
            </div>
          </div>

          {/* Hotspot 2: Modular Hot-Swap Caddy */}
          <div
            className="absolute top-2 right-[25%] pointer-events-auto group"
            onMouseEnter={() => setActiveHotspot(2)}
            onMouseLeave={() => setActiveHotspot(null)}
          >
            <button
              type="button"
              className="relative w-8 h-8 rounded-full bg-[#121417]/90 text-brand-gold flex items-center justify-center border border-brand-gold/60 shadow-[0_0_16px_rgba(245,166,35,0.4)] hover:scale-110 transition-all cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
              <span className="absolute inset-0 rounded-full animate-ping bg-brand-gold/40" />
            </button>
            <div
              className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col w-56 p-3 bg-[#121417]/95 backdrop-blur-2xl rounded-xl border border-brand-gold/30 shadow-2xl transition-all duration-200 pointer-events-none ${
                activeHotspot === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-primary">Modular Drive Bay</span>
                <span className="text-[10px] text-brand-amber font-mono">SATA-III</span>
              </div>
              <p className="text-[11px] text-text-muted mt-1">
                Precision extruded aluminum drive caddies with anti-vibration damping rails.
              </p>
            </div>
          </div>

          {/* Hotspot 3: Silent Acoustic Heat Exchanger */}
          <div
            className="absolute bottom-[-10px] left-[45%] pointer-events-auto group"
            onMouseEnter={() => setActiveHotspot(3)}
            onMouseLeave={() => setActiveHotspot(null)}
          >
            <button
              type="button"
              className="relative w-8 h-8 rounded-full bg-[#121417]/90 text-text-primary flex items-center justify-center border border-white/20 shadow-lg hover:scale-110 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-brand-gold">air</span>
            </button>
            <div
              className={`absolute top-10 left-1/2 -translate-x-1/2 flex flex-col w-56 p-3 bg-[#121417]/95 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl transition-all duration-200 pointer-events-none ${
                activeHotspot === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <span className="text-xs font-semibold text-text-primary">Silent Acoustic Exchanger</span>
              <p className="text-[11px] text-text-muted mt-1">
                &lt;18dB acoustic footprint with automotive-grade dual ball-bearing maglev fan.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Control & Telemetry Strip */}
        <div className="relative z-20 flex flex-col gap-3 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex p-1 bg-surface-panel/80 backdrop-blur-2xl rounded-full border border-border-hairline shadow-md">
              <button
                type="button"
                onClick={() => setActiveViewport('recorder')}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeViewport === 'recorder'
                    ? 'bg-surface-container-high text-brand-gold border border-brand-gold/40 shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">dns</span>
                <span>Recorder View</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveViewport('connections')}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeViewport === 'connections'
                    ? 'bg-surface-container-high text-brand-gold border border-brand-gold/40 shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">settings_ethernet</span>
                <span>Connections View</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveViewport('storage')}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeViewport === 'storage'
                    ? 'bg-surface-container-high text-brand-gold border border-brand-gold/40 shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">hard_drive</span>
                <span>Storage View</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-text-muted text-xs bg-surface-panel/80 backdrop-blur-xl px-3 py-1.5 rounded-full border border-border-hairline shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span>Live 4COVR Studio Render</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-border-hairline">
            <div className="flex flex-col bg-surface-panel/70 backdrop-blur-md p-2.5 rounded-xl border border-border-hairline">
              <span className="text-[10px] text-text-muted uppercase font-mono">Dedicated Throughput</span>
              <span className="text-xs font-bold text-text-primary mt-0.5">{selectedNvr.inflowMbps * 2} Mbps Ultra-Bus</span>
            </div>
            <div className="flex flex-col bg-surface-panel/70 backdrop-blur-md p-2.5 rounded-xl border border-border-hairline">
              <span className="text-[10px] text-text-muted uppercase font-mono">RAID Safeguard</span>
              <span className="text-xs font-bold text-brand-gold mt-0.5">RAID 0 / 1 / 5 Support</span>
            </div>
            <div className="flex flex-col bg-surface-panel/70 backdrop-blur-md p-2.5 rounded-xl border border-border-hairline">
              <span className="text-[10px] text-text-muted uppercase font-mono">Acoustic Footprint</span>
              <span className="text-xs font-bold text-text-primary mt-0.5">&lt;18 dB Whisper Quiet</span>
            </div>
            <div className="flex flex-col bg-surface-panel/70 backdrop-blur-md p-2.5 rounded-xl border border-border-hairline">
              <span className="text-[10px] text-text-muted uppercase font-mono">Local Encryption</span>
              <span className="text-xs font-bold text-text-primary mt-0.5">Hardware AES-256</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Configuration Drawer (approx 32%) */}
      <div className="w-full xl:w-[32%] bg-surface-panel/95 backdrop-blur-3xl overflow-y-auto px-6 py-6 flex flex-col gap-5 border-l border-border-hairline max-h-[calc(100vh-9rem)] shadow-xl">
        
        {/* Core Selection Header */}
        <div className="flex flex-col gap-1 pb-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-brand-gold uppercase tracking-widest font-semibold">
              CORE SELECTION
            </span>
            <span className="text-[10px] text-text-muted font-mono">
              {allocatedCamerasCount} CAMERAS ALLOCATED
            </span>
          </div>
          <h2 className="text-lg font-sans font-semibold text-text-primary tracking-tight">
            Choose Your Recorder
          </h2>
          <p className="text-xs text-brand-gold/90 bg-brand-gold/10 border border-brand-gold/20 p-2.5 rounded-lg mt-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-brand-gold">recommend</span>
            <span>{getAutoRecText()}</span>
          </p>
        </div>

        {/* NVR Selection List */}
        <div className="flex flex-col gap-2.5">
          {NVR_OPTIONS.map((nvr) => {
            const isSelected = selectedNvrId === nvr.id;

            return (
              <div
                key={nvr.id}
                onClick={() => onSelectNvr(nvr.id)}
                className={`cursor-pointer p-3 rounded-xl transition-all relative flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-surface-container ring-1 ring-brand-gold shadow-[0_0_14px_rgba(245,166,35,0.2)]'
                    : 'bg-surface-container-low hover:bg-surface-container border border-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center p-0.5 transition-colors ${
                        isSelected ? 'border-brand-gold' : 'border-white/30'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-brand-gold" />}
                    </span>
                    <span className="text-sm font-semibold text-text-primary">{nvr.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${isSelected ? 'text-brand-gold' : 'text-text-primary'}`}>
                    {formatCurrency(nvr.price)}
                  </span>
                </div>

                <div className="text-xs text-text-muted pl-6 flex items-center justify-between">
                  <span>{nvr.features}</span>
                  {nvr.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        nvr.badge === 'Recommended'
                          ? 'bg-brand-gold/20 text-brand-gold font-medium'
                          : 'bg-surface-container text-text-muted'
                      }`}
                    >
                      {nvr.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Storage Customization */}
        <div className="flex flex-col gap-2.5 pt-2 border-t border-[#262A30]">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-text-primary">Customize Your Storage</label>
            <span className="text-xs text-brand-gold font-mono">
              {pricing.totalStorageTB}TB Total ({driveQty}× {selectedHdd.capacityTB}TB)
            </span>
          </div>
          <p className="text-xs text-text-muted">
            Choose surveillance-grade drives engineered for continuous 24/7 video streams.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-1">
            {HDD_OPTIONS.map((hdd) => {
              const isSelected = selectedHddId === hdd.id;

              return (
                <div
                  key={hdd.id}
                  onClick={() => onSelectHdd(hdd.id)}
                  className={`cursor-pointer p-2.5 rounded-xl transition-all border flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-surface-container border-brand-gold ring-1 ring-brand-gold shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container border-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-text-primary">{hdd.name}</span>
                    <span className={`text-xs ${isSelected ? 'text-brand-gold font-bold' : 'text-text-muted'}`}>
                      {formatCurrency(hdd.price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-text-muted">{hdd.subtitle}</span>
                    {hdd.popular && (
                      <span className="text-[9px] px-1 rounded bg-brand-gold/20 text-brand-gold font-mono">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drive Quantity Stepper */}
          <div className="p-3 rounded-xl bg-surface-container-low border border-white/5 flex items-center justify-between mt-1">
            <div className="flex flex-col">
              <span className="text-[11px] text-text-muted">Drive Quantity</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-medium text-text-primary">
                  {driveQty} of {selectedNvr.bays} Bay{selectedNvr.bays > 1 ? 's' : ''} Populated
                </span>
                <span className="text-[10px] text-brand-amber font-mono">• Hot-Swappable</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#1F2021] rounded-lg p-1 border border-white/10">
              <button
                type="button"
                onClick={() => onUpdateDriveQty(Math.max(1, driveQty - 1))}
                className="w-6 h-6 rounded bg-[#292A2B] hover:bg-surface-container-highest flex items-center justify-center text-text-primary text-xs transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-bold text-text-primary px-1 font-mono">
                {driveQty}
              </span>
              <button
                type="button"
                onClick={() => onUpdateDriveQty(Math.min(selectedNvr.bays, driveQty + 1))}
                disabled={driveQty >= selectedNvr.bays}
                className={`w-6 h-6 rounded bg-[#292A2B] hover:bg-surface-container-highest flex items-center justify-center text-text-primary text-xs transition-colors ${
                  driveQty >= selectedNvr.bays ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Recording Preferences */}
        <div className="flex flex-col gap-2.5 pt-2 border-t border-[#262A30]">
          <label className="text-sm font-medium text-text-primary">Recording Preferences</label>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Recording Mode:</span>
              <div className="inline-flex p-0.5 bg-[#1B1C1D] rounded-lg border border-white/5">
                <button
                  type="button"
                  onClick={() => onUpdateRecordingMode('continuous')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    recordingMode === 'continuous'
                      ? 'bg-[#292A2B] text-text-primary shadow-sm font-semibold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  ● 24/7 Continuous
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateRecordingMode('motion')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    recordingMode === 'motion'
                      ? 'bg-[#292A2B] text-text-primary shadow-sm font-semibold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  ○ Smart Motion
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Codec Compression:</span>
              <div className="inline-flex p-0.5 bg-[#1B1C1D] rounded-lg border border-white/5">
                <button
                  type="button"
                  onClick={() => onUpdateCodec('h265')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    codec === 'h265'
                      ? 'bg-[#292A2B] text-text-primary font-semibold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  H.265 Smart AI
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateCodec('h264')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    codec === 'h264'
                      ? 'bg-[#292A2B] text-text-primary font-semibold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  H.264 Legacy
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-muted mt-1">
              <span>Target Retention:</span>
              <div className="flex gap-1">
                {[7, 14, 30, 60].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => onUpdateTargetRetention(days)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                      targetRetentionDays === days
                        ? 'bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-semibold'
                        : 'bg-[#1B1C1D] hover:bg-[#292A2B] text-text-muted'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Video Retention Calculator Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#1A1D21] to-[#121417] border border-brand-gold/30 flex flex-col gap-2 mt-1 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-brand-gold">schedule</span>
                <span className="text-xs font-semibold text-text-primary">Estimated Video Retention</span>
              </div>
              <span className="text-xs font-bold text-brand-gold font-mono">
                ≈ {pricing.estimatedRetentionDays} Days {recordingMode === 'continuous' ? 'Continuous' : 'Motion'}
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-amber to-brand-gold rounded-full transition-all duration-500"
                style={{ width: `${pricing.retentionPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-text-muted">
              <span>
                {pricing.estimatedRetentionDays >= targetRetentionDays
                  ? 'Optimal: Exceeds your target retention objective.'
                  : `Upgrade drive capacity to achieve ${targetRetentionDays}+ days continuous target.`}
              </span>
              <span className="text-text-primary font-medium font-mono">
                {pricing.retentionPercent}% Target Met
              </span>
            </div>
          </div>
        </div>

        {/* Step 3 Subtotal and Next CTA */}
        <div className="pt-2 border-t border-[#262A30] flex flex-col gap-2 mt-auto">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Step 3 Config Total:</span>
            <span className="font-bold text-brand-gold font-mono text-sm">
              {formatCurrency(pricing.step3Subtotal)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevStep}
              className="px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-text-muted hover:text-text-primary text-xs font-medium transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            </button>
            <button
              type="button"
              onClick={onNextStep}
              className="flex-1 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_16px_rgba(245,166,35,0.3)] cursor-pointer active:scale-95"
            >
              <span>Next: PoE & Network Setup</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
