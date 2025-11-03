"use client";
import HeaderSectionForm from "./HeaderSectionForm";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import useIsLeaving from "@/hooks/useIsLeaving";
import { useForm } from "react-hook-form";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import React from "react";
import ProfileForm from "./ProfileForm";
import useUpdateApi from "@/hooks/useUpdateApi";

const getDefaultUserData = (user: UserProfile) => {
  const defaultValues = {
    avatar: user?.avatar || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || null,
    whatsapp: user?.whatsapp || null,
    birthDate: user?.birthDate || null,
    gender: user?.gender || null,
    nationality: user?.nationality || null,
    maritalStatus: user?.maritalStatus || null,
    hasDrivingLicence: user?.hasDrivingLicence || false,
    country: user?.country || {
      code: "",
      name: "",
    },
    state: user?.state || {
      code: "",
      name: "",
    },
    city: user.city,
  } as Partial<UserProfile>;
  return defaultValues;
};

interface ProfileInfoFormProps {
  user: UserProfile;
}
export const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({ user }) => {
  const { isLoading, error, reset: resetApi } = useUpdateApi<UserProfile>();

  const formMethods = useForm({
    mode: "onChange",
    defaultValues: getDefaultUserData(user),
  });

  const {
    formState: { isDirty },
    reset,
  } = formMethods;

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  return (
    <>
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
          // handleCancel();
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <form className="space-y-2">
        <HeaderSectionForm formMethods={formMethods} />
        <ProfileForm formMethods={formMethods} />
        {(isDirty || isLoading) && (
          <div className="sticky bottom-2 z-30 flex justify-end rounded-base border border-gray-200 bg-white p-3 shadow-soft md:static md:justify-start md:p-5">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
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
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => resetApi()}
      >
        <Alert
          onClose={() => resetApi()}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
