import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, TrendingDown, AlertTriangle, Calendar, MapPin, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CROPS_DATA, MONTHS } from '@shared/data';
import { useLanguage } from '@/contexts/LanguageContext';

// Indian states for location selection
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

interface PredictionData {
  cropName: string;
  location: string;
  plantingMonth: number;
  harvestMonth: number;
  predictedPrice: { min: number; max: number };
  profitPerAcre: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  recommendation: string;
  marketDemand: 'High' | 'Moderate' | 'Low';
}

export default function CropProfitPredictor() {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [showPrediction, setShowPrediction] = useState(false);
  const { t } = useLanguage();

  const selectedCropData = useMemo(() => {
    return CROPS_DATA.find(crop => crop.id === selectedCrop);
  }, [selectedCrop]);

  const harvestMonth = useMemo(() => {
    if (!selectedMonth || !selectedCropData) return null;
    
    const plantingMonthIndex = parseInt(selectedMonth) - 1;
    const duration = customDuration && customDuration !== 'auto' ? parseInt(customDuration) : selectedCropData.harvestDays;
    const harvestMonthIndex = (plantingMonthIndex + Math.ceil(duration / 30)) % 12;
    
    return harvestMonthIndex + 1;
  }, [selectedMonth, selectedCropData, customDuration]);

  const prediction = useMemo((): PredictionData | null => {
    if (!selectedCropData || !selectedState || !selectedMonth || !harvestMonth) {
      return null;
    }

    // Simple prediction algorithm based on historical data and seasonal patterns
    const basePrice = selectedCropData.latestPrice;
    const seasonalMultiplier = harvestMonth >= 4 && harvestMonth <= 6 ? 1.2 : // Summer demand
                               harvestMonth >= 10 && harvestMonth <= 12 ? 1.1 : // Festival season
                               0.9; // Normal season

    const stateMultiplier = ['Maharashtra', 'Gujarat', 'Punjab', 'Haryana'].includes(selectedState) ? 1.15 : // High-production states
                           ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh'].includes(selectedState) ? 1.1 : // Southern states
                           1.0; // Other states

    const predictedMinPrice = Math.round(basePrice * seasonalMultiplier * stateMultiplier * 0.85);
    const predictedMaxPrice = Math.round(basePrice * seasonalMultiplier * stateMultiplier * 1.15);

    const yieldPerAcre = selectedCropData.averageYieldPerAcre;
    const inputCost = yieldPerAcre * 15; // Estimated input cost per quintal
    const revenue = (predictedMinPrice + predictedMaxPrice) / 2 * yieldPerAcre;
    const profitPerAcre = Math.round(revenue - inputCost);

    // Risk assessment
    let riskLevel: 'Low' | 'Moderate' | 'High' = 'Moderate';
    if (selectedCropData.pestDiseaseRisk === 'High' || profitPerAcre < 10000) {
      riskLevel = 'High';
    } else if (selectedCropData.pestDiseaseRisk === 'Low' && profitPerAcre > 25000) {
      riskLevel = 'Low';
    }

    // Market demand assessment
    const marketDemand: 'High' | 'Moderate' | 'Low' = 
      ['Vegetables', 'Fruits', 'Spices'].includes(selectedCropData.category) ? 'High' :
      ['Grains & Pulses', 'Oilseeds'].includes(selectedCropData.category) ? 'Moderate' :
      'Low';

    // Recommendation
    let recommendation = '';
    if (profitPerAcre > 30000 && riskLevel === 'Low') {
      recommendation = 'Highly Recommended - Excellent profit potential with low risk';
    } else if (profitPerAcre > 20000 && riskLevel !== 'High') {
      recommendation = 'Good to Grow - Profitable with manageable risk';
    } else if (profitPerAcre > 10000) {
      recommendation = 'Consider Carefully - Moderate profit, assess market conditions';
    } else {
      recommendation = 'High Risk - Consider alternative crops or improved practices';
    }

    return {
      cropName: selectedCropData.name,
      location: selectedState,
      plantingMonth: parseInt(selectedMonth),
      harvestMonth,
      predictedPrice: { min: predictedMinPrice, max: predictedMaxPrice },
      profitPerAcre,
      riskLevel,
      recommendation,
      marketDemand
    };
  }, [selectedCropData, selectedState, selectedMonth, harvestMonth]);

  const handlePredict = () => {
    if (selectedCrop && selectedState && selectedMonth) {
      setShowPrediction(true);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-green-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100">
          <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
            <Calculator className="h-8 w-8 mr-3 text-green-600" />
            🎯 {t('predictor.title')}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {t('predictor.description')}
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Crop Selection */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Target className="h-4 w-4 mr-2 text-green-600" />
                {t('predictor.selectCrop')}
              </label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder={t('predictor.selectCrop') + '...'} />
                </SelectTrigger>
                <SelectContent>
                  {CROPS_DATA.map((crop) => (
                    <SelectItem key={crop.id} value={crop.id}>
                      {crop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Selection */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                {t('predictor.chooseLocationState')}
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder={t('predictor.chooseLocationState') + '...'} />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Planting Month */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                {t('predictor.plantingMonth')}
              </label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder={t('predictor.plantingMonth') + '...'} />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month, index) => (
                    <SelectItem key={month} value={(index + 1).toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration Override */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Clock className="h-4 w-4 mr-2 text-orange-600" />
                {t('predictor.duration')}
              </label>
              <Select 
                value={customDuration} 
                onValueChange={setCustomDuration}
              >
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder={selectedCropData ? `${t('predictor.autoFill')} (${selectedCropData.harvestDays} ${t('common.days') || 'days'})` : t('predictor.autoFill')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">{t('predictor.autoFill')} (Default)</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="120">120 days</SelectItem>
                  <SelectItem value="150">150 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="270">270 days</SelectItem>
                  <SelectItem value="365">365 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Predict Button */}
          <div className="flex justify-center mb-8">
            <Button 
              onClick={handlePredict}
              disabled={!selectedCrop || !selectedState || !selectedMonth}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg disabled:bg-gray-300"
            >
              <Calculator className="h-5 w-5 mr-2" />
              {t('predictor.predictButton')}
            </Button>
          </div>

          {/* Prediction Results */}
          {showPrediction && prediction && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-1">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    📈 {t('predictor.results')} - {prediction.cropName}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Expected Harvest Month */}
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-800">{t('predictor.harvestMonth')}</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-900">
                          {MONTHS[prediction.harvestMonth - 1]}
                        </div>
                        <div className="text-xs text-blue-700 mt-1">
                          {t('common.from') || 'From'} {MONTHS[prediction.plantingMonth - 1]} {t('common.planting') || 'planting'}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Predicted Price Range */}
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-green-800">{t('predictor.predictedPrice')}</span>
                        </div>
                        <div className="text-2xl font-bold text-green-900">
                          ₹{prediction.predictedPrice.min}-{prediction.predictedPrice.max}
                        </div>
                        <div className="text-xs text-green-700 mt-1">{t('common.perKg') || 'per kg'}</div>
                      </CardContent>
                    </Card>

                    {/* Estimated Profit */}
                    <Card className={`border-2 ${prediction.profitPerAcre > 20000 ? 'border-green-300 bg-green-50' : prediction.profitPerAcre > 10000 ? 'border-yellow-300 bg-yellow-50' : 'border-red-300 bg-red-50'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          {prediction.profitPerAcre > 10000 ? (
                            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                          )}
                          <span className="text-sm font-medium text-gray-800">{t('predictor.estimatedProfit')}</span>
                        </div>
                        <div className={`text-2xl font-bold ${prediction.profitPerAcre > 10000 ? 'text-green-900' : 'text-red-900'}`}>
                          ₹{prediction.profitPerAcre.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-700 mt-1">{t('common.estimatedNetProfit') || 'estimated net profit'}</div>
                      </CardContent>
                    </Card>

                    {/* Risk Level */}
                    <Card className={`border-2 ${getRiskColor(prediction.riskLevel)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          <span className="text-sm font-medium">{t('predictor.riskLevel')}</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {prediction.riskLevel}
                        </div>
                        <div className="text-xs mt-1">{t('common.investmentRisk') || 'investment risk'}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Market Demand & Recommendation */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-purple-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          📦 {t('predictor.marketAnalysis')}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{t('predictor.marketDemand')}:</span>
                            <Badge className={getDemandColor(prediction.marketDemand)}>
                              {prediction.marketDemand}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{t('predictor.locationFactor')}:</span>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {prediction.location}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{t('predictor.seasonalTiming')}:</span>
                            <Badge variant="outline" className="text-purple-600 border-purple-200">
                              {prediction.harvestMonth >= 4 && prediction.harvestMonth <= 6 ? 'Summer Peak' :
                               prediction.harvestMonth >= 10 && prediction.harvestMonth <= 12 ? 'Festival Season' :
                               'Normal Season'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          ✅ {t('predictor.recommendation')}
                        </h4>
                        <Alert className={`border-2 ${
                          prediction.recommendation.includes('Highly Recommended') ? 'border-green-300 bg-green-50' :
                          prediction.recommendation.includes('Good to Grow') ? 'border-blue-300 bg-blue-50' :
                          prediction.recommendation.includes('Consider Carefully') ? 'border-yellow-300 bg-yellow-50' :
                          'border-red-300 bg-red-50'
                        }`}>
                          <AlertDescription className="text-sm font-medium">
                            {prediction.recommendation}
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Info */}
                  {selectedCropData && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">📋 {t('predictor.additionalInfo')}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>Season:</strong> {selectedCropData.season}
                        </div>
                        <div>
                          <strong>Ideal Soil:</strong> {selectedCropData.idealSoilType}
                        </div>
                        <div>
                          <strong>Temp Range:</strong> {selectedCropData.idealTempRange.min}°C - {selectedCropData.idealTempRange.max}°C
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Information Note */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>{t('common.disclaimer') || 'Disclaimer'}:</strong> {t('predictor.disclaimer')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
