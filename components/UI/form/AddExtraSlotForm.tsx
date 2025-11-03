import React from "react";
import { useForm, Controller } from "react-hook-form";
interface TimeoffFormProps {
  Day: string;
}
const AddExtraSlotForm = ({ Day }: TimeoffFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      day: Day,
      startTime: "",
      endTime: "",
      startDay: "",
      endDay: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-3">
      <div className="w-full mb-3">
        <h2 className="text-xl font-semibold mb-1">
          Add extra time slots for booking
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose Time Slots up to 24 hours long.
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-2 border-b pb-2">Starts</h2>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full">
          <label className="block text-xs font-medium text-muted-foreground">
            Day
          </label>
          <Controller
            name="startDay"
            control={control}
            rules={{ required: "Start Day is required" }}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                placeholder={Day}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md"
              />
            )}
          />
          {errors.startDay && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startDay.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-xs font-medium text-muted-foreground">
            Time
          </label>
          <Controller
            name="startTime"
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
          {errors.startTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startTime.message}
            </p>
          )}
        </div>
      </div>
      <h2 className="text-xl font-semibold border-b pb-2">Until</h2>
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="w-full">
          <label className="block text-xs font-medium text-muted-foreground">
            Day
          </label>
          <Controller
            name="endDay"
            control={control}
            rules={{ required: "End Day is required" }}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                placeholder={Day}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md"
              />
            )}
          />
          {errors.endDay && (
            <p className="text-red-500 text-xs mt-1">{errors.endDay.message}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-xs font-medium text-muted-foreground">
            Time
          </label>
          <Controller
            name="endTime"
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
          {errors.endTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endTime.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-black focus:outline-none link-smooth ">
        Add Extra Slots
      </button>
    </form>
  );
};

export default AddExtraSlotForm;
