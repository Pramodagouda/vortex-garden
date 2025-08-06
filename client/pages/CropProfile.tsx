import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, Calendar, Thermometer, MapPin, Clock, 
  Droplets, TrendingUp, AlertTriangle, Beaker, Package,
  BarChart3, LineChart, Users, DollarSign, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import CropCategoryIcon from '@/components/CropCategoryIcon';
import { CROPS_DATA } from '@shared/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { CROP_TRANSLATIONS } from '@shared/cropTranslations';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function CropProfile() {
  const { id } = useParams();
  const { t, currentLanguage } = useLanguage();
  const crop = CROPS_DATA.find(c => c.id === id);

  if (!crop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-brown-50">
        <Header onSearch={() => {}} searchQuery="" />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('cropDetails.cropNotFound')}</h1>
          <Link to="/">
            <Button>{t('cropDetails.returnToHomepage')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCropName = () => {
    const translation = CROP_TRANSLATIONS[crop.id]?.[currentLanguage];
    return translation?.name || crop.name;
  };

  const getProfitStatusColor = (status: string) => {
    switch (status) {
      case 'High': return 'text-green-600 bg-green-100 border-green-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100 border-yellow-200';  
      case 'Loss': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-brown-50">
      <Header onSearch={() => {}} searchQuery="" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <CropCategoryIcon category={crop.category} className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{getCropName()}</h1>
                <p className="text-lg text-gray-600 italic">{crop.scientificName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getProfitStatusColor(crop.profitStatus)}>
                {t(`crops.${crop.profitStatus.toLowerCase()}Profit`)}
              </Badge>
              <Badge variant="outline">{crop.category}</Badge>
              <Badge variant="outline">{t(`seasons.${crop.season.toLowerCase()}`)}</Badge>
            </div>
          </div>
          <Button>
            <Star className="h-4 w-4 mr-2" />
            {t('crops.bookmark')}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cultivation">Cultivation</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Stats */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      {t('cropDetails.currentMarketStatus')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">{t('crops.marketPrice')}</p>
                        <p className="text-2xl font-bold text-green-600">₹{crop.latestPrice}/kg</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">{t('crops.acresPlanted')}</p>
                        <p className="text-2xl font-bold">{crop.acresPlanted.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Average Yield</p>
                        <p className="text-2xl font-bold">{crop.averageYieldPerAcre} {crop.yieldUnit}/acre</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">{t('crops.harvestTime')}</p>
                        <p className="text-lg font-semibold">{crop.harvestDays} days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Growing Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Thermometer className="h-5 w-5 text-orange-500" />
                          <div className="flex-1">
                            <p className="font-medium">Temperature</p>
                            <p className="text-sm text-gray-600">
                              {crop.requirements.temperature.min}-{crop.requirements.temperature.max}°C 
                              (Optimal: {crop.requirements.temperature.optimal}°C)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Droplets className="h-5 w-5 text-blue-500" />
                          <div className="flex-1">
                            <p className="font-medium">Rainfall</p>
                            <p className="text-sm text-gray-600">
                              {crop.requirements.rainfall.min}-{crop.requirements.rainfall.max}mm 
                              (Optimal: {crop.requirements.rainfall.optimal}mm)
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-brown-500" />
                          <div className="flex-1">
                            <p className="font-medium">Soil Type</p>
                            <p className="text-sm text-gray-600">{crop.idealSoilType}</p>
                            <p className="text-xs text-gray-500">pH: {crop.requirements.phLevel.min}-{crop.requirements.phLevel.max}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Droplets className="h-5 w-5 text-teal-500" />
                          <div className="flex-1">
                            <p className="font-medium">Humidity</p>
                            <p className="text-sm text-gray-600">{crop.requirements.humidity}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Quick Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Category</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <CropCategoryIcon category={crop.category} className="h-4 w-4" />
                        <span className="text-sm">{crop.category}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Season</p>
                      <p className="text-sm mt-1">{crop.season}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Harvest Period</p>
                      <p className="text-sm mt-1">{crop.harvestTime}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Profit Status</p>
                      <Badge className={`mt-1 ${getProfitStatusColor(crop.profitStatus)}`}>
                        {crop.profitStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Pest/Disease Risk</span>
                          <Badge className={getRiskColor(crop.pestDiseaseRisk)}>
                            {crop.pestDiseaseRisk}
                          </Badge>
                        </div>
                        <Progress 
                          value={crop.pestDiseaseRisk === 'Low' ? 25 : crop.pestDiseaseRisk === 'Medium' ? 50 : 75} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Common Pests</p>
                        <div className="flex flex-wrap gap-1">
                          {crop.commonPests.slice(0, 3).map((pest, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {pest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-600 mb-2">Common Diseases</p>
                        <div className="flex flex-wrap gap-1">
                          {crop.commonDiseases.slice(0, 3).map((disease, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {disease}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('cropDetails.quickActions')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      {t('crops.addToMyCrops')}
                    </Button>
                    <Button className="w-full" variant="outline">
                      {t('cropDetails.setPriceAlert')}
                    </Button>
                    <Button className="w-full" variant="outline">
                      {t('cropDetails.downloadReport')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cultivation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Planting Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Planting Tips</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {crop.plantingTips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Nutritional Value</h4>
                      <p className="text-sm text-gray-600">{crop.nutritionalValue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Post-Harvest</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Storage Requirements</h4>
                      <p className="text-sm text-gray-600">{crop.storageRequirements}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Processing Uses</h4>
                      <div className="flex flex-wrap gap-2">
                        {crop.processingUses?.map((use, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('cropDetails.performanceTrends')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={crop.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="price" orientation="left" />
                        <YAxis yAxisId="acres" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="price" type="monotone" dataKey="averagePrice" stroke="#16a34a" strokeWidth={2} name="Price (₹/kg)" />
                        <Line yAxisId="acres" type="monotone" dataKey="acresPlanted" stroke="#0369a1" strokeWidth={2} name="Acres Planted" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Profit/Loss Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('cropDetails.profitLossAnalysis')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={crop.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value}`, 'Profit/Loss']} />
                        <Bar 
                          dataKey="profitLoss" 
                          fill="#16a34a"
                          name="Profit/Loss (₹)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('cropDetails.marketInsights')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">{t('cropDetails.marketTrends')}</h4>
                      <p className="text-sm text-gray-600">{crop.marketTrends}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">{t('cropDetails.profitPotential')}</h4>
                      <p className="text-sm text-gray-600">{crop.profitPotential}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Price Update</p>
                        <p className="text-xs text-gray-600">Current price: ₹{crop.latestPrice}/kg (+2.5% from last week)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Market Alert</p>
                        <p className="text-xs text-gray-600">Demand increasing in metro cities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Weather Alert</p>
                        <p className="text-xs text-gray-600">Favorable conditions expected</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
