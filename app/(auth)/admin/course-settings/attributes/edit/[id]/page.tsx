/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateAttributeForm from "@/components/admin/CreateAttributeForm";
import { MOCK_ATTRIBUTES } from "@/types/category";
import { Attribute } from "@/types/category";

export default function EditAttributePage() {
  const params = useParams();
  const router = useRouter();
  const [attribute, setAttribute] = useState<Attribute | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the attribute by ID from the URL parameter
    const attributeId = params.id as string;
    const foundAttribute = MOCK_ATTRIBUTES.find(a => a.id === attributeId);
    
    if (foundAttribute) {
      setAttribute(foundAttribute);
    } else {
      // Attribute not found, redirect back to attributes list
      router.push('/admin/course-settings');
    }
    setLoading(false);
  }, [params.id, router]);

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
    console.log("Updating attribute:", { id: params.id, ...data });
    // TODO: Implement API call to update attribute
    // After successful update, redirect back to attributes list
    router.push('/admin/course-settings');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading attribute...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!attribute) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Attribute not found</div>
          </div>
        </div>
      </div>
    );
  }

  // Transform attribute data to match form structure
  const initialData = {
    titleEnglish: attribute.name,
    titleArabic: attribute.name, // You might want to add Arabic name to the Attribute interface
    useImageFromVariation: false,
    displayLayout: "Dropdown",
    searchable: false,
    comparable: false,
    usedInProductListing: false,
    sortOrder: attribute.sortOrder,
    categories: [],
    status: attribute.status,
  };

  return <CreateAttributeForm onSubmit={handleSubmit} initialData={initialData} />;
}
