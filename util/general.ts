/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActiveLinkResult, NavItem, Result } from "@/types";
import { isCurrentPage } from ".";
import { Option } from "@/types/forms";
import { EventCalendar } from "@/types/schedule";

export const errorResult = <T>(type: string): Result<T> => {
  return {
    success: false,
    message: `an error occurred at ${type}`,
  };
};

export const findActiveLinkIndex = (
  links: NavItem[],
  pathname: string,
  isCollapsed?: number | null,
): ActiveLinkResult => {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    // Check if the current link is active
    const path = link.pattern || link.path;
    if (path && isCurrentPage(pathname, path)) {
      const collapsedLinkIndex = links.findIndex(
        (link) => link.id === isCollapsed,
      );
      const collapsedLink = links.find((link) => link.id === isCollapsed);
      const additionalItems = isCollapsed
        ? i > collapsedLinkIndex
          ? collapsedLink?.links?.length || 0
          : 0
        : 0;
      return { activeIndex: i + additionalItems, parentId: null };
    }

    // If the link has sublinks, recursively check them
    if (link.links && link.links.length > 0) {
      const subLinkResult = findActiveLinkIndex(
        link.links,
        pathname,
        isCollapsed,
      );
      if (subLinkResult.activeIndex !== -1) {
        const collapsedLinkIndex = links.findIndex(
          (link) => link.id === isCollapsed,
        );
        const collapsedLink = links.find((link) => link.id === isCollapsed);

        const additionalItems =
          isCollapsed === link.id
            ? subLinkResult.activeIndex + 1
            : i > collapsedLinkIndex
              ? collapsedLink?.links?.length || 0
              : 0;
        return {
          activeIndex: i + additionalItems,
          parentId: link.id,
        };
      }
    }
  }

  // If no active link is found, return -1
  return { activeIndex: -1, parentId: null };
};

export function getExperienceDetail(text: string) {
  if (text?.includes("EXPERIENCE:"))
    return text?.split("EXPERIENCE:")[1].trim();
  return text;
}

export function updateData<T>(data: T, path: string, value: any): T {
  const keys = path.split(".");
  const result = structuredClone(data); // Deep clone to avoid mutating original
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }

    current = current[key];
  }

  current[keys[keys.length - 1]] = value;

  return result;
}

export function isImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".bmp",
      ".svg",
      ".tiff",
    ];
    return imageExtensions.some((ext) =>
      parsedUrl.pathname.toLowerCase().endsWith(ext),
    );
  } catch (error) {
    console.error(error);
    return false; // Not a valid URL at all
  }
}

export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return "var(--primary)";
  if (progress >= 50) return "var(--warning)";
  return "var(--error)";
};

export const getOptionLabel = (options: Option[], value: string | null) => {
  return options.find((x) => x.value === value)?.label;
};

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

export function formatLocation(location: LocationType): string | null {
  const parts: string[] = [];

  if (location.city) {
    parts.push(location.city);
  }
  if (location.state?.name) {
    parts.push(location.state.name);
  }
  if (location.country?.name) {
    parts.push(location.country.name);
  }

  return parts.join(", ") || null;
}

export const exportToCSV = (
  data: any[],
  headers: string[],
  filename: string,
) => {
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => `"${String(row[header] || "").replace(/"/g, '""')}"`)
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const findEventForDayAndTime = (
  day: string,
  time: string,
  events: EventCalendar[],
) => {
  // Convert day string to day index (0-6)
  const dayIndex = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ].indexOf(day.toLowerCase());

  // Convert time to minutes since midnight (e.g., "9:30" -> 570)
  const [hours, minutes] = time.split(":").map(Number);
  const slotMinutes = hours * 60 + minutes;

  return events.find((event) => {
    // Check if event occurs on this day of week
    const eventDay = event.date.getDay();
    if (eventDay !== dayIndex) return false;

    // Check if event overlaps with this time slot
    const [startHours, startMins] = event.startTime.split(":").map(Number);
    const [endHours, endMins] = event.endTime.split(":").map(Number);

    const eventStart = startHours * 60 + startMins;
    const eventEnd = endHours * 60 + endMins;

    // Check if this 30-minute slot falls within the event duration
    return slotMinutes >= eventStart && slotMinutes < eventEnd;
  });
};

export function buildFilterQueryFromSchema<T extends Record<string, any>>(
  schema: Record<string, [string, string]>,
  filters?: T | null,
): string {
  const parts: string[] = [];
  if (!filters) return "";

  for (const [key, value] of Object.entries(filters)) {
    if (value == null || value === "") continue;
    // If key exists in schema → use mapped filter path + operator
    if (key in schema) {
      const [filterPath, operator] = schema[key];
      parts.push(
        `${filterPath}=${operator}:${encodeURIComponent(String(value))}`,
      );
    } else {
      // Otherwise → just use key=value directly (like ?page=1&limit=20)
      parts.push(`${key}=${encodeURIComponent(String(value))}`);
    }
  }

  return parts.length ? `?${parts.join("&")}` : "";
}

export function toQueryString<T>(
  filters:
    | T
    | Record<string, string | number | (string | number)[] | undefined | null>,
): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(
    filters as Record<
      string,
      string | number | (string | number)[] | undefined | null
    >,
  )) {
    if (value == null || value === "") continue; // Skip undefined, null, or empty string

    if (Array.isArray(value)) {
      value
        .filter((v) => v != null && v !== "")
        .forEach((v) => {
          parts.push(`${key}=${v}`);
        });
    } else {
      parts.push(`${key}=${value}`);
    }
  }

  return parts.length ? `?${parts.join("&")}` : "";
}

export function formatCompactNumber(num: number) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "P";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
}

export function formatMoney(
  price: number,
  currency?: string,
  locale?: string,
): string {
  const loc = locale || "en-US";
  const curr = currency || "USD";
  return new Intl.NumberFormat(loc, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 0, // Ensure no decimal numbers for whole numbers
  }).format(price);
}

export function updateItemInArray<T extends { id: string }>(
  array: T[],
  newItem: T,
): T[] {
  const newArray = structuredClone(array); // Deep clone to avoid mutating original
  return newArray.map((item) => (item.id === newItem.id ? newItem : item));
}
