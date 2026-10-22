import { SystemConfiguration } from '../types/configurator';
import { SYSTEM_PACKAGES, NVR_OPTIONS, HDD_OPTIONS, NETWORK_OPTIONS } from '../data/configuratorData';

export interface CalculatedPricing {
  step1BasePrice: number;
  cameraSubtotal: number;
  nvrSubtotal: number;
  storageSubtotal: number;
  step3Subtotal: number; // NVR + HDD
  poeSubtotal: number;
  accessoriesSubtotal: number;
  systemTotal: number;
  monthlyLease: number;
  
  // Storage Metrics
  totalStorageTB: number;
  estimatedRetentionDays: number;
  retentionPercent: number;
  
  // Power Metrics
  allocatedCameraQty: number;
  totalCameraWattage: number;
  networkPowerBudgetW: number;
  powerLoadPercent: number;
  headroomWattage: number;
  
  // Outdoor camera count
  outdoorCameraCount: number;
}

export function calculateSystemMetrics(config: SystemConfiguration): CalculatedPricing {
  // Step 1 Base Package
  let step1BasePrice = 2690;
  if (config.customCameraCount) {
    const camCount = config.customCameraCount;
    let nvrBase = 490;
    if (camCount > 32) nvrBase = 1800;
    else if (camCount > 16) nvrBase = 1100;
    else if (camCount > 8) nvrBase = 750;
    step1BasePrice = nvrBase + (camCount * 247);
  } else {
    const pkg = SYSTEM_PACKAGES.find(p => p.id === config.systemPackageId);
    if (pkg) step1BasePrice = pkg.price;
  }

  // Camera Subtotal (Step 2)
  const cameraSubtotal = config.allocatedCameras.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const allocatedCameraQty = config.allocatedCameras.reduce((acc, item) => acc + item.qty, 0);

  // Power usage from cameras
  const totalCameraWattage = Math.round(
    config.allocatedCameras.reduce((acc, item) => acc + ((item.powerWattage || 10) * item.qty), 0)
  );

  const outdoorCameraCount = config.allocatedCameras.reduce((acc, item) => {
    return acc + (item.isOutdoor ? item.qty : 0);
  }, 0);

  // Step 3 Subtotals (NVR + Storage)
  const nvr = NVR_OPTIONS.find(n => n.id === config.selectedNvrId) || NVR_OPTIONS[0];
  const hdd = HDD_OPTIONS.find(h => h.id === config.selectedHddId) || HDD_OPTIONS[1];
  
  const nvrSubtotal = nvr.price;
  const storageSubtotal = hdd.price * config.driveQty;
  const step3Subtotal = nvrSubtotal + storageSubtotal;

  // Storage Retention calculations
  const totalStorageTB = hdd.capacityTB * config.driveQty;
  // Baseline daily usage per camera: ~0.04 TB/day for 4K 30fps H.265
  let dailyUsagePerCam = 0.04;
  if (config.codec === 'h264') dailyUsagePerCam *= 1.6;
  if (config.recordingMode === 'motion') dailyUsagePerCam *= 0.35;
  
  const effectiveCams = Math.max(1, allocatedCameraQty || config.totalCameraTarget);
  const totalDailyUsageTB = effectiveCams * dailyUsagePerCam;
  const estimatedRetentionDays = Math.max(1, Math.round(totalStorageTB / totalDailyUsageTB));
  const retentionPercent = Math.min(100, Math.round((estimatedRetentionDays / config.targetRetentionDays) * 100));

  // Step 4 Subtotal (PoE Switch)
  const network = NETWORK_OPTIONS.find(net => net.id === config.selectedNetworkId) || NETWORK_OPTIONS[2];
  const poeSubtotal = network.price;
  const networkPowerBudgetW = network.powerBudgetW;
  const powerLoadPercent = Math.min(100, Math.round((totalCameraWattage / networkPowerBudgetW) * 100));
  const headroomWattage = Math.max(0, networkPowerBudgetW - totalCameraWattage);

  // Step 5 Accessories Subtotal
  const jboxCost = config.accessories.junctionBoxesCount * config.accessories.junctionBoxUnitPrice;
  const conduitCost = config.accessories.conduitAdaptersEnabled ? config.accessories.conduitPrice : 0;
  const cableSurcharge = config.accessories.cableLength === '150ft' ? 40 : 0;
  const accessoriesSubtotal = jboxCost + conduitCost + cableSurcharge;

  // System total: In Step 5 review, it itemizes:
  // Cameras + NVR + Storage + PoE Network + Accessories
  const systemTotal = cameraSubtotal + step3Subtotal + poeSubtotal + accessoriesSubtotal;
  
  // Monthly Lease from approx $30-$35 / $1,000 ratio
  const monthlyLease = Math.max(29, Math.round(systemTotal / 31));

  return {
    step1BasePrice,
    cameraSubtotal,
    nvrSubtotal,
    storageSubtotal,
    step3Subtotal,
    poeSubtotal,
    accessoriesSubtotal,
    systemTotal,
    monthlyLease,
    totalStorageTB,
    estimatedRetentionDays,
    retentionPercent,
    allocatedCameraQty,
    totalCameraWattage,
    networkPowerBudgetW,
    powerLoadPercent,
    headroomWattage,
    outdoorCameraCount
  };
}

export function formatCurrency(amount: number): string {
  return '$' + Math.round(amount).toLocaleString('en-US');
}
