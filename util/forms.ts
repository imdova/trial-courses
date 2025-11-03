/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "@/types";
import { ErrorField, FieldConfig, FileWithPreview } from "@/types/forms";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FieldErrors, Path } from "react-hook-form";

export const isValidEgyptianPhoneNumber = (phone: string): boolean => {
  const egyptianPhoneRegex = /^(?:\+20|0020)?(10|11|12|15)\d{8}$/;
  return egyptianPhoneRegex.test(phone);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber || "");
  if (!phoneNumberObj || !phoneNumberObj.isValid()) {
    return false;
  }
  if (phoneNumberObj.country === "EG") {
    return isValidEgyptianPhoneNumber(phoneNumberObj.number);
  }
  return true;
};

export function getNestedValue<T>(formValues: T, path: Path<T>): any {
  const keys = path.split(".") as (keyof T)[];
  const value = keys.reduce((current: any, key: keyof T) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, formValues);
  return value;
}

export function getDependsOnLabel(
  dependsOn: FieldConfig | null | undefined,
): string | undefined {
  if (!dependsOn) {
    return undefined;
  }

  if (dependsOn.textFieldProps?.label) {
    return typeof dependsOn.textFieldProps.label === "string"
      ? dependsOn.textFieldProps.label.replace("*", "")
      : undefined;
  }

  if (dependsOn.label) {
    return dependsOn.label.replace("*", "");
  }

  return undefined;
}

export const isFileWithPreview = (value: any): value is FileWithPreview => {
  return value instanceof File && "preview" in value;
};

export function toStringArray(data: any): string[] {
  if (data == null) {
    return [];
  }

  if (typeof data === "string") {
    // Split by comma if present
    return data.includes(",")
      ? data
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      : [data];
  }

  if (
    typeof data === "number" ||
    typeof data === "boolean" ||
    typeof data === "bigint" ||
    typeof data === "symbol"
  ) {
    return [String(data)];
  }

  if (Array.isArray(data)) {
    return data.map((item) => String(item));
  }

  if (typeof data === "object") {
    return Object.entries(data).map(
      ([key, value]) => `${key}: ${String(value)}`,
    );
  }

  return [];
}

function deepClone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as unknown as T;
  }

  if (value instanceof File) {
    // Manually reconstruct the File object and copy custom fields
    const file = new File([value], value.name, {
      type: value.type,
      lastModified: value.lastModified,
    });

    // Manually copy the preview field if present
    if ("preview" in value) {
      (file as FileWithPreview).preview = (value as FileWithPreview).preview;
    }

    return file as unknown as T;
  }

  if (value && typeof value === "object") {
    const clonedObj: any = {};
    for (const key in value) {
      clonedObj[key] = deepClone((value as any)[key]);
    }
    return clonedObj;
  }

  return value;
}

export function updateData<T>(data: T, path: string, value: any): T {
  const keys = path.split(".");
  const result = deepClone(data); // Deep clone to avoid mutating original
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

export const getDefaultValues = (
  fields: FieldConfig[],
  initialValues: Record<string, any>,
): Record<string, any> => ({
  ...fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.type === "checkbox" ? false : "",
    }),
    {},
  ),
  ...initialValues,
});

export function validateData(
  data: Record<string, any>,
  rules: ValidationRule[],
): true | ErrorField[] {
  const errors: ErrorField[] = [];

  for (const rule of rules) {
    const value = getNestedValue(data, rule.field);
    const isValid =
      rule.validate?.(value) ??
      ((typeof value === "string" || typeof value === "number") &&
        rule.regex?.test(String(value)));

    if (!isValid) {
      errors.push(rule);
    }
  }

  return errors.length === 0 ? true : errors;
}

export const findCutIndex = (html: string, limit: number) => {
  if (html.length <= limit) return html.length;
  let cutIndex = limit;

  // Move forward until a whitespace or end of string
  while (cutIndex < html.length && !/\s/.test(html[cutIndex])) {
    cutIndex++;
  }
  return cutIndex;
};
export function validateFieldsFromConfig(
  fields: (FieldConfig & { tab?: string | number })[],
  data: Record<string, any>,
): true | ErrorField[] {
  const rules: ValidationRule[] = [];

  for (const field of fields) {
    const label = field.label || field.name;

    // Required check
    if (field.required) {
      rules.push({
        field: field.name,
        tab: field.tab,
        validate: (val) => val !== undefined && val !== "" && val !== null,
        message: `${label} is required`,
      });
    }

    // Custom validation
    if (field.rules?.validate) {
      rules.push({
        field: field.name,
        tab: field.tab,
        validate: field.rules.validate,
        message: field.rules.message || `${label} is invalid`,
      });
    }

    // Regex rule
    if (field.rules?.regex) {
      rules.push({
        field: field.name,
        tab: field.tab,
        regex: field.rules.regex,
        message: field.rules.message || `${label} format is invalid`,
      });
    }
  }

  return validateData(data, rules);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces & non-word chars with -
    .replace(/^-+|-+$/g, ""); // Trim - from start and end
}

// Check if value is primitive (null, undefined, string, number, boolean, symbol, bigint)
function isPrimitive(value: unknown): boolean {
  return (
    value === null || (typeof value !== "object" && typeof value !== "function")
  );
}

export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    // It's just the same object. No need to compare.
    return true;
  }

  if (isPrimitive(obj1) && isPrimitive(obj2)) {
    // Compare primitives
    return obj1 === obj2;
  }

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    // One is primitive, the other is object or null
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Compare objects with same number of keys
  for (const key of keys1) {
    if (!(key in obj2)) {
      // Other object doesn't have this prop
      return false;
    }
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function getYouTubeVideoId(url?: string | null): string | null {
  if (!url) {
    return null;
  }
  try {
    const parsedUrl = new URL(url);
    // Case 1: Standard YouTube link ?v=ID
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }
    // Case 2: Short link youtu.be/ID
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1); // remove leading "/"
    }
    return null;
  } catch {
    return null;
  }
}

type DiffItem = {
  key: string;
  value1: any;
  value2: any;
  difference: string;
};

export function diffObjects(
  obj1: any,
  obj2: any,
  options: { ignoreMissing?: boolean } = {},
): DiffItem[] {
  const diffs: DiffItem[] = [];

  function compare(o1: any, o2: any, path = "") {
    const allKeys = new Set([
      ...Object.keys(o1 || {}),
      ...Object.keys(o2 || {}),
    ]);

    for (const key of allKeys) {
      const fullPath = path ? `${path}.${key}` : key;
      const val1 = o1 ? o1[key] : undefined;
      const val2 = o2 ? o2[key] : undefined;

      if (val1 === undefined && val2 !== undefined) {
        if (!options.ignoreMissing) {
          diffs.push({
            key: fullPath,
            value1: val1,
            value2: val2,
            difference: "missing in obj1",
          });
        }
      } else if (val1 !== undefined && val2 === undefined) {
        if (!options.ignoreMissing) {
          diffs.push({
            key: fullPath,
            value1: val1,
            value2: val2,
            difference: "missing in obj2",
          });
        }
      } else if (
        typeof val1 === "object" &&
        val1 !== null &&
        typeof val2 === "object" &&
        val2 !== null
      ) {
        // Recurse for nested objects
        compare(val1, val2, fullPath);
      } else if (val1 !== val2) {
        diffs.push({
          key: fullPath,
          value1: val1,
          value2: val2,
          difference: "different value",
        });
      }
    }
  }

  compare(obj1, obj2);
  return diffs;
}

export function hasFormErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export const getSalePrice = (regular: number, discount: number) =>
  +(regular * (1 - discount / 100)).toFixed(2);

export const getDiscountAmount = (regular: number, sale: number) =>
  regular > 0 ? +(((regular - sale) / regular) * 100).toFixed(2) : 0;

export function getDisabledDates(
  startDate?: Date | string,
  isTomorrow?: boolean,
) {
  isTomorrow = isTomorrow || true;
  const dateToCompare = startDate ? new Date(startDate) : new Date();
  const baseDate = new Date(dateToCompare.setHours(0, 0, 0, 0));
  const nextDay = new Date(baseDate);
  nextDay.setDate(baseDate.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);
  return (date: Date) => (isTomorrow ? date < nextDay : date < baseDate);
}

export function getDisabledDatesRange(
  startDate?: Date | string,
  endDate?: Date | string,
  isTomorrow?: boolean,
) {
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  if (end && isTomorrow) {
    end.setDate(end.getDate() + 1);
    end.setHours(0, 0, 0, 0);
  }

  return (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    // 1 Start + End: disable dates outside the range
    if (start && end) return d < start || d > end;

    // 2 Start only: disable dates before the start
    if (start) return d < start;

    // 3 End only: disable dates after the end
    if (end) return d > end;

    // 4 Otherwise: nothing disabled (except future dates)
    return false;
  };
}

export function formatDateRange(
  value1?: Date | null,
  value2?: Date | null,
): string {
  if (!value1 || !value2) return "";
  const sameMonth =
    value1.getMonth() === value2.getMonth() &&
    value1.getFullYear() === value2.getFullYear();

  const formatDay = (date: Date) => String(date.getDate()).padStart(2, "0");
  const formatMonth = (date: Date) =>
    date.toLocaleString("en-US", { month: "short" }); // e.g. "Oct"

  if (sameMonth) {
    // Example: "05 to 10 Oct"
    return `${formatDay(value1)} to ${formatDay(value2)} ${formatMonth(value1)}`;
  }

  // Example: "05 Oct to 10 Dec"
  return `${formatDay(value1)} ${formatMonth(value1)} to ${formatDay(value2)} ${formatMonth(value2)}`;
}
