"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Bell,
  DollarSign,
  Phone,
  SaveIcon,
  SettingsIcon,
  Wrench,
} from "lucide-react";
import { Input } from "@/components/UI/input";
import ToggleSwitch from "@/components/UI/ToggleSwitch";
import Button from "@/components/UI/Buttons/Button";
import { Card } from "@/components/UI/card";
import { settingsSchema } from "@/constants/schemas/settings.schema";

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function PlatformSettings() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      platformName: "Smart Skibidi",
      platformCurrency: "USD",
      serviceFee: 5,
      taxRate: 0,
      minWithdrawalAmount: 0,
      payoutProcessingTime: 0,
      referralBonus: 0,
      courseCommissionRate: 10,
      courseMinPrice: 0,
      courseMaxPrice: 0,
      mentorshipCommissionRate: 10,
      mentorshipMaxPrice: 0,
      courseApprovalRequired: true,
      mentorshipPlans: true,
      referralProgram: true,
      taxDeduction: true,
      emailNotifications: true,
      smsNotifications: true,
      maintenanceMode: false,
      maintenanceMessage: "",
      supportEmail: "arcadexit.tech@gmail.com",
      supportPhone: "+01754713136",
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="px-4">
      <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Platform Settings</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Configure your platform settings and preferences
          </p>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isSaving}
            variant="contained"
            color="success"
            size="md"
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="border-background h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                Saving...
              </>
            ) : isSaved ? (
              <>
                <div className="h-4 w-4 rounded-full bg-green-500" />
                Saved
              </>
            ) : (
              <>
                <SaveIcon className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Platform Information Section */}
        <Card className="space-y-4 p-3">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Platform Information</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Basic platform configuration and branding
          </p>

          <div className="bg-muted/30 grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform Name</label>
              <Input
                {...form.register("platformName")}
                className="bg-background"
              />
              {form.formState.errors.platformName && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.platformName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Platform Currency</label>
              <Input
                {...form.register("platformCurrency")}
                className="bg-background"
              />
              {form.formState.errors.platformCurrency && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.platformCurrency.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Financial Settings Section */}
        <Card className="space-y-4 p-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Financial Settings</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Configure pricing, fees, and financial parameters
          </p>

          <div className="bg-muted/30 grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "serviceFee",
                label: "Platform Service Fee (%)",
                type: "number",
              },
              { id: "taxRate", label: "Tax Rate (%)", type: "number" },
              {
                id: "minWithdrawalAmount",
                label: "Minimum Withdrawal Amount",
                type: "number",
              },
              {
                id: "payoutProcessingTime",
                label: "Payout Processing Time (days)",
                type: "number",
              },
              { id: "referralBonus", label: "Referral Bonus", type: "number" },
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="text-sm font-medium">{field.label}</label>
                <Input
                  type={field.type}
                  {...form.register(field.id as keyof SettingsFormValues, {
                    valueAsNumber: true,
                  })}
                  className="bg-background"
                />
                {form.formState.errors[
                  field.id as keyof SettingsFormValues
                ] && (
                  <p className="text-destructive text-sm">
                    {
                      form.formState.errors[
                        field.id as keyof SettingsFormValues
                      ]?.message
                    }
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Commission & Pricing Section */}
        <Card className="space-y-4 p-3">
          <h2 className="text-xl font-semibold">Commission & Pricing</h2>
          <p className="text-muted-foreground text-sm">
            Set commission rates and price limits for courses and mentorship
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-medium">Course Settings</h3>
              <div className="bg-muted/30 grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-3">
                {[
                  {
                    id: "courseCommissionRate",
                    label: "Commission Rate (%)",
                    type: "number",
                  },
                  { id: "courseMinPrice", label: "Min Price", type: "number" },
                  { id: "courseMaxPrice", label: "Max Price", type: "number" },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium">{field.label}</label>
                    <Input
                      type={field.type}
                      {...form.register(field.id as keyof SettingsFormValues, {
                        valueAsNumber: true,
                      })}
                      className="bg-background"
                    />
                    {form.formState.errors[
                      field.id as keyof SettingsFormValues
                    ] && (
                      <p className="text-destructive text-sm">
                        {
                          form.formState.errors[
                            field.id as keyof SettingsFormValues
                          ]?.message
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium">Mentorship Settings</h3>
              <div className="bg-muted/30 grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-2">
                {[
                  {
                    id: "mentorshipCommissionRate",
                    label: "Commission Rate (%)",
                    type: "number",
                  },
                  {
                    id: "mentorshipMaxPrice",
                    label: "Max Price",
                    type: "number",
                  },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium">{field.label}</label>
                    <Input
                      type={field.type}
                      {...form.register(field.id as keyof SettingsFormValues, {
                        valueAsNumber: true,
                      })}
                      className="bg-background"
                    />
                    {form.formState.errors[
                      field.id as keyof SettingsFormValues
                    ] && (
                      <p className="text-destructive text-sm">
                        {
                          form.formState.errors[
                            field.id as keyof SettingsFormValues
                          ]?.message
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Feature Settings Section */}
        <Card className="space-y-4 p-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Feature Settings</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Enable or disable platform features and notifications
          </p>

          <div className="bg-muted/30 space-y-6 rounded-lg p-4">
            <div>
              <h3 className="mb-3 font-medium">Platform Features</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    id: "courseApprovalRequired",
                    label: "Course Approval Required",
                    description: "Require admin approval for new courses",
                  },
                  {
                    id: "mentorshipPlans",
                    label: "Mentorship Plans",
                    description: "Enable mentorship functionality",
                  },
                  {
                    id: "referralProgram",
                    label: "Referral Program",
                    description: "Enable user referral system",
                  },
                  {
                    id: "taxDeduction",
                    label: "Tax Deduction",
                    description: "Enable tax deduction features",
                  },
                ].map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        {feature.label}
                      </label>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={
                        form.watch(
                          feature.id as keyof SettingsFormValues,
                        ) as boolean
                      }
                      onChange={(checked) => {
                        form.setValue(
                          feature.id as keyof SettingsFormValues,
                          checked,
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium">Notifications</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Email Notifications
                    </label>
                    <p className="text-muted-foreground text-sm">
                      Send email notifications to users
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={form.watch("emailNotifications")}
                    onChange={(checked) => {
                      form.setValue("emailNotifications", checked);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      SMS Notifications
                    </label>
                    <p className="text-muted-foreground text-sm">
                      Send SMS notifications to users
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={form.watch("smsNotifications")}
                    onChange={(checked) => {
                      form.setValue("smsNotifications", checked);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Maintenance Settings Section */}
        <Card className="space-y-4 p-3">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Maintenance Settings</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Configure maintenance mode and messages
          </p>

          <div className="bg-muted/30 space-y-4 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Maintenance Mode</label>
                <p className="text-muted-foreground text-sm">
                  Enable maintenance mode for the platform
                </p>
              </div>
              <ToggleSwitch
                checked={form.watch("maintenanceMode")}
                onChange={(checked) => {
                  form.setValue("maintenanceMode", checked);
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Maintenance Message</label>
              <textarea
                {...form.register("maintenanceMessage")}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter the message to display during maintenance"
              />
              {form.formState.errors.maintenanceMessage && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.maintenanceMessage.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Support Information Section */}
        <Card className="space-y-4 p-3">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Support Information</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Configure support contact information
          </p>

          <div className="bg-muted/30 grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <Input
                type="email"
                {...form.register("supportEmail")}
                className="bg-background"
              />
              {form.formState.errors.supportEmail && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.supportEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Support Phone</label>
              <Input
                {...form.register("supportPhone")}
                className="bg-background"
              />
              {form.formState.errors.supportPhone && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.supportPhone.message}
                </p>
              )}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
