import CustomSelect from "@/components/UI/DynamicSelectWithIcon";
import { CourseType } from "@/types/courses";
import { InvoiceFormData } from "@/types/forms";
import { Plus, Minus, X, PackagePlus } from "lucide-react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

interface CourseSelectionProps {
  courses: CourseType[];
  register: UseFormRegister<InvoiceFormData>;
  control: Control<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
  watch: UseFormWatch<InvoiceFormData>;
  setValue: UseFormSetValue<InvoiceFormData>;
}

export const CourseSelection = ({
  courses,
  register,
  control,
  errors,
  watch,
  setValue,
}: CourseSelectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const formValues = watch();
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Selected Courses</h3>
      <div className="space-y-4">
        {fields.map((field, index) => {
          // Get the selected course based on courseId from formValues
          const selectedCourseId = formValues.items?.[index]?.courseId;
          const selectedCourse = courses.find((c) => c.id === selectedCourseId);

          const courseErrors = errors.items?.[index] as
            | Record<string, { message?: string }>
            | undefined;

          return (
            <div
              key={field.id}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">
                  {selectedCourse?.title || `Course ${index + 1}`}
                </h4>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                <div className="md:col-span-3">
                  {/* Course Selection */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <Controller
                    name={`items.${index}.courseId`}
                    control={control}
                    rules={{ required: "Please select a course" }}
                    render={({ field, fieldState }) => (
                      <>
                        <CustomSelect
                          value={field.value}
                          onChange={(selectedId: string) => {
                            field.onChange(selectedId);

                            const course = courses.find(
                              (c) => c.id === selectedId
                            );
                            if (course) {
                              setValue(`items.${index}.courseId`, course.id);
                              setValue(`items.${index}.price`, course.price);
                              setValue(`items.${index}.image`, course.image);
                              setValue(`items.${index}.title`, course.title);
                              // Set default tax rate if needed
                              setValue(`items.${index}.taxRate`, 0);
                            } else {
                              setValue(`items.${index}.courseId`, "");
                              setValue(`items.${index}.price`, 0);
                              setValue(
                                `items.${index}.image`,
                                "/images/placholder.svg"
                              );
                              setValue(`items.${index}.title`, "");
                              setValue(`items.${index}.taxRate`, 0);
                            }
                          }}
                          options={[
                            ...courses.map((course) => ({
                              label: course.title,
                              value: course.id,
                              image: course.image, // 👈 add image here
                            })),
                          ]}
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Quantity */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => {
                        const current =
                          formValues.items?.[index]?.quantity || 1;
                        if (current > 1) {
                          setValue(`items.${index}.quantity`, current - 1);
                        }
                      }}
                      className="px-2 py-1.5 border border-gray-200 rounded-l bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                        min: { value: 1, message: "Minimum quantity is 1" },
                      })}
                      className="w-full px-2 py-1.5 border-t border-b border-gray-200 text-center outline-none"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current =
                          formValues.items?.[index]?.quantity || 1;
                        setValue(`items.${index}.quantity`, current + 1);
                      }}
                      className="px-2 py-1.5 border border-gray-200 rounded-r bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {courseErrors?.quantity?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {courseErrors.quantity.message}
                    </p>
                  )}
                </div>

                {/* Tax Rate */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%)
                  </label>
                  <div className="relative">
                    <Controller
                      name={`items.${index}.taxRate`}
                      control={control}
                      rules={{ required: "Please select a tax rate" }}
                      render={({ field, fieldState }) => (
                        <>
                          <CustomSelect
                            value={field.value?.toString() || ""}
                            onChange={(selectedRate: string) => {
                              const rate = parseFloat(selectedRate);
                              field.onChange(rate);
                              setValue(`items.${index}.taxRate`, rate);
                            }}
                            options={[
                              { label: "Choose tax rate", value: "" }, // Dummy option
                              { label: "0%", value: "0" },
                              { label: "5%", value: "5" },
                              { label: "10%", value: "10" },
                              { label: "15%", value: "15" },
                            ]}
                          />
                          {fieldState.error && (
                            <p className="text-red-500 text-sm mt-1">
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
          );
        })}

        <button
          type="button"
          onClick={() =>
            append({
              courseId: "",
              quantity: 1,
              price: 0,
              taxRate: 0,
              image: "/images/placholder.png",
              title: "Course name",
            })
          }
          className="px-4 py-2  text-green-800 flex items-center"
        >
          <PackagePlus size={16} className="mr-2" />
          Add Course
        </button>
      </div>
    </div>
  );
};
