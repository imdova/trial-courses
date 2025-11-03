/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import {
  API_RESEND_VERIFICATION,
  API_VERIFY_IDENTITY,
} from "@/constants/api/users";
import { Mail, Lock, Check, ShieldPlus, Loader2, Phone } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";
import { toast } from "@/components/UI/toast";
import DropFileDialog from "@/components/UI/DropFileDialog";

const AcademyVerificationTab: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Account Verification</CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <Badge variant="warning">Not verified</Badge>
            <span className="ml-2 text-sm text-gray-600">
              0/3 steps complete
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg font-medium text-gray-800">
          Verification steps
        </p>
        <div className="space-y-4">
          <EmailVerification user={user} />
          <PhoneVerification user={user} />
          <IdentificationVerification user={user} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademyVerificationTab;

const EmailVerification = ({ user }: { user?: User }) => {
  const token = user?.accessToken;
  const disabled = false;
  const completed = false;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const resendVerification = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_RESEND_VERIFICATION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to resend verification");
      }
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error on Sending verification", {
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <AlertDialog open={success} onOpenChange={setSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <Badge className="size-14 rounded-full" size="xl" variant="success">
              <Check />
            </Badge>
            <AlertDialogTitle className="text-center">
              Verification Link Sent
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your Email Veification has been sent to your email vist it to
              verify your account
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="default">Ok</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-1 items-center gap-2">
        <Badge
          className="aspect-square rounded-full"
          size="lg"
          disabled={disabled}
          variant={completed ? "default" : "success"}
        >
          {completed ? <Check /> : disabled ? <Lock /> : <Mail />}
        </Badge>
        <div>
          <p className="text-sm font-medium">Email Verification</p>
          <p className="text-muted-foreground text-sm">
            Verify your email address
          </p>
        </div>
      </div>
      {completed ? (
        <Badge variant="success" size="lg">
          <Check />
          Verified
        </Badge>
      ) : disabled ? (
        <Button disabled={disabled} variant="outline">
          <Lock /> Locked
        </Button>
      ) : (
        <Button onClick={resendVerification} disabled={disabled}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              <ShieldPlus />
              Verify Now
            </>
          )}
        </Button>
      )}
    </div>
  );
};

const PhoneVerification = ({ user }: { user?: User }) => {
  const token = user?.accessToken;
  const disabled = false;
  const completed = false;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const resendVerification = async () => {
    setLoading(true);

    // try {
    //   const response = await fetch(API_RESEND_VERIFICATION, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to resend verification");
    //   }
    //   setSuccess(true);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     toast.error("Error on Fetching academy", {
    //       description: error.message,
    //     });
    //   }
    // } finally {
    //   setLoading(false);
    // }
    setTimeout(() => {
      setLoading(false);
      toast.error("Error on Sending verification Code", {
        description: "Veification phone isn't applied yet ",
      });
    }, 2000);
  };

  return (
    <div className="flex">
      <AlertDialog open={success} onOpenChange={setSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <Badge className="size-14 rounded-full" size="xl" variant="success">
              <Check />
            </Badge>
            <AlertDialogTitle className="text-center">
              Verification Code Sent
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your Phone Verification has been sent to your phone vist it to
              verify your account
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="default">Ok</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-1 items-center gap-2">
        <Badge
          className="aspect-square rounded-full"
          size="lg"
          disabled={disabled}
          variant={completed ? "default" : "success"}
        >
          {completed ? <Check /> : disabled ? <Lock /> : <Phone />}
        </Badge>
        <div>
          <p className="text-sm font-medium">Phone Verification</p>
          <p className="text-muted-foreground text-sm">
            Verify your phone number
          </p>
        </div>
      </div>
      {completed ? (
        <Badge variant="success" size="lg">
          <Check />
          Verified
        </Badge>
      ) : disabled ? (
        <Button disabled={disabled} variant="outline">
          <Lock /> Locked
        </Button>
      ) : (
        <Button onClick={resendVerification} disabled={disabled}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              <ShieldPlus />
              Verify Now
            </>
          )}
        </Button>
      )}
    </div>
  );
};

const IdentificationVerification = ({ user }: { user?: User }) => {
  const token = user?.accessToken;
  const disabled = false;
  const completed = false;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const resendVerification = async (files: string[]) => {
    setLoading(true);
    try {
      const response = await fetch(API_VERIFY_IDENTITY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileUrls: files,
          notes: "Academy identity verification",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to resend verification");
      }
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error on Fetching academy", {
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <AlertDialog open={success} onOpenChange={setSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <Badge className="size-14 rounded-full" size="xl" variant="success">
              <Check />
            </Badge>
            <AlertDialogTitle className="text-center">
              Your Verification Request Has Been Submitted Successfully
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Our team will review your request within a few days. You’ll
              receive an update soon — thank you for your patience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="default">Ok</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-1 items-center gap-2">
        <Badge
          className="aspect-square rounded-full"
          size="lg"
          disabled={disabled}
          variant={completed ? "default" : "success"}
        >
          {completed ? <Check /> : disabled ? <Lock /> : <Mail />}
        </Badge>
        <div>
          <p className="text-sm font-medium">Identity Verification</p>
          <p className="text-muted-foreground text-sm">
            Verify your organization’s identity to build trust and access all
            platform features.
          </p>
        </div>
      </div>
      {completed ? (
        <Badge variant="success" size="lg">
          <Check />
          Verified
        </Badge>
      ) : disabled ? (
        <Button disabled={disabled} variant="outline">
          <Lock /> Locked
        </Button>
      ) : (
        <DropFileDialog
          title="Upload ID"
          description="Upload your ID"
          uploadButtonText="Upload ID"
          cancelButtonText="Cancel"
          onSuccess={resendVerification}
          previewType="grid"
          multiple={true}
          acceptedFileTypes={[
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/pdf",
          ]}
          maxFileSizeMB={5}
          maxFiles={3}
        >
          <Button disabled={disabled}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Sending
              </>
            ) : (
              <>
                <ShieldPlus />
                Verify Now
              </>
            )}
          </Button>
        </DropFileDialog>
      )}
    </div>
  );
};
