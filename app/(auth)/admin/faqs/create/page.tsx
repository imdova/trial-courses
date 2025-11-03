"use client";

import CreateFAQForm from "@/components/admin/CreateFAQForm";

export default function CreateFAQPage() {
  const handleSubmit = (data: { category: string; question: string; answer: string; status: string }) => {
    console.log("Creating FAQ:", data);
    // TODO: Implement API call to create FAQ
  };

  return <CreateFAQForm onSubmit={handleSubmit} />;
}
