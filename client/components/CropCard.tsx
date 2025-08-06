import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crop } from '@shared/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { CROP_TRANSLATIONS } from '@shared/cropTranslations';
import CropCategoryIcon from '@/components/CropCategoryIcon';

interface CropCardProps {
  crop: Crop;
  onBookmark: (cropId: string) => void;
}

export default function CropCard({ crop, onBookmark }: CropCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(crop.isBookmarked || false);
  const { t, currentLanguage } = useLanguage();

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark(crop.id);
  };

  const getProfitStatusColor = (status: string) => {
    switch (status) {
      case 'High':
        return 'bg-profit-high text-white';
      case 'Moderate':
        return 'bg-profit-moderate text-white';
      case 'Loss':
        return 'bg-profit-loss text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getProfitIcon = (status: string) => {
    switch (status) {
      case 'High':
        return <TrendingUp className="h-4 w-4" />;
      case 'Moderate':
        return <Minus className="h-4 w-4" />;
      case 'Loss':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'Kharif':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Rabi':
        return 'bg-brown-100 text-brown-700 border-brown-200';
      case 'Zaid':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCropName = () => {
    const translation = CROP_TRANSLATIONS[crop.id]?.[currentLanguage];
    return translation?.name || crop.name;
  };

  return (
    <Link to={`/crop/${crop.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 border-green-100 hover:border-green-300 group cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <CropCategoryIcon category={crop.category} className="h-5 w-5" />
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-700 transition-colors">
                  {getCropName()}
                </h3>
              </div>
              <p className="text-xs text-gray-500 italic mb-2">{crop.scientificName}</p>
              <div className="flex flex-wrap gap-1">
                <Badge
                  variant="outline"
                  className={cn("text-xs", getSeasonColor(crop.season))}
                >
                  {t(`seasons.${crop.season.toLowerCase()}`)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {crop.category}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className="p-1 h-8 w-8 text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <Star
                className={cn(
                  "h-4 w-4",
                  isBookmarked ? "fill-yellow-400 text-yellow-500" : ""
                )}
              />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Profit Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('crops.profitStatus')}:</span>
              <Badge className={cn("text-xs font-medium", getProfitStatusColor(crop.profitStatus))}>
                <span className="flex items-center space-x-1">
                  {getProfitIcon(crop.profitStatus)}
                  <span>{t(`crops.${crop.profitStatus.toLowerCase()}Profit`)}</span>
                </span>
              </Badge>
            </div>

            {/* Latest Price */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('crops.marketPrice')}:</span>
              <span className="font-semibold text-green-700">
                ₹{crop.latestPrice}/kg
              </span>
            </div>

            {/* Acres Planted */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('crops.acresPlanted')}:</span>
              <span className="font-medium text-gray-900">
                {crop.acresPlanted.toLocaleString()} acres
              </span>
            </div>

            {/* Yield Info */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Yield:</span>
              <span className="font-medium text-gray-900">
                {crop.averageYieldPerAcre} {crop.yieldUnit}/acre
              </span>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div>
                  <span className="block">{t('crops.soilType')}: {t(`soilTypes.${crop.idealSoilType.toLowerCase()}`)}</span>
                  <span className="block">{t('crops.harvestTime')}: {crop.harvestDays} days</span>
                </div>
                <div>
                  <span className="block">{t('crops.temperature')}: {crop.idealTempRange.min}-{crop.idealTempRange.max}°C</span>
                  <span className="block text-green-600 font-medium">{t('crops.viewDetails')} →</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
