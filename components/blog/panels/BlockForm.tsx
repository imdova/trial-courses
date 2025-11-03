"use client";
import { FormGrid } from "@/components/FormModal/FormGrid";
import FormModal from "@/components/FormModal/FormModal";
import { toast } from "@/components/UI/toast";
import { useFieldVisibility } from "@/hooks/useFieldVisibility";
import { useFormState } from "@/hooks/useFormState";
import { Block, FormItem, StyleConfig } from "@/types/blog";
import { Box } from "@mui/material";
import { useState } from "react";

type FormValues = {
  [key: string]: string | number | boolean | File | null;
};

const FormBlock = ({
  block,
  forms,
  sx,
}: {
  block: Block;
  forms?: FormItem[];
  sx: StyleConfig;
}) => {
  const fields = block.fields || [];
  const { hiddenFields, handleCheckboxChange } = useFieldVisibility(
    fields,
    {},
    true,
  );

  const formMethods = useFormState(true, fields, {}, "onSubmit");
  const { setValue, control, handleSubmit, getValues } = formMethods;

  const resetValues = (fieldNames: (string | number)[]) => {
    fieldNames.forEach((name) => {
      const field = fields.find((f) => f.name === name);
      if (field) {
        const defaultValue = field.type === "checkbox" ? false : "";
        setValue(String(name), defaultValue, { shouldDirty: true });
      }
    });
  };

  /// modal handler
  const [form, setForm] = useState<FormItem | null>(null);
  const handleUserSubmit = (data: FormValues) => {
    console.log(data);
    setForm(null);
  };

  const onUserClose = () => {
    setForm(null);
  };

  const isUserOpen = !!form;

  // form submit

  const onSubmit = handleSubmit(async (values) => {
    const formData = block.formData;
    if (!formData?.apiEndpoint) {
      toast.error("No API endpoint defined. Skipping submission.");
      return;
    }

    const method = formData.method || "POST";
    const headers = {
      "Content-Type": "application/json",
      ...(formData.headers || {}),
    };

    try {
      const res = await fetch(formData.apiEndpoint, {
        method,
        headers,
        body: method === "GET" ? undefined : JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Unknown error");

      // ✅ Success Handling
      if (formData.onSuccessMessage) {
        toast.success(formData.onSuccessMessage);
      }

      if (formData.onSuccessRedirect) {
        window.location.href = formData.onSuccessRedirect;
      }

      if (formData.afterSubmitMessage) {
        console.log("After Submit Message:", formData.afterSubmitMessage);
        toast.success(formData.afterSubmitMessage);
      }

      if (formData.afterSubmit === "open popup") {
        const form = forms?.find((f) => f.id === block.formId);
        if (!form) return;
        setForm(form);
      }

      return data;
    } catch (err: unknown) {
      if (formData.onErrorMessage) {
        toast.error(formData.onErrorMessage);
      }

      if (formData.onErrorRedirect) {
        window.location.href = formData.onErrorRedirect;
      }

      throw err;
    }
  });
  return (
    <>
      <FormModal
        fields={form?.fields || []}
        onSubmit={handleUserSubmit}
        onClose={onUserClose}
        open={isUserOpen}
        title={form?.title}
        description={form?.description}
        submitButtonText={form?.submitButtonText}
        cancelButtonText={form?.cancelButtonText}
      />
      <Box
        component="form"
        id={block.id}
        onSubmit={onSubmit}
        sx={{
          ...sx.dimensions,
          ...sx.spacing,
          ...sx.background,
          ...sx.border,
        }}
      >
        {/* {(block.formData?.title || block.formData?.description) && (
        <ModalHeader
          title={block.formData?.title}
          description={block.formData?.description}
        />
      )} */}
        <FormGrid
          fields={fields}
          control={control}
          hiddenFields={hiddenFields}
          onCheckboxChange={handleCheckboxChange}
          getValues={getValues}
          resetValues={resetValues}
        />
        {/* <FormActions /> */}
      </Box>
    </>
  );
};

export default FormBlock;
