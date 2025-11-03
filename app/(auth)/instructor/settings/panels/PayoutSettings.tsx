"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import { CircleAlertIcon, DollarSign } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/UI/radio-group";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Collapsible, CollapsibleContent } from "@/components/UI/Collapsible";
import Combobox from "@/components/UI/Combobox";
import Flag from "@/components/UI/flag";
import { useLocationData } from "@/hooks/useLocationData";
import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";

const formSchema = z.object({
  payoutMethod: z.string(),
  holderName: z.string(),
  accountNumber: z.number(),
  routingNumber: z.number(),
  instapayAccount: z.string(),
  walletNumber: z.string(),
  payoutSchedule: z.string(),
  country: z.string(),
  taxId: z.string(),
});

const PayoutSettings: React.FC = () => {
  const { countries } = useLocationData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payoutMethod: "bank",
      holderName: "",
      instapayAccount: "",
      walletNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values)
}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"space-y-4"}
        noValidate
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Payout Settings
          </CardTitle>
          <CardDescription>
            Manage how and when you receive payments for your courses.
          </CardDescription>
        </CardHeader>
        <Card>
          <CardHeader>
            <CardTitle>Earning Summary</CardTitle>
            <CardDescription>Quick over view of your earning</CardDescription>
            <CardAction>
              <Button variant="outline" className="w-fit" asChild>
                <Link href={"#"}>
                  <DollarSign />
                  View Full Earning
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-6 sm:items-center">
                <span className="text-muted-foreground text-sm">
                  Current Balance
                </span>
                <h3 className="text-lg font-bold">1,245.00</h3>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-6 sm:items-center">
                <span className="text-muted-foreground text-sm">
                  Last Payout
                </span>
                <h3 className="text-lg font-bold">$980.50</h3>
                <span className="text-muted-foreground text-xs">
                  April 1, 2025
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-6 sm:items-center">
                <span className="text-muted-foreground text-sm">
                  Next Payout
                </span>
                <h3 className="text-lg font-bold">$1,245.00</h3>
                <span className="text-muted-foreground text-xs">
                  May 1, 2025
                </span>
              </div>
            </div>
            <Alert variant="warning">
              <CircleAlertIcon />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                You must complete your payout setting to receive payments for
                your course.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="payoutMethod"
              defaultValue="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payout Method</FormLabel>
                  <FormDescription>
                    Select how you would like to receive your earnings:
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col gap-4"
                    >
                      <FormItem>
                        <div className="rounded-base has-data-[state=checked]:border-primary/80 border p-4">
                          <div className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="bank" />
                            </FormControl>
                            <FormLabel className="flex w-full flex-col items-start gap-0 font-normal">
                              Bank Transfer
                              <FormDescription className="text-muted-foreground text-sm">
                                Receive payment directly to your bank account.
                                Processing time: 3-5 business days.
                              </FormDescription>
                            </FormLabel>
                          </div>
                          {/* inside  */}
                          <Collapsible open={field.value === "bank"}>
                            <CollapsibleContent className="CollapsibleContent">
                              <div className="mt-2 max-w-[400px] space-y-3 p-3 md:pl-8">
                                <FormField
                                  control={form.control}
                                  name="holderName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Account Holder Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter location"
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="accountNumber"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Account Number</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="XXXXXXXXXXXXXXX"
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="routingNumber"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Routing Number</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="XXXXXXXXXXXXXXX"
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </FormItem>
                      <FormItem>
                        <div className="rounded-base has-data-[state=checked]:border-primary/80 border p-4">
                          <div className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="instapay" />
                            </FormControl>
                            <FormLabel className="flex w-full flex-col items-start gap-0 font-normal">
                              InstaPay
                              <FormDescription className="text-muted-foreground text-sm">
                                Receive payments to your instapay account.
                                Processing time: 1-2 business days.
                              </FormDescription>
                            </FormLabel>
                          </div>
                          {/* inside */}
                          <Collapsible open={field.value === "instapay"}>
                            <CollapsibleContent className="CollapsibleContent">
                              <div className="mt-2 max-w-[400px] space-y-3 p-3 md:pl-8">
                                <FormField
                                  control={form.control}
                                  name="instapayAccount"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>InstaPay userName</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter Your InstaPay userName"
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </FormItem>
                      <FormItem>
                        <div className="rounded-base has-data-[state=checked]:border-primary/80 border p-4">
                          <div className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="wallet" />
                            </FormControl>
                            <FormLabel className="flex w-full flex-col items-start gap-0 font-normal">
                              Mobile Wallet
                              <FormDescription className="text-muted-foreground text-sm">
                                Receive payments to your (Vedellene cash, Orange
                                cash, We cash) wallet. Processing time: 1-2
                                business days.
                              </FormDescription>
                            </FormLabel>
                          </div>
                          {/* inside */}
                          <Collapsible open={field.value === "wallet"}>
                            <CollapsibleContent className="CollapsibleContent">
                              <div className="mt-2 max-w-[400px] space-y-3 p-3 md:pl-8">
                                <FormField
                                  control={form.control}
                                  name="walletNumber"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Wallet Number</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter Your wallet number"
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payoutSchedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payout Schedule</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your payout schedule" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monthly">
                        Monthly (1st of each Month)
                      </SelectItem>
                      <SelectItem value="weekly">
                        Weekly (Every Monday)
                      </SelectItem>
                      <SelectItem value="biweekly">
                        Biweekly (Every 2 weeks)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how often you want to receive your earnings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardHeader className="mt-10 mb-5">
            <CardTitle>Tax Information</CardTitle>
            <CardDescription>
              Required for tax reporting purposes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <FormItem className="max-w-[400px]">
                  <FormLabel>Tax ID / SSN</FormLabel>
                  <Input {...field} placeholder="Enter your tax information" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>Country of Tax Residence</FormLabel>
                  <FormControl>
                    <Combobox
                      options={countries.map((country) => ({
                        value: country.isoCode,
                        label: country.name,
                        icon: (
                          <Flag
                            code={String(country.isoCode.toLowerCase())}
                            name={String(country.name || "")}
                          />
                        ),
                      }))}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default PayoutSettings;
