import React from 'react';
import { 
  Wheat, 
  Carrot, 
  Apple, 
  Sparkles, 
  Flower, 
  Leaf, 
  Droplets 
} from 'lucide-react';
import { CropCategory } from '@shared/types';

interface CropCategoryIconProps {
  category: CropCategory;
  className?: string;
}

export const getCropCategoryIcon = (category: CropCategory) => {
  switch (category) {
    case 'Grains & Pulses':
      return Wheat;
    case 'Vegetables':
      return Carrot;
    case 'Fruits':
      return Apple;
    case 'Spices':
      return Sparkles;
    case 'Flowers':
      return Flower;
    case 'Herbs & Plantation':
      return Leaf;
    case 'Oilseeds':
      return Droplets;
    default:
      return Wheat;
  }
};

export const getCropCategoryColor = (category: CropCategory) => {
  switch (category) {
    case 'Grains & Pulses':
      return 'text-yellow-600';
    case 'Vegetables':
      return 'text-green-600';
    case 'Fruits':
      return 'text-red-500';
    case 'Spices':
      return 'text-orange-600';
    case 'Flowers':
      return 'text-pink-500';
    case 'Herbs & Plantation':
      return 'text-emerald-600';
    case 'Oilseeds':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

export default function CropCategoryIcon({ category, className = "h-5 w-5" }: CropCategoryIconProps) {
  const IconComponent = getCropCategoryIcon(category);
  const colorClass = getCropCategoryColor(category);
  
  return <IconComponent className={`${className} ${colorClass}`} />;
}
