export type ProfitStatus = 'High' | 'Moderate' | 'Loss';
export type Season = 'Kharif' | 'Rabi' | 'Zaid' | 'Year-round';
export type SoilType = 'Clay' | 'Sandy' | 'Loamy' | 'Black' | 'Red' | 'Alluvial' | 'Laterite' | 'Well-drained';
export type CropCategory = 'Grains & Pulses' | 'Vegetables' | 'Fruits' | 'Spices' | 'Flowers' | 'Herbs & Plantation' | 'Oilseeds';
export type PestRisk = 'Low' | 'Medium' | 'High';

export interface YearlyData {
  year: number;
  acresPlanted: number;
  profitLoss: number;
  averagePrice: number;
}

export interface CropRequirements {
  temperature: {
    min: number;
    max: number;
    optimal: number;
  };
  rainfall: {
    min: number;
    max: number;
    optimal: number;
  };
  humidity: number;
  phLevel: {
    min: number;
    max: number;
  };
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  category: CropCategory;
  profitStatus: ProfitStatus;
  latestPrice: number;
  acresPlanted: number;
  isBookmarked?: boolean;
  season: Season;
  idealSoilType: SoilType;
  idealTempRange: {
    min: number;
    max: number;
  };
  harvestTime: string;
  harvestDays: number;
  averageYieldPerAcre: number;
  yieldUnit: string;
  requirements: CropRequirements;
  pestDiseaseRisk: PestRisk;
  commonPests: string[];
  commonDiseases: string[];
  marketTrends: string;
  profitPotential: string;
  yearlyData: YearlyData[];
  image?: string;
  description?: string;
  plantingTips: string[];
  nutritionalValue?: string;
  storageRequirements?: string;
  processingUses?: string[];
}

export interface CropFilters {
  season?: Season;
  month?: number;
  searchQuery?: string;
  category?: CropCategory;
  profitStatus?: ProfitStatus;
}

export interface EmailAlert {
  email: string;
  cropIds: string[];
}
