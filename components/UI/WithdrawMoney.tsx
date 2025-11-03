"use client";

import { useState } from "react";
import { Check, CreditCard, CreditCardIcon } from "lucide-react";
import Button from "./Buttons/Button";
import { PaymentMethod } from "@/types/Payment";
type WithdrawMoneyProps = {
  paymentMethods: PaymentMethod[];
};
function Card({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={`${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}

export default function WithdrawMoney({ paymentMethods }: WithdrawMoneyProps) {
  const [selected, setSelected] = useState(paymentMethods[0]);
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold">Withdraw your money</h2>
      <p className="text-sm text-gray-500 mt-1">Payment method:</p>

      <div className="space-y-3 mt-3">
        {paymentMethods.map((method, index) => (
          <Card
            key={index}
            className={`flex items-center p-2 border rounded-md cursor-pointer ${
              selected === method ? "border-green-500" : ""
            }`}
            onClick={() => setSelected(method)}>
            <CardContent className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                {method.type === "Visa" || method.type === "Mastercard" ? (
                  <CreditCard className="text-blue-600" />
                ) : (
                  <CreditCardIcon className="text-blue-500" />
                )}
                <div>
                  <p className="font-medium">
                    {method.type === "Paypal"
                      ? "PayPal"
                      : `${method.type.toUpperCase()} **** ${method.lastFour}`}
                  </p>
                  {method.expiry && (
                    <p className="text-sm text-gray-500">{method.expiry}</p>
                  )}
                </div>
              </div>
              {selected === method && (
                <div className="flex justify-center items-center w-6 h-6 rounded-full bg-primary">
                  <Check size={15} className="text-white" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6">
        <div>
          <p className="text-xl font-semibold">$16,593.00</p>
          <p className="text-sm text-gray-500">Current Balance</p>
        </div>
        <Button
          size="md"
          className="bg-green-500 hover:bg-green-600 text-white">
          Withdraw Money
        </Button>
      </div>
    </div>
  );
}
