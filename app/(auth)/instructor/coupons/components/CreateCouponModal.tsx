"use client";

import FormModal from "@/components/FormModal/FormModal";
import { FieldConfig } from "@/types/forms";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Coupon {
  id?: string;
  code: string;
  offerName: string;
  offerType: "Flat" | "Percentage";
  amount: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive" | "Expired";
  totalUsage: number;
  minPurchase?: string;
  usageLimit?: number;
}

const dummyOfferTypes = ["Flat", "Percentage"];
const initialValues: Partial<Coupon> = {
  code: "",
  offerName: "",
  offerType: "Percentage",
  amount: "",
  startDate: "",
  endDate: "",
  status: "Active",
  totalUsage: 0,
  minPurchase: "",
  usageLimit: 100,
};

const CreateCouponModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fields: FieldConfig[] = [
    // Row 1: Basic Information
    {
      label: "Offer Name*",
      name: "offerName",
      type: "text",
      required: true,
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        placeholder: "e.g., Summer Sale",
      },
    },
    {
      label: "Coupon Code*",
      name: "code",
      type: "text",
      required: true,
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        placeholder: "e.g., SUMMER25",
      },
    },
    {
      label: "Offer Type*",
      name: "offerType",
      type: "select",
      required: true,
      options: dummyOfferTypes.map((type) => ({
        value: type,
        label: type,
      })),
      gridProps: { xs: 12, sm: 6 },
    },

    // Row 3: Amount and Limits
    {
      label: "Amount*",
      name: "amount",
      type: "text",
      required: true,
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        placeholder: "e.g., 25% or 50EGP",
      },
    },
    {
      label: "Minimum Purchase",
      name: "minPurchase",
      type: "text",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        placeholder: "e.g., 100EGP",
      },
    },
    {
      label: "Usage Limit",
      name: "usageLimit",
      type: "number",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        placeholder: "e.g., 100",
      },
    },

    // Row 4: Dates
    {
      label: "Start Date*",
      name: "startDate",
      type: "date",
      required: true,
      gridProps: { xs: 12, sm: 6 },
    },
    {
      label: "End Date*",
      name: "endDate",
      type: "date",
      required: true,
      gridProps: { xs: 12, sm: 6 },
    },
  ];

  const handleCreate = async (formData: Coupon) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCoupon: Coupon = {
        ...formData,
        id: Math.random().toString(36).substring(2, 9),
        totalUsage: 0,
      };

      console.log("Coupon created:", newCoupon);
      setIsModalOpen(false);
      // Here you would typically call an API to create the coupon
      // and then update your state/context with the new coupon
    } catch (err) {
      console.error("Error creating coupon:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormModal
        maxWidth="xl"
        open={isModalOpen}
        loading={isLoading}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        fields={fields}
        title="Create New Coupon"
        initialValues={initialValues}
        submitButtonText="Create Coupon"
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex gap-2 items-center bg-primary text-white hover:bg-primary-dark px-3 py-2 rounded-lg"
      >
        <Plus size={15} />
        Create Coupon
      </button>
    </>
  );
};

export default CreateCouponModal;
