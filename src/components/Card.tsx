
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  children: React.ReactNode;
  hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border p-6',
          {
            'bg-card text-card-foreground shadow-sm': variant === 'default',
            'bg-white/80 backdrop-blur-md border border-white/20 shadow-sm': variant === 'glass',
            'bg-card text-card-foreground shadow-md': variant === 'elevated',
            'transition-all duration-200 hover:-translate-y-1 hover:shadow-md': hoverEffect,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
