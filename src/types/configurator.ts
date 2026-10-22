export type ConfigStep = 1 | 2 | 3 | 4 | 5;

export interface SystemPackage {
  id: string;
  name: string;
  cameras: number;
  nvr: string;
  nvrCh: number;
  price: number;
  tops: number;
  badge?: string;
  badgeType?: 'primary' | 'muted';
  description: string;
  zone: string;
  storage: string;
}

export type CameraSeriesKey = 'armor' | 'binsight' | 'dualarc' | 'panotrak';

export interface CameraModel {
  id: string;
  series: CameraSeriesKey;
  name: string;
  price: number;
  tags: string;
  icon: string;
  featured?: boolean;
  powerWattage: number; // For PoE calculation
  isOutdoor?: boolean;
}

export interface AllocatedCameraItem {
  id: string;
  series: CameraSeriesKey;
  name: string;
  price: number;
  qty: number;
  powerWattage: number;
  isOutdoor?: boolean;
}

export interface NvrOption {
  id: string;
  name: string;
  channels: number;
  price: number;
  bays: number;
  maxStorageTB: number;
  inflowMbps: number;
  features: string;
  badge?: string;
}

export interface StorageHddOption {
  id: string;
  capacityTB: number;
  name: string;
  price: number;
  subtitle: string;
  popular?: boolean;
}

export interface NetworkOption {
  id: string;
  name: string;
  price: number;
  powerBudgetW: number;
  ports: number;
  description: string;
  icon: string;
  isStandard?: boolean;
}

export interface AccessoriesState {
  cableLength: '60ft' | '100ft' | '150ft';
  cablePrice: number;
  junctionBoxesCount: number;
  junctionBoxUnitPrice: number;
  conduitAdaptersEnabled: boolean;
  conduitPrice: number;
}

export interface SystemConfiguration {
  systemPackageId: string;
  customCameraCount: number | null;
  totalCameraTarget: number;
  
  // Step 2
  allocatedCameras: AllocatedCameraItem[];
  
  // Step 3
  selectedNvrId: string;
  selectedHddId: string;
  driveQty: number;
  recordingMode: 'continuous' | 'motion';
  codec: 'h265' | 'h264';
  targetRetentionDays: number;
  
  // Step 4
  selectedNetworkId: string;
  
  // Step 5
  accessories: AccessoriesState;
}
