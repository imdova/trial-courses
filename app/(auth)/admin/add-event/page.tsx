"use client";
import TextEditor from "@/components/UI/form/TextEditor";
import InfoAlert from "@/components/UI/InfoAlert";
import { ChevronRight, Plus, Settings, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  eventTitle: string;
  eventMainSector: string;
  eventType: string;
  startDate: string;
  endDate: string;
  eventSpeciality: string;
  attendanceType: string;
  eventOverview: string;
  eventAgenda: string[];
  whoCanAttend: string[];
  termsConditions: string;
  eventMainImage: FileList | null;
  previewVideo: string;
  speakers: string[];
  eventFees: string;
  discountedPrice: string;
  country: string;
  city: string;
  tags: string[];
};
// Type for the list items in your form
type FormListField = string[];

export default function AddNewEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      eventType: "Conference",
      speakers: [],
      tags: [],
      eventAgenda: ["QualityProfessionals"],
      whoCanAttend: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting indust",
      ],
    },
  });

  const [speakers, setSpeakers] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newSpeaker, setNewSpeaker] = useState("");
  const [newTag, setNewTag] = useState("");

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  const addListItem = (fieldName: keyof FormData, value: string) => {
    const currentItems = watch(fieldName) as FormListField | undefined;
    setValue(fieldName, [...(currentItems || []), value]);
  };

  const removeListItem = (fieldName: keyof FormData, index: number) => {
    const currentItems = watch(fieldName) as FormListField | undefined;
    setValue(
      fieldName,
      (currentItems || []).filter((_, i) => i !== index)
    );
  };

  const handleAddSpeaker = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSpeaker.trim()) {
      e.preventDefault();
      const updatedSpeakers = [...speakers, newSpeaker.trim()];
      setSpeakers(updatedSpeakers);
      setValue("speakers", updatedSpeakers);
      setNewSpeaker("");
    }
  };

  const removeSpeaker = (index: number) => {
    const updatedSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(updatedSpeakers);
    setValue("speakers", updatedSpeakers);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setValue("tags", updatedTags);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Add a New Event</h1>
      <p className="text-gray-600 mb-8">
        Create, manage, and publish events on the healthcare platform
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <div className="flex justify-between">
          <div>
            {" "}
            <h2 className="text-xl font-semibold text-gray-700">
              Event Information
            </h2>
            <p className="text-sm text-gray-500">
              Enter the basic details about your course
            </p>
          </div>
          <div className="flex justify-end items-center gap-4 mb-6">
            <button
              type="button"
              className="px-6 py-2 border bg-white text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Save Draft
            </button>
            <button
              type="button"
              className="px-6 py-2 border bg-white text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Preview
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-8">
          <div className="col-span-1 lg:col-span-5">
            <div className="p-4 border rounded-xl shadow-sm bg-white">
              <div>
                <div>
                  <div>
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="eventTitle"
                    >
                      Event Title
                    </label>
                    <input
                      id="eventTitle"
                      type="text"
                      placeholder="Enter event title"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.eventTitle
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-green-200"
                      }`}
                      {...register("eventTitle", {
                        required: "Event title is required",
                      })}
                    />
                    {errors.eventTitle && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.eventTitle.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="eventMainSector"
                      >
                        Event Main Sector
                      </label>
                      <select
                        id="eventMainSector"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.eventMainSector
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-green-200"
                        }`}
                        {...register("eventMainSector", {
                          required: "Main sector is required",
                        })}
                      >
                        <option value="">Select Categories</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Medical">Medical</option>
                        <option value="Nursing">Nursing</option>
                        <option value="Pharmacy">Pharmacy</option>
                      </select>
                      {errors.eventMainSector && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.eventMainSector.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="eventType"
                      >
                        Event Type
                      </label>
                      <select
                        id="eventType"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                        {...register("eventType")}
                      >
                        <option value="Conference">Conference</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Webinar">Webinar</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="startDate"
                      >
                        Start Date
                      </label>
                      <input
                        id="startDate"
                        type="date"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.startDate
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-green-200"
                        }`}
                        {...register("startDate", {
                          required: "Start date is required",
                        })}
                      />
                      {errors.startDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="eventSpeciality"
                      >
                        Event Speciality
                      </label>
                      <select
                        id="eventSpeciality"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.eventSpeciality
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-green-200"
                        }`}
                        {...register("eventSpeciality", {
                          required: "Event speciality is required",
                        })}
                      >
                        <option value="">
                          select either online or offline
                        </option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                      {errors.eventSpeciality && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.eventSpeciality.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="attendanceType"
                      >
                        Attendance Type
                      </label>
                      <select
                        id="attendanceType"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.attendanceType
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-green-200"
                        }`}
                        {...register("attendanceType", {
                          required: "Attendance type is required",
                        })}
                      >
                        <option value="">
                          select either online or offline
                        </option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                      {errors.attendanceType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.attendanceType.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="endDate"
                      >
                        End Date
                      </label>
                      <input
                        id="endDate"
                        type="date"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.endDate
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-green-200"
                        }`}
                        {...register("endDate", {
                          required: "End date is required",
                        })}
                      />
                      {errors.endDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.endDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Event Overview
                </h2>
                <TextEditor
                  placeholder="Add a detailed description of your event ..."
                  name="eventOverview"
                  onChange={(value) => setValue("eventOverview", value)}
                />
                {errors.eventOverview && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.eventOverview.message}
                  </p>
                )}
              </div>

              <div className="space-y-8">
                {/* Event Agenda Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-4">Event Agenda</h3>
                  <div className="flex gap-3 mt-4">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none "
                      placeholder="Add agenda item"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = e.currentTarget.value.trim();
                          if (value) {
                            addListItem("eventAgenda", value);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
                      onClick={() => {
                        const input = document.querySelector(
                          'input[placeholder="Add agenda item"]'
                        ) as HTMLInputElement;
                        const value = input.value.trim();
                        if (value) {
                          addListItem("eventAgenda", value);
                          input.value = "";
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {watch("eventAgenda")?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <ChevronRight className="w-3 h-3" />
                          </div>
                          <span className="text-sm">{item}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeListItem("eventAgenda", index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Who Can Attend Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-4">
                    Who can Attend this Course?
                  </h3>
                  <div className="flex gap-3 mt-4">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none "
                      placeholder="Add attendee criteria"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = e.currentTarget.value.trim();
                          if (value) {
                            addListItem("whoCanAttend", value);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
                      onClick={() => {
                        const input = document.querySelector(
                          'input[placeholder="Add attendee criteria"]'
                        ) as HTMLInputElement;
                        const value = input.value.trim();
                        if (value) {
                          addListItem("whoCanAttend", value);
                          input.value = "";
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  <div className="my-6 space-y-3">
                    {watch("whoCanAttend")?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <ChevronRight className="w-3 h-3" />
                          </div>
                          <span className="text-sm">{item}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeListItem("whoCanAttend", index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Terms & Conditions
                </h2>
                <TextEditor
                  placeholder="Add a detailed description of your Conditions ..."
                  name="termsConditions"
                  onChange={(value) => setValue("termsConditions", value)}
                />

                {errors.termsConditions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.termsConditions.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white border rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Event Main Image
              </h2>
              <p className="text-gray-500 mb-4">
                Upload your course thumbnail image (16:9 ratio recommended)
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-2">
                  Drop & drop or click to browse
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Accepted formats: Image/jpeg, ImageDrop, ImageWebb
                </p>
                <input
                  type="file"
                  id="eventMainImage"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  {...register("eventMainImage", {
                    required: "Event image is required",
                  })}
                />
                <label
                  htmlFor="eventMainImage"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  Upload Image
                </label>
                {errors.eventMainImage && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.eventMainImage.message}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    Preview Video
                  </h3>
                  <InfoAlert
                    title="Author Details"
                    description="Please fill in the author details to create your quiz."
                    variant="secondary"
                  />
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                  placeholder="Enter Video url or upload if available"
                  {...register("previewVideo")}
                />
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Settings size={20} />
                <h2 className="text-xl font-semibold text-gray-700">
                  Event Settings
                </h2>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    Speakers
                  </h3>
                  <InfoAlert
                    title="Author Details"
                    description="Please fill in the author details to create your quiz."
                    variant="secondary"
                  />
                </div>

                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                  placeholder="Type Speaker Name and Press Enter"
                  value={newSpeaker}
                  onChange={(e) => setNewSpeaker(e.target.value)}
                  onKeyDown={handleAddSpeaker}
                />
                <div className="flex flex-wrap gap-2 my-2">
                  {speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="mr-2">{speaker}</span>
                      <button
                        type="button"
                        onClick={() => removeSpeaker(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Regular Price */}
                <div>
                  <label className="block  font-medium text-gray-700 mb-1">
                    Event Fees
                  </label>
                  <input
                    {...register("eventFees", { valueAsNumber: true })}
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    placeholder="$ Leave blank for free e.g., Starting from"
                  />
                </div>

                {/* Price after discount */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Price after discount
                  </label>
                  <input
                    {...register("discountedPrice", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    placeholder="e.g., Starting from"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">
                    Event Location
                  </h3>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                    {...register("country")}
                  >
                    <option value="">Select Country</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="UAE">United Arab Emirates</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    &nbsp;
                  </h3>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                    {...register("city")}
                  >
                    <option value="">Select City</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Dubai">Dubai</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Tags</h3>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                  placeholder="Enter tags separated by commas"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                <div className="flex flex-wrap gap-2 my-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="mr-2">{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 my-4"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
