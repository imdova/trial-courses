"use client";
import { ModalHeader } from "./ModalHeader";
import { FormContent } from "./FormContent";
import { getDefaultValues } from "@/util/forms";
import { useFormState } from "@/hooks/useFormState";
import { FormModalProps } from "@/types/forms";
import { useFieldVisibility } from "@/hooks/useFieldVisibility";
import useIsLeaving from "@/hooks/useIsLeaving";
import { Dialog, DialogContent, DialogTitle } from "@/components/UI/dialog";
import LeaveConfirmationModal from "../UI/form/LeaveConfirmationModal";
import { Form } from "@/components/UI/form";

const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  onSubmit,
  onDelete,
  onChange,
  enableResetButton,
  fields = [],
  title,
  description,
  initialValues = {},
  children,
  loading,
  deleteLoading,
  error,
  submitButtonText,
  deleteButtonText,
  cancelButtonText,
  removeField,
  mode = "onChange",
  resetAfterSubmit,
}) => {
  const defaultValues = getDefaultValues(fields, initialValues);
  const {
    hiddenFields,
    handleCheckboxChange,
    reset: resetFieldVisibility,
  } = useFieldVisibility(fields, initialValues, open);

  const formMethods = useFormState(open, fields, initialValues, mode);
  const {
    reset,
    setValue,
    formState: { isDirty },
  } = formMethods;

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: open && isDirty,
  });

  const resetValues = (fieldNames: (string | number)[]) => {
    fieldNames.forEach((name) => {
      const field = fields.find((f) => f.name === name);
      if (field) {
        const defaultValue = field.type === "checkbox" ? false : "";
        setValue(String(name), defaultValue, { shouldDirty: true });
      }
    });
  };

  const handleClose = () =>
    isDirty ? setLeavingManually(true) : handleCancel();
  const handleReset = () => {
    reset(defaultValues);
    resetFieldVisibility();
  };
  const handleCancel = () => {
    handleReset();
    onClose?.();
  };

  return (
    <>
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
          handleCancel();
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          {/* Always include DialogTitle for accessibility */}
          {title ? (
            <DialogTitle className="sr-only">{title}</DialogTitle>
          ) : (
            <DialogTitle className="sr-only">Form Modal</DialogTitle>
          )}
          
          {onClose && (
            <ModalHeader
              title={title}
              description={description}
              error={error}
              handleCancel={handleCancel}
            />
          )}
          <div className="m-0 h-full p-0 max-h-[calc(100dvh-200px)]">
            <Form {...formMethods}>
              <FormContent
                fields={fields}
                onSubmit={onSubmit}
                resetAfterSubmit={resetAfterSubmit}
                error={error}
                formMethods={formMethods}
                hiddenFields={hiddenFields}
                onCheckboxChange={handleCheckboxChange}
                loading={loading}
                deleteLoading={deleteLoading}
                onDelete={onDelete}
                resetValues={resetValues}
                onCancel={handleCancel}
                onChange={onChange}
                submitButtonText={submitButtonText}
                deleteButtonText={deleteButtonText}
                cancelButtonText={cancelButtonText}
                enableResetButton={enableResetButton}
                removeField={removeField}
                onReset={handleReset}
              >
                {children}
              </FormContent>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormModal;
