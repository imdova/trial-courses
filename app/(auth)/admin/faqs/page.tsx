"use client";

import FAQsTable from "@/components/admin/FAQsTable";
import { MOCK_FAQS } from "@/types/faq";
import { FAQ } from "@/types/faq";

export default function FAQsPage() {
  const handleDelete = (faq: FAQ) => {
    console.log("Delete FAQ:", faq);
    // TODO: Implement delete functionality
  };

  return (
    <div className="p-6">
      <FAQsTable
        faqs={MOCK_FAQS}
        onDelete={handleDelete}
      />
    </div>
  );
}