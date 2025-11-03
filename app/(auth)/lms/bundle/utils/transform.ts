import { CourseBundle } from "@/types/courses";
import { BundleFormData } from "./bundle.schema";

export const bundleItemToForm = (
  bundle?: CourseBundle,
  isDuplicate?: boolean,
): (BundleFormData & { id?: string }) | null => {
  if (!bundle) return null;
  return {
    id: isDuplicate ? undefined : bundle?.id,
    title: bundle?.title || "",
    description: bundle?.description || "",
    thumbnail_url: bundle?.thumbnail_url || "",
    slug: bundle?.slug || "",
    is_free: bundle?.is_free || false,
    status: bundle?.status || "draft",
    courseIds: bundle?.courseBundles.map((bundle) => bundle.course.id) || [],
    pricings:
      bundle?.pricings.map((price) => ({
        currency_code: price.currency_code,
        regular_price: price.regular_price,
        sale_price: price.sale_price,
        discount_amount: price.discount_amount,
      })) || [],
  };
};

export const bundleFormToItem = (
  values: Partial<BundleFormData>,
): Partial<CourseBundle> => {
  const result: Partial<CourseBundle> = {
    title: values.title,
    description: values.description,
    thumbnail_url: values.thumbnail_url,
    is_free: values.is_free,
    status: values.status,
    pricings: values.is_free
      ? []
      : (values.pricings as CourseBundle["pricings"]),
  };

  // Remove keys with null or undefined values
  return Object.fromEntries(
    Object.entries(result).filter(
      ([, value]) => value !== null && value !== undefined,
    ),
  ) as Partial<CourseBundle>;
};
