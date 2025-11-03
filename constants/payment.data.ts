import { PaymentMethod, Withdrawal } from "@/types/Payment";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "Visa",
    lastFour: "4855",
    expiry: "04/24",
    name: "Vako Shvili",
  },
  {
    id: "2",
    type: "Mastercard",
    lastFour: "2855",
    expiry: "04/24",
    name: "Vako Shvili",
  },
  {
    id: "3",
    type: "Paypal",
    lastFour: "1234",
    expiry: "05/25",
    name: "John Doe",
  },
  {
    id: "4",
    type: "Mastercard",
    lastFour: "6789",
    expiry: "06/26",
    name: "Jane Doe",
  },
];

export const withdrawals: Withdrawal[] = [
  {
    id: "1",
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercard",
    amount: "American Express",
    status: "Pending",
  },
  {
    id: "2",
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "American Express",
    status: "Pending",
  },
  {
    id: "3",
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "American Express",
    status: "Completed",
  },
  {
    id: "4",
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercard",
    amount: "American Express",
    status: "Completed",
  },
  {
    id: "5",
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "American Express",
    status: "Canceled",
  },
  {
    id: "6",
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercard",
    amount: "American Express",
    status: "Completed",
  },
  {
    id: "7",
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercard",
    amount: "American Express",
    status: "Completed",
  },
];
