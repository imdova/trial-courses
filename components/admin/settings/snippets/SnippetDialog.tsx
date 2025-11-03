"use client";

import FormModal from "@/components/FormModal/FormModal";
import { FieldConfig } from "@/types/forms";

interface Snippet {
  id: string; // Unique identifier
  name: string; // Friendly name (e.g. "Google Analytics v4")
  position: "head" | "footer"; // Where to inject
  content: string; // The actual code snippet
  isActive: boolean; // Is the snippet enabled?
  type: "script" | "style" | "meta" | "custom"; // Type of snippet (optional but useful)
  order: number; // Injection priority/order
  createdAt: string; // Timestamp
  updatedAt: string; // Timestamp
  notes?: string; // Admin notes (optional)
  pages?: string[]; // Optional: List of pathnames where it applies, empty = all
}

interface SnippetFormValues {
  name: string;
  notes?: string;
  position: "head" | "footer";
  type: "script" | "style" | "meta" | "custom";
  order: number;
  isActive: boolean;
  pages?: string[];
  content: string;
}

interface SnippetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snippet?: Snippet;
  onSubmit: (snippet: SnippetFormValues) => void;
}

export function SnippetDialog({
  open,
  onOpenChange,
  snippet,
  onSubmit,
}: SnippetDialogProps) {
  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Snippet Name",
      type: "text",
      required: true,
      gridProps: { xs: 12 },
    },
    {
      name: "notes",
      label: "Notes",
      type: "textArea",
      gridProps: { xs: 12 },
    },
    {
      name: "position",
      label: "Position",
      type: "select",
      required: true,
      options: [
        { label: "Head", value: "head" },
        { label: "Footer", value: "footer" },
      ],
      gridProps: { xs: 5 },
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      required: true,
      options: [
        { label: "Script", value: "script" },
        { label: "Style", value: "style" },
        { label: "Meta", value: "meta" },
        { label: "Custom", value: "custom" },
      ],
      gridProps: { xs: 5 },
    },
    {
      name: "order",
      label: "Order",
      type: "number",
      required: true,
      gridProps: { xs: 2 },
    },
    {
      name: "pages",
      label: "Pages (comma-separated, leave empty for all pages)",
      type: "multi-text",
      required: false,
      gridProps: { xs: 12 },
      rules: {
        validate: (value: string) => {
          if (!value) return true; // Allow empty

          const pagesArray = value
            .split(",")
            .map((page) => page.trim())
            .filter(Boolean);

          // Check if each page starts with a forward slash or is home page
          const invalidPages = pagesArray.filter(
            (page: string) => !page.startsWith("/") && page !== "",
          );
          if (invalidPages.length > 0) {
            return "All pages must start with a forward slash (/) or be empty for home page";
          }

          // Check for duplicate pages
          const uniquePages = new Set(pagesArray);
          if (uniquePages.size !== pagesArray.length) {
            return "Duplicate pages are not allowed";
          }

          // Check for valid page format (no spaces, special chars except /, -, _)
          // Allow empty string for home page
          const pageRegex = /^(\/|$)[a-zA-Z0-9\/\-_]*$/;
          const invalidFormatPages = pagesArray.filter(
            (page: string) => !pageRegex.test(page),
          );
          if (invalidFormatPages.length > 0) {
            return "Pages must contain only letters, numbers, forward slashes, hyphens, and underscores, or be empty for home page";
          }

          return true;
        },
      },
    },
    {
      name: "content",
      label: "Code Content",
      type: "code",
      gridProps: { xs: 12 },
    },
  ];

  const initialValues: SnippetFormValues = snippet
    ? {
        name: snippet.name,
        position: snippet.position,
        type: snippet.type,
        order: snippet.order,
        isActive: snippet.isActive,
        notes: snippet.notes || "",
        pages: snippet.pages ?? [],
        content: snippet.content,
      }
    : {
        name: "",
        position: "head",
        type: "script",
        order: 1,
        isActive: true,
        notes: "",
        pages: [],
        content: "",
      };

  const handleSubmit = (values: Record<string, unknown>) => {
    // Convert pages string back to array
    const processedValues: SnippetFormValues = {
      name: values.name as string,
      position: values.position as "head" | "footer",
      type: values.type as "script" | "style" | "meta" | "custom",
      order: Number(values.order),
      isActive: values.isActive as boolean,
      notes: values.notes as string | undefined,
      content: values.content as string,
      pages: values.pages
        ? (values.pages as string)
            .split(",")
            .map((page: string) => page.trim())
            .filter(Boolean)
        : [],
    };

    onSubmit(processedValues);
  };

  return (
    <FormModal
      open={open}
      onClose={() => onOpenChange(false)}
      onSubmit={handleSubmit}
      fields={fields}
      initialValues={initialValues}
      title={snippet ? "Edit Snippet" : "Add New Snippet"}
      submitButtonText={snippet ? "Save Changes" : "Add Snippet"}
      cancelButtonText="Cancel"
    />
  );
}
