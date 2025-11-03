"use client";

import TestimonialsTable from "@/components/admin/TestimonialsTable";
import { MOCK_TESTIMONIALS } from "@/types/testimonial";
import { Testimonial } from "@/types/testimonial";

export default function TestimonialsPage() {
  const handleDelete = (testimonial: Testimonial) => {
    console.log("Delete testimonial:", testimonial);
    // TODO: Implement delete functionality
  };

  return (
    <div className="p-6">
      <TestimonialsTable
        testimonials={MOCK_TESTIMONIALS}
        onDelete={handleDelete}
      />
    </div>
  );
}