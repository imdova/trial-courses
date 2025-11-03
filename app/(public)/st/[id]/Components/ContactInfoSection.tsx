"use client";
import { IconButton, Button, Snackbar, Alert } from "@mui/material";
import { Edit, Email, KeyOutlined, PhoneIphone } from "@mui/icons-material";
import { useState } from "react";

import { isValidPhoneNumber } from "@/util/forms";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types/forms";
import FormModal from "@/components/FormModal/FormModal";

type Contact = {
  email: string;
  phone: string;
};

const ContactInfoSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
  companyId?: string | null;
  isLocked: boolean;
}> = ({ user, isMe, companyId, isLocked }) => {
  const {
    isLoading: isUnlocking,
    error: unlockError,
    reset: resetUnlock,
  } = useUpdateApi();
  const { isLoading, error, reset } = useUpdateApi<UserProfile>(onClose);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = () => setIsModalOpen(true);
  function onClose() {
    setIsModalOpen(false);
    reset();
  }

  const fields: FieldConfig<Contact>[] = [
    {
      name: "email",
      type: "email",
      label: "Email*",
      textFieldProps: { placeholder: "Enter Email" },
      required: true,
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone*",
      rules: {
        validate: (value: string) =>
          isValidPhoneNumber(value || "") ||
          "Please enter a valid phone number",
      },
      textFieldProps: { placeholder: "Enter Phone Number" },
      required: true,
    },
  ];

  return (
    <div className="rounded-base border border-gray-200 bg-white p-4 shadow-soft md:p-5">
      {isMe && (
        <FormModal
          open={isModalOpen}
          error={error?.message}
          loading={isLoading}
          onClose={onClose}
          onSubmit={() => console.log("submit")}
          fields={fields}
          title="Update Contact"
          description="Help Recruiters reach You well"
          initialValues={{ email: user.email, phone: user.phone }}
        />
      )}

      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold text-main">Contact Info</h3>
        {isMe && (
          <IconButton
            onClick={onOpen}
            className="rounded border border-solid border-gray-200 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </div>

      {/* Email Section */}
      {isLocked ? (
        companyId ? (
          <div>
            <p className="my-2 text-muted-foreground">
              Unlock me to see my contact information{" "}
            </p>
            <Button
              startIcon={<KeyOutlined />}
              variant="outlined"
              className="text-nowrap"
            >
              {isUnlocking ? "..loading" : "Unlock Now"}
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground">The Data Of this user Is Privater</p>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-2">
          {user.email && (
            <p className="my-2 text-muted-foreground text-sm">
              <Email className="mr-2 inline-block text-sm" color="primary" />
              {user.email}
            </p>
          )}
          {/* Phone Section */}
          {user.phone && (
            <>
              <p className="my-2 text-muted-foreground text-sm">
                <PhoneIphone className="mr-2 inline-block" color="primary" />
                {user.phone}
              </p>
            </>
          )}
        </div>
      )}
      <Snackbar
        open={!!error || !!unlockError}
        autoHideDuration={6000}
        onClose={() => {
          reset();
          resetUnlock();
        }}
      >
        <Alert
          onClose={() => {
            reset();
            resetUnlock();
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {unlockError?.message || error?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ContactInfoSection;
