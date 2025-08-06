import { Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CropFilters as FilterType, Season } from '@shared/types';
import { SEASONS, MONTHS, CROP_CATEGORIES } from '@shared/data';
import { useLanguage } from '@/contexts/LanguageContext';

interface CropFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  totalCrops: number;
  filteredCount: number;
}

export default function CropFilters({
  filters,
  onFiltersChange,
  totalCrops,
  filteredCount
}: CropFiltersProps) {
  const { t } = useLanguage();

  const clearFilters = () => {
    onFiltersChange({});
  };

  const updateFilter = (key: keyof FilterType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== '').length;

  return (
    <Card className="border-green-100">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filter Title & Stats */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-gray-900">{t('filters.filterCrops')}</h3>
            </div>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {activeFiltersCount} {t('filters.filtersActive')}
              </Badge>
            )}
            <span className="text-sm text-gray-500">
              {t('filters.showingCrops').replace('{count}', filteredCount.toString()).replace('{total}', totalCrops.toString())}
            </span>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Filter */}
            <div className="min-w-[160px]">
              <Select
                value={filters.category || 'all-categories'}
                onValueChange={(value) => updateFilter('category', value === 'all-categories' ? undefined : value)}
              >
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {CROP_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Season Filter */}
            <div className="min-w-[140px]">
              <Select
                value={filters.season || 'all-seasons'}
                onValueChange={(value) => updateFilter('season', value === 'all-seasons' ? undefined : value)}
              >
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder={t('filters.season')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-seasons">{t('filters.allSeasons')}</SelectItem>
                  {SEASONS.map((season) => (
                    <SelectItem key={season} value={season}>
                      {t(`seasons.${season.toLowerCase()}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Month Filter */}
            <div className="min-w-[140px]">
              <Select
                value={filters.month?.toString() || 'all-months'}
                onValueChange={(value) => updateFilter('month', value === 'all-months' ? undefined : parseInt(value))}
              >
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <SelectValue placeholder={t('filters.month')} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-months">{t('filters.allMonths')}</SelectItem>
                  {MONTHS.map((month, index) => (
                    <SelectItem key={month} value={(index + 1).toString()}>
                      {t(`months.${month.toLowerCase()}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                {t('common.clearAll')}
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 cursor-pointer hover:bg-purple-200"
                  onClick={() => updateFilter('category', undefined)}
                >
                  Category: {filters.category} ×
                </Badge>
              )}
              {filters.season && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 cursor-pointer hover:bg-green-200"
                  onClick={() => updateFilter('season', undefined)}
                >
                  {t('filters.season')}: {t(`seasons.${filters.season.toLowerCase()}`)} ×
                </Badge>
              )}
              {filters.month && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200"
                  onClick={() => updateFilter('month', undefined)}
                >
                  {t('filters.month')}: {t(`months.${MONTHS[filters.month - 1].toLowerCase()}`)} ×
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
