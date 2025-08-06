
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home, MapPin, Sparkles, Calendar } from "lucide-react";

interface NavigationBreadcrumbProps {
  currentStep: string;
}

const stepConfig = {
  'select': { label: 'Accueil', icon: Home },
  'plan': { label: 'Planifier', icon: MapPin },
  'inspire': { label: 'Inspiration', icon: Sparkles },
  'itinerary': { label: 'Itinéraire', icon: Calendar },
};

const NavigationBreadcrumb = ({ currentStep }: NavigationBreadcrumbProps) => {
  const getStepOrder = (step: string) => {
    const order = { 'select': 0, 'plan': 1, 'inspire': 1, 'itinerary': 2 };
    return order[step as keyof typeof order] || 0;
  };

  const currentOrder = getStepOrder(currentStep);
  const config = stepConfig[currentStep as keyof typeof stepConfig];

  if (!config) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Accueil
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {currentOrder >= 1 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {currentOrder === 1 ? (
                <BreadcrumbPage className="flex items-center gap-2">
                  <config.icon className="w-4 h-4" />
                  {config.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="#" className="flex items-center gap-2">
                  <config.icon className="w-4 h-4" />
                  {config.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        )}

        {currentOrder >= 2 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Itinéraire
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavigationBreadcrumb;
