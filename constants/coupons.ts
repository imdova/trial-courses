import { Coupon } from "@/types";

export const coupons: Coupon[] = [
  {
    id: "1",
    offerName: "Dival Offer",
    mode: "Coupon",
    offerType: "Flat",
    amount: "Rs.200",
    startDate: "31-05-2015",
    endDate: "15-06-2015",
    status: "Active",
    totalUsage: 2570,
  },
  {
    id: "2",
    offerName: "Weekend offer",
    mode: "Voucher",
    offerType: "Percentage",
    amount: "10%",
    startDate: "31-05-2015",
    endDate: "02-06-2015",
    status: "Expired",
    totalUsage: 875,
  },
  {
    id: "3",
    offerName: "Summer Sale",
    mode: "Coupon",
    offerType: "Percentage",
    amount: "15%",
    startDate: "01-07-2023",
    endDate: "31-07-2023",
    status: "Inactive",
    totalUsage: 1200,
  },
];
