import { ExperienceItemData, Invoice, Role } from "@/types";
import { Permission } from "@/types/permissions";
import { ReadonlyURLSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
export const generateUUID = () => {
  return crypto.randomUUID();
};

export function formatDistanceToNow(date: Date | string | null): string {
  if (!date) return "";
  const currentDate = new Date();
  const lastDate = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffDays = Math.floor(diffMinutes / (60 * 24));

  // Check if it's today
  if (diffDays === 0) {
    if (diffMinutes === 0) {
      return "now";
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours === 0) {
      return `${diffMinutes} min`;
    }

    return `${diffHours} h`;
  }

  // Check if it's within the last 15 days
  if (diffDays <= 15) {
    return `${diffDays} d`;
  }

  return formatDate(lastDate);
}

export const formatDate = (
  date?: Date | string,
  options?: { year?: boolean; month?: boolean; day?: boolean },
): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (!date) return "";
  const d = new Date(date);

  const year = options?.year !== false ? d.getFullYear() : "";
  const month = options?.month !== false ? months[d.getMonth()] : "";
  const day = options?.day !== false ? d.getDate() : "";

  const formattedDate = [month, day, year].filter(Boolean).join(", ");
  return formattedDate.trim();
};
export function formatterDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // handle invalid date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
export function formatTime(time: string): string {
  // Remove trailing dot if exists
  const cleanTime = time.replace(/\.$/, "");

  // Split into parts (HH:mm:ss)
  const [hoursStr, minutesStr] = cleanTime.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format with leading zeros
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function formatName(fullName: string): string {
  const nameParts = fullName.trim().split(" ");
  if (nameParts.length < 2) {
    return fullName;
  }
  const firstName = nameParts[0];
  const lastNameInitial = nameParts[nameParts.length - 1]
    .charAt(0)
    .toUpperCase();
  return `${firstName} .${lastNameInitial}`;
}
export function getLastEdit(date: Date): string {
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
  // Check if it's today
  if (diffDays === 0) {
    return "today";
  }

  // Check if it's within the last 15 days
  if (diffDays <= 15) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  return formatDate(date);
}
export function getFullLastEdit(date: Date): string {
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffDays = Math.floor(diffMinutes / (60 * 24));

  // Check if it's today
  if (diffDays === 0) {
    if (diffMinutes === 0) {
      return "now";
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours === 0) {
      return `${diffMinutes} min`;
    }

    return `${diffHours} d`;
  }

  // Check if it's within the last 15 days
  if (diffDays <= 15) {
    return `${diffDays} d`;
  }

  return formatDate(date);
}

export function getLastSegment(url?: string) {
  if (!url) return null; // Handle empty or undefined URLs
  const segments = url.split("/").filter((segment) => segment); // Split and remove empty segments
  if (segments.find((s) => s === "me")) return "me";
  return segments.length > 0 ? segments[segments.length - 1] : null; // Return the last segment
}

export const isCurrentPage = (pathname?: string, pattern?: string): boolean => {
  if (!pathname || !pattern) return false;
  // Handle dynamic segments (e.g., "/user/[id]")
  const regexPattern = pattern
    .replace(/\[.*?\]/g, "[^/]+") // Replace dynamic segments with wildcard regex
    .replace(/\//g, "\\/"); // Escape slashes

  const exactRegex = new RegExp(`^${regexPattern}$`);
  if (exactRegex.test(pathname)) return true;

  // Handle wildcard patterns (e.g., "/dashboard/*")
  if (pattern.includes("*")) {
    const wildcardPattern = pattern.replace(/\*/g, ".*");
    const wildcardRegex = new RegExp(`^${wildcardPattern}`);
    return wildcardRegex.test(pathname);
  }

  return false;
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function divideName(fullName?: string) {
  // Split the full name into parts based on spaces
  if (!fullName) return {};
  const nameParts = fullName.trim().split(" ");
  // The first name is everything before the last part
  const firstName = nameParts.slice(0, nameParts.length - 1).join(" ");
  // The last name is the last part of the name
  const lastName = nameParts[nameParts.length - 1];
  return { firstName, lastName };
}

export function getPermissionNames(roles: Role[]): Permission[] {
  const permissionNames = roles
    .flatMap((role) => role.permissions)
    .map((permission) => permission.name);
  return Array.from(new Set(permissionNames));
}

export const hasDataChanged = <T>(originalData: T, currentData: T): boolean => {
  return JSON.stringify(originalData) !== JSON.stringify(currentData);
};

export const generateInvoicePDF = (invoice: Invoice) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  // Generate HTML for invoice items with images
  const itemsHtml = invoice.items
    .map(
      (item) => `
    <tr>
      <td class="p-3">
        <div class="flex items-center gap-2">
          <img 
            src="${item.image || "/images/placeholder.svg"}" 
            alt="${item.title || "Course image"}"
            class="w-8 h-8 object-cover rounded-sm border border-gray-200"
          />
          <span class="truncate text-sm">${item.title || "Course"}</span>
        </div>
      </td>
      <td class="p-3">${item.quantity}</td>
      <td class="p-3">${invoice.currency.split(" - ")[0]} ${item.price.toFixed(
        2,
      )}</td>
      <td class="p-3 font-medium">
        ${invoice.currency.split(" - ")[0]} ${(
          item.quantity * item.price
        ).toFixed(2)}
      </td>
    </tr>
  `,
    )
    .join("");

  // Calculate totals
  const subtotal =
    invoice.items?.reduce((acc, item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      return acc + price * quantity;
    }, 0) || 0;

  // Calculate total tax from item-specific taxRate
  const tax =
    invoice.items?.reduce((acc, item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      const taxRate = item.taxRate || 0;
      const itemTotal = price * quantity;
      const itemTax = (itemTotal * taxRate) / 100;
      return acc + itemTax;
    }, 0) || 0;

  // Calculate discount value as percentage of subtotal
  const discountPercent = invoice.discount || 0;
  const discountValue = (discountPercent / 100) * subtotal;

  // Final total
  const total = subtotal + tax - discountValue;
  const invoiceHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice ${invoice.invoiceNumber}</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f9fafb;
          margin: 0;
          padding: 0;
        }
        .invoice-container {
          background-color: white;
          margin: 20px auto;
          max-width: 800px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .invoice-header {
          border-top: 8px solid #2ba149;
          padding: 16px;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }
        .invoice-title {
          font-size: 20px;
          font-weight: 600;
        }
        .invoice-body {
          padding: 16px;
        }
        .grid-cols-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .text-gray-400 {
          color: #9ca3af;
        }
        .text-sm {
          font-size: 14px;
        }
        .text-xs {
          font-size: 12px;
        }
        .mt-8 {
          margin-top: 32px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          text-align: left;
          padding: 8px;
          font-weight: 600;
          color: #6b7280;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          text-transform: uppercase;
          font-size: 12px;
        }
        td {
          padding: 12px 8px;
          border-bottom: 1px solid #f3f4f6;
        }
        .flex {
          display: flex;
        }
        .justify-between {
          justify-content: space-between;
        }
        .items-center {
          align-items: center;
        }
        .gap-2 {
          gap: 8px;
        }
        .w-8 {
          width: 32px;
        }
        .h-8 {
          height: 32px;
        }
        .object-cover {
          object-fit: cover;
        }
        .rounded-sm {
          border-radius: 2px;
        }
        .border {
          border-width: 1px;
        }
        .border-gray-200 {
          border-color: #e5e7eb;
        }
        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .font-semibold {
          font-weight: 600;
        }
        .font-bold {
          font-weight: 700;
        }
        .text-gray-600 {
          color: #4b5563;
        }
        .text-gray-800 {
          color: #1f2937;
        }
        .text-green-700 {
          color: #047857;
        }
        .text-lg {
          font-size: 18px;
        }
        .text-base {
          font-size: 16px;
        }
        .text-white {
          color: white;
        }
        .bg-primary {
          background-color: #2ba149;
        }
        .h-12 {
          height: 48px;
        }
        .p-3 {
          padding: 12px;
        }
        .text-xl {
          font-size: 20px;
        }
        .max-w-xs {
          max-width: 320px;
        }
        .space-y-2 > * + * {
          margin-top: 8px;
        }
        .pb-2 {
          padding-bottom: 8px;
        }
        .pt-3 {
          padding-top: 12px;
        }
        .mt-2 {
          margin-top: 8px;
        }
        .flex-wrap {
          flex-wrap: wrap;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background-color: #2ba149;
        }
        .footer .edit{
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap:7px
        }
        @media print {
          body {
            background-color: white;
            margin: 0;
            padding: 0;
          }
          .invoice-container {
            box-shadow: none;
            margin: 0;
            border-radius: 0;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="invoice-header">
          <div class="header-content">
            <div class="logo-placeholder" style="width: 100px; color: #2ba149;">
               <svg
      width="100"
      height="91"
      viewBox="0 0 320 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.8364 23.0021C37.1914 23.0021 42.3431 17.8529 42.3431 11.501C42.3431 5.14919 37.1914 0 30.8364 0C24.4813 0 19.3296 5.14919 19.3296 11.501C19.3296 17.8529 24.4813 23.0021 30.8364 23.0021Z"
        fill="currentColor"
      />
      <path
        d="M55.2626 19.3702C55.2626 19.3702 43.2511 20.5808 31.6434 29.8119H31.3406C31.3406 29.8119 23.7704 21.8419 7.7215 19.0675V27.4411C7.7215 27.4411 22.5592 30.5685 31.0378 38.3872C31.0378 38.3872 31.6434 38.7908 32.0472 38.3872C32.4509 37.9837 40.0212 30.8208 55.2626 27.4411V19.3702Z"
        fill="currentColor"
      />
      <path
        d="M62.8834 28.349C62.8834 28.349 62.9843 77.3797 62.8834 77.3797C62.7825 77.3797 49.9635 82.3736 49.9635 82.3736V46.6598L31.694 58.4131L13.475 46.7607V69.561L31.694 76.7239L46.1784 70.1159V83.1807L31.2903 90.848L0 77.985L0.353284 28.4499C0.353284 28.4499 19.6826 31.8296 31.694 42.9271C31.694 42.9271 39.5166 33.696 62.8329 28.4499L62.8834 28.349Z"
        fill="currentColor"
      />
      <path
        d="M77.1043 17H81.5043L93.6543 39.45L105.504 17H109.904V52H105.254V25.9L96.0543 43.1C95.6543 43.8333 95.271 44.35 94.9043 44.65C94.571 44.95 94.171 45.1 93.7043 45.1H92.3543L81.8043 25.9V52H77.1043V17ZM121.09 52C119.923 52 118.99 51.6667 118.29 51C117.623 50.3333 117.29 49.4167 117.29 48.25V17H141.84V21.15H122.04V32.05H140.34V36.15H122.04V47.85H141.84V52H121.09ZM151.559 52C150.392 52 149.459 51.6667 148.759 51C148.092 50.3333 147.759 49.4167 147.759 48.25V17H163.009C165.542 17 167.759 17.4833 169.659 18.45C171.592 19.4167 173.075 20.8 174.109 22.6C175.175 24.3667 175.709 26.4 175.709 28.7V39.3C175.709 43.4667 174.642 46.6333 172.509 48.8C170.409 50.9333 167.309 52 163.209 52H151.559ZM163.059 47.75C165.659 47.75 167.625 47.0333 168.959 45.6C170.292 44.1667 170.959 42.0333 170.959 39.2V28.8C170.959 26.5333 170.209 24.7167 168.709 23.35C167.242 21.95 165.292 21.25 162.859 21.25H152.509V47.75H163.059ZM182.389 17H187.139V52H182.389V17ZM205.874 52.4C203.541 52.4 201.474 51.8667 199.674 50.8C197.874 49.7333 196.474 48.2333 195.474 46.3C194.508 44.3333 194.024 42.0667 194.024 39.5V29.5C194.024 26.9333 194.524 24.6833 195.524 22.75C196.524 20.7833 197.924 19.2667 199.724 18.2C201.558 17.1333 203.674 16.6 206.074 16.6H211.374C213.641 16.6 215.641 17.1 217.374 18.1C219.141 19.0667 220.491 20.4333 221.424 22.2C222.391 23.9667 222.874 26 222.874 28.3H218.224C218.224 26.0667 217.591 24.2667 216.324 22.9C215.091 21.5333 213.441 20.85 211.374 20.85H206.074C203.908 20.85 202.141 21.65 200.774 23.25C199.441 24.85 198.774 26.9667 198.774 29.6V39.4C198.774 42.0333 199.424 44.15 200.724 45.75C202.024 47.35 203.741 48.15 205.874 48.15H211.274C213.408 48.15 215.108 47.4 216.374 45.9C217.674 44.3667 218.324 42.3667 218.324 39.9H222.974C222.974 42.3667 222.491 44.55 221.524 46.45C220.558 48.35 219.191 49.8167 217.424 50.85C215.658 51.8833 213.608 52.4 211.274 52.4H205.874ZM239.721 52.4C237.288 52.4 235.138 51.8667 233.271 50.8C231.438 49.7333 230.005 48.2333 228.971 46.3C227.971 44.3667 227.471 42.1167 227.471 39.55V29.45C227.471 26.8833 227.971 24.6333 228.971 22.7C230.005 20.7667 231.455 19.2667 233.321 18.2C235.188 17.1333 237.338 16.6 239.771 16.6H245.071C247.505 16.6 249.638 17.1333 251.471 18.2C253.338 19.2667 254.771 20.7667 255.771 22.7C256.805 24.6333 257.321 26.8833 257.321 29.45V39.55C257.321 42.1167 256.805 44.3667 255.771 46.3C254.771 48.2333 253.338 49.7333 251.471 50.8C249.605 51.8667 247.471 52.4 245.071 52.4H239.721ZM244.971 48.15C247.238 48.15 249.071 47.3667 250.471 45.8C251.871 44.2 252.571 42.0833 252.571 39.45V29.55C252.571 26.9167 251.871 24.8167 250.471 23.25C249.071 21.65 247.238 20.85 244.971 20.85H239.821C237.555 20.85 235.721 21.65 234.321 23.25C232.921 24.8167 232.221 26.9167 232.221 29.55V39.45C232.221 42.0833 232.905 44.2 234.271 45.8C235.671 47.3667 237.505 48.15 239.771 48.15H244.971ZM274.999 52C273.532 52 272.482 51.1333 271.849 49.4L259.849 17H264.799L275.099 46.1H275.199L285.549 17H290.499L277.349 52H274.999ZM310.436 42.8H295.836L292.436 52H287.486L301.036 17H303.186C304.619 17 305.636 17.7833 306.236 19.35L318.786 52H313.886L310.436 42.8ZM297.236 38.8H309.036L303.186 23H303.136L297.236 38.8Z"
        fill="currentColor"
      />
      <path
        d="M83.6534 65.6H85.5894L90.9354 75.478L96.1494 65.6H98.0854V81H96.0394V69.516L91.9914 77.084C91.8154 77.4067 91.6467 77.634 91.4854 77.766C91.3387 77.898 91.1627 77.964 90.9574 77.964H90.3634L85.7214 69.516V81H83.6534V65.6ZM103.007 81C102.494 81 102.083 80.8533 101.775 80.56C101.482 80.2667 101.335 79.8633 101.335 79.35V65.6H112.137V67.426H103.425V72.222H111.477V74.026H103.425V79.174H112.137V81H103.007ZM116.413 81C115.9 81 115.489 80.8533 115.181 80.56C114.888 80.2667 114.741 79.8633 114.741 79.35V65.6H121.451C122.566 65.6 123.541 65.8127 124.377 66.238C125.228 66.6633 125.881 67.272 126.335 68.064C126.805 68.8413 127.039 69.736 127.039 70.748V75.412C127.039 77.2453 126.57 78.6387 125.631 79.592C124.707 80.5307 123.343 81 121.539 81H116.413ZM121.473 79.13C122.617 79.13 123.483 78.8147 124.069 78.184C124.656 77.5533 124.949 76.6147 124.949 75.368V70.792C124.949 69.7947 124.619 68.9953 123.959 68.394C123.314 67.778 122.456 67.47 121.385 67.47H116.831V79.13H121.473ZM129.979 65.6H132.069V81H129.979V65.6ZM140.312 81.176C139.285 81.176 138.376 80.9413 137.584 80.472C136.792 80.0027 136.176 79.3427 135.736 78.492C135.311 77.6267 135.098 76.6293 135.098 75.5V71.1C135.098 69.9707 135.318 68.9807 135.758 68.13C136.198 67.2647 136.814 66.5973 137.606 66.128C138.413 65.6587 139.344 65.424 140.4 65.424H142.732C143.729 65.424 144.609 65.644 145.372 66.084C146.149 66.5093 146.743 67.1107 147.154 67.888C147.579 68.6653 147.792 69.56 147.792 70.572H145.746C145.746 69.5893 145.467 68.7973 144.91 68.196C144.367 67.5947 143.641 67.294 142.732 67.294H140.4C139.447 67.294 138.669 67.646 138.068 68.35C137.481 69.054 137.188 69.9853 137.188 71.144V75.456C137.188 76.6147 137.474 77.546 138.046 78.25C138.618 78.954 139.373 79.306 140.312 79.306H142.688C143.627 79.306 144.375 78.976 144.932 78.316C145.504 77.6413 145.79 76.7613 145.79 75.676H147.836C147.836 76.7613 147.623 77.722 147.198 78.558C146.773 79.394 146.171 80.0393 145.394 80.494C144.617 80.9487 143.715 81.176 142.688 81.176H140.312ZM158.647 76.952H152.223L150.727 81H148.549L154.511 65.6H155.457C156.088 65.6 156.535 65.9447 156.799 66.634L162.321 81H160.165L158.647 76.952ZM152.839 75.192H158.031L155.457 68.24H155.435L152.839 75.192ZM165.849 81C165.335 81 164.925 80.8533 164.617 80.56C164.323 80.2667 164.177 79.8707 164.177 79.372V65.6H166.267V79.152H174.627V81H165.849ZM187.384 81.176C186.358 81.176 185.448 80.9413 184.656 80.472C183.864 80.0027 183.248 79.3427 182.808 78.492C182.383 77.6267 182.17 76.6293 182.17 75.5V71.1C182.17 69.9707 182.39 68.9807 182.83 68.13C183.27 67.2647 183.886 66.5973 184.678 66.128C185.485 65.6587 186.416 65.424 187.472 65.424H189.804C190.802 65.424 191.682 65.644 192.444 66.084C193.222 66.5093 193.816 67.1107 194.226 67.888C194.652 68.6653 194.864 69.56 194.864 70.572H192.818C192.818 69.5893 192.54 68.7973 191.982 68.196C191.44 67.5947 190.714 67.294 189.804 67.294H187.472C186.519 67.294 185.742 67.646 185.14 68.35C184.554 69.054 184.26 69.9853 184.26 71.144V75.456C184.26 76.6147 184.546 77.546 185.118 78.25C185.69 78.954 186.446 79.306 187.384 79.306H189.76C190.699 79.306 191.447 78.976 192.004 78.316C192.576 77.6413 192.862 76.7613 192.862 75.676H194.908C194.908 76.7613 194.696 77.722 194.27 78.558C193.845 79.394 193.244 80.0393 192.466 80.494C191.689 80.9487 190.787 81.176 189.76 81.176H187.384ZM202.277 81.176C201.207 81.176 200.261 80.9413 199.439 80.472C198.633 80.0027 198.002 79.3427 197.547 78.492C197.107 77.6413 196.887 76.6513 196.887 75.522V71.078C196.887 69.9487 197.107 68.9587 197.547 68.108C198.002 67.2573 198.64 66.5973 199.461 66.128C200.283 65.6587 201.229 65.424 202.299 65.424H204.631C205.702 65.424 206.641 65.6587 207.447 66.128C208.269 66.5973 208.899 67.2573 209.339 68.108C209.794 68.9587 210.021 69.9487 210.021 71.078V75.522C210.021 76.6513 209.794 77.6413 209.339 78.492C208.899 79.3427 208.269 80.0027 207.447 80.472C206.626 80.9413 205.687 81.176 204.631 81.176H202.277ZM204.587 79.306C205.585 79.306 206.391 78.9613 207.007 78.272C207.623 77.568 207.931 76.6367 207.931 75.478V71.122C207.931 69.9633 207.623 69.0393 207.007 68.35C206.391 67.646 205.585 67.294 204.587 67.294H202.321C201.324 67.294 200.517 67.646 199.901 68.35C199.285 69.0393 198.977 69.9633 198.977 71.122V75.478C198.977 76.6367 199.278 77.568 199.879 78.272C200.495 78.9613 201.302 79.306 202.299 79.306H204.587ZM212.839 65.6H214.775L220.121 75.478L225.335 65.6H227.271V81H225.225V69.516L221.177 77.084C221.001 77.4067 220.832 77.634 220.671 77.766C220.524 77.898 220.348 77.964 220.143 77.964H219.549L214.907 69.516V81H212.839V65.6ZM230.521 65.6H232.457L237.803 75.478L243.017 65.6H244.953V81H242.907V69.516L238.859 77.084C238.683 77.4067 238.514 77.634 238.353 77.766C238.206 77.898 238.03 77.964 237.825 77.964H237.231L232.589 69.516V81H230.521V65.6ZM253.108 81.176C252.111 81.176 251.231 80.9633 250.468 80.538C249.72 80.098 249.141 79.482 248.73 78.69C248.32 77.898 248.114 76.9887 248.114 75.962V65.6H250.204V75.962C250.204 76.9593 250.468 77.766 250.996 78.382C251.539 78.998 252.243 79.306 253.108 79.306H255.462C256.328 79.306 257.024 78.998 257.552 78.382C258.095 77.766 258.366 76.9593 258.366 75.962V65.6H260.456V75.962C260.456 76.9887 260.251 77.898 259.84 78.69C259.43 79.482 258.843 80.098 258.08 80.538C257.332 80.9633 256.46 81.176 255.462 81.176H253.108ZM263.628 65.6H265.564L273.704 77.634V65.6H275.75V81H273.836L265.674 69.01V81H263.628V65.6ZM279.231 65.6H281.321V81H279.231V65.6ZM288.574 67.426H283.69V65.6H295.548V67.426H290.664V81H288.574V67.426ZM301.97 75.06L296.294 65.6H298.56L303.026 73.146L307.492 65.6H309.758L304.082 75.06V81H301.97V75.06Z"
        fill="currentColor"
      />
    </svg>
            </div>
            <h2 class="invoice-title">${invoice.invoiceNumber}</h2>
          </div>
        </div>

        <div class="invoice-body">
          <div class="grid-cols-2">
            <div>
              <p class="text-gray-400 text-sm">BILLED TO</p>
              <p class="text-sm">${invoice.student.name || "unknown"}</p>
              <p class="text-sm">${invoice.student.email || "unknown"}</p>
            </div>

            <div>
              <p class="text-gray-400 text-sm">DUE DATE</p>
              <p class="text-sm">${invoice.dueDate || "unknown"}</p>
            </div>

            <div>
              <p class="text-gray-400 text-sm">DESCRIPTION</p>
              <p class="text-sm">${invoice.subject || "unknown"}</p>
              <p class="text-sm">${invoice.description || "unknown"}</p>
            </div>

            <div>
              <p class="text-gray-400 text-sm">CURRENCY</p>
              <p class="text-sm">${invoice.currency || "unknown"}</p>
            </div>
          </div>
          <div class="mt-8">
          ${
            invoice.items.length > 0
              ? `     <table>
              <thead>
                <tr>
                  <th class="text-left font-semibold text-sm px-2 py-2">Description</th>
                  <th class="text-left font-semibold text-sm px-2 py-2">Qty</th>
                  <th class="text-left font-semibold text-sm px-2 py-2">Unit</th>
                  <th class="text-left font-semibold text-sm px-2 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>`
              : ""
          }
       

         <div style="display: flex; justify-content: flex-end;">
  <div style="width: 100%; max-width: 320px; padding: 16px; background: #fff; border-radius: 8px;  font-size: 14px; color: #374151;">

    <!-- Subtotal -->
    <div style="display: flex; justify-content: space-between;  padding-bottom: 8px; margin-bottom: 8px;">
      <span style="color: #6b7280; font-size: 14px;">Subtotal</span>
      <span style="font-weight: 600; font-size: 14px; color: #1f2937;">
        ${invoice.currency.split(" - ")[0]} ${subtotal.toFixed(2)}
      </span>
    </div>

    <!-- Tax -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
      <span style="color: #6b7280; font-size: 14px;">Tax</span>
      <span style="font-weight: 700; font-size: 14px;">
        ${invoice.currency.split(" - ")[0]} ${tax.toFixed(2)}
      </span>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
      <span style="color: #6b7280; font-size: 14px;">Discount</span>
      <span style="font-weight: 700; font-size: 14px;">
         ${discountPercent}%
      </span>
    </div>

    <!-- Total -->
    <div style="display: flex; justify-content: space-between; padding-top: 12px; margin-top: 12px;">
      <span style="font-weight: 600; font-size: 14px; color: #1f2937;">Total</span>
      <span style="font-weight: 700; font-size: 14px; color: #047857;">
        ${invoice.currency.split(" - ")[0]} ${total.toFixed(2)}
      </span>
    </div>

  </div>
</div>

          </div>
        </div>

        <div class="footer">
          <h2 class="font-bold text-white text-xl">Thank You!</h2>
          <div class="edit flex gap-3 flex-wrap">
            <span class="text-white text-sm">+800 1503 345968</span>
            <span class="text-white text-sm">www.medicova.com</span>
          </div>
        </div>
      </div>

      <div class="no-print" style="text-align: center; margin-top: 20px;">
        <button onclick="window.print()" style="
          padding: 12px 24px;
          background-color: #2ba149;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        ">
          Print Invoice
        </button>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 500);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(invoiceHTML);
  printWindow.document.close();
};

export const getDuration = ({
  startDate,
  endDate,
}: Partial<ExperienceItemData>): string => {
  if (!startDate) return "";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const durationInMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();
  const years = Math.floor(durationInMonths / 12);
  const months = durationInMonths % 12;
  if (years === 0) {
    return months > 0 ? `(${months} month)` : "";
  }
  return `(${years} y ${months} m)`;
};
