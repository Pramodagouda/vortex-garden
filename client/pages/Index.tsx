import { useState, useMemo } from 'react';
import { AlertCircle, BarChart3, TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import Header from '@/components/Header';
import CropCard from '@/components/CropCard';
import CropFilters from '@/components/CropFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CROPS_DATA, CROP_CATEGORIES } from '@shared/data';
import { CropFilters as FilterType, Crop, ProfitStatus } from '@shared/types';
import { useLanguage } from '@/contexts/LanguageContext';
import CategorySection from '@/components/CategorySection';
import CropProfitPredictor from '@/components/CropProfitPredictor';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterType>({});
  const [bookmarkedCrops, setBookmarkedCrops] = useState<Set<string>>(new Set());
  const [activeProfitFilter, setActiveProfitFilter] = useState<ProfitStatus | null>(null);
  const { t } = useLanguage();

  // Filter and search crops
  const filteredCrops = useMemo(() => {
    return CROPS_DATA.filter((crop) => {
      // Search filter
      if (searchQuery && !crop.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && crop.category !== filters.category) {
        return false;
      }

      // Season filter
      if (filters.season && crop.season !== filters.season) {
        return false;
      }

      // Month filter (simplified - based on season)
      if (filters.month) {
        const seasonMonths = {
          'Kharif': [6, 7, 8, 9, 10], // June to October
          'Rabi': [11, 12, 1, 2, 3], // November to March
          'Zaid': [4, 5, 6], // April to June
          'Year-round': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // All months
        };
        if (!seasonMonths[crop.season]?.includes(filters.month)) {
          return false;
        }
      }

      // Profit status filter
      if (activeProfitFilter && crop.profitStatus !== activeProfitFilter) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters, activeProfitFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = CROPS_DATA.length;
    const profitable = CROPS_DATA.filter(c => c.profitStatus === 'High').length;
    const moderate = CROPS_DATA.filter(c => c.profitStatus === 'Moderate').length;
    const loss = CROPS_DATA.filter(c => c.profitStatus === 'Loss').length;
    const totalAcres = CROPS_DATA.reduce((sum, c) => sum + c.acresPlanted, 0);
    
    return { total, profitable, moderate, loss, totalAcres };
  }, []);

  const handleBookmark = (cropId: string) => {
    const newBookmarked = new Set(bookmarkedCrops);
    if (newBookmarked.has(cropId)) {
      newBookmarked.delete(cropId);
    } else {
      newBookmarked.add(cropId);
    }
    setBookmarkedCrops(newBookmarked);
  };

  const handleProfitFilter = (profitStatus: ProfitStatus) => {
    if (activeProfitFilter === profitStatus) {
      // If the same filter is clicked, clear it
      setActiveProfitFilter(null);
    } else {
      // Set new profit filter
      setActiveProfitFilter(profitStatus);
    }
  };

  const clearAllFilters = () => {
    setActiveProfitFilter(null);
    setFilters({});
    setSearchQuery('');
  };

  const getProfitIcon = (status: ProfitStatus) => {
    switch (status) {
      case 'High':
        return <TrendingUp className="h-4 w-4 mr-1 text-green-600" />;
      case 'Moderate':
        return <Minus className="h-4 w-4 mr-1 text-yellow-600" />;
      case 'Loss':
        return <TrendingDown className="h-4 w-4 mr-1 text-red-600" />;
      default:
        return <BarChart3 className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-brown-50">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('app.tagline')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('app.description')}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card
            className={`border-green-100 transition-all duration-200 ${
              activeProfitFilter === null ? 'ring-2 ring-green-200 bg-green-50' : 'hover:shadow-md cursor-pointer'
            }`}
            onClick={clearAllFilters}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" />
                {t('crops.totalCrops')}
                {activeProfitFilter === null && <Badge className="ml-2 bg-green-600">{t('common.active')}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500">{stats.totalAcres.toLocaleString()} {t('crops.totalAcres')}</p>
            </CardContent>
          </Card>

          <Card
            className={`border-green-100 cursor-pointer transition-all duration-200 hover:shadow-md ${
              activeProfitFilter === 'High'
                ? 'ring-2 ring-green-400 bg-green-50 shadow-lg'
                : 'hover:border-green-300'
            }`}
            onClick={() => handleProfitFilter('High')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                {t('crops.highProfit')}
                {activeProfitFilter === 'High' && <Badge className="ml-2 bg-green-600">{t('common.active')}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.profitable}</div>
              <p className="text-xs text-gray-500">{t('crops.clickToView')} • {t('crops.recommended')}</p>
            </CardContent>
          </Card>

          <Card
            className={`border-green-100 cursor-pointer transition-all duration-200 hover:shadow-md ${
              activeProfitFilter === 'Moderate'
                ? 'ring-2 ring-yellow-400 bg-yellow-50 shadow-lg'
                : 'hover:border-yellow-300'
            }`}
            onClick={() => handleProfitFilter('Moderate')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Minus className="h-4 w-4 mr-1 text-yellow-600" />
                {t('crops.moderateProfit')}
                {activeProfitFilter === 'Moderate' && <Badge className="ml-2 bg-yellow-600">{t('common.active')}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.moderate}</div>
              <p className="text-xs text-gray-500">{t('crops.clickToView')} • {t('crops.considerCarefully')}</p>
            </CardContent>
          </Card>

          <Card
            className={`border-green-100 cursor-pointer transition-all duration-200 hover:shadow-md ${
              activeProfitFilter === 'Loss'
                ? 'ring-2 ring-red-400 bg-red-50 shadow-lg'
                : 'hover:border-red-300'
            }`}
            onClick={() => handleProfitFilter('Loss')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1 text-red-600" />
                {t('crops.lossRisk')}
                {activeProfitFilter === 'Loss' && <Badge className="ml-2 bg-red-600">{t('common.active')}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.loss}</div>
              <p className="text-xs text-gray-500">{t('crops.clickToView')} • {t('crops.avoidCurrently')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Alert for Market Conditions */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>{t('alerts.marketUpdate')}:</strong> {t('alerts.riceAndSugarcaneProfitable')}
            {t('alerts.cottonChallenges')}
            <a href="#" className="text-green-700 underline ml-1">{t('alerts.viewDetailedAnalysis')} →</a>
          </AlertDescription>
        </Alert>

        {/* Crop Profit Predictor Section */}
        <div className="mb-8">
          <CropProfitPredictor />
        </div>

        {/* Active Profit Filter Indicator */}
        {activeProfitFilter && (
          <div className="mb-6">
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 flex items-center justify-between">
                <span>
                  <strong>{t('filters.filterActive')}:</strong> {t('filters.showingOnlyProfitCrops').replace('{profitType}', t(`crops.${activeProfitFilter?.toLowerCase()}Profit`)).replace('{count}', filteredCrops.length.toString())}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="ml-4 h-7 px-3 text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <X className="h-3 w-3 mr-1" />
                  {t('filters.clearFilter')}
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Filters */}
        <CropFilters
          filters={filters}
          onFiltersChange={setFilters}
          totalCrops={CROPS_DATA.length}
          filteredCount={filteredCrops.length}
        />

        {/* Crops Display */}
        <div className="mt-8">
          {filteredCrops.length === 0 ? (
            <Card className="text-center py-12 border-dashed border-2 border-gray-200">
              <CardContent>
                <div className="text-gray-500">
                  {getProfitIcon(activeProfitFilter || 'High')}
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    {activeProfitFilter
                      ? `${t('common.no')} ${t(`crops.${activeProfitFilter.toLowerCase()}Profit`).toLowerCase()} ${t('common.crops')} ${t('common.found')}`
                      : t('crops.noCropsFound')
                    }
                  </h3>
                  <p>
                    {activeProfitFilter
                      ? t('filters.selectDifferentCategory')
                      : t('crops.adjustFilters')
                    }
                  </p>
                  {(activeProfitFilter || Object.keys(filters).length > 0 || searchQuery) && (
                    <Button
                      onClick={clearAllFilters}
                      variant="outline"
                      className="mt-4"
                    >
                      {t('common.clearAll')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Show filtered results or category-wise organization */}
              {(activeProfitFilter || filters.category || filters.season || filters.month || searchQuery) ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {activeProfitFilter ? (
                        <>
                          {t(`crops.${activeProfitFilter.toLowerCase()}Profit`)} {t('common.crops')}
                          <Badge
                            variant="secondary"
                            className={`ml-2 ${
                              activeProfitFilter === 'High' ? 'bg-green-100 text-green-700' :
                              activeProfitFilter === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}
                          >
                            {filteredCrops.length}
                          </Badge>
                        </>
                      ) : (
                        <>
                          {filters.category ? `${filters.category} Crops` : t('crops.availableCrops')}
                          <Badge variant="secondary" className="ml-2">
                            {filteredCrops.length}
                          </Badge>
                        </>
                      )}
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{t('crops.updated')}</span>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {t('crops.live')}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCrops.map((crop) => (
                      <CropCard
                        key={crop.id}
                        crop={{
                          ...crop,
                          isBookmarked: bookmarkedCrops.has(crop.id)
                        }}
                        onBookmark={handleBookmark}
                      />
                    ))}
                  </div>
                </>
              ) : (
                // Show category-wise organization when no filters are applied
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Crops by Category</h2>
                    <p className="text-gray-600">Discover the best crops for your farm across different categories</p>
                  </div>

                  {CROP_CATEGORIES.map((category) => {
                    const categoryCrops = CROPS_DATA.filter(crop => crop.category === category);
                    if (categoryCrops.length === 0) return null;

                    return (
                      <CategorySection
                        key={category}
                        category={category}
                        crops={categoryCrops}
                        onBookmark={handleBookmark}
                        onViewAll={(cat) => setFilters({ category: cat })}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Info Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            {t('alerts.priceDataUpdated')} • {t('alerts.marketTrendsNote')}
          </p>
          <p className="mt-1">
            {t('alerts.supportEmail')}
          </p>
        </div>
      </main>
    </div>
  );
}
