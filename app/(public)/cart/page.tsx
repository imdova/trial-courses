"use client";
import { OrderSummary } from "@/components/cart/order-summary";
import { PaymentForm } from "@/components/cart/PaymentForm";
import { useAppSelector } from "@/store/hooks";
import { CartFormValues } from "@/types/cart";
import { useState } from "react";

const CartPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { courses, products, totals } = useAppSelector((state) => state.cart);
  const handleSubmit = async (data: CartFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form Submitted:", data);
      // Handle successful submission (e.g., show success toast, redirect)
    } catch (error) {
      setSubmitError(
        "An error occurred while processing your payment. Please try again.",
      );
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 md:px-5">
      <h1 className="mb-4 text-center text-4xl font-bold md:text-start md:text-5xl">
        Courses Cart
      </h1>
      {submitError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {submitError}
        </div>
      )}
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="box-content w-3/4">
          <h2 className="mb-6 text-xl font-semibold">Checkout</h2>
          <PaymentForm onSubmit={handleSubmit} loading={isSubmitting} />
        </div>
        <OrderSummary
          items={[...courses, ...products]}
          subtotal={totals.grandTotal}
          discount={0}
          tax={5}
        />
      </div>
    </div>
  );
};

export default CartPage;
