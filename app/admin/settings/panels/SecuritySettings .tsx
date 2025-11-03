"use client";

import PhoneInput from "@/components/UI/PhoneInput";
import { formDataSettings } from "@/types/forms";
import { KeyRound, Shield, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface SecuritySettingsProps {
  register: UseFormRegister<formDataSettings>;
  errors: {
    [K in keyof formDataSettings]?: { message?: string };
  };
  watch: UseFormWatch<formDataSettings>;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  register,
  errors,
  watch,
}) => {
  const [enable2FA, setEnable2FA] = useState(false);
  const newPassword = watch("newPassword");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Manage your account security and login information.
      </p>

      <div className="space-y-8">
        <div className="p-3 border rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Login Information
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Update your email address and phone number
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Example@gmail.com"
              />
              <p className="mt-1 text-sm text-gray-500">
                This email is used for login and notifications.
              </p>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="max-w-[400px]">
              <PhoneInput register={register} errors={errors} />
              <p className="text-sm text-gray-500 mt-1">
                Used for account recovery and two-factor authentication.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 border rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900">
            Password Management
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Update your password or enable two-factor authentication
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value: string) => {
                    const errors = [];
                    if (!/[A-Z]/.test(value))
                      errors.push("at least one uppercase letter");
                    if (!/[a-z]/.test(value))
                      errors.push("at least one lowercase letter");
                    if (!/[0-9]/.test(value))
                      errors.push("at least one number");
                    if (!/[^A-Za-z0-9]/.test(value))
                      errors.push("at least one special character");

                    return errors.length > 0
                      ? `Password must contain ${errors.join(", ")}.`
                      : true;
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.newPassword &&
                typeof errors.newPassword.message === "string" && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 border rounded-md">
              <Shield size={20} />
              <div>
                <h3 className="font-semibold mb-2">Password Requirements</h3>
                <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-2">
                  <li>At least 8 characters long</li>
                  <li>Contains at least one uppercase letter</li>
                  <li>Contains at least one lowercase letter</li>
                  <li>Contains at least one number</li>
                  <li>Contains at least one special character</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900">
            Two-Factor Authentication
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add an entire layer of security to your account!
          </p>

          <div className="p-4  rounded-md">
            {enable2FA ? (
              <div>
                <p className="text-sm font-medium text-green-700 mb-2">
                  Two-factor authentication is enabled for your account.
                </p>
                <button
                  type="button"
                  onClick={() => setEnable2FA(false)}
                  className="flex gap-2 items-center p-3 border  rounded-md  text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
                >
                  <KeyRound size={15} />
                  Disable Two-Factor Authentication
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-3 mb-8 p-4 bg-red-50 border rounded-lg">
                  <TriangleAlert className="text-red-700" size={16} />
                  <div>
                    <p className="text-red-700 font-medium">Not Enabled</p>
                    <p className="text-sm text-red-600">
                      Two-factor authentication is not enabled for your account.
                      We strongly recommend enabling this feature for additional
                      security.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEnable2FA(true)}
                  className="flex gap-2 items-center p-3 border text-sm font-semibold rounded-md  focus:outline-none"
                >
                  <KeyRound size={15} />
                  Enable Two-Factor Authentication
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
