"use client";
import { Avatar, AvatarImage } from "@/components/UI/Avatar";
import { Badge } from "@/components/UI/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import InstaPay from "@/assets/images/instaPay.png";
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
import { AtSign, Plus, Smartphone } from "lucide-react";
import PhoneNumberInput from "@/components/UI/phoneNumberInput";
import { Input } from "@/components/UI/input";
import { useState } from "react";
import { InstaPayFormData, instaPaySchema } from "@/types/withdraw";
import { SavedMethod, WithdrawCardProps } from "@/types/finance";
import WithdrawRequestSuccess from "./WithdrawRequestSuccess";
import { formatMoney } from "@/util/general";

const InstaPayCardTrigger: React.FC<WithdrawCardProps> = ({ config }) => {
  return (
    <DialogTrigger asChild>
      <Card className="cursor-pointer duration-300 hover:scale-3d hover:shadow-lg">
        <CardHeader className="relative flex items-center gap-4">
          <Avatar className="size-10 rounded">
            <AvatarImage
              src={InstaPay}
              alt={"instaPay"}
              className="origin-center scale-150 transform object-contain"
            />
          </Avatar>
          <div className="flex-1 space-y-2">
            <CardTitle className="w-full">
              <span className="w-full">InstaPay</span>
              <Badge variant="info">Recommended</Badge>
            </CardTitle>
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

const InstaPayTransferCard: React.FC<WithdrawCardProps> = ({
  config,
  savedMethods,
  balance,
}) => {
  const prevMethods = savedMethods.filter(
    (m) => m.type === "instapay",
  ) as SavedMethod<InstaPayFormData>[];
  const [showPrev, setShowPrev] = useState(prevMethods.length > 0);

  const [success, setSuccess] = useState(false);

  const [open, setOpen] = useState(false);
  const form = useForm<InstaPayFormData>({
    resolver: zodResolver(instaPaySchema),
    mode: "onSubmit",
    defaultValues: {
      type: "userName",
      userName: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: InstaPayFormData) {
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

  const type = form.watch("type");

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setShowPrev(prevMethods.length > 0);
    form.reset({
      type: "userName",
      userName: "",
      phoneNumber: "",
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
        <InstaPayCardTrigger
          config={config}
          savedMethods={savedMethods}
          balance={balance}
        />
        <DialogContent className="gap-0 p-0 py-5 sm:max-w-lg">
          <DialogHeader className="px-5">
            <DialogTitle>InstaPay Withdrawal Request</DialogTitle>
            <DialogDescription>
              Please enter your instaPay user name or phone number to request
              Withdrawal.
            </DialogDescription>
          </DialogHeader>
          <Separator className="mt-4" />
          {showPrev ? (
            <div className="grid gap-4 p-5">
              <h6 className="font-medium">Your Saved Methods</h6>
              <div className="flex flex-col gap-2">
                {prevMethods.map((method, index) => (
                  <div
                    className="bg-accent text-muted-foreground flex w-full cursor-pointer gap-4 rounded-md border p-4 text-sm font-medium duration-300 hover:scale-3d hover:shadow-lg"
                    key={method.type + index}
                    onClick={() => {
                      form.reset(method.metaData);
                      setShowPrev(false);
                    }}
                  >
                    <div className="w-32">
                      <p className="text-xs">Type</p>
                      <p className="text-foreground">
                        {method.metaData.type === "userName"
                          ? "Payment Address"
                          : "Mobile Number"}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs">
                        {method.metaData.type === "userName"
                          ? "User Name"
                          : "Phone Number"}
                      </p>
                      <p className="text-foreground">
                        {method.metaData.type === "userName"
                          ? method.metaData.userName
                          : method.metaData.phoneNumber}
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
                ))}
              </div>
              <Button variant="outline" onClick={() => setShowPrev(false)}>
                <Plus /> Add New
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
                noValidate
              >
                <div className="grid gap-4 p-5">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Transfer Type</FormLabel>
                        <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
                          <Button
                            className="rounded-none rounded-l-md shadow-none focus-visible:z-10"
                            variant={
                              field.value === "userName"
                                ? "successOutline"
                                : "outline"
                            }
                            onClick={() => field.onChange("userName")}
                          >
                            <AtSign />
                            Payment Address
                          </Button>

                          <Button
                            className="rounded-none rounded-r-md shadow-none focus-visible:z-10"
                            variant={
                              field.value === "phoneNumber"
                                ? "successOutline"
                                : "outline"
                            }
                            onClick={() => field.onChange("phoneNumber")}
                          >
                            <Smartphone />
                            Mobile Number
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem
                        className={type === "phoneNumber" ? "" : "hidden"}
                      >
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <PhoneNumberInput
                            placeholder="Mobile Number"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem className={type === "userName" ? "" : "hidden"}>
                        <FormLabel>Payment Address</FormLabel>
                        <div className="flex rounded-md shadow-xs">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Payment Address"
                              className="-me-px rounded-r-none shadow-none"
                              {...field}
                            />
                          </FormControl>
                          <span className="border-input bg-background text-muted-foreground -z-1 inline-flex items-center rounded-r-md border px-3 text-sm">
                            @instapay
                          </span>
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

export default InstaPayTransferCard;
