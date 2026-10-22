/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ConfigStep, SystemConfiguration, SystemPackage, AllocatedCameraItem, AccessoriesState } from './types/configurator';
import { INITIAL_CONFIGURATION, SYSTEM_PACKAGES } from './data/configuratorData';
import { calculateSystemMetrics } from './utils/calculations';
import { Header } from './components/Header';
import { FooterBar } from './components/FooterBar';
import { Step1SystemSize } from './components/Step1SystemSize';
import { Step2CameraModels } from './components/Step2CameraModels';
import { Step3NvrStorage } from './components/Step3NvrStorage';
import { Step4PoeNetwork } from './components/Step4PoeNetwork';
import { Step5ReviewQuote } from './components/Step5ReviewQuote';
import { AdvisorModal } from './components/AdvisorModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  const [currentStep, setCurrentStep] = useState<ConfigStep>(1);
  const [config, setConfig] = useState<SystemConfiguration>(() => {
    try {
      const saved = localStorage.getItem('4COVR_SAVED_CONFIG');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.config) {
          return parsed.config;
        }
      }
    } catch {
      // Ignore parse error
    }
    return INITIAL_CONFIGURATION;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem('4COVR_THEME');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    } catch {
      // Ignore
    }
    return 'light'; // Default to light background as requested
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    try {
      localStorage.setItem('4COVR_THEME', theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    showToast(`Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} Mode`, newTheme === 'light' ? 'light_mode' : 'dark_mode');
  };

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);

  // Toast utility
  const showToast = (text: string, icon = 'check_circle', type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, text, icon, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Central system metrics
  const pricing = calculateSystemMetrics(config);

  // Package details
  const activePackage = SYSTEM_PACKAGES.find((p) => p.id === config.systemPackageId) || SYSTEM_PACKAGES[1];
  const targetCameras = config.customCameraCount || activePackage.cameras;
  const nvrChannels = config.customCameraCount
    ? config.customCameraCount > 32
      ? 64
      : config.customCameraCount > 16
      ? 32
      : config.customCameraCount > 8
      ? 16
      : 8
    : activePackage.nvrCh;

  // Step 1 Actions
  const handleSelectPackage = (pkg: SystemPackage) => {
    // If target camera count changes, adjust allocation if needed
    let newAlloc = [...config.allocatedCameras];
    if (pkg.cameras === 4) {
      newAlloc = [
        {
          id: 'arm-8-bul',
          series: 'armor',
          name: 'Armor 8MP 4K Bullet',
          price: 89,
          qty: 4,
          powerWattage: 9.5,
          isOutdoor: true
        }
      ];
    } else if (pkg.cameras === 8) {
      newAlloc = INITIAL_CONFIGURATION.allocatedCameras;
    } else if (pkg.cameras === 16) {
      newAlloc = [
        {
          id: 'arm-8-bul',
          series: 'armor',
          name: 'Armor 8MP 4K Bullet',
          price: 89,
          qty: 8,
          powerWattage: 9.5,
          isOutdoor: true
        },
        {
          id: 'bin-8-tur',
          series: 'binsight',
          name: 'BinSight 8MP Turret',
          price: 149,
          qty: 4,
          powerWattage: 14.0,
          isOutdoor: false
        },
        {
          id: 'dua-8-bul',
          series: 'dualarc',
          name: 'DualArc 8MP Dual-Lens Bullet',
          price: 229,
          qty: 4,
          powerWattage: 16.0,
          isOutdoor: true
        }
      ];
    }

    // Auto-match recommended NVR and accessories
    const recommendedNvrId = pkg.cameras > 32 ? '64ch' : pkg.cameras > 16 ? '32ch' : pkg.cameras > 8 ? '16ch' : '8ch';
    const recommendedNetworkId = pkg.cameras > 16 ? 'poe-24p' : pkg.cameras > 8 ? 'poe-16p' : 'poe-8p';

    setConfig((prev) => ({
      ...prev,
      systemPackageId: pkg.id,
      customCameraCount: null,
      totalCameraTarget: pkg.cameras,
      allocatedCameras: newAlloc,
      selectedNvrId: recommendedNvrId,
      selectedNetworkId: recommendedNetworkId,
      accessories: {
        ...prev.accessories,
        junctionBoxesCount: Math.round(pkg.cameras * 0.5)
      }
    }));
  };

  const handleCustomCameraChange = (count: number) => {
    const recommendedNvrId = count > 32 ? '64ch' : count > 16 ? '32ch' : count > 8 ? '16ch' : '8ch';
    const recommendedNetworkId = count > 16 ? 'poe-24p' : count > 8 ? 'poe-16p' : 'poe-8p';

    setConfig((prev) => ({
      ...prev,
      customCameraCount: count,
      totalCameraTarget: count,
      selectedNvrId: recommendedNvrId,
      selectedNetworkId: recommendedNetworkId,
      accessories: {
        ...prev.accessories,
        junctionBoxesCount: Math.max(1, Math.round(count * 0.5))
      }
    }));
  };

  // Step 2 Actions
  const handleUpdateAllocatedCameras = (items: AllocatedCameraItem[]) => {
    const outdoorCount = items.reduce((acc, item) => acc + (item.isOutdoor ? item.qty : 0), 0);

    setConfig((prev) => ({
      ...prev,
      allocatedCameras: items,
      accessories: {
        ...prev.accessories,
        junctionBoxesCount: Math.max(2, outdoorCount)
      }
    }));
  };

  // Step 3 Actions
  const handleSelectNvr = (nvrId: string) => {
    setConfig((prev) => ({
      ...prev,
      selectedNvrId: nvrId
    }));
  };

  const handleSelectHdd = (hddId: string) => {
    setConfig((prev) => ({
      ...prev,
      selectedHddId: hddId
    }));
  };

  const handleUpdateDriveQty = (qty: number) => {
    setConfig((prev) => ({
      ...prev,
      driveQty: qty
    }));
  };

  const handleUpdateRecordingMode = (mode: 'continuous' | 'motion') => {
    setConfig((prev) => ({
      ...prev,
      recordingMode: mode
    }));
  };

  const handleUpdateCodec = (codec: 'h265' | 'h264') => {
    setConfig((prev) => ({
      ...prev,
      codec
    }));
  };

  const handleUpdateTargetRetention = (days: number) => {
    setConfig((prev) => ({
      ...prev,
      targetRetentionDays: days
    }));
  };

  // Step 4 Actions
  const handleSelectNetwork = (networkId: string) => {
    setConfig((prev) => ({
      ...prev,
      selectedNetworkId: networkId
    }));
  };

  // Step 5 Actions
  const handleUpdateAccessories = (acc: AccessoriesState) => {
    setConfig((prev) => ({
      ...prev,
      accessories: acc
    }));
  };

  // Save to localStorage
  const handleSaveConfig = () => {
    try {
      localStorage.setItem(
        '4COVR_SAVED_CONFIG',
        JSON.stringify({
          configId: '4C-2025-ARCH8-X9',
          config,
          systemTotal: pricing.systemTotal,
          timestamp: new Date().toISOString()
        })
      );
      showToast('Configuration #4C-2025-ARCH8-X9 saved to browser storage', 'bookmark');
    } catch {
      showToast('Configuration saved successfully', 'bookmark');
    }
  };

  // Reset / Start Over
  const handleResetAll = () => {
    if (window.confirm('Reset security architecture back to default template?')) {
      setConfig(INITIAL_CONFIGURATION);
      setCurrentStep(1);
      showToast('Configuration reset to initial template', 'restart_alt');
    }
  };

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as ConfigStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as ConfigStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-surface-stage text-text-primary flex flex-col font-sans selection:bg-brand-gold selection:text-surface-stage">
      {/* Top Fixed Header with 5-Step Progress */}
      <Header
        currentStep={currentStep}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectStep={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onSaveConfig={handleSaveConfig}
      />

      {/* Main Viewport Workspace */}
      <main className="flex-1 w-full pt-16 pb-20">
        {currentStep === 1 && (
          <Step1SystemSize
            selectedPackageId={config.systemPackageId}
            customCameraCount={config.customCameraCount}
            onSelectPackage={handleSelectPackage}
            onCustomCameraChange={handleCustomCameraChange}
            onNextStep={handleNextStep}
          />
        )}

        {currentStep === 2 && (
          <Step2CameraModels
            targetQuota={targetCameras}
            allocatedCameras={config.allocatedCameras}
            systemPackageName={activePackage.name}
            onUpdateAllocatedCameras={handleUpdateAllocatedCameras}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
            onShowToast={showToast}
          />
        )}

        {currentStep === 3 && (
          <Step3NvrStorage
            selectedNvrId={config.selectedNvrId}
            selectedHddId={config.selectedHddId}
            driveQty={config.driveQty}
            recordingMode={config.recordingMode}
            codec={config.codec}
            targetRetentionDays={config.targetRetentionDays}
            pricing={pricing}
            allocatedCamerasCount={pricing.allocatedCameraQty || targetCameras}
            onSelectNvr={handleSelectNvr}
            onSelectHdd={handleSelectHdd}
            onUpdateDriveQty={handleUpdateDriveQty}
            onUpdateRecordingMode={handleUpdateRecordingMode}
            onUpdateCodec={handleUpdateCodec}
            onUpdateTargetRetention={handleUpdateTargetRetention}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
          />
        )}

        {currentStep === 4 && (
          <Step4PoeNetwork
            selectedNetworkId={config.selectedNetworkId}
            pricing={pricing}
            allocatedCameras={config.allocatedCameras}
            targetCamerasCount={targetCameras}
            onSelectNetwork={handleSelectNetwork}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
            onShowToast={showToast}
          />
        )}

        {currentStep === 5 && (
          <Step5ReviewQuote
            config={config}
            pricing={pricing}
            onUpdateAccessories={handleUpdateAccessories}
            onGoToStep={(step) => {
              setCurrentStep(step);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onResetAll={handleResetAll}
            onSaveConfig={handleSaveConfig}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Persistent Sticky Bottom Bar on Steps 1 to 4 */}
      {currentStep !== 5 && (
        <FooterBar
          currentStep={currentStep}
          pricing={pricing}
          targetCameras={targetCameras}
          nvrCh={nvrChannels}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          onSaveDraft={handleSaveConfig}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
        />
      )}

      {/* Systems Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onSubmitConsultation={(details) => {
          showToast(`Architecture consultation requested for ${details.name}. An advisor will reach out shortly.`, 'support_agent');
        }}
      />

      {/* Toast System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
