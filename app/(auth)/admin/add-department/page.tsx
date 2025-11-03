"use client";

import { useForm } from "react-hook-form";

type FormData = {
  rollNo: string;
  studentName: string;
  category: string;
  feesType: string;
  paymentFrequency: "monthly" | "yearly" | "session";
  amount: string;
  collectionDate: string;
  paymentType: string;
  referenceNumber: string;
  status: string;
  paymentDetails: string;
};

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-semibold">Add Department</h2>
      <div className="box-content p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          {/* Roll No & Student Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Roll No
              </label>
              <input
                {...register("rollNo", {
                  required: "Roll No is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Roll No must be a number",
                  },
                })}
                placeholder="Enter Roll No"
                className="w-full rounded border p-3 outline-none"
              />
              {errors.rollNo && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.rollNo.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Student Name
              </label>
              <input
                {...register("studentName", {
                  required: "Student Name is required",
                })}
                placeholder="Enter Student Name"
                className="w-full rounded border p-3 outline-none"
              />
              {errors.studentName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.studentName.message}
                </p>
              )}
            </div>
          </div>

          {/* Category & Fees Type */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Category
              </label>
              <input
                {...register("category", { required: "Category is required" })}
                placeholder="Enter Category"
                className="w-full rounded border p-3 outline-none"
              />
              {errors.category && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Fees Type
              </label>
              <select
                {...register("feesType", { required: "Fees Type is required" })}
                className="w-full rounded border p-3 text-muted-foreground outline-none"
              >
                <option value="">Select Fees Type</option>
                <option value="tuition">Tuition</option>
                <option value="library">Library</option>
                <option value="exam">Exam</option>
              </select>
              {errors.feesType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.feesType.message}
                </p>
              )}
            </div>
          </div>
          {/* Payment Frequency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Payment Frequency
            </label>
            <div className="flex gap-4">
              {["monthly", "yearly", "session"].map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition-all hover:bg-gray-100 hover:shadow-md data-[checked]:bg-green-500 data-[checked]:text-white"
                >
                  <input
                    type="radio"
                    {...register("paymentFrequency", {
                      required: "Payment Frequency is required",
                    })}
                    value={type}
                    className="peer hidden"
                  />
                  <div className="h-4 w-4 rounded-full border-2 border-gray-400 transition-all peer-checked:border-green-500 peer-checked:bg-green-500"></div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            {errors.paymentFrequency && (
              <p className="mt-1 text-xs text-red-500">
                {errors.paymentFrequency.message}
              </p>
            )}
          </div>
          {/* Amount */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              Amount
            </label>
            <input
              {...register("amount", {
                required: "Amount is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Amount must be a valid number",
                },
              })}
              placeholder="Enter Amount"
              className="w-full rounded border p-3 outline-none"
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Collection Date & Payment Type */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Collection Date
              </label>
              <input
                type="date"
                {...register("collectionDate", {
                  required: "Collection Date is required",
                })}
                className="w-full rounded border p-3 outline-none"
              />
              {errors.collectionDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.collectionDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Payment Type
              </label>
              <select
                {...register("paymentType", {
                  required: "Payment Type is required",
                })}
                className="w-full rounded border p-3 text-muted-foreground outline-none"
              >
                <option value="">Select Payment Type</option>
                <option value="credit-card">Credit Card</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
              {errors.paymentType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.paymentType.message}
                </p>
              )}
            </div>
          </div>

          {/* Reference Number & Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Reference Number
              </label>
              <input
                {...register("referenceNumber", {
                  required: "Reference Number is required",
                  pattern: {
                    value: /^[0-9a-zA-Z]+$/,
                    message: "Reference Number must be alphanumeric",
                  },
                })}
                placeholder="Enter Reference Number"
                className="w-full rounded border p-3 outline-none"
              />
              {errors.referenceNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.referenceNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Status
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full rounded border p-3 text-muted-foreground outline-none"
              >
                <option value="">Select Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              Payment Details
            </label>
            <textarea
              {...register("paymentDetails")}
              placeholder="Enter Payment Details"
              className="h-[200px] w-full resize-none rounded border p-2 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded border px-4 py-2 text-gray-700"
              onClick={() => reset()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-green-600 px-4 py-2 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
