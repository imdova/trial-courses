"use client";

import CreateTestimonialForm from "@/components/admin/CreateTestimonialForm";

export default function CreateTestimonialPage() {
  const handleSubmit = (data: { 
    title: string; 
    description: string; 
    content: string; 
    status: string;
    customerName: string;
    rating: number;
  }) => {
    console.log("Creating testimonial:", data);
    // TODO: Implement API call to create testimonial
  };

  return <CreateTestimonialForm onSubmit={handleSubmit} />;
}