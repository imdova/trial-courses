import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const CreditCard = ({ children, className, onClick }: CardProps) => (
  <div
    onClick={onClick}
    className={`bg-[#463fca] shadow-md rounded-lg p-4 h-full ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }: CardProps) => (
  <div className={`p-2 h-[160px] ${className}`}>{children}</div>
);
