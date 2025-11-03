"use client";
import { useForm } from "react-hook-form";
import { Eye, Save, TriangleAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/UI/form";
import { Button } from "@/components/UI/button";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import useScrollDetection from "@/hooks/useScrollDetection";
import { cn } from "@/util";
import { useInstructorBundles } from "@/hooks/useInstructorBundles";
import { BundleFormData, bundleSchema } from "../utils/bundle.schema";
import BundleInfoSection from "./bundle-info-section";
import BundlePricingCard from "./bundle-pricing";
import { BundleSideBar } from "./bundle-sidebar";
import { useState } from "react";
import { CourseBundle } from "@/types/courses";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";
import { Check } from "lucide-react";
import Link from "next/link";
import { useLocationData } from "@/hooks/useLocationData";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import BundleCourseSection from "./bundle-courses-section";
import BundlePreview from "./bundle-preview";
import { useRouter } from "next/navigation";
import useIsLeaving from "@/hooks/useIsLeaving";

interface BundleFormProps {
  bundle?: (BundleFormData & { id?: string | null }) | null;
}

const getDefaultValues = (userCurrency?: string): BundleFormData => ({
  title: "",
  description: "",
  slug: "",
  thumbnail_url: "",
  is_free: false,
  status: "draft",
  courseIds: [],
  pricings: [
    {
      currency_code: userCurrency || "USD",
      discount_amount: 0,
      regular_price: 0,
      sale_price: 0,
    },
  ],
});
const BundleForm: React.FC<BundleFormProps> = ({ bundle }) => {
  const router = useRouter();
  const isScrolled = useScrollDetection();
  const [createdBundle, setCreatedBundle] = useState<CourseBundle | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    loading,
    drafting,
    error,
    updateExistingBundle,
    createNewBundle,
    clearBundleError,
  } = useInstructorBundles();
  const isEdit = Boolean(bundle?.id);

  const { countries } = useLocationData();
  const { data: locations } = useGeoLocation();
  const userCurrency = countries.find(
    (country) => country.isoCode === locations?.country_code2,
  )?.currency;

  const DEFAULT_VALUES = getDefaultValues(userCurrency);

  const form = useForm<BundleFormData>({
    resolver: zodResolver(bundleSchema),
    defaultValues: bundle || DEFAULT_VALUES,
  });

  async function onSubmit(values: BundleFormData) {
    if (bundle?.id) {
      const newBundle = await updateExistingBundle(bundle?.id, {
        ...values,
        status: "published",
      });
      if (newBundle) {
        setCreatedBundle(newBundle);
        setIsSuccess(true);
        form.reset(values);
      }
    } else {
      const newBundle = await createNewBundle({
        ...values,
        status: "published",
      });
      if (newBundle) {
        setCreatedBundle(newBundle);
        setIsSuccess(true);
        form.reset(values);
      }
    }
  }

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: form.formState.isDirty,
  });

  async function onDraft(leaving?: boolean) {
    const values = form.getValues();
    console.log("🚀 ~ onDraft ~ values:", values)

    if (!values.title) {
      form.setError("title", {
        type: "manual",
        message: "Bundle Title is required",
      });
      return;
    }
    // Success
    if (bundle?.id) {
      await updateExistingBundle(bundle?.id, {
        ...values,
        status: "draft",
      });
    } else {
      const createdBundle = await createNewBundle({
        ...values,
        status: "draft",
      });
      router.replace(`/lms/bundle/edit/${createdBundle?.id}`);
    }
    form.reset(values);
    if (leaving) {
      handleUserDecision(true);
    }
  }

  return (
    <>
      <BundleSuccessAlertDialog
        isEdit={isEdit}
        bundle={createdBundle}
        open={isSuccess}
      />
      <BundleErrorAlertDialog
        isEdit={isEdit}
        message={error}
        onOpenChange={clearBundleError}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <AlertDialog open={isLeaving}>
            <AlertDialogContent>
              <AlertDialogHeader className="items-center">
                <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
                  <TriangleAlertIcon className="text-destructive size-6" />
                </div>
                <AlertDialogTitle className="text-center">
                  Are you sure you want to leave?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  You have unsaved changes. Are you sure you want to leave
                  without saving?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setLeavingManually(false);
                    handleUserDecision(false);
                  }}
                >
                  Continue Editing
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="warning"
                  onClick={() => {
                    handleUserDecision(true);
                  }}
                >
                  Discard Changes
                </AlertDialogAction>
                <Button onClick={() => onDraft(true)}>
                  <Save /> {drafting ? "Saving..." : "Save to draft"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Tabs defaultValue="form">
            <CardHeader
              className={cn(
                "bg-background sticky top-[70px] z-20 mb-0 py-5",
                isScrolled ? "border-b" : "",
              )}
            >
              <CardTitle>
                {isEdit ? "Edit Bundle" : "Create New Bundle"}
              </CardTitle>
              <CardDescription>
                {isEdit
                  ? "Edit bundle information, manage, and publish"
                  : "Create, manage, and publish a bundle"}
              </CardDescription>
              <CardAction>
                <TabsList className="flex gap-2">
                  <Button onClick={() => onDraft()} variant="outline">
                    <Save /> {drafting ? "Saving..." : "Save as draft"}
                  </Button>
                  <Button variant="outline" asChild>
                    <TabsTrigger
                      value="preview"
                      className="data-[state=active]:hidden"
                    >
                      <Eye /> Preview
                    </TabsTrigger>
                  </Button>
                  <Button variant="outline" asChild>
                    <TabsTrigger
                      value="form"
                      className="text-primary data-[state=active]:hidden"
                    >
                      <Check /> Preview
                    </TabsTrigger>
                  </Button>
                  <Button type="submit">
                    {isEdit
                      ? loading
                        ? "Updating..."
                        : "Update bundle"
                      : loading
                        ? "Publishing..."
                        : "Publish bundle"}
                  </Button>
                </TabsList>
              </CardAction>
            </CardHeader>

            <CardContent>
              <TabsContent value="form">
                <div className="grid gap-2 lg:grid-cols-10 xl:flex-row">
                  <div className="space-y-2 lg:col-span-7">
                    <BundleInfoSection />
                    <BundleCourseSection />
                    <BundlePricingCard />
                  </div>
                  <div className="lg:col-span-3">
                    <BundleSideBar />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="preview">
                <BundlePreview bundle={form.watch()} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </form>
      </Form>
    </>
  );
};

export default BundleForm;

const BundleSuccessAlertDialog: React.FC<{
  isEdit: boolean;
  bundle: CourseBundle | null;
  open: boolean;
  onClick?: () => void;
}> = ({ bundle, open, onClick, isEdit }) => {
  return (
    <AlertDialog open={open && Boolean(bundle)}>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center text-center">
          <div className="bg-primary/10 mx-auto mb-3 flex items-center justify-center rounded-full p-3">
            <Check className="text-primary size-12" />
          </div>

          <AlertDialogTitle className="text-lg font-semibold">
            {isEdit
              ? "Bundle Updated Successfully 🎉"
              : "Bundle Created Successfully 🎉"}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground text-center">
            {isEdit ? (
              <span>
                Congratulations! Your Bundle{" "}
                <strong className="text-primary">{bundle?.title}</strong> has
                has been successfully updated.
              </span>
            ) : (
              <span>
                Congratulations! Your course{" "}
                <strong className="text-primary">{bundle?.title}</strong> has
                been successfully created.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center gap-3 pt-4">
          <AlertDialogAction variant="outline" onClick={onClick} asChild>
            <Link href="/instructor/bundles/">Back to bundles</Link>
          </AlertDialogAction>
          <AlertDialogAction onClick={onClick} asChild>
            <Link href={`/bundles/${bundle?.id}`}>
              {isEdit ? "View Updated bundle" : "View bundle"}
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const BundleErrorAlertDialog: React.FC<{
  isEdit: boolean;
  message?: string | null;
  onOpenChange: () => void;
}> = ({ message, isEdit, onOpenChange }) => {
  return (
    <AlertDialog open={Boolean(message)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center text-center">
          <div className="bg-destructive/10 mx-auto mb-3 flex items-center justify-center rounded-full p-3">
            <TriangleAlertIcon className="text-destructive size-12" />
          </div>
          <AlertDialogTitle className="text-lg font-semibold">
            {isEdit ? "Course Update failed" : "Course Creation failed"}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground text-center">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-3 pt-4">
          <AlertDialogCancel variant="destructive">ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
