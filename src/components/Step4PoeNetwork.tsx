import React, { useState } from 'react';
import { NetworkOption, AllocatedCameraItem } from '../types/configurator';
import { NETWORK_OPTIONS } from '../data/configuratorData';
import { CalculatedPricing, formatCurrency } from '../utils/calculations';

interface Step4PoeNetworkProps {
  selectedNetworkId: string;
  pricing: CalculatedPricing;
  allocatedCameras: AllocatedCameraItem[];
  targetCamerasCount: number;
  onSelectNetwork: (networkId: string) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const Step4PoeNetwork: React.FC<Step4PoeNetworkProps> = ({
  selectedNetworkId,
  pricing,
  allocatedCameras,
  targetCamerasCount,
  onSelectNetwork,
  onPrevStep,
  onNextStep,
  onShowToast
}) => {
  const [viewMode, setViewMode] = useState<'hardware' | 'topology'>('hardware');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const selectedNetwork = NETWORK_OPTIONS.find((n) => n.id === selectedNetworkId) || NETWORK_OPTIONS[2];

  const totalCams = allocatedCameras.reduce((sum, item) => sum + item.qty, 0) || targetCamerasCount;
  const powerDraw = pricing.totalCameraWattage || 82;
  const powerBudget = selectedNetwork.powerBudgetW;
  const loadPercent = Math.min(100, Math.round((powerDraw / powerBudget) * 100));
  const headroom = Math.max(0, powerBudget - powerDraw);

  return (
    <div className="relative w-full min-h-[calc(100vh-9rem)] flex flex-col lg:flex-row bg-surface-stage text-text-primary overflow-hidden">
      
      {/* Left Stage (approx 72%) */}
      <div className="relative w-full lg:w-[72%] min-h-[580px] lg:h-auto flex flex-col justify-between p-6 lg:p-10 overflow-hidden border-b lg:border-b-0 lg:border-r border-border-hairline">
        
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_45%_55%,rgba(239,190,134,0.04),transparent_75%)]" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-amber/5 blur-3xl pointer-events-none" />

        {/* Top Control Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-surface-panel/85 backdrop-blur-xl px-4 py-1.5 rounded-full border border-border-hairline shadow-lg">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
            <span className="font-mono text-[11px] text-brand-amber tracking-widest uppercase font-semibold">
              Stage Focus: PoE Switched Fabric
            </span>
            <span className="text-text-muted text-xs">|</span>
            <span className="font-sans text-xs text-text-primary">
              {selectedNetwork.name} · {selectedNetwork.powerBudgetW}W Total Power
            </span>
          </div>

          <div className="flex items-center gap-1 bg-surface-panel/80 backdrop-blur-xl p-1 rounded-full border border-border-hairline shadow-md">
            <button
              type="button"
              onClick={() => setViewMode('hardware')}
              className={`px-3 py-1 rounded-full font-sans text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'hardware'
                  ? 'bg-surface-container-high text-brand-amber shadow-sm font-semibold'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">router</span>
              <span>Hardware View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('topology')}
              className={`px-3 py-1 rounded-full font-sans text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'topology'
                  ? 'bg-surface-container-high text-brand-amber shadow-sm font-semibold'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">hub</span>
              <span>Connection View</span>
            </button>
          </div>
        </div>

        {/* Main Canvas: Hardware View vs Topology View */}
        <div className="relative z-0 flex-1 flex items-center justify-center my-4 group">
          <div className="relative w-full max-w-5xl h-full max-h-[580px] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-surface-container-lowest border border-border-hairline">
            
            {viewMode === 'hardware' ? (
              /* HARDWARE RENDER VIEW */
              <div className="relative w-full h-full block">
                <img
                  src="/assets/aistudio/Image_14_30b73c3e.jpeg"
                  alt="4COVR PoE Switch and Quantum NVR Setup"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-stage via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface-stage/40 via-transparent to-surface-stage/60 pointer-events-none" />

                {/* Hotspot 1: PoE Switch */}
                <div
                  className="absolute top-[48%] left-[34%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center group/spot cursor-pointer"
                  onMouseEnter={() => setActiveHotspot(1)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-brand-amber/30 animate-ping" />
                    <span className="relative w-5 h-5 rounded-full bg-surface-stage text-brand-amber border border-brand-amber shadow-lg flex items-center justify-center text-[10px] font-bold font-mono">
                      1
                    </span>
                  </div>
                  <div
                    className={`ml-3 px-3.5 py-2 rounded-xl bg-surface-panel/95 backdrop-blur-xl text-text-primary border border-border-hairline shadow-xl transition-all pointer-events-none z-20 ${
                      activeHotspot === 1 ? 'opacity-100 scale-100' : 'opacity-90 scale-95'
                    }`}
                  >
                    <p className="font-mono text-[10px] text-brand-amber font-semibold">4COVR NetFabric 8P</p>
                    <p className="font-sans text-xs text-text-primary">8× Gigabit PoE+ Ports ({selectedNetwork.powerBudgetW}W Budget)</p>
                  </div>
                </div>

                {/* Hotspot 2: NVR Uplink Bus */}
                <div
                  className="absolute top-[46%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center group/spot2 cursor-pointer"
                  onMouseEnter={() => setActiveHotspot(2)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-7 h-7 rounded-full bg-white/20 animate-pulse" />
                    <span className="relative w-4 h-4 rounded-full bg-surface-container-highest text-white shadow-md flex items-center justify-center text-[9px] font-medium font-mono">
                      2
                    </span>
                  </div>
                  <div
                    className={`ml-3 px-3 py-1.5 rounded-lg bg-surface-panel/95 backdrop-blur-md text-text-muted border border-border-hairline shadow-lg transition-all pointer-events-none z-20 ${
                      activeHotspot === 2 ? 'opacity-100 scale-100' : 'opacity-90 scale-95'
                    }`}
                  >
                    <p className="font-mono text-[10px] tracking-widest text-[#D2D2D2] uppercase">Quantum Core NVR</p>
                    <p className="font-sans text-[11px] text-text-primary">Direct 10Gbps Uplink Bus to PoE Fabric</p>
                  </div>
                </div>
              </div>
            ) : (
              /* DETERMINISTIC TOPOLOGY VIEW */
              <div className="relative w-full h-full p-8 flex flex-col justify-between bg-surface-stage overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-border-hairline">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-amber">linear_scale</span>
                    <span className="font-mono text-xs text-text-primary uppercase tracking-wider font-semibold">
                      Deterministic PoE Fabric Architecture
                    </span>
                  </div>
                  <span className="font-sans text-xs text-text-muted">
                    Switched Latency: &lt;0.8ms · Non-blocking Wire Speed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-auto py-4">
                  {/* Endpoint Sensors */}
                  <div className="p-4 rounded-xl bg-surface-container-low border border-border-hairline flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-brand-amber font-semibold uppercase">
                        ENDPOINT SENSORS
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-surface-container-high text-text-primary font-mono">
                        {totalCams} Nodes
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-text-muted">
                      {allocatedCameras.map((cam) => (
                        <div key={cam.id} className="flex items-center justify-between p-1.5 rounded bg-surface-container">
                          <span className="text-text-primary font-medium truncate max-w-[150px]">
                            {cam.qty}× {cam.name}
                          </span>
                          <span className="text-brand-amber font-mono text-[11px]">
                            {Math.round(cam.powerWattage * cam.qty)}W
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-border-hairline text-right font-mono text-[11px] text-text-muted">
                      Aggregated PoE Draw: <span className="text-brand-amber font-bold">{powerDraw}W</span>
                    </div>
                  </div>

                  {/* Switch Fabric */}
                  <div className="p-5 rounded-xl bg-surface-container border border-brand-amber shadow-[0_0_20px_rgba(239,190,134,0.12)] flex flex-col gap-3 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-brand-amber/15 flex items-center justify-center">
                      <span className="material-symbols-outlined text-brand-amber text-[22px]">router</span>
                    </div>
                    <div>
                      <h4 className="font-sans text-text-primary font-semibold text-sm">
                        {selectedNetwork.name}
                      </h4>
                      <p className="font-sans text-xs text-text-muted mt-0.5">
                        {selectedNetwork.powerBudgetW}W Budget · Auto-QoS Port Isolation
                      </p>
                    </div>

                    <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden border border-border-hairline">
                      <div
                        className="bg-brand-amber h-full rounded-full transition-all duration-500"
                        style={{ width: `${loadPercent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-text-muted">
                      <span>Load: {powerDraw}W</span>
                      <span className="text-brand-amber font-medium">Headroom: {headroom}W ({100 - loadPercent}%)</span>
                    </div>
                  </div>

                  {/* Core Appliance */}
                  <div className="p-4 rounded-xl bg-surface-container-low border border-border-hairline flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-brand-amber font-semibold uppercase">
                        CORE APPLIANCE
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-brand-amber/20 text-brand-amber font-mono">
                        ACTIVE
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-stage flex items-center justify-center flex-shrink-0 border border-border-hairline">
                        <span className="material-symbols-outlined text-text-secondary text-[20px]">dns</span>
                      </div>
                      <div>
                        <h5 className="font-sans text-text-primary font-medium text-xs">Quantum Core NVR</h5>
                        <p className="font-sans text-[11px] text-text-muted">{pricing.totalStorageTB}TB Enterprise Vault</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-surface-container text-xs text-text-muted space-y-1">
                      <div className="flex justify-between">
                        <span>Throughput:</span>
                        <span className="text-text-primary font-mono font-medium">320 Mbps AI</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uplink:</span>
                        <span className="text-text-primary font-mono font-medium">Direct SFP+ Bus</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border-hairline text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-amber" /> Auto-Negotiation: IEEE 802.3at PoE+ (All Ports)
                  </span>
                  <span className="text-text-secondary">Zero-packet-drop architectural fabric</span>
                </div>
              </div>
            )}

            {/* Bottom floating telemetry badges in Hardware view */}
            {viewMode === 'hardware' && (
              <div className="absolute bottom-4 left-4 hidden md:flex items-center gap-6 bg-surface-panel/85 backdrop-blur-xl px-5 py-2.5 rounded-xl border border-border-hairline shadow-lg">
                <div>
                  <span className="font-mono text-[10px] text-text-muted uppercase">Dedicated PoE Power</span>
                  <p className="font-mono text-base text-brand-amber font-semibold">
                    {powerDraw}W <span className="text-xs font-normal text-text-muted">/ {powerBudget}W Budget</span>
                  </p>
                </div>
                <div className="w-px h-7 bg-surface-container-highest" />
                <div>
                  <span className="font-mono text-[10px] text-text-muted uppercase">Max Cable Run</span>
                  <p className="font-mono text-base text-text-primary font-semibold">
                    250m <span className="text-xs font-normal text-text-muted">Extended Mode</span>
                  </p>
                </div>
                <div className="w-px h-7 bg-surface-container-highest" />
                <div>
                  <span className="font-mono text-[10px] text-text-muted uppercase">Switched Latency</span>
                  <p className="font-mono text-base text-text-primary font-semibold">
                    &lt;1ms <span className="text-xs font-normal text-text-muted">Deterministic</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Telemetry Footer */}
        <div className="relative z-10 flex items-center justify-between pt-2 text-text-muted font-sans text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-brand-amber">lock_clock</span>
              <span>MACsec L2 Hardware Encryption</span>
            </span>
            <span className="hidden sm:inline-block">•</span>
            <span className="hidden sm:inline-block">Self-Healing Watchdog with Port-Level Cold-Reset</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onShowToast('Network topology refreshed', 'refresh')}
              className="w-8 h-8 rounded-full bg-surface-panel hover:bg-surface-container-high border border-border-hairline flex items-center justify-center text-text-primary transition-colors cursor-pointer"
              title="Topology Refresh"
            >
              <span className="material-symbols-outlined text-[17px]">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Configuration Console (approx 28%) */}
      <div className="relative w-full lg:w-[28%] bg-surface-panel/95 backdrop-blur-2xl shadow-[-4px_0_24px_rgba(0,0,0,0.5)] border-l border-border-hairline flex flex-col justify-between overflow-y-auto max-h-none lg:max-h-[calc(100vh-9rem)]">
        
        {/* Header Strip */}
        <div className="p-6 pb-3 sticky top-0 bg-surface-panel/95 backdrop-blur-md z-20 border-b border-border-hairline">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-brand-amber tracking-widest uppercase font-semibold">
              STEP 04 / 05 — POE & NETWORK
            </span>
            <span className="font-sans text-xs text-text-muted">
              Step Delta: <span className="text-text-primary font-mono font-medium">{formatCurrency(selectedNetwork.price)}</span>
            </span>
          </div>
          <h1 className="font-sans text-2xl text-text-primary mt-1 tracking-tight">
            Everything, <span className="text-brand-amber font-normal">seamlessly connected.</span>
          </h1>
          <p className="font-sans text-xs text-text-muted mt-0.5 leading-relaxed">
            We've designed the connections. You stay in control. Zero-configuration auto-negotiation with deterministic PoE power delivery.
          </p>
        </div>

        {/* Content sections */}
        <div className="p-6 space-y-6">
          {/* Recommended Setup Highlight Card */}
          <section>
            <div className="p-4 rounded-xl bg-surface-container border border-brand-amber shadow-[0_0_20px_rgba(239,190,134,0.12)] relative">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-amber/15 text-brand-amber uppercase tracking-wider font-semibold">
                  Recommended Setup · Optimized for {totalCams} Cameras
                </span>
                <span className="font-mono text-xs text-brand-amber font-bold">
                  +{formatCurrency(selectedNetwork.price)} Included
                </span>
              </div>
              <h4 className="font-sans text-sm text-text-primary font-semibold mt-2">
                Integrated Direct-PoE + 8-Port Expansion Switch
              </h4>
              <p className="font-sans text-xs text-brand-amber font-medium mt-0.5">
                8 Active PoE+ Ports · 120W Total Power Envelope · Auto-Negotiated QoS
              </p>
              <p className="font-sans text-xs text-text-muted mt-2 leading-relaxed">
                Sufficient to drive all optical payloads ({powerDraw}W load) with {headroom}W headroom for cold starts and infrared activation.
              </p>
              <div className="mt-3 pt-3 border-t border-border-hairline flex items-center justify-between">
                <span className="text-xs text-text-muted font-mono flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-brand-amber">check_circle</span>
                  <span>Active Selection</span>
                </span>
                <span className="text-xs font-semibold text-text-primary">Pre-configured</span>
              </div>
            </div>
          </section>

          {/* Network Options Selector */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm text-text-primary font-semibold">
                  Customize Network Setup
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface-container-high text-brand-amber uppercase">
                  5 Options
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {NETWORK_OPTIONS.map((opt) => {
                const isSelected = selectedNetworkId === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => onSelectNetwork(opt.id)}
                    className={`cursor-pointer p-3 rounded-xl transition-all flex items-center gap-3 relative overflow-hidden border ${
                      isSelected
                        ? 'bg-surface-container hover:bg-surface-container-high shadow-[0_0_20px_rgba(239,190,134,0.12)] border-brand-amber'
                        : 'bg-surface-container-low hover:bg-surface-container border-border-hairline'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg bg-surface-stage flex-shrink-0 border flex items-center justify-center ${
                        isSelected ? 'border-brand-amber text-brand-amber' : 'border-border-hairline text-text-muted'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-1">
                        <h4
                          className={`font-sans text-xs truncate font-medium ${
                            isSelected ? 'text-brand-amber font-semibold' : 'text-text-primary'
                          }`}
                        >
                          {opt.name}
                        </h4>
                        <span
                          className={`font-mono text-xs ${
                            isSelected ? 'text-brand-amber font-bold' : 'text-text-muted'
                          }`}
                        >
                          {opt.price === 0 ? '$0 (Std)' : `+${formatCurrency(opt.price)}`}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-text-muted truncate mt-0.5">
                        {opt.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-amber shadow-[0_0_8px_#efbe86]" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Connection Summary Metrics */}
          <section className="space-y-3">
            <span className="font-sans text-sm text-text-primary font-semibold block">
              Connection Summary Metrics
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3 rounded-xl bg-surface-container-low border border-border-hairline">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-text-muted font-mono text-[11px]">Connected Cameras</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {totalCams} / {totalCams} (100% Allocated)
                  </span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-amber h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-border-hairline">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-text-muted font-mono text-[11px]">PoE Power Draw</span>
                  <span className="font-mono text-brand-amber font-semibold">
                    {powerDraw}W / {powerBudget}W ({loadPercent}% Load)
                  </span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-amber h-full rounded-full" style={{ width: `${loadPercent}%` }} />
                </div>
                <p className="font-sans text-[10px] text-text-muted mt-1">
                  Healthy {100 - loadPercent}% ({headroom}W) continuous headroom
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-border-hairline">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-text-muted font-mono text-[11px]">Available Expansion</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {selectedNetwork.ports} Channels Ready
                  </span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-text-muted h-full rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </section>

          {/* Notice Card */}
          <div className="p-3.5 rounded-xl bg-surface-container-low/90 backdrop-blur-md border border-border-hairline shadow-md">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-brand-amber text-[20px] flex-shrink-0 mt-0.5">
                verified_user
              </span>
              <div>
                <h5 className="font-sans text-xs text-text-primary font-semibold">
                  Notice: Full Gigabit Architecture
                </h5>
                <p className="font-sans text-[11px] text-text-muted mt-0.5 leading-relaxed">
                  All selected ports support full duplex wire-speed forwarding with redundant power auto-negotiation and isolated surveillance VLAN segments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Sticky Footer */}
        <div className="p-5 bg-surface-panel/95 backdrop-blur-2xl border-t border-border-hairline shadow-[0_-8px_20px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={onPrevStep}
            className="px-3.5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-text-primary font-sans text-xs transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Step 3: Storage</span>
          </button>

          <div className="flex-1 text-right">
            <span className="font-mono text-[10px] text-text-muted block">PoE Fabric Addon</span>
            <span className="font-mono text-sm text-brand-amber font-bold">
              +{formatCurrency(selectedNetwork.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={onNextStep}
            className="px-5 py-2.5 rounded-full bg-brand-amber hover:bg-amber-600 text-white font-sans text-xs font-semibold transition-all shadow-[0_0_16px_rgba(239,190,134,0.3)] flex items-center gap-1.5 flex-shrink-0 cursor-pointer active:scale-95"
          >
            <span>Next: Summary & Quote</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
