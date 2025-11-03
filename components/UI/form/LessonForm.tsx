import React from "react";
import { useForm, Controller } from "react-hook-form";
import CustomRadioButton from "../CustomRadioButton";
interface LessonFormProps {
  Day: string;
}
const LessonForm = ({ Day }: LessonFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lessonType: "",
      day: Day,
      from: "",
      to: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-3">
      <div className="my-3">
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Lesson Type
        </label>
        <Controller
          name="lessonType"
          control={control}
          rules={{ required: "Lesson type is required" }}
          render={({ field }) => (
            <div className="flex  items-center">
              <div className="flex items-center  gap-4">
                <CustomRadioButton
                  label="Live"
                  name="lessonType"
                  value="Live"
                  checked={field.value === "Live"}
                  onChange={field.onChange}
                />
                <CustomRadioButton
                  label="Recorded"
                  name="lessonType"
                  value="Recorded"
                  checked={field.value === "Recorded"}
                  onChange={field.onChange}
                />
                <CustomRadioButton
                  label="Offline"
                  name="lessonType"
                  value="Offline"
                  checked={field.value === "Offline"}
                  onChange={field.onChange}
                />
              </div>
            </div>
          )}
        />
        {errors.lessonType && (
          <p className="text-red-500 text-xs mt-1">
            {errors.lessonType.message}
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full">
          <label className="block text-xs font-medium text-muted-foreground">
            Day
          </label>
          <Controller
            name="day"
            control={control}
            rules={{ required: "Day is required" }}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                placeholder={Day.toString()}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md"
              />
            )}
          />
          {errors.day && (
            <p className="text-red-500 text-xs mt-1">{errors.day.message}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-xs font-medium text-muted-foreground">
            From
          </label>
          <Controller
            name="from"
            control={control}
            rules={{ required: "Start time is required" }}
            render={({ field }) => (
              <input
                type="time"
                {...field}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md"
              />
            )}
          />
          {errors.from && (
            <p className="text-red-500 text-xs mt-1">{errors.from.message}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-xs font-medium text-muted-foreground">To</label>
          <Controller
            name="to"
            control={control}
            rules={{ required: "End time is required" }}
            render={({ field }) => (
              <input
                type="time"
                {...field}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md"
              />
            )}
          />
          {errors.to && (
            <p className="text-red-500 text-xs mt-1">{errors.to.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-black focus:outline-none link-smooth">
        Schedule Lesson
      </button>
    </form>
  );
};

export default LessonForm;
