"use client";

import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2LocationContact from "./steps/Step2LocationContact";
import Step3ProgramsFacilities from "./steps/Step3ProgramsFacilities";
import Step4AdditionalInfo from "./steps/Step4AdditionalInfo";
import FormNavigation from "./steps/FormNavigation";
import { AcademyFormData, AcademyInstructor } from "@/types/forms";
import {
  AcademySchema,
  getStepFields,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
} from "@/constants/schemas/academy.schema";

export default function AddAcademyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [specialityInput, setSpecialityInput] = useState("");
  const [programInput, setProgramInput] = useState("");
  const [facilityInput, setFacilityInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [instructorInput, setInstructorInput] = useState<AcademyInstructor>({
    name: "",
    title: "",
    photo: "",
    id: "",
    bio: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    control,
  } = useForm<AcademyFormData>({
    resolver: zodResolver(AcademySchema),
    mode: "onChange", // or "onBlur"
    defaultValues: {
      name: "",
      avatar: "",
      category: "",
      speciality: [],
      type: "University",
      foundedYear: undefined,
      accreditation: "",
      location: {
        address: "",
        city: "",
        country: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        website: "",
        socialLinks: {
          facebook: "",
          linkedin: "",
          twitter: "",
        },
      },
      about: "",
      programsOffered: [],
      facilities: [],
      instructors: [],
      studentsCount: 0,
      alumniNetwork: "",
      tuitionFeesRange: "",
      admissionRequirements: [],
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: Path<AcademyFormData>[] = [];

    if (currentStep === 1) {
      fieldsToValidate = getStepFields(Step1Schema);
    } else if (currentStep === 2) {
      fieldsToValidate = getStepFields(Step2Schema);
    } else if (currentStep === 3) {
      fieldsToValidate = getStepFields(Step3Schema);
    } else if (currentStep === 4) {
      fieldsToValidate = getStepFields(Step4Schema);
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: AcademyFormData) => {
    console.log("✅ Form submitted:", data);
    alert("Academy added successfully!");
  };

  return (
    <div className="min-h-screen px-6">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Step1BasicInfo
              register={register}
              errors={errors}
              control={control}
              watch={watch}
            />
          )}

          {/* Step 2: Location & Contact */}
          {currentStep === 2 && (
            <Step2LocationContact register={register} errors={errors} />
          )}

          {/* Step 3: Programs & Facilities */}
          {currentStep === 3 && (
            <Step3ProgramsFacilities
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              specialityInput={specialityInput}
              setSpecialityInput={setSpecialityInput}
              programInput={programInput}
              setProgramInput={setProgramInput}
              facilityInput={facilityInput}
              setFacilityInput={setFacilityInput}
              requirementInput={requirementInput}
              setRequirementInput={setRequirementInput}
            />
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <Step4AdditionalInfo
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              instructorInput={instructorInput}
              setInstructorInput={setInstructorInput}
            />
          )}
          <div className="p-2 text-sm text-red-500">
            {Object.keys(errors).length > 0 &&
              "⚠️ Fix validation errors before submitting"}
          </div>
          {/* Navigation Buttons */}
          <FormNavigation
            currentStep={currentStep}
            prevStep={prevStep}
            nextStep={nextStep}
            isLastStep={currentStep === 4}
          />
        </form>
      </div>
    </div>
  );
}
