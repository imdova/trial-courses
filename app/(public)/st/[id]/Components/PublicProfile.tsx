"use client";
import React, { useState } from "react";
import { Switch, IconButton, InputAdornment } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Edit } from "@mui/icons-material";
import { User } from "next-auth";
import FormModal from "@/components/FormModal/FormModal";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types/forms";

const userNameField: FieldConfig<UserProfile>[] = [
  {
    name: "userName",
    type: "text",
    required: true,
    textFieldProps: {
      placeholder: "Enter User Name",
      InputProps: {
        startAdornment: <InputAdornment position="start">me/</InputAdornment>,
      },
    },
    rules: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters long",
      },
      maxLength: {
        value: 50,
        message: "Username cannot exceed 50 characters",
      },
      pattern: {
        value: /^[a-z0-9-_]+$/,
        message:
          "Username must contain only lowercase letters, numbers, hyphens, or underscores (no spaces or uppercase)",
      },
    },
  },
];

const PublicProfile: React.FC<{ user: UserProfile }> = ({ user }) => {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error, reset } = useUpdateApi(handleSuccess);
  const onOpen = () => setIsModalOpen(true);
  const onClose = () => {
    setIsModalOpen(false);
    reset();
  };

  async function handleSuccess(updatedUser: UserProfile) {
    onClose();
    await updateSession({
      userName: updatedUser.userName,
    } as User);
    router.replace(`/me/${updatedUser.userName}`, { scroll: false });
  }

  const handleUpdate = async (formData: Partial<UserProfile>) => {
    // Example usage (replace with real logic)
    console.log("Updating user with:", formData);
    // await updateUser(formData); // your API call
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <FormModal
        open={isModalOpen}
        onClose={onClose}
        onSubmit={handleUpdate}
        error={error?.message}
        loading={isLoading}
        fields={userNameField}
        title="Enter Your user Name"
        initialValues={{ userName: user.userName }}
        mode="onChange"
      />
      {/* Title and Description */}
      <h3 className="mb-2 text-xl font-semibold text-main">
        Your Public Profile
      </h3>

      <div className="flex items-center justify-between">
        <label className="font-semibold text-main">Public Profile</label>
        <Switch
          color="primary"
          checked={user.isPublic}
          onChange={(event) => {
            const isChecked = event.target.checked;
            handleUpdate({ isPublic: isChecked });
          }}
        />
      </div>
      {user.isPublic && (
        <div className="my-1 flex items-center justify-between rounded-base bg-primary/10 p-2 py-3">
          <div>
            <p className="text-sm text-muted-foreground">Public profile link:</p>
            <Link
              target="_blank"
              href={`https://www.medicova.net/me/${user.userName}?public=true`}
              className="text-sm text-primary underline"
            >
              me/{user.userName}
            </Link>
          </div>
          <IconButton
            onClick={onOpen}
            className="rounded border border-solid border-gray-200 p-2"
          >
            <Edit />
          </IconButton>
        </div>
      )}
      {/* <div className="flex items-center justify-between">
        <label className="font-semibold text-main">Profile Visibility</label>
        <Switch
          color="primary"
          // checked={user.isVisible ?? false}
          // onChange={(event) => {
          //   const isChecked = event.target.checked;
          //   handleUpdate({ isVisible: isChecked });
          // }}
        />
      </div> */}
      <div className="flex items-center justify-between">
        <label className="font-semibold text-main">
          Available for immediate start
        </label>
        <Switch
          color="primary"
          // checked={user.isImmediate }
          // onChange={(event) => {
          //   const isChecked = event.target.checked;
          //   handleUpdate({ isImmediate: isChecked });
          // }}
        />
      </div>

      {/* Centered Typography with Background */}
      {/* {!user.isImmediate && (
        <p className="mt-1 rounded-base bg-primary/10 p-2 text-sm text-muted-foreground">
          Let companies know you can start immediately by adding the Immediate
          start badge to your profile
        </p>
      )} */}
    </div>
  );
};

export default PublicProfile;
