"use client";

import * as React from "react";
import { FileText, Mail } from "lucide-react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { generateInvoicePDF } from "@/util";
import StudentSelect from "./components/StudentSelect";
import { StudentsData } from "@/constants/students.data";
import SchedulePicker from "@/components/UI/SchedulePicker";
import CustomSelect from "@/components/UI/DynamicSelectWithIcon";
import { OptionSelect } from "@/types";
import { CourseSelection } from "./components/CourseSelection";
import { courseData } from "@/constants/VideosData.data";
import { InvoiceFormData } from "@/types/forms";
import Image from "next/image";
import { coupons } from "@/constants/coupons";
import LogoIcon from "@/components/icons/logo";

const CurrencyOptions: OptionSelect[] = [
  { value: "USD", label: "USD" },
  { value: "EGP", label: "EGP" },
  { value: "SAR", label: "SAR" },
];

export default function CreateInvoicePage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<InvoiceFormData>({
    defaultValues: {
      items: [{ courseId: "", quantity: 1, price: 0, taxRate: 5 }],
      discount: 0,
      subject: "",
      currency: "EGP", // Default currency
      description: "",
      dueDate: "",
    },
  });
  const methods = useForm<InvoiceFormData>();

  const formatToDateTime = (dateString: string | Date | undefined): string => {
    if (!dateString) return "unknown";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "unknown";

    const pad = (n: number) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const formValues = watch();
  const subtotal = formValues.items?.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0
  );

  const discountPercent = formValues.discount || 0;
  const discountValue = (discountPercent / 100) * subtotal;

  const tax =
    formValues.items?.reduce((sum, item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      const itemTotal = quantity * price;
      const itemTaxRate = item.taxRate || 0;
      const itemTax = (itemTotal * itemTaxRate) / 100;
      return sum + itemTax;
    }, 0) || 0;

  const total = subtotal + tax - discountValue;

  const onSubmit = (data: InvoiceFormData) => {
    try {
      const subtotal = data.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const total = subtotal + data.tax - data.discount;

      const invoiceData = {
        ...data,
        subtotal,
        total,
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        status: "Pending" as const,
      };

      generateInvoicePDF(invoiceData);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };
  const totalTax = formValues.items.reduce((sum, item) => {
    const itemTax = (item.price * item.taxRate) / 100;
    return sum + itemTax;
  }, 0);

  return (
    <div className="px-6 bg-white rounded-lg shadow-sm">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-5 space-y-6">
              <h1 className="text-2xl font-bold mb-8">Create New Invoice</h1>
              {/* Customer and Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SectionHeader>Student *</SectionHeader>
                  <StudentSelect<InvoiceFormData>
                    name="student"
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    students={StudentsData}
                    placeholder="Choose a student..."
                  />
                  <div className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        {...register("subject")}
                        className="w-full p-2 border text-sm border-gray-200 rounded outline-none"
                        placeholder="Enter subject name"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Due Date
                        </label>
                        <SchedulePicker
                          name="dueDate"
                          className="w-full"
                          placeholder="YYYY-MM-DD HH:mm"
                          mode="start-only"
                          control={control}
                          setValue={setValue}
                        />
                      </div>
                    </div>
                    {/* Currency and Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency{" "}
                      </label>
                      <Controller
                        name="currency"
                        control={control}
                        rules={{ required: "Interval is required" }}
                        render={({ field, fieldState }) => (
                          <>
                            <CustomSelect
                              value={field.value}
                              onChange={field.onChange}
                              options={CurrencyOptions}
                            />
                            {fieldState.error && (
                              <p className="mt-1 text-sm text-red-600">
                                {fieldState.error.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full p-2 border text-sm border-gray-300 rounded outline-none
                 resize-none"
                  placeholder="Write a brief description about the course..."
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <CourseSelection
                courses={courseData}
                register={register}
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
              <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:items-center mt-4 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between mt-4">
                  <label
                    htmlFor="addCoupon"
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="addCoupon"
                        {...register("addCoupon")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5"></div>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      Add coupon ?{" "}
                    </span>
                  </label>
                </div>
                {watch("addCoupon") && (
                  <div className="w-full max-w-xs">
                    <Controller
                      name="couponId"
                      control={control}
                      rules={{ required: "Coupon is required" }}
                      render={({ field, fieldState }) => (
                        <>
                          <CustomSelect
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                              ...coupons.map((c) => ({
                                label: c.offerName,
                                value: c.id,
                              })),
                            ]}
                          />
                          {fieldState.error && (
                            <p className="mt-1 text-sm text-red-600">
                              {fieldState.error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:items-center mt-4 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between mt-4">
                  <label
                    htmlFor="addDiscount"
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="addDiscount"
                        {...register("addDiscount")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5"></div>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      Add Discount ?{" "}
                    </span>
                  </label>
                </div>
                {watch("addDiscount") && (
                  <div className="w-full max-w-xs">
                    <Controller
                      name="discount"
                      control={control}
                      rules={{
                        required: "Discount is required",
                        min: { value: 0, message: "Discount must be >= 0" },
                      }}
                      render={({ field }) => (
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                          <span className="mr-2 text-green-600">%</span>
                          <input
                            type="number"
                            placeholder="Enter discount"
                            min="0"
                            step="0.01"
                            {...field}
                            className="w-full outline-none text-sm text-gray-800 placeholder-gray-400"
                          />
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Right Column - Invoice Summary */}
            <div className="p-3 md:p-8 lg:col-span-5 h-full bg-gray-100 ">
              <div className="flex justify-between items-center gap-3 py-3 border-b border-gray-200">
                <h2 className="text-2xl font-semibold  ">Preview</h2>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm bg-white text-gray-800 border border-gray-200 rounded-lg flex items-center"
                  >
                    <FileText size={16} className="mr-2" />
                    PDF
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 text-sm bg-white text-gray-800 border border-gray-200 rounded-lg flex items-center"
                  >
                    <Mail size={16} className="mr-2" />
                    Email
                  </button>
                </div>
              </div>
              <div className="bg-white mt-4 rounded-lg h-fit sticky top-4 border-t-8 border-primary overflow-hidden">
                <div className="space-y-4 p-3">
                  <div className="flex justify-between items-center gap-3 p-4 border-b border-gray-200">
                    <LogoIcon className="text-primary" />
                    <h2 className="text-xl">{formValues.invoiceNumber}</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-sm">BILLED TO</p>
                      <p className="text-sm">
                        {formValues?.student?.name || "Customer Name"}
                      </p>
                      <p className="text-sm">
                        {formValues?.student?.email || "user@Example.com"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">DUE DATE</p>
                      <p className="text-sm">
                        {formatToDateTime(formValues.dueDate) || "Due Date"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">DESCRIPTION</p>
                      <p className="text-sm">
                        {formValues.subject || "Course Name"}
                      </p>
                      <p className="text-sm">
                        {formValues.description || "Description"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">CURRENCY</p>
                      <p className="text-sm">
                        {formValues.currency || "Currency"}
                      </p>
                    </div>
                  </div>
                  {formValues.items.length > 0 && (
                    <div className="mt-8">
                      <table className="w-full text-xs text-gray-700">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 uppercase tracking-wide">
                            <th className="text-left font-semibold text-sm px-2 py-2">
                              Description
                            </th>
                            <th className="text-left font-semibold text-sm px-2 py-2">
                              Qty
                            </th>
                            <th className="text-left font-semibold text-sm px-2 py-2">
                              Unit
                            </th>
                            <th className="text-left font-semibold text-sm px-2 py-2">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {formValues.items.map((item, index) => (
                            <tr key={index}>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={item.image ?? "/images/placholder.png"}
                                    alt={item.title ?? "Course image"}
                                    width={24}
                                    height={24}
                                    className="w-8 h-8 object-cover rounded-sm border border-gray-200"
                                  />
                                  <span className="truncate text-sm">
                                    {item.title}
                                  </span>
                                </div>
                              </td>
                              <td className="p-3">{item.quantity}</td>
                              <td className="p-3">
                                {formValues.currency || "EGP"}{" "}
                                {item.price.toFixed(2)}
                              </td>
                              <td className="p-3 font-medium">
                                {formValues.currency || "EGP"}{" "}
                                {(item.quantity * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="flex justify-end">
                        <div className="w-full max-w-xs  p-4 space-y-2">
                          {/* Subtotal */}
                          <div className="flex justify-between pb-2 text-sm">
                            <span className="text-gray-600 text-sm">
                              Subtotal
                            </span>
                            <span className="font-semibold text-gray-800">
                              {formValues.currency || "EGP"}{" "}
                              {subtotal.toFixed(2)}
                            </span>
                          </div>
                          {/* Tax */}
                          {!Number.isNaN(totalTax || totalTax !== 0) && (
                            <div className="flex justify-between items-center text-sm">
                              <label className="text-gray-600 text-sm">
                                Tax
                              </label>
                              {totalTax}
                            </div>
                          )}
                          {/* discount */}
                          {formValues.discount !== 0 && (
                            <div className="flex justify-between items-center text-sm">
                              <label className="text-gray-600 text-sm">
                                Discount
                              </label>
                              {formValues.discount} %
                            </div>
                          )}

                          {/* Total */}
                          <div className="flex justify-between items-center pt-3 mt-2">
                            <span className="text-gray-800 font-semibold text-base">
                              Total
                            </span>
                            <span className="text-green-700 font-bold text-lg">
                              {formValues.currency || "EGP"} {total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-primary w-full min-h-12">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-3">
                    <h2 className="font-bold text-white md:text-xl">
                      Thank You!
                    </h2>
                    <div className="flex gap-3 flex-wrap">
                      <span className="text-white text-sm">+880321342</span>
                      <span className="text-white text-sm">
                        www.medicova.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

// Reusable components
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold mb-2">{children}</h3>
);
