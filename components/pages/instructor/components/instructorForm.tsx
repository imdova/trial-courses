"use client";

import { Button, CircularProgress, Typography } from "@mui/material";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FormProvider, useForm } from "react-hook-form";
import useIsLeaving from "@/hooks/useIsLeaving";
import React from "react";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import MainInformation from "./Main-Information";
import InstructorContactInputs from "./InstructorContactInputs";
import LocationSelection from "./LocationSelection";
import InstructorOwnership from "./InstructorOwnership";

const InstructorForm: React.FC<{ instructor: InstructorProfile }> = ({
  instructor,
}) => {
  const formMethods = useForm({
    defaultValues: instructor,
  });
  const {
    control,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
    reset,
  } = formMethods;
  const methods = useForm();
  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const { isLoading, error } = useUpdateApi<InstructorProfile>();

  return (
    <>
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <FormProvider {...methods}>
        <form noValidate>
          <div className="mb-8 flex flex-col gap-4 px-2 md:flex-row md:px-0">
            <div className="flex-1">
              <div className="mb-4 rounded-base border-gray-200 bg-white p-3 md:border md:p-5 md:shadow-soft">
                <MainInformation formMethods={formMethods} />
              </div>
              <div className="rounded-base border-gray-200 bg-white p-3 md:border md:p-5 md:shadow-soft">
                <InstructorOwnership control={control} errors={errors} />
                <InstructorContactInputs control={control} errors={errors} />
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-80">
              <div className="rounded-base border-gray-200 bg-white p-3 md:border md:p-5 md:shadow-soft">
                <h5 className="text-2xl font-semibold text-main mb-4">
                  Location Information
                </h5>
                <LocationSelection
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                />
              </div>
            </div>
          </div>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error.message}
            </Typography>
          )}

          {(!instructor.firstName || isDirty || isLoading) && (
            <div className="sticky bottom-2 z-30 flex justify-end rounded-base border border-gray-200 bg-white p-3 shadow-soft md:static md:justify-start md:p-5">
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !isValid}
                size="large"
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                onClick={() => reset()}
                variant="text"
                size="large"
                className="ml-2"
              >
                Reset
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </>
  );
};
export default InstructorForm;
