import { Notification, Option } from "@/types";
import { CompanySize } from "./enums/company-size.enum";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const DEFAULT_COVER_IMAGE =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
export const AVATAR_IMAGE_PLACEHOLDER = "/images/placeholder-avatar.svg";
export const notification: Notification[] = [
  {
    id: 1,
    typee: "info",
    message: "You have a new message from John.",
    title: "New Message",
    timestamp: new Date().toISOString(),
    read: false,
    user: {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    action: {
      label: "View Message",
      url: "/messages/1",
    },
  },
  {
    id: 2,
    typee: "error",
    message: "There was an issue with your payment.",
    title: "Payment Failed",
    timestamp: new Date().toISOString(),
    read: false,
    user: {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    action: {
      label: "Retry Payment",
      url: "/payment/retry",
    },
  },
];

// countries data
// Country data with flag
export const countries = [
  {
    code: "+20",
    name: "Egypt",
    flag: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="26" height="16"> <rect width="3" height="2" fill="#ce1126"/> <rect y="0.666" width="3" height="0.666" fill="#fff"/> <rect y="1.333" width="3" height="0.666" fill="#000"/><text x="1.5" y="1.2" text-anchor="middle" font-size="0.3" fill="gold" font-family="Arial">&#x1F3F4; </text> </svg>',
  },
  {
    code: "+1",
    name: "USA",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="16">
        <rect width="24" height="24" fill="#B22234"/>
        <g fill="#fff">
          <rect y="2" width="24" height="2"/>
          <rect y="6" width="24" height="2"/>
          <rect y="10" width="24" height="2"/>
          <rect y="14" width="24" height="2"/>
          <rect y="18" width="24" height="2"/>
        </g>
        <rect width="10" height="10" fill="#3C3B6E"/>
      </svg>
    `,
  },
  {
    code: "+44",
    name: "UK",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="16">
        <rect width="24" height="24" fill="#012169"/>
        <path d="M0 0L24 24M24 0L0 24" stroke="#fff" stroke-width="4"/>
        <path d="M0 0L24 24M24 0L0 24" stroke="#C8102E" stroke-width="2"/>
        <path d="M0 10h24v4H0zM10 0v24h4V0z" fill="#fff"/>
        <path d="M0 11h24v2H0zM11 0v24h2V0z" fill="#C8102E"/>
      </svg>
    `,
  },
  {
    code: "+33",
    name: "France",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="8" height="16" fill="#0055A4"/>
        <rect x="8" width="8" height="16" fill="#fff"/>
        <rect x="16" width="8" height="16" fill="#EF4135"/>
      </svg>
    `,
  },
  {
    code: "+49",
    name: "Germany",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="24" height="5.33" y="0" fill="#000"/>
        <rect width="24" height="5.33" y="5.33" fill="#D00"/>
        <rect width="24" height="5.33" y="10.66" fill="#FFCE00"/>
      </svg>
    `,
  },
  {
    code: "+966",
    name: "Saudi Arabia",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="24" height="16" fill="#006c3f"/>
        <text x="12" y="10" text-anchor="middle" font-size="6" fill="#fff" font-family="Arial">لا إله إلا الله</text>
      </svg>
    `,
  },
  {
    code: "+971",
    name: "UAE",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="24" height="5.33" y="0" fill="#00732e"/>
        <rect width="24" height="5.33" y="5.33" fill="#fff"/>
        <rect width="24" height="5.33" y="10.66" fill="#000"/>
        <rect width="6" height="16" fill="#ff0000"/>
      </svg>
    `,
  },
  {
    code: "+81",
    name: "Japan",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="24" height="16" fill="#fff"/>
        <circle cx="12" cy="8" r="4" fill="#bc002d"/>
      </svg>
    `,
  },
];

export const companySizeOptions: Option[] = [
  { value: CompanySize.MICRO, label: "1 to 10 employees" },
  { value: CompanySize.SMALL, label: "11 to 50 employees" },
  { value: CompanySize.MEDIUM, label: "51 to 250 employees" },
  { value: CompanySize.LARGE, label: "251 to 1000 employees" },
  { value: CompanySize.ENTERPRISE, label: "1001+ employees" },
];

export const employerFilters: FilterType[] = [
  {
    name: "Country",
    sectionKey: "country",
    items: [{ label: "Egypt", count: 4, value: "EG" }],
  },
  {
    name: "Sector",
    sectionKey: "sector",
    items: [{ label: "Hospital", count: 3, value: "hospital" }],
  },
  {
    name: "Status",
    sectionKey: "status",
    items: [
      { label: "Active", count: 1, value: "active" },
      { label: "Inactive", count: 4, value: "inactive" },
    ],
  },
  {
    name: "Plan",
    sectionKey: "plan",
    items: [{ label: "Premium", count: 4, value: "premium" }],
  },
  {
    name: "Jobs",
    sectionKey: "jobs",
    items: [{ label: "25 Jobs", count: 4, value: "25" }],
  },
];

export const companySizeList: { name: string; value: CompanySize }[] = [
  { name: "1 to 10 employees", value: CompanySize.MICRO },
  { name: "11 to 50 employees", value: CompanySize.SMALL },
  { name: "51 to 250 employees", value: CompanySize.MEDIUM },
  { name: "251 to 1000 employees", value: CompanySize.LARGE },
  { name: "1001+ employees", value: CompanySize.ENTERPRISE },
];
