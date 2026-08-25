import React from 'react';
import { cn } from '../../utils/cn';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-3xl border bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-sm',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';
