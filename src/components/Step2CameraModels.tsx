import React, { useState } from 'react';
import { CameraSeriesKey, AllocatedCameraItem } from '../types/configurator';
import { CAMERA_SERIES_INFO, CAMERA_MODELS } from '../data/configuratorData';
import { formatCurrency } from '../utils/calculations';

interface Step2CameraModelsProps {
  targetQuota: number;
  allocatedCameras: AllocatedCameraItem[];
  systemPackageName: string;
  onUpdateAllocatedCameras: (items: AllocatedCameraItem[]) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const Step2CameraModels: React.FC<Step2CameraModelsProps> = ({
  targetQuota,
  allocatedCameras,
  systemPackageName,
  onUpdateAllocatedCameras,
  onPrevStep,
  onNextStep,
  onShowToast
}) => {
  const [activeSeries, setActiveSeries] = useState<CameraSeriesKey>('armor');
  const [activePerspective, setActivePerspective] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const seriesInfo = CAMERA_SERIES_INFO[activeSeries];
  const seriesModels = CAMERA_MODELS.filter((m) => m.series === activeSeries);

  const totalAssigned = allocatedCameras.reduce((sum, item) => sum + item.qty, 0);
  const totalMixPrice = allocatedCameras.reduce((sum, item) => sum + item.price * item.qty, 0);
  const remaining = targetQuota - totalAssigned;

  // Add a camera to allocation mix
  const handleAddCamera = (modelId: string) => {
    if (totalAssigned >= targetQuota) {
      onShowToast(`Target quota of ${targetQuota} cameras reached. Adjust quantities to add more.`, 'info');
      return;
    }

    const model = CAMERA_MODELS.find((m) => m.id === modelId);
    if (!model) return;

    const existingIndex = allocatedCameras.findIndex((i) => i.id === modelId);
    if (existingIndex >= 0) {
      const updated = [...allocatedCameras];
      updated[existingIndex].qty += 1;
      onUpdateAllocatedCameras(updated);
    } else {
      onUpdateAllocatedCameras([
        ...allocatedCameras,
        {
          id: model.id,
          series: model.series,
          name: model.name,
          price: model.price,
          qty: 1,
          powerWattage: model.powerWattage,
          isOutdoor: model.isOutdoor
        }
      ]);
    }
  };

  // Adjust quantity
  const handleUpdateQty = (modelId: string, delta: number) => {
    if (delta > 0 && totalAssigned >= targetQuota) {
      onShowToast(`Target benchmark is ${targetQuota} cameras. Increase system size in Step 1 to add more.`, 'info');
      return;
    }

    const updated = allocatedCameras
      .map((item) => {
        if (item.id === modelId) {
          return { ...item, qty: item.qty + delta };
        }
        return item;
      })
      .filter((item) => item.qty > 0);

    onUpdateAllocatedCameras(updated);
  };

  // Remove completely
  const handleRemoveModel = (modelId: string) => {
    onUpdateAllocatedCameras(allocatedCameras.filter((item) => item.id !== modelId));
  };

  // Quick fill remaining
  const handleQuickFillRemaining = () => {
    if (remaining <= 0) return;
    const featuredModel = seriesModels.find((m) => m.featured) || seriesModels[0];
    
    const existingIndex = allocatedCameras.findIndex((i) => i.id === featuredModel.id);
    if (existingIndex >= 0) {
      const updated = [...allocatedCameras];
      updated[existingIndex].qty += remaining;
      onUpdateAllocatedCameras(updated);
    } else {
      onUpdateAllocatedCameras([
        ...allocatedCameras,
        {
          id: featuredModel.id,
          series: featuredModel.series,
          name: featuredModel.name,
          price: featuredModel.price,
          qty: remaining,
          powerWattage: featuredModel.powerWattage,
          isOutdoor: featuredModel.isOutdoor
        }
      ]);
    }
    onShowToast(`Allocated remaining ${remaining} slots with ${featuredModel.name}`);
  };

  // Reset allocation
  const handleResetAllocation = () => {
    onUpdateAllocatedCameras([]);
    onShowToast('Camera allocation reset');
  };

  // Quota breakdown percentage
  const armorCount = allocatedCameras.filter(i => i.series === 'armor').reduce((s, i) => s + i.qty, 0);
  const binCount = allocatedCameras.filter(i => i.series === 'binsight').reduce((s, i) => s + i.qty, 0);
  const dualCount = allocatedCameras.filter(i => i.series === 'dualarc').reduce((s, i) => s + i.qty, 0);
  const panoCount = allocatedCameras.filter(i => i.series === 'panotrak').reduce((s, i) => s + i.qty, 0);

  // Perspective image
  const perspectiveImages = [
    '/assets/aistudio/Image_10_910d3b11.jpeg',
    '/assets/aistudio/Image_7_0fae4121.jpeg',
    '/assets/aistudio/Image_10_910d3b11.jpeg',
    '/assets/aistudio/Image_7_0fae4121.jpeg'
  ];

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-stretch bg-surface-stage min-h-[calc(100vh-9rem)]">
      {/* Left Stage Hero Showcase */}
      <section className="relative w-full lg:w-[62%] flex flex-col justify-between p-6 lg:p-10 overflow-hidden border-b lg:border-b-0 lg:border-r border-border-hairline bg-surface-stage">
        {/* Ambient glow behind camera */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className="w-[750px] h-[400px] rounded-full blur-[130px] transition-all duration-700 opacity-20"
            style={{ backgroundColor: seriesInfo.accent }}
          />
        </div>

        {/* Top Header within Hero Stage */}
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-panel border border-border-hairline backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="font-mono text-brand-gold uppercase tracking-widest text-[11px] font-semibold">
                STEP 02 / 05 — CAMERA MODELS
              </span>
            </div>
            <span className="font-mono text-text-muted tracking-wider text-[11px] uppercase">
              Architectural Grade Hardware
            </span>
          </div>

          <div className="flex flex-col mt-1">
            <h1 className="font-sans text-2xl lg:text-3xl text-text-primary tracking-tight font-medium">
              Choose how you see.
            </h1>
            <p className="font-sans text-sm text-text-muted">
              Explore camera series, features, and allocate your ideal {targetQuota}-camera system mix.
            </p>
          </div>
        </div>

        {/* Main Camera Visual Showcase with Hotspots */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4 select-none">
          <div className="relative max-w-[960px] w-full flex items-center justify-center">
            <img
              src={perspectiveImages[activePerspective]}
              alt="4COVR Armor & BinSight AI Security Camera Hero Studio"
              className="w-full max-h-[46vh] object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.95)] transition-all duration-500 rounded-xl"
            />

            {/* Hotspot 1: Optical Lens */}
            <div
              className="absolute top-[34%] left-[28%] group cursor-pointer flex items-center z-20"
              onMouseEnter={() => setActiveHotspot(1)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-7 h-7 rounded-full bg-brand-amber/30 animate-ping" />
                <span className="w-5 h-5 rounded-full bg-brand-amber text-white flex items-center justify-center font-bold text-[11px] shadow-[0_0_12px_#efbe86] font-mono">
                  1
                </span>
              </div>
              <div
                className={`ml-3 px-3.5 py-2 rounded-xl bg-surface-panel/95 border border-border-hairline backdrop-blur-xl transition-all pointer-events-none shadow-2xl whitespace-nowrap z-20 ${
                  activeHotspot === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <span className="font-mono text-[10px] text-brand-amber tracking-widest block uppercase font-semibold">
                  Precision Optical Glass
                </span>
                <span className="font-sans text-text-primary text-[13px]">
                  F1.0 Ultra Aperture · Gold Nano-Anti-Reflective Coating
                </span>
              </div>
            </div>

            {/* Hotspot 2: Smart Dual-Light */}
            <div
              className="absolute top-[48%] left-[45%] group cursor-pointer flex items-center z-20"
              onMouseEnter={() => setActiveHotspot(2)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-7 h-7 rounded-full bg-brand-amber/30 animate-ping" />
                <span className="w-5 h-5 rounded-full bg-brand-amber text-white flex items-center justify-center font-bold text-[11px] shadow-[0_0_12px_#efbe86] font-mono">
                  2
                </span>
              </div>
              <div
                className={`ml-3 px-3.5 py-2 rounded-xl bg-surface-panel/95 border border-border-hairline backdrop-blur-xl transition-all pointer-events-none shadow-2xl whitespace-nowrap z-20 ${
                  activeHotspot === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <span className="font-mono text-[10px] text-brand-amber tracking-widest block uppercase font-semibold">
                  Dual-Light Array
                </span>
                <span className="font-sans text-text-primary text-[13px]">
                  Warm 3000K Ambient LED & Stealth 850nm Matrix IR
                </span>
              </div>
            </div>

            {/* Hotspot 3: Chassis & Mount */}
            <div
              className="absolute top-[42%] right-[22%] group cursor-pointer flex items-center z-20"
              onMouseEnter={() => setActiveHotspot(3)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-7 h-7 rounded-full bg-brand-amber/30 animate-ping" />
                <span className="w-5 h-5 rounded-full bg-brand-amber text-white flex items-center justify-center font-bold text-[11px] shadow-[0_0_12px_#efbe86] font-mono">
                  3
                </span>
              </div>
              <div
                className={`ml-3 px-3.5 py-2 rounded-xl bg-surface-panel/95 border border-border-hairline backdrop-blur-xl transition-all pointer-events-none shadow-2xl whitespace-nowrap z-20 ${
                  activeHotspot === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <span className="font-mono text-[10px] text-brand-amber tracking-widest block uppercase font-semibold">
                  Aerospace Aluminum
                </span>
                <span className="font-sans text-text-primary text-[13px]">
                  Graphite Brushed CNC Body · IP67 Waterproof & IK10 Vandal-Proof
                </span>
              </div>
            </div>
          </div>

          {/* Perspective Gallery Selector Bar */}
          <div className="flex items-center gap-2 bg-surface-panel/80 border border-border-hairline backdrop-blur-xl p-1.5 rounded-full mt-3 shadow-lg">
            {[
              { label: '3/4 Perspective Hero', icon: 'photo_camera' },
              { label: 'Macro Aperture', icon: 'center_focus_strong' },
              { label: 'Dual-Light Array', icon: 'light_mode' },
              { label: 'Quick-Release Mount', icon: 'build' }
            ].map((view, idx) => (
              <button
                key={view.label}
                type="button"
                onClick={() => setActivePerspective(idx)}
                className={`px-3 py-1 rounded-full font-mono text-[11px] tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activePerspective === idx
                    ? 'bg-surface-container-highest text-brand-gold border border-brand-gold/40 shadow-sm'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-brand-amber">{view.icon}</span>
                <span>{view.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Series Capability & Feature Badges Bar */}
        <div className="relative z-10 flex flex-col gap-2 pt-3 border-t border-border-hairline">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-sans text-lg text-text-primary font-semibold">
                {seriesInfo.title}
              </span>
              <span className="text-brand-amber text-[12px] font-mono px-2 py-0.5 rounded bg-surface-container-high border border-amber-500/20 font-medium">
                {seriesInfo.tag}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-text-muted font-mono text-[10px]">
                IP67 RATED
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-text-muted font-mono text-[10px]">
                IK10 VANDAL
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-brand-amber font-mono text-[10px]">
                AI ON-EDGE
              </span>
            </div>
          </div>
          
          <p className="font-sans text-text-muted text-[13px]">
            {seriesInfo.desc}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {[
              { label: 'IR Night Vision', icon: 'nightlight' },
              { label: 'Smart Dual Light', icon: 'wb_twilight' },
              { label: 'Two-Way Audio', icon: 'record_voice_over' },
              { label: '180° Panoramic', icon: 'panorama_photosphere' },
              { label: 'Optical Zoom', icon: 'zoom_in' },
              { label: 'Auto Tracking', icon: 'track_changes' }
            ].map((feat) => (
              <span
                key={feat.label}
                className="px-2 py-0.5 rounded bg-surface-container text-text-primary text-[11px] flex items-center gap-1 border border-border-hairline/60"
              >
                <span className="material-symbols-outlined text-[13px] text-brand-amber">{feat.icon}</span>
                <span>{feat.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Right Configuration Drawer (approx 38%) */}
      <aside className="w-full lg:w-[38%] bg-surface-panel/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-9rem)] shadow-2xl">
        <div className="p-6 flex flex-col gap-6">
          
          {/* Section A: Camera Series Selector */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-brand-amber tracking-wider text-[11px] uppercase font-semibold">
                Camera Series Selection
              </span>
              <span className="font-sans text-text-muted text-[11px]">Select Series to Browse Models</span>
            </div>

            {/* Series Switcher Pills */}
            <div className="grid grid-cols-4 gap-1.5 bg-surface-container-lowest p-1 rounded-xl border border-border-hairline">
              {(['armor', 'binsight', 'dualarc', 'panotrak'] as CameraSeriesKey[]).map((key) => {
                const info = CAMERA_SERIES_INFO[key];
                const isActive = activeSeries === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSeries(key)}
                    className={`py-2 px-1.5 rounded-lg text-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-surface-container-highest text-brand-amber border border-amber-500/40 shadow-[0_0_12px_rgba(239,190,134,0.15)] font-semibold'
                        : 'text-text-muted hover:text-text-primary hover:bg-surface-container'
                    }`}
                  >
                    <span className="block truncate text-[13px]">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="font-mono text-[9px] text-text-muted block mt-0.5 truncate">
                      {info.tag.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Models Catalog Grid (Dynamic according to active Series) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-text-muted tracking-wider text-[11px] uppercase">
                Available Models & Form Factors
              </span>
              {remaining > 0 && (
                <button
                  type="button"
                  onClick={handleQuickFillRemaining}
                  className="font-sans text-brand-amber text-[11px] hover:underline cursor-pointer"
                >
                  Fill Remaining ({remaining}) with Featured
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {seriesModels.map((model) => (
                <div
                  key={model.id}
                  className={`p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border flex items-center justify-between transition-all ${
                    model.featured
                      ? 'border-brand-amber/40 shadow-[0_0_12px_rgba(239,190,134,0.15)]'
                      : 'border-border-hairline'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-highest border border-border-hairline flex items-center justify-center text-brand-amber flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">{model.icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-text-primary font-medium text-[13px]">
                          {model.name}
                        </span>
                        {model.featured && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-brand-amber text-[9px] font-mono">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className="font-sans text-text-muted text-[11px]">{model.tags}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-mono text-text-primary font-bold text-[14px]">
                      {formatCurrency(model.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddCamera(model.id)}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-brand-amber hover:text-surface-stage text-brand-amber text-[11px] font-semibold transition-all border border-brand-amber/30 flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[13px]">add</span>
                      <span>Mix</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Selected Camera Mix (Target Quota & Allocation) */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-border-hairline flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-sans text-[15px] text-text-primary font-semibold">
                  Selected Camera Mix
                </span>
                <span className="font-sans text-text-muted text-[12px]">
                  System Benchmark: {targetQuota} Cameras ({systemPackageName} Architecture)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    remaining === 0
                      ? 'bg-emerald-400'
                      : remaining > 0
                      ? 'bg-brand-amber animate-pulse'
                      : 'bg-rose-400'
                  }`}
                />
                <span
                  className={`font-mono text-[11px] font-semibold ${
                    remaining === 0
                      ? 'text-emerald-400'
                      : remaining > 0
                      ? 'text-brand-amber'
                      : 'text-rose-400'
                  }`}
                >
                  {totalAssigned} / {targetQuota} Assigned
                </span>
              </div>
            </div>

            {/* Allocation Progress Bar */}
            <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden flex border border-border-hairline">
              <div
                className="bg-brand-amber transition-all duration-300"
                style={{ width: `${(armorCount / targetQuota) * 100}%` }}
                title={`Armor: ${armorCount}`}
              />
              <div
                className="bg-amber-300 transition-all duration-300"
                style={{ width: `${(binCount / targetQuota) * 100}%` }}
                title={`BinSight: ${binCount}`}
              />
              <div
                className="bg-cyan-400 transition-all duration-300"
                style={{ width: `${(dualCount / targetQuota) * 100}%` }}
                title={`DualArc: ${dualCount}`}
              />
              <div
                className="bg-purple-400 transition-all duration-300"
                style={{ width: `${(panoCount / targetQuota) * 100}%` }}
                title={`PanoTrak: ${panoCount}`}
              />
            </div>

            {/* Allocation List Items */}
            <div className="flex flex-col gap-2 pt-1 max-h-56 overflow-y-auto">
              {allocatedCameras.length === 0 ? (
                <div className="text-center py-4 text-xs text-text-muted">
                  No cameras allocated yet. Click "+ Mix" on any model above.
                </div>
              ) : (
                allocatedCameras.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-surface-panel border border-border-hairline flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-surface-container-high text-brand-amber flex items-center justify-center text-[12px] font-bold font-mono">
                        {item.qty}×
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans text-text-primary text-[12px] font-medium truncate max-w-[170px]">
                          {item.name}
                        </span>
                        <span className="font-mono text-text-muted text-[11px]">
                          {formatCurrency(item.price)} each ·{' '}
                          <span className="text-brand-amber">{formatCurrency(item.price * item.qty)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, -1)}
                        className="w-6 h-6 rounded bg-surface-container hover:bg-surface-container-highest text-text-primary flex items-center justify-center font-bold text-[14px] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono text-[12px] w-4 text-center text-text-primary font-medium">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, 1)}
                        disabled={totalAssigned >= targetQuota}
                        className={`w-6 h-6 rounded bg-surface-container hover:bg-surface-container-highest text-text-primary flex items-center justify-center font-bold text-[14px] ${
                          totalAssigned >= targetQuota ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveModel(item.id)}
                        className="text-text-muted hover:text-red-400 ml-1 cursor-pointer"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Allocation Actions Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-border-hairline text-[12px]">
              <button
                type="button"
                onClick={handleResetAllocation}
                className="text-brand-amber hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                <span>Reset Allocation</span>
              </button>
              
              <span className="text-text-muted font-mono">
                {remaining === 0
                  ? '0 Remaining · Balanced System'
                  : remaining > 0
                  ? `${remaining} Cameras Needed`
                  : `${Math.abs(remaining)} Over Quota`}
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar Footer */}
        <div className="p-5 bg-surface-panel/95 border-t border-border-hairline backdrop-blur-2xl flex items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={onPrevStep}
            className="flex-1 py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-text-muted hover:text-text-primary transition-all font-sans text-[13px] flex items-center justify-center gap-1 font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Step 1: Size</span>
          </button>
          
          <button
            type="button"
            onClick={onNextStep}
            className="flex-1 py-2.5 px-3 rounded-xl bg-brand-amber text-white hover:bg-amber-600 transition-all font-sans text-[13px] flex items-center justify-center gap-1 font-semibold shadow-[0_0_16px_rgba(239,190,134,0.3)] cursor-pointer active:scale-95"
          >
            <span>Next: NVR & Storage</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
