import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CropCard from '@/components/CropCard';
import CropCategoryIcon from '@/components/CropCategoryIcon';
import { Crop, CropCategory } from '@shared/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategorySectionProps {
  category: CropCategory;
  crops: Crop[];
  onBookmark: (cropId: string) => void;
  onViewAll: (category: CropCategory) => void;
}

export default function CategorySection({ 
  category, 
  crops, 
  onBookmark, 
  onViewAll 
}: CategorySectionProps) {
  const { t } = useLanguage();
  const displayCrops = crops.slice(0, 4); // Show only first 4 crops

  const getCategoryDescription = (category: CropCategory) => {
    switch (category) {
      case 'Grains & Pulses':
        return 'Essential food crops providing carbohydrates and protein';
      case 'Vegetables':
        return 'Fresh nutritious vegetables for healthy living';
      case 'Fruits':
        return 'Sweet and nutritious fruits rich in vitamins';
      case 'Spices':
        return 'Aromatic spices for flavor and medicinal uses';
      case 'Flowers':
        return 'Beautiful flowers for decoration and fragrance';
      case 'Herbs & Plantation':
        return 'Medicinal herbs and plantation crops';
      case 'Oilseeds':
        return 'Oil-producing crops for cooking and industrial use';
      default:
        return '';
    }
  };

  const getCategoryStats = () => {
    const totalCrops = crops.length;
    const highProfitCrops = crops.filter(c => c.profitStatus === 'High').length;
    const avgPrice = crops.reduce((sum, c) => sum + c.latestPrice, 0) / crops.length;
    
    return { totalCrops, highProfitCrops, avgPrice: Math.round(avgPrice) };
  };

  const stats = getCategoryStats();

  return (
    <Card className="border-green-100 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CropCategoryIcon category={category} className="h-8 w-8" />
            <div>
              <CardTitle className="text-xl text-gray-900">{category}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{getCategoryDescription(category)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {stats.totalCrops} crops
            </Badge>
            <Badge className="bg-green-100 text-green-700 text-xs">
              {stats.highProfitCrops} high profit
            </Badge>
          </div>
        </div>
        
        {/* Category Stats */}
        <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">{stats.totalCrops}</p>
            <p className="text-xs text-gray-500">Total Varieties</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-green-600">{stats.highProfitCrops}</p>
            <p className="text-xs text-gray-500">High Profit</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">₹{stats.avgPrice}</p>
            <p className="text-xs text-gray-500">Avg Price/kg</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewAll(category)}
            className="text-xs"
          >
            View All
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayCrops.map((crop) => (
            <CropCard 
              key={crop.id} 
              crop={crop} 
              onBookmark={onBookmark}
            />
          ))}
        </div>
        
        {crops.length > 4 && (
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => onViewAll(category)}
              className="text-green-600 hover:text-green-700"
            >
              View all {crops.length} {category.toLowerCase()}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
