import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoonFeatures: string[];
}

export default function PlaceholderPage({ title, description, comingSoonFeatures }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-brown-50">
      <Header onSearch={() => {}} searchQuery="" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
        </div>

        <Card className="text-center py-12">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Construction className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl mb-2">{title}</CardTitle>
            <p className="text-gray-600 max-w-md mx-auto">{description}</p>
          </CardHeader>
          
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Coming Soon Features:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                {comingSoonFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              This feature is currently under development. Please continue to explore other parts of SmartFarmer.AI
            </p>
            
            <Link to="/">
              <Button>
                Explore Crop Data
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
