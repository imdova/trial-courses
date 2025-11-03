export type educationAuthority = {
  name: string;
  image: string;
};
export type Seller = {
  id: string;
  name: string;
  rating: number;
  image?: string;
  isActive: boolean;
  status: "active" | "pending" | "draft" | "best_seller";
  positiveRatings?: string;
  itemShown?: number;
  partnerSince?: string;
  returnPolicy?: string;
  products?: number;
  customers?: number;
  sales?: number;
  country?: string;
  city?: string;
};
interface CategoryType {
  id: string;
  slug?: string;
  url?: string;
  title: string;
  image: string;
  isSale?: boolean;
  subcategory?: { title: string; url?: string };
}
export type Exams = {
  id: string;
  images: string[];
  title: string;
  category: CategoryType;
  authority: educationAuthority;
  qustions: number;
  exam_date: string;
  providers: number;
  price: number;
  discountedPrice?: number;
  stock?: number;
  description?: string;
  rating?: number;
  reviewCount?: number;
  bankOffers?: {
    title: string;
    url: string;
  }[];
  sellers?: Seller;
  highlights?: string[];
  overview_desc?: string;
  specifications?: { label: string; content: string }[];
  nudges?: string[];
};

// Type definition
export type Review = {
  id: string;
  rating: number;
  content: string;
  author: {
    id: string;
    name: string;
    imgUrl: string;
  };
  date: string;
};
