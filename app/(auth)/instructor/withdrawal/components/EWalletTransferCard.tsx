"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Separator } from "@/components/UI/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

import vodafone from "@/assets/icons/vodafone.svg";
import orange from "@/assets/icons/orange.svg";
import etisalat from "@/assets/icons/etisalat.svg";
import we from "@/assets/icons/we.svg";
import { ImageProps } from "next/image";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useState } from "react";
import { eWalletFormData, eWalletSchema } from "@/types/withdraw";
import { SavedMethod, WithdrawCardProps } from "@/types/finance";
import WithdrawRequestSuccess from "./WithdrawRequestSuccess";
import { Plus } from "lucide-react";
import { formatMoney } from "@/util/general";

const EWalletTrigger: React.FC<WithdrawCardProps> = ({ config }) => {
  return (
    <DialogTrigger asChild>
      <Card className="cursor-pointer duration-300 hover:scale-3d hover:shadow-lg">
        <CardHeader className="relative flex items-center gap-4">
          <Avatar className="size-10 rounded">
            <AvatarImage src={"/icons/e-wallet.png"} alt={"e-wallet"} />
          </Avatar>
          <div className="flex-1 space-y-2">
            <CardTitle>E-wallet</CardTitle>
            <CardDescription className="flex w-full gap-4 text-sm font-medium">
              <div className="flex-1">
                <p className="text-xs">Processing time</p>
                <p className="text-foreground">{config.processingTimeDays}</p>
              </div>
              <div className="min-w-12">
                <p className="text-xs">Fee</p>
                <p className="text-foreground">{config.feePercent * 100}%</p>
              </div>
              <div className="min-w-20">
                <p className="text-xs">Limits</p>
                <p className="text-foreground">
                  {config.min} - {config.max} USD
                </p>
              </div>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </DialogTrigger>
  );
};

type Company = "orange" | "vodafone" | "etisalat" | "we";

const companies: { label: string; value: Company; image: ImageProps["src"] }[] =
  [
    {
      label: "Orange",
      value: "orange",
      image: orange,
    },
    {
      label: "Vodafone",
      value: "vodafone",
      image: vodafone,
    },
    {
      label: "Etisalat",
      value: "etisalat",
      image: etisalat,
    },
    {
      label: "we",
      value: "we",
      image: we,
    },
  ];

const validateAndFormatPhone = (input?: string) => {
  const inputNumber = input?.replace(/\D/g, "") || ""; // Remove non-digit characters
  const phoneNumberObj = parsePhoneNumberFromString(inputNumber, "EG");
  return phoneNumberObj;
};

const EWalletTransferCard: React.FC<WithdrawCardProps> = ({
  config,
  savedMethods,
  balance,
}) => {
  const prevMethods = savedMethods.filter(
    (m) => m.type === "eWallet",
  ) as SavedMethod<eWalletFormData>[];
  const [showPrev, setShowPrev] = useState(prevMethods.length > 0);

  const [success, setSuccess] = useState(false);

  const [open, setOpen] = useState(false);
  const form = useForm<eWalletFormData>({
    resolver: zodResolver(eWalletSchema),
    mode: "onSubmit",
    defaultValues: {
      company: "vodafone",
      currency: "EGP",
    },
  });

  async function onSubmit(values: eWalletFormData) {
    console.log("🚀 ~ onSubmit ~ values:", values);
    if (values.amount > balance.amount) {
      form.setError("amount", {
        type: "manual",
        message: `You don't have enough balance to withdraw this amount, you have ${formatMoney(
          balance.amount,
          balance.currency,
        )}`,
      });
      return;
    }
    handleOpenChange(false);
    setSuccess(true);
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setShowPrev(prevMethods.length > 0);
    form.reset({
      company: "vodafone",
      currency: "EGP",
    });
  };

  return (
    <>
      <WithdrawRequestSuccess
        open={success}
        setOpen={setSuccess}
        processingTimeDays={config.processingTimeDays}
      />
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <EWalletTrigger
          config={config}
          savedMethods={savedMethods}
          balance={balance}
        />
        <DialogContent className="gap-0 p-0 py-5 sm:max-w-lg">
          <DialogHeader className="px-5">
            <DialogTitle>E-wallet Withdrawal Request</DialogTitle>
            <DialogDescription>
              Please enter your e-wallet phone number to request Withdrawal.
            </DialogDescription>
          </DialogHeader>
          <Separator className="mt-4" />

          {showPrev ? (
            <div className="grid gap-4 p-5">
              <h6 className="font-medium">Your Saved Methods</h6>
              <div className="flex flex-col gap-2">
                {prevMethods.map((method, index) => {
                  const company = companies.find(
                    (c) => c.value === method.metaData.company,
                  );
                  return (
                    <div
                      className="bg-accent text-muted-foreground flex w-full cursor-pointer gap-4 rounded-md border p-4 text-sm font-medium duration-300 hover:scale-3d hover:shadow-lg"
                      key={method.type + index}
                      onClick={() => {
                        form.reset(method.metaData);
                        setShowPrev(false);
                      }}
                    >
                      <div className="w-38">
                        <p className="text-xs">Telecom Provider</p>
                        <p className="text-foreground flex gap-2">
                          <Avatar className="size-5 rounded-none">
                            <AvatarImage src={company?.image} />
                            <AvatarFallback>{company?.label[0]}</AvatarFallback>
                          </Avatar>{" "}
                          {method.metaData.company}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs">Mobile Number</p>
                        <p className="text-foreground">
                          {method.metaData.phoneNumber}
                        </p>
                      </div>
                      <div className="min-w-20">
                        <p className="text-xs">Amount</p>
                        <p className="text-foreground">
                          {formatMoney(
                            method.metaData.amount,
                            method.metaData.currency,
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" onClick={() => setShowPrev(false)}>
                <Plus /> Add New
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
                className="flex flex-col"
                noValidate
              >
                <div className="grid gap-4 p-5">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <div className="flex w-full rounded-md shadow-xs">
                          <Select
                            onValueChange={(value) =>
                              form.setValue("company", value as Company)
                            }
                            defaultValue={form.watch("company")}
                          >
                            <SelectTrigger className="rounded-r-none shadow-none">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {companies.map((company) => (
                                <SelectItem
                                  key={company.value}
                                  value={company.value}
                                >
                                  <Avatar className="size-5 rounded-none">
                                    <AvatarImage src={company.image} />
                                    <AvatarFallback>
                                      {company.label[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="truncate">
                                    {company.label}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="relative flex-1">
                            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-sm peer-disabled:opacity-50">
                              +20
                            </div>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Mobile Number"
                                className="peer -ms-px w-full rounded-l-none pl-12 shadow-none focus-visible:z-1"
                                defaultValue={
                                  validateAndFormatPhone(field.value)
                                    ?.nationalNumber
                                }
                                onChange={(e) => {
                                  field.onChange(
                                    validateAndFormatPhone(e.target.value)
                                      ?.number,
                                  );
                                }}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <div className="flex rounded-md shadow-xs">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Amount"
                              className="-me-px rounded-r-none shadow-none"
                              {...field}
                              onChange={(e) => {
                                if (Number(e.target.value) >= 0)
                                  field.onChange(Number(e.target.value));
                              }}
                            />
                          </FormControl>
                          <span className="border-input bg-background text-muted-foreground -z-1 inline-flex items-center rounded-r-md border px-3 text-sm">
                            {balance.currency}
                          </span>
                        </div>
                        {config.feePercent > 0 && (
                          <FormDescription>
                            You will receive{" "}
                            <strong>
                              {formatMoney(
                                field.value * (1 - config.feePercent),
                                balance.currency,
                              )}{" "}
                            </strong>
                            after {config.feePercent * 100}% fees.{" "}
                            {/* <span className="text-destructive">
                            -{" "}
                            {formatMoney(
                              field.value -
                                field.value * (1 - config.feePercent),
                              balance.currency,
                            )}
                          </span> */}
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="mb-4" />
                <DialogFooter className="px-5">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Request Withdrawal</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EWalletTransferCard;
