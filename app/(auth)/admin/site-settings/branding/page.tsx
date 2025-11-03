"use client";

import { Eye, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import BrandAssets from "@/components/admin/settings/branding/BrandAssets";
import { BrandingData } from "@/types/branding";
import Generals from "@/components/admin/settings/branding/Generals";
import ColorSystem from "@/components/admin/settings/branding/ColorSystem";
import { BrandingPreview } from "@/components/admin/settings/branding/branding-preview";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { patchBrandingData } from "@/store/slices/brandingSlice";
import { Button } from "@/components/UI/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";

export default function BrandingControlPage() {
  const branding = useAppSelector((state) => state.branding.data);
  const dispatch = useAppDispatch();

  const formMethods = useForm<BrandingData>({
    defaultValues: branding,
  });

  const {
    formState: { isDirty },
    watch,
  } = formMethods;

  const onSubmit = formMethods.handleSubmit((data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    dispatch(patchBrandingData(data));
  });

  const onPreview = formMethods.handleSubmit((data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    dispatch(patchBrandingData(data));
  });


  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Branding Control</h1>
              <p className="text-muted-foreground mt-1">
                Manage your brand&apos;s visual identity across all touchpoints
              </p>
            </div>
            <div className="flex gap-3">
              {/* <Button
            variant="outlined"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {isPreviewMode ? "Exit Preview" : "Preview Changes"}
          </Button> */}
              <Button
                type="button"
                onClick={onPreview}
                variant="outline"
                disabled={!isDirty}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button type="submit" disabled={!isDirty}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="Generals" className="w-full space-y-3 px-4">
                <Card className="flex w-full items-center justify-between gap-3 space-y-0 p-0">
                  <TabsList>
                    <TabsTrigger value="Generals">Generals</TabsTrigger>
                    <TabsTrigger value="Brand Assets">Brand Assets</TabsTrigger>
                    <TabsTrigger value="Color System">Color System</TabsTrigger>
                  </TabsList>
                </Card>
                <TabsContent value="Generals">
                  <Generals />
                </TabsContent>
                <TabsContent value="Brand Assets">
                  <BrandAssets />
                </TabsContent>
                <TabsContent value="Color System">
                  <ColorSystem />
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <BrandingPreview tabValue={0} data={watch()} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
