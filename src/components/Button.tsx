
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary',
    size = 'md',
    children,
    iconLeft,
    iconRight,
    loading = false,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground shadow hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
            'h-9 px-3': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-11 px-8': size === 'lg',
          },
          'overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r before:from-primary/90 before:to-primary/70 before:opacity-0 before:transition-opacity hover:before:opacity-100 disabled:before:opacity-0',
          variant === 'primary' && 'before:opacity-0',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center">
          {loading && (
            <svg 
              className="mr-2 h-4 w-4 animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {iconLeft && !loading && <span className="mr-2">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ml-2">{iconRight}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
