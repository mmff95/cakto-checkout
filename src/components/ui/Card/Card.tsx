"use client";

import { card, cardHeader, cardContent } from "./Card.styles";
import type { CardProps, CardHeaderProps, CardContentProps } from "./Card.types";

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={card({ className })} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <div className={cardHeader({ className })}>{children}</div>;
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={cardContent({ className })}>{children}</div>;
};
