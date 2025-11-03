export interface CourseTransaction {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  item: string; // item course or bundle
  type: "course" | "bundle";
  currency: string;
  amount: number;
  method: "Credit Card" | "Visa" | "Cash" | "Wallet" | "InstaPay" | "PayPal";
  created_at: string;
}
