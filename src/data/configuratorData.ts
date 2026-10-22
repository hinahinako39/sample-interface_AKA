import { SystemPackage, CameraModel, NvrOption, StorageHddOption, NetworkOption, SystemConfiguration } from '../types/configurator';

export const SYSTEM_PACKAGES: SystemPackage[] = [
  {
    id: 'essential',
    name: 'Essential',
    cameras: 4,
    nvr: '8-Channel 4COVR Core NVR',
    nvrCh: 8,
    price: 1480,
    tops: 8.4,
    badge: 'Starter Standard',
    badgeType: 'muted',
    description: 'Ideal for key focal points and entryways. Perfect for compact residences & studio studios.',
    zone: 'Key focal points & perimeter entryways',
    storage: '4TB Enterprise Storage'
  },
  {
    id: 'everyday',
    name: 'Everyday',
    cameras: 8,
    nvr: '8-Channel 4COVR Core NVR',
    nvrCh: 8,
    price: 2690,
    tops: 12.0,
    badge: 'Most Popular',
    badgeType: 'primary',
    description: 'Comprehensive perimeter and critical point coverage for standard homes & boutique stores.',
    zone: 'Comprehensive perimeter & critical corridors',
    storage: '4TB Enterprise Storage'
  },
  {
    id: 'expanded',
    name: 'Expanded',
    cameras: 16,
    nvr: '32-Channel 4COVR Enterprise Core',
    nvrCh: 32,
    price: 4980,
    tops: 24.0,
    badge: 'Commercial Ready',
    badgeType: 'muted',
    description: 'Multi-zone multi-building continuous observation for large estates & enterprise offices.',
    zone: 'Multi-zone estates & enterprise offices',
    storage: '16TB RAID Storage'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    cameras: 32,
    nvr: '64-Channel 4COVR Ultra Core',
    nvrCh: 64,
    price: 9200,
    tops: 48.0,
    badge: 'Enterprise Flagship',
    badgeType: 'muted',
    description: 'Extensive camera density with mission-critical redundancy & high bandwidth archiving.',
    zone: 'Mission-critical density & campuses',
    storage: '32TB Hot-Swap Redundant'
  }
];

export const CAMERA_SERIES_INFO = {
  armor: {
    title: 'Armor Series',
    tag: 'Infrared Precision',
    badge: 'IP67 Weatherproof',
    desc: 'Reliable Infrared Security — Precision optical clarity with zero-compromise stealth night vision up to 50 meters.',
    accent: '#efbe86'
  },
  binsight: {
    title: 'BinSight Series',
    tag: 'Smart Dual-Light',
    badge: 'ColorNight AI',
    desc: 'Smart Dual-Light Security — Ambient warm LED & active deterrent illuminator with full-color night monitoring.',
    accent: '#f59e0b'
  },
  dualarc: {
    title: 'DualArc Series',
    tag: '180° Seamless Panoramic',
    badge: 'Zero Blindspot',
    desc: '180° Panoramic Vision — Seamless dual-sensor stitching with zero blindspots and ultra-wide coverage.',
    accent: '#00E5FF'
  },
  panotrak: {
    title: 'PanoTrak Series',
    tag: 'Intelligent PTZ Tracking',
    badge: 'Motorized 360°',
    desc: 'Intelligent PTZ Tracking — High-speed precision tracking with 360° continuous pan & motorized optical zoom.',
    accent: '#efbe86'
  }
};

export const CAMERA_MODELS: CameraModel[] = [
  // Armor Series
  {
    id: 'arm-5-bul',
    series: 'armor',
    name: 'Armor 5MP Bullet',
    price: 65,
    tags: 'IR 30m · IP67 Weatherproof',
    icon: 'videocam',
    powerWattage: 7.5,
    isOutdoor: true
  },
  {
    id: 'arm-5-tur',
    series: 'armor',
    name: 'Armor 5MP Turret',
    price: 69,
    tags: 'IR Night Vision · Compact Dome',
    icon: 'camera',
    powerWattage: 7.0,
    isOutdoor: false
  },
  {
    id: 'arm-5-dom',
    series: 'armor',
    name: 'Armor 5MP Dome',
    price: 75,
    tags: 'IK10 Impact · Vandal Proof',
    icon: 'security',
    powerWattage: 8.0,
    isOutdoor: true
  },
  {
    id: 'arm-8-bul',
    series: 'armor',
    name: 'Armor 8MP 4K Bullet',
    price: 89,
    tags: '4K Ultra HD · Long-Range IR 50m',
    icon: 'videocam',
    featured: true,
    powerWattage: 9.5,
    isOutdoor: true
  },
  {
    id: 'arm-8-dom',
    series: 'armor',
    name: 'Armor 8MP 4K Dome',
    price: 95,
    tags: '4K Ultra HD · Vandal IK10',
    icon: 'security',
    powerWattage: 9.0,
    isOutdoor: true
  },
  {
    id: 'arm-12-dom',
    series: 'armor',
    name: 'Armor 12MP Ultra Dome',
    price: 139,
    tags: '12MP Extreme Detail · Neural ISP',
    icon: 'security',
    powerWattage: 12.0,
    isOutdoor: false
  },

  // BinSight Series
  {
    id: 'bin-5-bul',
    series: 'binsight',
    name: 'BinSight 5MP Bullet',
    price: 109,
    tags: 'Smart Dual Light · Active Deterrence',
    icon: 'videocam',
    powerWattage: 11.0,
    isOutdoor: true
  },
  {
    id: 'bin-5-tur',
    series: 'binsight',
    name: 'BinSight 5MP Turret',
    price: 119,
    tags: 'Dual Light · Two-Way Audio',
    icon: 'camera',
    powerWattage: 11.5,
    isOutdoor: false
  },
  {
    id: 'bin-8-bul',
    series: 'binsight',
    name: 'BinSight 8MP Bullet',
    price: 139,
    tags: '4K ColorNight · Smart Siren',
    icon: 'videocam',
    powerWattage: 13.5,
    isOutdoor: true
  },
  {
    id: 'bin-8-tur',
    series: 'binsight',
    name: 'BinSight 8MP Turret',
    price: 149,
    tags: '4K ColorNight · Warm Array 3000K',
    icon: 'camera',
    featured: true,
    powerWattage: 14.0,
    isOutdoor: false
  },
  {
    id: 'bin-12-tur',
    series: 'binsight',
    name: 'BinSight 12MP Turret',
    price: 189,
    tags: '12MP ColorNight · AI Perimeter Guard',
    icon: 'camera',
    powerWattage: 15.5,
    isOutdoor: false
  },

  // DualArc Series
  {
    id: 'dua-8-bul',
    series: 'dualarc',
    name: 'DualArc 8MP Dual-Lens Bullet',
    price: 229,
    tags: '180° Stitch · Horizon Coverage',
    icon: 'panorama_photosphere',
    featured: true,
    powerWattage: 16.0,
    isOutdoor: true
  },
  {
    id: 'dua-8-tur',
    series: 'dualarc',
    name: 'DualArc 8MP Dual-Lens Turret',
    price: 239,
    tags: '180° Panoramic · Dual Matrix Sensor',
    icon: 'camera',
    powerWattage: 16.5,
    isOutdoor: false
  },

  // PanoTrak Series
  {
    id: 'pan-5-ptz',
    series: 'panotrak',
    name: 'PanoTrak 5MP Mini PTZ 5×',
    price: 249,
    tags: '5× Optical Zoom · High Speed Pan',
    icon: 'radar',
    powerWattage: 22.0,
    isOutdoor: true
  },
  {
    id: 'pan-8-ptz',
    series: 'panotrak',
    name: 'PanoTrak 8MP Auto-Tracking PTZ 20×',
    price: 549,
    tags: '20× Optical Zoom · DeepTrack AI · 360° Endless',
    icon: 'radar',
    featured: true,
    powerWattage: 28.0,
    isOutdoor: true
  }
];

export const NVR_OPTIONS: NvrOption[] = [
  {
    id: '8ch',
    name: '8-Channel Quantum Core NVR',
    channels: 8,
    price: 189,
    bays: 1,
    maxStorageTB: 16,
    inflowMbps: 80,
    features: '1× SATA Bay (up to 16TB) • 80Mbps Inflow • H.265+ AI',
    badge: 'Recommended'
  },
  {
    id: '16ch',
    name: '16-Channel Quantum Core NVR',
    channels: 16,
    price: 299,
    bays: 2,
    maxStorageTB: 32,
    inflowMbps: 160,
    features: '2× SATA Bays (up to 32TB) • 160Mbps Inflow',
    badge: 'Expansion Ready'
  },
  {
    id: '32ch',
    name: '32-Channel Enterprise Core NVR',
    channels: 32,
    price: 529,
    bays: 4,
    maxStorageTB: 64,
    inflowMbps: 320,
    features: '4× SATA Bays (up to 64TB) • Dual Gigabit PoE',
    badge: 'Multi-Zone'
  },
  {
    id: '64ch',
    name: '64-Channel Ultra Enterprise Core',
    channels: 64,
    price: 949,
    bays: 8,
    maxStorageTB: 128,
    inflowMbps: 640,
    features: '8× Hot-Swap Bays • Redundant Power Supply',
    badge: 'Institutional'
  }
];

export const HDD_OPTIONS: StorageHddOption[] = [
  {
    id: 'hdd-2tb',
    capacityTB: 2,
    name: '2TB Drive',
    price: 75,
    subtitle: 'Surveillance Grade'
  },
  {
    id: 'hdd-4tb',
    capacityTB: 4,
    name: '4TB Pro HDD',
    price: 115,
    subtitle: 'Enterprise Balance',
    popular: true
  },
  {
    id: 'hdd-8tb',
    capacityTB: 8,
    name: '8TB Ultra HDD',
    price: 210,
    subtitle: 'Extended Retention'
  },
  {
    id: 'hdd-16tb',
    capacityTB: 16,
    name: '16TB Helium AI',
    price: 399,
    subtitle: 'Maximum Density'
  }
];

export const NETWORK_OPTIONS: NetworkOption[] = [
  {
    id: 'direct-nvr',
    name: 'Direct NVR PoE Link',
    price: 0,
    powerBudgetW: 80,
    ports: 8,
    description: 'Built-in 8-Port PoE · Direct backplane link',
    icon: 'settings_ethernet',
    isStandard: true
  },
  {
    id: 'poe-4p',
    name: '4-Port Compact PoE Switch',
    price: 59,
    powerBudgetW: 65,
    ports: 4,
    description: '65W Power Budget · Desktop fanless design',
    icon: 'device_hub'
  },
  {
    id: 'poe-8p',
    name: '8-Port Enterprise PoE Switch',
    price: 89,
    powerBudgetW: 120,
    ports: 8,
    description: '120W Power Envelope · Auto-Negotiated QoS',
    icon: 'router'
  },
  {
    id: 'poe-16p',
    name: '16-Port Rackmount PoE Switch',
    price: 169,
    powerBudgetW: 300,
    ports: 16,
    description: '300W Power Envelope · Dual Gigabit Uplinks',
    icon: 'developer_board'
  },
  {
    id: 'poe-24p',
    name: '24-Port Core PoE Switch',
    price: 249,
    powerBudgetW: 300,
    ports: 24,
    description: '300W Power Envelope · Enterprise SFP+ Fiber',
    icon: 'memory'
  }
];

export const INITIAL_CONFIGURATION: SystemConfiguration = {
  systemPackageId: 'everyday',
  customCameraCount: null,
  totalCameraTarget: 8,
  
  allocatedCameras: [
    {
      id: 'arm-8-bul',
      series: 'armor',
      name: 'Armor 8MP 4K Bullet',
      price: 89,
      qty: 4,
      powerWattage: 9.5,
      isOutdoor: true
    },
    {
      id: 'bin-8-tur',
      series: 'binsight',
      name: 'BinSight 8MP Turret',
      price: 149,
      qty: 2,
      powerWattage: 14.0,
      isOutdoor: false
    },
    {
      id: 'dua-8-bul',
      series: 'dualarc',
      name: 'DualArc 8MP Dual-Lens Bullet',
      price: 229,
      qty: 2,
      powerWattage: 16.0,
      isOutdoor: true
    }
  ],
  
  selectedNvrId: '8ch',
  selectedHddId: 'hdd-4tb',
  driveQty: 1,
  recordingMode: 'continuous',
  codec: 'h265',
  targetRetentionDays: 30,
  
  selectedNetworkId: 'poe-8p',
  
  accessories: {
    cableLength: '100ft',
    cablePrice: 0,
    junctionBoxesCount: 4,
    junctionBoxUnitPrice: 19,
    conduitAdaptersEnabled: false,
    conduitPrice: 24
  }
};
