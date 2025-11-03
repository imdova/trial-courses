export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  date: string;
  time: string;
  ticketSoldPercentage: number;
  status: "active" | "draft" | "past";
  price: number;
}
