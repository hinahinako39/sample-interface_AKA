import React, { useState } from 'react';
import { SystemConfiguration, ConfigStep } from '../types/configurator';
import { CalculatedPricing, formatCurrency } from '../utils/calculations';
import { NVR_OPTIONS, HDD_OPTIONS, NETWORK_OPTIONS } from '../data/configuratorData';
import { AdjustAccessoriesDrawer } from './AdjustAccessoriesDrawer';
import { QuoteModal } from './QuoteModal';

interface Step5ReviewQuoteProps {
  config: SystemConfiguration;
  pricing: CalculatedPricing;
  onUpdateAccessories: (acc: SystemConfiguration['accessories']) => void;
  onGoToStep: (step: ConfigStep) => void;
  onResetAll: () => void;
  onSaveConfig: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const Step5ReviewQuote: React.FC<Step5ReviewQuoteProps> = ({
  config,
  pricing,
  onUpdateAccessories,
  onGoToStep,
  onResetAll,
  onSaveConfig,
  onShowToast
}) => {
  const [activePerspective, setActivePerspective] = useState<'complete' | 'cameras' | 'network'>('complete');
  const [showBomTable, setShowBomTable] = useState<boolean>(false);
  const [showAccDetails, setShowAccDetails] = useState<boolean>(false);
  const [isAdjustDrawerOpen, setIsAdjustDrawerOpen] = useState<boolean>(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const nvr = NVR_OPTIONS.find((n) => n.id === config.selectedNvrId) || NVR_OPTIONS[0];
  const hdd = HDD_OPTIONS.find((h) => h.id === config.selectedHddId) || HDD_OPTIONS[1];
  const network = NETWORK_OPTIONS.find((net) => net.id === config.selectedNetworkId) || NETWORK_OPTIONS[2];

  const totalCameras = config.allocatedCameras.reduce((sum, item) => sum + item.qty, 0) || config.totalCameraTarget;

  // Perspective images
  const getPerspectiveImage = () => {
    switch (activePerspective) {
      case 'cameras':
        return '/assets/aistudio/Image_10_910d3b11.jpeg';
      case 'network':
        return '/assets/aistudio/Image_15_be564202.jpeg';
      case 'complete':
      default:
        return '/assets/aistudio/Image_5_94597347.png';
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const csvRows = [
      'Product,SKU,Quantity,Specification,Unit Price,Subtotal'
    ];

    // Cameras
    config.allocatedCameras.forEach((cam) => {
      csvRows.push(
        `"${cam.name}","4C-CAM-${cam.id.toUpperCase()}",${cam.qty},"AI 4K/Ultra Lens","$${cam.price.toFixed(2)}","$${(cam.price * cam.qty).toFixed(2)}"`
      );
    });

    // NVR
    csvRows.push(
      `"${nvr.name}","4C-NVR-${nvr.id.toUpperCase()}",1,"${nvr.channels}CH ${nvr.inflowMbps}Mbps Inbound","$${nvr.price.toFixed(2)}","$${nvr.price.toFixed(2)}"`
    );

    // HDD
    csvRows.push(
      `"${hdd.name}","4C-HDD-${hdd.capacityTB}TB",${config.driveQty},"Surveillance Grade 24/7 CMR","$${hdd.price.toFixed(2)}","$${(hdd.price * config.driveQty).toFixed(2)}"`
    );

    // Network
    csvRows.push(
      `"${network.name}","4C-NET-${network.id.toUpperCase()}",1,"${network.powerBudgetW}W PoE+ Wire-Speed","$${network.price.toFixed(2)}","$${network.price.toFixed(2)}"`
    );

    // Cables
    csvRows.push(
      `"Braided Cat6 Cables (${config.accessories.cableLength})","4C-CAB-RUN",${totalCameras},"Weatherproof Shielded RJ45","Included","$0.00"`
    );

    // Junction Boxes
    if (config.accessories.junctionBoxesCount > 0) {
      const jbCost = config.accessories.junctionBoxesCount * config.accessories.junctionBoxUnitPrice;
      csvRows.push(
        `"Waterproof Outdoor Junction Box","4C-JBOX-DP54",${config.accessories.junctionBoxesCount},"IP66 Aluminum Deep Enclosure","$19.00","$${jbCost.toFixed(2)}"`
      );
    }

    // Conduit
    if (config.accessories.conduitAdaptersEnabled) {
      csvRows.push(
        `"3/4 EMT Conduit Adapters (Pack of 4)","4C-ACC-EMT",1,"Industrial Conduit Threading","$24.00","$24.00"`
      );
    }

    csvRows.push(`"Total Hardware Value","---","---","---","---","$${pricing.systemTotal.toFixed(2)}"`);

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '4COVR-System-Quote-BOM.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast('Exported complete 4COVR Bill of Materials (CSV)', 'download');
  };

  return (
    <div className="w-full pt-4 pb-28 bg-surface-stage min-h-screen">
      <div className="w-full max-w-[1720px] mx-auto px-6 lg:px-12 py-4">
        
        {/* STEP HEADER: SENSE OF COMPLETION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-border-hairline/80">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-mono text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
                STEP 05 / 05 — REVIEW & QUOTE | ARCHITECTURAL SYSTEM SUMMARY
              </span>
              
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-sans text-[11px] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Your system is ready</span>
              </span>

              <span className="font-mono text-[11px] text-text-muted">
                CONFIG ID: 4C-2025-ARCH8-X9
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-light text-text-primary tracking-tight mt-1">
              Your system. <span className="text-brand-gold font-normal">Your way.</span>
            </h1>

            <p className="text-text-muted text-[14px] max-w-3xl leading-relaxed">
              Every detail, thoughtfully put together. Review your customized security array, intelligent compute core, network fabric, and auto-provisioned installation accessories.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap flex-shrink-0">
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-primary text-[13px] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-text-muted">file_download</span>
              <span>Export BOM (CSV)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-[#e09115] hover:brightness-110 text-white font-semibold text-[13px] flex items-center gap-2 shadow-[0_0_20px_rgba(245,166,35,0.35)] transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[17px]">request_quote</span>
              <span>Generate My Quote</span>
            </button>
          </div>
        </div>

        {/* MAIN 2-COLUMN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: STUDIO PRODUCT HERO DISPLAY (58% / col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Main Interactive Viewport Container */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-surface-panel border border-border-hairline shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col">
              
              {/* Perspective Toggles Bar */}
              <div className="px-5 py-3 bg-surface-container-lowest/90 border-b border-border-hairline flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    View Perspective:
                  </span>
                  
                  <div className="inline-flex p-1 rounded-lg bg-surface-stage border border-border-hairline gap-1">
                    {[
                      { id: 'complete', label: 'Complete System', icon: 'token' },
                      { id: 'cameras', label: 'Camera Collection', icon: 'videocam' },
                      { id: 'network', label: 'Recording & Network', icon: 'dns' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActivePerspective(tab.id as any)}
                        className={`px-3 py-1 text-[12px] rounded font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          activePerspective === tab.id
                            ? 'bg-surface-container-high text-brand-gold shadow-sm font-semibold'
                            : 'text-text-muted hover:text-text-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Verified Compatible</span>
                  </span>
                </div>
              </div>

              {/* Product Canvas & Hotspots */}
              <div className="relative w-full aspect-[16/9] bg-gradient-to-b from-surface-container-lowest via-surface-container-low to-surface-stage flex items-center justify-center overflow-hidden group">
                <img
                  src={getPerspectiveImage()}
                  alt="4COVR Complete Architecture Ecosystem"
                  style={{ transform: `scale(${zoomScale})` }}
                  className="w-full h-full object-cover transition-all duration-500 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-surface-stage/60 via-transparent to-surface-stage/20 pointer-events-none" />

                {/* Floating Hot Tag 1: Architectural Ecosystem */}
                <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-panel/85 backdrop-blur-md border border-border-hairline shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                  <span className="font-mono text-[11px] text-text-primary tracking-wider uppercase font-semibold">
                    4COVR Architectural Ecosystem
                  </span>
                </div>

                {/* Floating Hot Tag 2: Compute Core (positioned over NVR) */}
                <div className="absolute bottom-16 right-8 hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-stage/90 backdrop-blur-md border border-brand-gold/40 text-[11px] text-text-primary shadow-2xl">
                  <span className="material-symbols-outlined text-brand-gold text-[14px]">memory</span>
                  <span>{nvr.channels}-Channel Quantum Core & {pricing.totalStorageTB}TB HDD</span>
                </div>

                {/* Floating Hot Tag 3: AI Sensors */}
                <div className="absolute top-1/3 left-8 hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-stage/90 backdrop-blur-md border border-border-hairline text-[11px] text-text-primary shadow-2xl">
                  <span className="material-symbols-outlined text-emerald-400 text-[14px]">sensors</span>
                  <span>{totalCameras}× AI Sensor Mix · 4K Precision Glass</span>
                </div>

                {/* Canvas Controls */}
                <div className="absolute bottom-4 left-5 flex items-center gap-1.5 bg-surface-stage/80 backdrop-blur-md border border-border-hairline px-2 py-1.5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setZoomScale(Math.min(1.4, zoomScale + 0.1))}
                    className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface-container transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomScale(Math.max(0.9, zoomScale - 0.1))}
                    className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface-container transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <span className="material-symbols-outlined text-[16px]">zoom_out</span>
                  </button>
                  <div className="w-px h-3.5 bg-border-hairline mx-0.5" />
                  <button
                    type="button"
                    onClick={() => setZoomScale(1)}
                    className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface-container transition-colors cursor-pointer"
                    title="Reset Zoom"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Key Telemetry Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 bg-surface-container-lowest border-t border-border-hairline divide-y md:divide-y-0 md:divide-x divide-border-hairline p-4 text-center">
                <div className="flex flex-col items-center py-1">
                  <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                    INTELLIGENT SENSORS
                  </span>
                  <span className="font-mono text-base font-semibold text-text-primary mt-0.5">
                    {totalCameras} Units ({config.allocatedCameras.length} Models)
                  </span>
                  <span className="text-[11px] text-emerald-400 font-sans mt-0.5">
                    Ultra 4K & Stitched DualArc
                  </span>
                </div>

                <div className="flex flex-col items-center py-1">
                  <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                    COMPUTE & ARCHIVE
                  </span>
                  <span className="font-mono text-base font-semibold text-brand-gold mt-0.5">
                    {nvr.channels}CH NVR + {pricing.totalStorageTB}TB
                  </span>
                  <span className="text-[11px] text-text-muted font-sans mt-0.5">
                    Surveillance Grade 24/7
                  </span>
                </div>

                <div className="flex flex-col items-center py-1">
                  <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                    POWER & FABRIC
                  </span>
                  <span className="font-mono text-base font-semibold text-text-primary mt-0.5">
                    {network.ports}-Port {network.powerBudgetW}W PoE
                  </span>
                  <span className="text-[11px] text-text-muted font-sans mt-0.5">
                    &lt;1ms Wire-Speed Backplane
                  </span>
                </div>

                <div className="flex flex-col items-center py-1">
                  <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                    ACCESSORIES
                  </span>
                  <span className="font-mono text-base font-semibold text-emerald-400 mt-0.5">
                    Auto-Provisioned
                  </span>
                  <span className="text-[11px] text-text-muted font-sans mt-0.5">
                    Cables, Boxes & Mounts
                  </span>
                </div>
              </div>
            </div>

            {/* AUTOMATIC ACCESSORIES MODULE (Accessories, Taken Care Of) */}
            <div className="bg-surface-panel rounded-2xl p-6 border border-border-hairline shadow-xl flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-hairline">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-gold text-[20px]">inventory_2</span>
                    <h2 className="text-[18px] font-medium text-text-primary tracking-tight">
                      Accessories, taken care of.
                    </h2>
                  </div>
                  <p className="text-[13px] text-text-muted mt-0.5">
                    We've put together the precision hardware that completes your deployment.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAccDetails(!showAccDetails)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-primary text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{showAccDetails ? 'Hide Details' : 'View Details & Specs'}</span>
                    <span
                      className={`material-symbols-outlined text-[16px] transition-transform ${
                        showAccDetails ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAdjustDrawerOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/40 text-brand-gold text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">tune</span>
                    <span>Adjust Accessories</span>
                  </button>
                </div>
              </div>

              {/* Provisioned Items Card Deck */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Item 1: Mounting Brackets */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-hairline/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-text-muted flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">build</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-medium text-text-primary truncate">Architectural Brackets</span>
                      <span className="text-[11px] text-text-muted">{totalCameras}× Precision metal mounts</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Included
                    </span>
                    <span className="font-mono text-[12px] text-text-muted mt-0.5">$0</span>
                  </div>
                </div>

                {/* Item 2: Cat6 Braided Cables */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-hairline/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-text-muted flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">cable</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-medium text-text-primary truncate">Braided Cat6 Cables</span>
                      <span className="text-[11px] text-text-muted">
                        {totalCameras}× {config.accessories.cableLength} Weatherproof Black
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {config.accessories.cablePrice > 0 ? `+$${config.accessories.cablePrice}` : 'Included'}
                    </span>
                    <span className="font-mono text-[12px] text-text-muted mt-0.5">
                      ${config.accessories.cablePrice}
                    </span>
                  </div>
                </div>

                {/* Item 3: Outdoor Junction Boxes */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-hairline/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-brand-gold flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">crop_square</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-medium text-text-primary truncate">Outdoor Junction Boxes</span>
                      <span className="text-[11px] text-text-muted">
                        {config.accessories.junctionBoxesCount}× Waterproof LY-DP54 Deep Box
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                      Auto-Added
                    </span>
                    <span className="font-mono text-[12px] text-text-primary font-medium mt-0.5">
                      {formatCurrency(config.accessories.junctionBoxesCount * config.accessories.junctionBoxUnitPrice)}
                    </span>
                  </div>
                </div>

                {/* Item 4: Screws & Mounting Hardware Kit */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-hairline/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-text-muted flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-medium text-text-primary truncate">Mounting Hardware Kit</span>
                      <span className="text-[11px] text-text-muted">Weather-tight gaskets & fasteners</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Included
                    </span>
                    <span className="font-mono text-[12px] text-text-muted mt-0.5">$0</span>
                  </div>
                </div>
              </div>

              {/* Expandable Detailed Specifications Accordion */}
              {showAccDetails && (
                <div className="flex flex-col gap-2 pt-2 border-t border-border-hairline text-[12px]">
                  <div className="p-3.5 rounded-xl bg-surface-container-lowest/60 text-text-muted leading-relaxed font-sans flex flex-col gap-1.5 border border-border-hairline">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-text-primary font-medium">BOM Auto-Allocation Logic</span>
                      <span className="text-emerald-400 text-[11px] font-mono">{totalCameras} PoE runs accounted for</span>
                    </div>
                    <p>
                      Standard architectural package auto-matches 1× heavy-gauge outdoor-rated Cat6 cable per camera sensor. Junction boxes are provisioned for all outdoor perimeter units ({config.accessories.junctionBoxesCount} exterior zones) to prevent exposed wiring and water ingress.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* COMPLETE BILL OF MATERIALS (BOM) COLLAPSIBLE SECTION */}
            <div className="bg-surface-panel rounded-2xl border border-border-hairline shadow-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowBomTable(!showBomTable)}
                className="w-full p-5 flex items-center justify-between hover:bg-surface-container-low transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-brand-gold">
                    <span className="material-symbols-outlined text-[18px]">table_view</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-medium text-text-primary">Complete Bill of Materials (BOM)</span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-container text-text-muted">
                        {config.allocatedCameras.length + 5} Line Items
                      </span>
                    </div>
                    <span className="text-[12px] text-text-muted">
                      Full itemized breakdown with SKUs, technical specs, and unit rates.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-text-muted">
                  <span className="text-[12px] font-mono">{showBomTable ? 'Hide Table' : 'Expand View'}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                      showBomTable ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </div>
              </button>

              {/* Collapsed BOM Table Content */}
              {showBomTable && (
                <div className="border-t border-border-hairline p-5 bg-surface-container-lowest/50">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[12px]">
                      <thead>
                        <tr className="border-b border-border-hairline text-text-muted font-mono uppercase text-[10px] tracking-wider">
                          <th className="py-2.5 px-3">Product & SKU</th>
                          <th className="py-2.5 px-3">Specification</th>
                          <th className="py-2.5 px-3 text-center">Qty</th>
                          <th className="py-2.5 px-3 text-right">Unit Price</th>
                          <th className="py-2.5 px-3 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-hairline/60 font-sans">
                        {/* Cameras */}
                        {config.allocatedCameras.map((cam) => (
                          <tr key={cam.id}>
                            <td className="py-3 px-3 font-medium text-text-primary">
                              {cam.name}
                              <br />
                              <span className="text-[10px] font-mono text-text-muted">
                                4C-CAM-{cam.id.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-text-muted">
                              AI Precision Optical Sensor · IP67 Weatherproof
                            </td>
                            <td className="py-3 px-3 text-center font-mono">{cam.qty}</td>
                            <td className="py-3 px-3 text-right font-mono">{formatCurrency(cam.price)}</td>
                            <td className="py-3 px-3 text-right font-mono text-text-primary">
                              {formatCurrency(cam.price * cam.qty)}
                            </td>
                          </tr>
                        ))}

                        {/* NVR */}
                        <tr>
                          <td className="py-3 px-3 font-medium text-text-primary">
                            {nvr.name}
                            <br />
                            <span className="text-[10px] font-mono text-text-muted">
                              4C-NVR-{nvr.id.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-text-muted">{nvr.features}</td>
                          <td className="py-3 px-3 text-center font-mono">1</td>
                          <td className="py-3 px-3 text-right font-mono">{formatCurrency(nvr.price)}</td>
                          <td className="py-3 px-3 text-right font-mono text-text-primary">
                            {formatCurrency(nvr.price)}
                          </td>
                        </tr>

                        {/* HDD */}
                        <tr>
                          <td className="py-3 px-3 font-medium text-text-primary">
                            {hdd.name}
                            <br />
                            <span className="text-[10px] font-mono text-text-muted">
                              4C-HDD-{hdd.capacityTB}TB-PRO
                            </span>
                          </td>
                          <td className="py-3 px-3 text-text-muted">
                            Enterprise Pro 24/7 CMR · 256MB Cache · 3yr SLA
                          </td>
                          <td className="py-3 px-3 text-center font-mono">{config.driveQty}</td>
                          <td className="py-3 px-3 text-right font-mono">{formatCurrency(hdd.price)}</td>
                          <td className="py-3 px-3 text-right font-mono text-text-primary">
                            {formatCurrency(hdd.price * config.driveQty)}
                          </td>
                        </tr>

                        {/* Network */}
                        <tr>
                          <td className="py-3 px-3 font-medium text-text-primary">
                            {network.name}
                            <br />
                            <span className="text-[10px] font-mono text-text-muted">
                              4C-POE-{network.id.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-text-muted">{network.description}</td>
                          <td className="py-3 px-3 text-center font-mono">1</td>
                          <td className="py-3 px-3 text-right font-mono">
                            {network.price === 0 ? 'Std ($0)' : formatCurrency(network.price)}
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-text-primary">
                            {formatCurrency(network.price)}
                          </td>
                        </tr>

                        {/* Cables */}
                        <tr>
                          <td className="py-3 px-3 font-medium text-text-primary">
                            Braided Cat6 Cables ({config.accessories.cableLength})
                            <br />
                            <span className="text-[10px] font-mono text-text-muted">4C-CAB-RUN</span>
                          </td>
                          <td className="py-3 px-3 text-text-muted">
                            High-Flex Shielded Weatherproof RJ-45 Pre-Term
                          </td>
                          <td className="py-3 px-3 text-center font-mono">{totalCameras}</td>
                          <td className="py-3 px-3 text-right font-mono text-emerald-400">
                            {config.accessories.cablePrice > 0 ? `+$${config.accessories.cablePrice}` : 'Included'}
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-emerald-400">
                            ${config.accessories.cablePrice}.00
                          </td>
                        </tr>

                        {/* Junction Boxes */}
                        {config.accessories.junctionBoxesCount > 0 && (
                          <tr>
                            <td className="py-3 px-3 font-medium text-text-primary">
                              Waterproof Junction Box
                              <br />
                              <span className="text-[10px] font-mono text-text-muted">4C-JBOX-DP54</span>
                            </td>
                            <td className="py-3 px-3 text-text-muted">
                              IP66 Aluminum Seal Enclosure with conduit knockout
                            </td>
                            <td className="py-3 px-3 text-center font-mono">
                              {config.accessories.junctionBoxesCount}
                            </td>
                            <td className="py-3 px-3 text-right font-mono">$19.00</td>
                            <td className="py-3 px-3 text-right font-mono text-text-primary">
                              {formatCurrency(
                                config.accessories.junctionBoxesCount * config.accessories.junctionBoxUnitPrice
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-border-hairline text-text-primary font-medium">
                          <td className="py-3.5 px-3 text-right font-mono uppercase text-text-muted" colSpan={4}>
                            Total Hardware Value
                          </td>
                          <td className="py-3.5 px-3 text-right font-mono text-brand-gold font-bold text-sm">
                            {formatCurrency(pricing.systemTotal)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: CONFIGURATION SUMMARY & CHECKOUT (42% / col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Configuration Overview Card Group */}
            <div className="bg-surface-panel rounded-2xl p-6 border border-border-hairline shadow-2xl flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-border-hairline">
                <div className="flex flex-col">
                  <h2 className="text-lg font-medium text-text-primary">Your Configuration</h2>
                  <p className="text-[12px] text-text-muted">A complete overview of your personalized security system.</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-mono text-[11px] font-semibold">
                  {nvr.channels} CHANNELS
                </span>
              </div>

              {/* Card Group A: Camera System */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-border-hairline flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-gold text-[18px]">videocam</span>
                    <span className="text-[14px] font-semibold text-text-primary">Camera Array</span>
                    <span className="font-mono text-[11px] text-text-muted">({totalCameras} Cameras)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onGoToStep(2)}
                    className="text-[11px] font-mono text-brand-gold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Edit Cameras</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2 pt-1 font-sans text-[12px]">
                  {config.allocatedCameras.map((cam) => (
                    <div
                      key={cam.id}
                      className="flex items-start justify-between py-1 border-b border-border-hairline/40 last:border-b-0"
                    >
                      <div className="flex flex-col">
                        <span className="text-text-primary font-medium">
                          {cam.qty}× {cam.name}
                        </span>
                        <span className="text-text-muted text-[11px]">
                          {cam.series.toUpperCase()} Series · F1.0 Precision Glass
                        </span>
                      </div>
                      <span className="font-mono text-text-primary font-medium">
                        {formatCurrency(cam.price * cam.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Group B: Recording & Storage System */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-border-hairline flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-gold text-[18px]">hard_drive</span>
                    <span className="text-[14px] font-semibold text-text-primary">Compute & Storage</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onGoToStep(3)}
                    className="text-[11px] font-mono text-brand-gold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Edit Storage</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2 pt-1 font-sans text-[12px]">
                  <div className="flex items-start justify-between py-1 border-b border-border-hairline/40">
                    <div className="flex flex-col">
                      <span className="text-text-primary font-medium">{nvr.name}</span>
                      <span className="text-text-muted text-[11px]">{nvr.features}</span>
                    </div>
                    <span className="font-mono text-text-primary font-medium">
                      {formatCurrency(nvr.price)}
                    </span>
                  </div>

                  <div className="flex items-start justify-between py-1">
                    <div className="flex flex-col">
                      <span className="text-text-primary font-medium">
                        {config.driveQty}× {hdd.name} ({pricing.totalStorageTB}TB Total)
                      </span>
                      <span className="text-text-muted text-[11px]">
                        Surveillance Grade CMR · 24/7 Continuous
                      </span>
                    </div>
                    <span className="font-mono text-text-primary font-medium">
                      {formatCurrency(hdd.price * config.driveQty)}
                    </span>
                  </div>
                </div>

                {/* Storage Spec Pill */}
                <div className="p-2.5 rounded-lg bg-surface-container border border-border-hairline/80 flex items-center gap-2 text-[11px]">
                  <span className="material-symbols-outlined text-brand-gold text-[16px] flex-shrink-0">timelapse</span>
                  <span className="text-text-muted">
                    {config.recordingMode === 'continuous' ? 'Continuous 24/7' : 'Smart Motion'} · {config.codec.toUpperCase()} Smart AI · Est. Retention:{' '}
                    <strong className="text-brand-gold font-mono font-normal">
                      {pricing.estimatedRetentionDays} Days
                    </strong>{' '}
                    ({pricing.retentionPercent}% Target Met)
                  </span>
                </div>
              </div>

              {/* Card Group C: PoE & Network Fabric */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-border-hairline flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-gold text-[18px]">lan</span>
                    <span className="text-[14px] font-semibold text-text-primary">PoE & Network Fabric</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onGoToStep(4)}
                    className="text-[11px] font-mono text-brand-gold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Edit Network</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2 pt-1 font-sans text-[12px]">
                  <div className="flex items-start justify-between py-1">
                    <div className="flex flex-col">
                      <span className="text-text-primary font-medium">{network.name}</span>
                      <span className="text-text-muted text-[11px]">{network.description}</span>
                    </div>
                    <span className="font-mono text-text-primary font-medium">
                      {network.price === 0 ? '$0 (Std)' : `+${formatCurrency(network.price)}`}
                    </span>
                  </div>
                </div>

                {/* Power Load Indicator */}
                <div className="p-2.5 rounded-lg bg-surface-container border border-border-hairline/80 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-text-muted">Power Budget Load</span>
                    <span className="text-emerald-400 font-medium">
                      {pricing.totalCameraWattage}W / {pricing.networkPowerBudgetW}W Budget ({pricing.headroomWattage}W Headroom)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-stage rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-brand-gold rounded-full"
                      style={{ width: `${pricing.powerLoadPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Financial Summary Breakdown Card */}
              <div className="p-5 rounded-xl bg-surface-container-lowest border border-border-hairline flex flex-col gap-2.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Investment Breakdown
                </span>

                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-text-muted">Camera System Subtotal</span>
                  <span className="font-mono text-text-primary">{formatCurrency(pricing.cameraSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-text-muted">NVR & Storage Subtotal</span>
                  <span className="font-mono text-text-primary">{formatCurrency(pricing.step3Subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-text-muted">PoE & Network Equipment</span>
                  <span className="font-mono text-text-primary">{formatCurrency(pricing.poeSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-text-muted">Auto-Configured Accessories</span>
                  <span className="font-mono text-text-primary">{formatCurrency(pricing.accessoriesSubtotal)}</span>
                </div>

                <div className="pt-3 mt-1 border-t border-border-hairline flex items-baseline justify-between">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-text-primary">Hardware System Total</span>
                    <span className="text-[11px] text-emerald-400 font-sans">Includes 3-Year Advanced Warranty</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-2xl lg:text-3xl font-bold text-brand-gold tracking-tight">
                      {formatCurrency(pricing.systemTotal)}
                    </span>
                    <span className="font-mono text-xs text-text-muted">USD</span>
                  </div>
                </div>

                {/* Lease alternative banner */}
                <div className="mt-2 p-2.5 rounded-lg bg-surface-container-high/60 border border-brand-gold/20 flex items-center gap-2 text-[11px]">
                  <span className="material-symbols-outlined text-brand-gold text-[16px] flex-shrink-0">payments</span>
                  <span className="text-text-muted">
                    or <strong className="text-text-primary font-medium">4COVR Enterprise Lease</strong> from{' '}
                    <strong className="text-brand-gold font-mono">${pricing.monthlyLease}/mo</strong> with SLA on-site warranty.
                  </span>
                </div>
              </div>

              {/* Primary CTAs & Interactive Buttons */}
              <div className="flex flex-col gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-gold to-[#d98b16] hover:brightness-110 text-white font-sans font-semibold text-base shadow-[0_0_24px_rgba(245,166,35,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">request_quote</span>
                  <span>Generate My Quote</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onSaveConfig}
                    className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-primary text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-brand-gold">bookmark_add</span>
                    <span>Save Configuration</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-hairline text-text-primary text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-text-muted">download</span>
                    <span>Export BOM (CSV)</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-text-muted">
                  <button
                    type="button"
                    onClick={() => onGoToStep(4)}
                    className="hover:text-text-primary flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">arrow_back</span>
                    <span>Back to PoE Setup</span>
                  </button>
                  <button
                    type="button"
                    onClick={onResetAll}
                    className="hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges & Guarantee Panel */}
            <div className="p-4 rounded-xl bg-surface-panel border border-border-hairline flex flex-col gap-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted font-semibold">
                4COVR Enterprise Assurance
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-gold text-[15px]">verified_user</span>
                  <span>3-Year Advance SLA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-gold text-[15px]">local_shipping</span>
                  <span>Free Expedited Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-gold text-[15px]">support</span>
                  <span>Pre-Deployment Staging</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-gold text-[15px]">security</span>
                  <span>NDAA Compliant Silicon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adjust Accessories Drawer */}
      <AdjustAccessoriesDrawer
        isOpen={isAdjustDrawerOpen}
        accessories={config.accessories}
        onClose={() => setIsAdjustDrawerOpen(false)}
        onApply={(updatedAcc) => {
          onUpdateAccessories(updatedAcc);
          onShowToast('Accessories & hardware BOM updated');
        }}
      />

      {/* Official Quote Sheet Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        config={config}
        pricing={pricing}
        onClose={() => setIsQuoteModalOpen(false)}
        onSendToEngineering={() => {
          setIsQuoteModalOpen(false);
          onShowToast('Official quotation dispatched to 4COVR engineering team');
        }}
      />
    </div>
  );
};
