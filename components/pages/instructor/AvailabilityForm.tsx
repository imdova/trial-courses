"use client";
import { FormField } from "@/components/FormModal/fields/FormField";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface AvailabilityFormProps {
  formMethods: UseFormReturn<UserProfile>;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = () => {
  return (
    <div className="flex items-center justify-between bg-primary/10 p-[16px] text-start">
      {/* Title and Description */}
      <div>
        <FormField
          field={{
            name: "isImmediate",
            label: "Available for immediate hiring",
            type: "checkbox",
          }}
        />
        <p className="text-muted-foreground">
          Let companies know you can start immediately by adding the Immediate
          start badge to your profile
        </p>
      </div>
    </div>
  );
};

export default AvailabilityForm;
