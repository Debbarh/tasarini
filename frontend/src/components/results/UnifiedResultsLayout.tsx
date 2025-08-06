
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface UnifiedResultsLayoutProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  mode: 'plan' | 'inspire';
  onBack: () => void;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

const UnifiedResultsLayout = ({
  title,
  subtitle,
  backgroundImage,
  mode,
  onBack,
  children,
  headerActions
}: UnifiedResultsLayoutProps) => {
  const modeConfig = {
    plan: {
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      buttonGradient: 'from-blue-600 to-purple-600',
      icon: '✈️'
    },
    inspire: {
      gradient: 'from-orange-500 via-rose-500 to-pink-500',
      buttonGradient: 'from-orange-500 to-rose-600',
      icon: '✨'
    }
  };

  const config = modeConfig[mode];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating decorative elements like homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 overflow-hidden">
        {backgroundImage && (
          <div className="absolute inset-0">
            <img
              src={backgroundImage}
              alt={title}
              className="w-full h-64 object-cover opacity-30"
            />
          </div>
        )}
        
        <div className="relative z-10 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button
                onClick={onBack}
                variant="ghost"
                size="lg"
                className="text-gray-700 hover:text-purple-600 hover:bg-white/80 backdrop-blur-sm border border-white/30 transition-all duration-300 shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              
              {headerActions && (
                <div className="flex gap-3">
                  {headerActions}
                </div>
              )}
            </div>

            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {config.icon} {title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-0">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnifiedResultsLayout;
