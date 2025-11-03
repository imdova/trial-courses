import { useForm } from "react-hook-form";

import CustomInput from "../UI/form/CustomInput";
import { CartFormValues } from "@/types/cart";
import { PaymentMethodSelect } from "./payment-select";
import { PAYMENT_CARD_VALIDATION_RULES } from "@/util/validation";

type PaymentFormProps = {
  onSubmit: (data: CartFormValues) => void;
  loading: boolean;
};

export const PaymentForm = ({ onSubmit, loading }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CartFormValues>({
    mode: "onBlur",
    defaultValues: {
      saveInfo: false,
    },
  });

  const handleFormSubmit = (data: CartFormValues) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error("Payment submission error:", error);
      // Handle error appropriately (e.g., show error toast)
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
      <PaymentMethodSelect register={register} errors={errors} />

      <CustomInput
        isSearch={false}
        label="Name On Card"
        error={errors.name?.message}
        helperText="Enter the name exactly as it appears on your card"
        {...register("name", PAYMENT_CARD_VALIDATION_RULES.name)}
      />

      <CustomInput
        isSearch={false}
        label="Card Number"
        error={errors.cardNumber?.message}
        helperText="Enter the 16-digit number on the front of your card"
        {...register("cardNumber", PAYMENT_CARD_VALIDATION_RULES.cardNumber)}
      />

      <div className="flex gap-4">
        <CustomInput
          isSearch={false}
          label="Expiration Date"
          error={errors.expirationDate?.message}
          helperText="MM/YY format"
          {...register(
            "expirationDate",
            PAYMENT_CARD_VALIDATION_RULES.expirationDate
          )}
        />

        <CustomInput
          isSearch={false}
          label="CVC"
          error={errors.cvc?.message}
          helperText="3 or 4 digits on the back of your card"
          {...register("cvc", PAYMENT_CARD_VALIDATION_RULES.cvc)}
        />
      </div>

      <label
        htmlFor="saveInfo"
        className="flex items-center gap-2.5 text-sm mb-5 cursor-pointer">
        <input
          type="checkbox"
          {...register("saveInfo")}
          className="peer hidden"
          id="saveInfo"
        />
        <div className="h-5 w-5 flex rounded-md border border-gray-300 bg-white peer-checked:bg-primary transition">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-5 h-5 stroke-white"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 12.6111L8.92308 17.5L20 6.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </svg>
        </div>
        Save my information for faster checkout
      </label>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-black transition">
        {loading ? "Loading..." : "Confirm Payment"}
      </button>
    </form>
  );
};
