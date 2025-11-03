"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateFAQForm from "@/components/admin/CreateFAQForm";
import { MOCK_FAQS } from "@/types/faq";
import { FAQ } from "@/types/faq";

export default function EditFAQPage() {
  const params = useParams();
  const router = useRouter();
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the FAQ by ID from the URL parameter
    const faqId = params.id as string;
    const foundFaq = MOCK_FAQS.find(f => f.id === faqId);
    
    if (foundFaq) {
      setFaq(foundFaq);
    } else {
      // FAQ not found, redirect back to FAQs list
      router.push('/admin/faqs');
    }
    setLoading(false);
  }, [params.id, router]);

  const handleSubmit = (data: { category: string; question: string; answer: string; status: string }) => {
    console.log("Updating FAQ:", { id: params.id, ...data });
    // TODO: Implement API call to update FAQ
    // After successful update, redirect back to FAQs list
    router.push('/admin/faqs');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading FAQ...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!faq) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">FAQ not found</div>
          </div>
        </div>
      </div>
    );
  }

  return <CreateFAQForm onSubmit={handleSubmit} initialData={faq} />;
}
