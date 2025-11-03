/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CreateAttributeForm from "@/components/admin/CreateAttributeForm";

export default function CreateAttributePage() {
  const handleSubmit = (data: {
    titleEnglish: string;
    titleArabic: string;
    useImageFromVariation: boolean;
    attributes: any[];
    displayLayout: string;
    searchable: boolean;
    comparable: boolean;
    usedInProductListing: boolean;
    sortOrder: number;
    categories: string[];
    status: string;
  }) => {
    console.log("Creating attribute:", data);
    // TODO: Implement API call to create attribute
  };

  return <CreateAttributeForm onSubmit={handleSubmit} />;
}
