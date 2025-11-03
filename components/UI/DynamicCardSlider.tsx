"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { CardContent, CreditCard } from "./CreditCard";
import Button from "./Buttons/Button";
import { PaymentMethod } from "@/types/Payment";
type DynamicCardSliderProps = {
  paymentMethods: PaymentMethod[];
};
const DynamicCardSlider = ({ paymentMethods }: DynamicCardSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Cards</h2>
        <p className="text-gray-500">Revenue</p>
      </div>
      {/* Card Display */}
      {paymentMethods.length > 0 && (
        <CreditCard className="relative  text-white p-5 rounded-xl h-full overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-[190px] h-[190px] bg-[#7470c73b] rounded-full "></div>
          <div className="absolute -top-8 left-5 w-[100px] h-[100px] bg-[#7470c73b] rounded-full "></div>
          <div className="relative">
            <CardContent>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-lg font-bold">
                    {paymentMethods[currentIndex].type}
                  </p>
                  <p className="text-xl tracking-wider">
                    **** **** **** {paymentMethods[currentIndex].lastFour}
                  </p>
                </div>
                <div className="flex justify-between mt-3 text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400">EXPIRES</span>
                    <strong>{paymentMethods[currentIndex].expiry}</strong>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400">CARD NAME</span>{" "}
                    <strong>{paymentMethods[currentIndex].name}</strong>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </CreditCard>
      )}

      {/* Dots Navigation */}
      <div className="flex justify-center mt-3 space-x-2">
        {paymentMethods.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-indigo-500 w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      {/* Add New Card Button */}
      <div className="mt-5 flex justify-center">
        <Button variant="outlined" className="w-full flex items-center gap-2">
          <Plus size={16} />
          Add New Card
        </Button>
      </div>
    </div>
  );
};

export default DynamicCardSlider;
