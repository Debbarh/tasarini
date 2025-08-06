
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TransitionWrapperProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: 'left' | 'right' | 'up' | 'down' | 'fade';
  duration?: number;
  className?: string;
}

const TransitionWrapper = ({ 
  children, 
  isVisible, 
  direction = 'fade',
  duration = 300,
  className
}: TransitionWrapperProps) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const getTransitionClasses = () => {
    const baseClasses = "transition-all ease-in-out";
    const durationClass = `duration-${duration}`;
    
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return `${baseClasses} ${durationClass} -translate-x-full opacity-0`;
        case 'right':
          return `${baseClasses} ${durationClass} translate-x-full opacity-0`;
        case 'up':
          return `${baseClasses} ${durationClass} -translate-y-full opacity-0`;
        case 'down':
          return `${baseClasses} ${durationClass} translate-y-full opacity-0`;
        case 'fade':
        default:
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
      }
    }
    
    return `${baseClasses} ${durationClass} translate-x-0 translate-y-0 opacity-100 scale-100`;
  };

  if (!shouldRender) return null;

  return (
    <div className={cn(getTransitionClasses(), className)}>
      {children}
    </div>
  );
};

export default TransitionWrapper;
