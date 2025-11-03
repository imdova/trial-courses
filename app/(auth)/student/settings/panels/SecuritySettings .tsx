/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { emailSchema, passwordSchema } from "@/constants/schemas";
import { z } from "zod";
import { Check, KeyRound, Shield, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input, PasswordInput } from "@/components/UI/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";
import { useEffect } from "react";
import { API_SETTING_SECURITY } from "@/constants/api/setting";
import { signOut } from "next-auth/react";

const emailPhoneSchema = z.object({
  email: emailSchema.optional(),
});

const passwordSchemaOnly = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});

const SecuritySettings: React.FC = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { profile, loading: profileLoading ,getProfile } = useProfile();

  console.log("🚀 ~ SecuritySettings ~ profile:", profile);

  const getAuthHeaders = (token?: string) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "accept": "/",
    };
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;

    }
  
    return headers;
  };
  
  

  const emailPhoneForm = useForm<z.infer<typeof emailPhoneSchema>>({
    resolver: zodResolver(emailPhoneSchema),
    defaultValues: {
      email: profile?.user.email || "",
      // phone: "",
    },
  });

  useEffect(() => {
    if (profile) {
      emailPhoneForm.reset({
        email: profile.user.email || ""
      });
    } else {
      getProfile(session?.user?.id || "");
    }
  }, [profile, emailPhoneForm, getProfile, session?.user?.id]);

  const passwordForm = useForm<z.infer<typeof passwordSchemaOnly>>({
    resolver: zodResolver(passwordSchemaOnly),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onEmailPhoneSubmit(values: z.infer<typeof emailPhoneSchema>) {
    if (!session?.user?.accessToken) {
      toast.error("You must be logged in to update your settings");
      return;
    }

    setIsLoading(true);
    try {
      const payload: any = {};
      if (values.email) payload.email = values.email;
      const response = await fetch(API_SETTING_SECURITY, {
        method: 'PATCH',
        headers: getAuthHeaders(session.user.accessToken),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update settings: ${response.statusText}`);
      }

      toast.success("Email updated successfully!");
      emailPhoneForm.reset();
      await signOut(); 
    } catch (error) {
      console.error("Error updating email/phone:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update email and phone");
    } finally {
      setIsLoading(false);
    }
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordSchemaOnly>) {
    if (!session?.user?.accessToken) {
      toast.error("You must be logged in to update your password");
      return;
    }

    setIsLoading(true);
    try {
      // Prepare payload for password update
      const payload = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmPassword,
      };

      const response = await fetch(API_SETTING_SECURITY, {
        method: 'PATCH',
        headers: getAuthHeaders(session.user.accessToken),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update password: ${response.statusText}`);
      }
      toast.success("Password updated successfully!");
      passwordForm.reset();
      await signOut(); 
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  }

  const [enable2FA, setEnable2FA] = useState(false);
  const toggle = () => setEnable2FA(!enable2FA);

  return (
    <div>
      {/* Form 1: Email & Phone */}
      <Form {...emailPhoneForm}>
        <form
          onSubmit={emailPhoneForm.handleSubmit(onEmailPhoneSubmit)}
          className={"space-y-4"}
          noValidate
        >
          <Card>
            <CardHeader>
              <CardTitle>Login Information</CardTitle>
              <CardDescription>
                Update your email address and phone number
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 max-w-[400px] space-y-4">
              {profileLoading && (
                <div className="text-sm text-muted-foreground mb-4">
                  Loading profile data...
                </div>
              )}
              <FormField
                control={emailPhoneForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        disabled={profileLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-muted-foreground text-xs">
                      This email is used for login and notifications.
                    </p>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={emailPhoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneNumberInput disabled={profileLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-muted-foreground text-xs">
                      Used for account recovery and two-factor authentication.
                    </p>
                  </FormItem>
                )}
              /> */}
              <Button type="submit" disabled={isLoading || profileLoading}>
                {isLoading ? "Updating..." : profileLoading ? "Loading..." : "Update Email"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Form 2: Password */}
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className={"space-y-4"}
          noValidate
        >
          <Card>
            <CardHeader className="mb-4">
              <CardTitle>Password Management</CardTitle>
              <CardDescription>
                Update your password or enable two-factor authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="my-4 max-w-[400px] space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>confirmPassword</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
            <CardContent>
              <Alert variant="muted">
                <Shield />
                <AlertTitle className="font-semibold">
                  Password Requirements
                </AlertTitle>
                <AlertDescription>
                  <ul className="text-muted-foreground list-disc space-y-1 pl-2 text-xs">
                    <li>At least 8 characters long</li>
                    <li>Contains at least one uppercase letter</li>
                    <li>Contains at least one lowercase letter</li>
                    <li>Contains at least one number</li>
                    <li>Contains at least one special character</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Two-Factor Authentication Section */}
      <Card className="space-y-2">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an entire layer of security to your account!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md">
            {enable2FA ? (
              <div className="space-y-2">
                <Alert variant="success">
                  <Check />
                  <AlertTitle>Enabled</AlertTitle>
                  <AlertDescription>
                    Two-factor authentication is enabled for your account.
                  </AlertDescription>
                </Alert>
                <Button
                  variant="outline"
                  className="border-red-200 bg-red-50 text-red-500"
                  onClick={toggle}
                >
                  <KeyRound />
                  Disable Two-Factor Authentication
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Alert variant="destructive">
                  <TriangleAlert />
                  <AlertTitle>Not Enabled</AlertTitle>
                  <AlertDescription>
                    Two-factor authentication is not enabled for your account.
                    We strongly recommend enabling this feature for additional
                    security.
                  </AlertDescription>
                </Alert>
                <Button variant="outline" onClick={toggle}>
                  <KeyRound />
                  Enable Two-Factor Authentication
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
