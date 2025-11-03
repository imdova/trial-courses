export type CartFormValues = {
  payment: string;
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  saveInfo: boolean;
};

export interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  totalPrice: number;
  description: string;
  quantity: number;
  stock?: number;
  discountedPrice?: number;
}
