"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateTestimonialForm from "@/components/admin/CreateTestimonialForm";
import { MOCK_TESTIMONIALS } from "@/types/testimonial";
import { Testimonial } from "@/types/testimonial";

export default function EditTestimonialPage() {
  const params = useParams();
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the testimonial by ID from the URL parameter
    const testimonialId = params.id as string;
    const foundTestimonial = MOCK_TESTIMONIALS.find(t => t.id === testimonialId);
    
    if (foundTestimonial) {
      setTestimonial(foundTestimonial);
    } else {
      // Testimonial not found, redirect back to testimonials list
      router.push('/admin/testimonials');
    }
    setLoading(false);
  }, [params.id, router]);

  const handleSubmit = (data: { 
    title: string; 
    description: string; 
    content: string; 
    status: string;
    customerName: string;
    rating: number;
  }) => {
    console.log("Updating testimonial:", { id: params.id, ...data });
    // TODO: Implement API call to update testimonial
    // After successful update, redirect back to testimonials list
    router.push('/admin/testimonials');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading testimonial...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Testimonial not found</div>
          </div>
        </div>
      </div>
    );
  }

  // Transform testimonial data to match form structure
  const initialData = {
    title: testimonial.name,
    description: testimonial.content,
    content: testimonial.content,
    status: testimonial.status,
    customerName: testimonial.name,
    rating: testimonial.rating,
  };

  return <CreateTestimonialForm onSubmit={handleSubmit} initialData={initialData} />;
}
