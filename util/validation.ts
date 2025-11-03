export const PAYMENT_CARD_VALIDATION_RULES = {
  name: {
    required: "Name on card is required",
    pattern: {
      value: /^[a-zA-Z\s]*$/,
      message: "Please enter a valid name",
    },
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
  },
  cardNumber: {
    required: "Card number is required",
    pattern: {
      value: /^[0-9]{16}$/,
      message: "Please enter a valid 16-digit card number",
    },
  },
  expirationDate: {
    required: "Expiration date is required",
    pattern: {
      value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      message: "Please enter a valid date (MM/YY)",
    },
  },
  cvc: {
    required: "CVC is required",
    pattern: {
      value: /^[0-9]{3,4}$/,
      message: "Please enter a valid CVC (3-4 digits)",
    },
  },
};
