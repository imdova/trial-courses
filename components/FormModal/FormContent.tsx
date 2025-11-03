/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormActions } from "./FormActions";
import { cn } from "@/util";
import { FormGrid } from "./FormGrid";
import { FormContentProps } from "@/types/forms";

export const FormContent = React.forwardRef<HTMLFormElement, FormContentProps>(
  (
    {
      fields,
      onSubmit,
      formMethods,
      hiddenFields,
      onCheckboxChange,
      children,
      loading = false,
      deleteLoading = false,
      resetValues,
      onDelete,
      onCancel,
      submitButtonText = "Save",
      deleteButtonText = "Delete",
      cancelButtonText = "Cancel",
      removeField,
      onChange,
      dialog = false,
      onReset,
      enableResetButton = false,
      resetAfterSubmit,
    },
    ref,
  ) => {
    const {
      control,
      handleSubmit,
      formState: { isDirty, isValid, isSubmitting },
      getValues,
      reset,
    } = formMethods;

    const submitHandler = async (data: unknown) => {
      console.log("Submit handler called with:", { data, isDirty, isValid });
      
      // For new forms (like creating assignments), we should allow submission
      const formData = data as any;
      const isCreationForm = !formData?.id;
      
      // Check if user has filled any meaningful data
      const hasUserInput = Object.values(formData || {}).some(value => {
        if (value === null || value === undefined || value === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (typeof value === 'object' && value.constructor === Object && Object.keys(value).length === 0) return false;
        return true;
      });
      
      console.log("Form state:", { isDirty, isCreationForm, hasUserInput, isValid });
      
      // Allow submission if:
      // 1. Form is valid AND (dirty OR it's a creation form with user input)
      if (!isValid) {
        console.log("Form is not valid, preventing submission");
        return;
      }

      if (!isDirty && !isCreationForm && !hasUserInput) {
        console.log("Form not dirty and not creation form, canceling");
        onCancel?.();
        return;
      }

      try {
        console.log("Submitting form with data:", data);
        const result = await onSubmit?.(data);

        if (result?.error) return;

        // Handle post-submit reset logic
        if (resetAfterSubmit === "new") {
          reset(data);
        } else if (resetAfterSubmit === "default") {
          onReset?.();
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    };

    const handleDelete = () => {
      if (!onDelete) return;
      const data = getValues();
      onDelete(data);
    };

    return (
      <form
        onSubmit={handleSubmit(submitHandler)}
        ref={ref}
        className="flex h-full flex-col"
      >
        <div
          className={cn(
            "scroll-bar-minimal bg-background flex-grow overflow-y-auto",
            dialog
              ? "max-h-[calc(100dvh-354px)]"
              : "max-h-[calc(100dvh-254px)]",
          )}
        >
          <FormGrid
            fields={fields}
            control={control}
            hiddenFields={hiddenFields}
            onCheckboxChange={onCheckboxChange}
            onChange={onChange}
            removeField={removeField}
            getValues={getValues}
            resetValues={resetValues}
          />
          {children}
        </div>

        {(onSubmit || onDelete) && (
          <FormActions
            onDelete={onDelete ? handleDelete : undefined}
            onCancel={onCancel}
            isDirty={isDirty}
            onReset={onReset}
            isValid={isValid}
            loading={loading || isSubmitting}
            enableResetButton={enableResetButton}
            deleteLoading={deleteLoading}
            submitButtonText={submitButtonText}
            deleteButtonText={deleteButtonText}
            cancelButtonText={cancelButtonText}
          />
        )}
      </form>
    );
  },
);

FormContent.displayName = "FormContent";
