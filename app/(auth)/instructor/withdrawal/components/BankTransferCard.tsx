"use client";

import { Avatar, AvatarImage } from "@/components/UI/Avatar";
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
import { useState } from "react";
import { BankTransferFormData, bankTransferSchema } from "@/types/withdraw";
import { SavedMethod, WithdrawCardProps } from "@/types/finance";
import WithdrawRequestSuccess from "./WithdrawRequestSuccess";
import { Plus } from "lucide-react";
import { formatMoney } from "@/util/general";

const BankTransferCardTrigger: React.FC<WithdrawCardProps> = ({ config }) => {
  return (
    <DialogTrigger asChild>
      <Card className="cursor-pointer duration-300 hover:scale-3d hover:shadow-lg">
        <CardHeader className="relative flex items-center gap-4">
          <Avatar className="size-10 rounded">
            <AvatarImage src={"/icons/bank.png"} alt={"Bank Transfer"} />
          </Avatar>
          <div className="flex-1 space-y-2">
            <CardTitle>Bank Transfer</CardTitle>
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

const BankTransferCard: React.FC<WithdrawCardProps> = ({
  config,
  savedMethods,
  balance,
}) => {
  const prevMethods = savedMethods.filter(
    (m) => m.type === "bankTransfer",
  ) as SavedMethod<BankTransferFormData>[];
  const [showPrev, setShowPrev] = useState(prevMethods.length > 0);

  const [success, setSuccess] = useState(false);

  const [open, setOpen] = useState(false);
  const form = useForm<BankTransferFormData>({
    resolver: zodResolver(bankTransferSchema),
    mode: "onSubmit",
    defaultValues: {},
  });

  async function onSubmit(values: BankTransferFormData) {
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
    form.reset({});
  };

  return (
    <>
      <WithdrawRequestSuccess
        open={success}
        setOpen={setSuccess}
        processingTimeDays={config.processingTimeDays}
      />
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <BankTransferCardTrigger
          config={config}
          savedMethods={savedMethods}
          balance={balance}
        />
        <DialogContent className="gap-0 p-0 py-5 sm:max-w-lg">
          <DialogHeader className="px-5">
            <DialogTitle>Bank Withdrawal Request</DialogTitle>
            <DialogDescription>
              Please enter your bank account IBAN and SWIFT code to request
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
                    <div className="flex-1">
                      <p className="text-xs">IBAN</p>
                      <p className="text-foreground">{method.metaData.iban}</p>
                    </div>
                    <div className="min-w-28">
                      <p className="text-xs">SWIFT</p>
                      <p className="text-foreground">
                        {method.metaData.swiftCode}
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
                    name="iban"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IBAN</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="GB29 NWBK 6016 1331 9268 19"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="swiftCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SWIFT</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="AAAA BB CC XXX"
                            {...field}
                          />
                        </FormControl>
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

export default BankTransferCard;
