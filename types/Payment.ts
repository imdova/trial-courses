export interface PaymentMethod {
  id: string;
  type: "Visa" | "Mastercard" | "Paypal";
  lastFour: string;
  expiry: string;
  name: string;
}

export interface Withdrawal {
  id: string;
  date: string;
  method: string;
  amount: string;
  status: "Pending" | "Completed" | "Canceled";
}
