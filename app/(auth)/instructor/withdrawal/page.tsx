import { CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import InstaPayTransferCard from "./components/InstaPayTransferCard";
import EWalletTransferCard from "./components/EWalletTransferCard";
import BankTransferCard from "./components/BankTransferCard";
import PaypalTransferCard from "./components/PaypalTransferCard";
import { Balance, Plan, SavedMethod } from "@/types/finance";
import {
  BankTransferFormData,
  eWalletFormData,
  InstaPayFormData,
  PayPalFormData,
} from "@/types/withdraw";
import { formatMoney } from "@/util/general";
import InstructorRecentWithdrawals from "./components/InstructorRecentWithdrawals";
import { Separator } from "@/components/UI/separator";
// import { auth } from "@/auth";

const plan: Plan = {
  name: "Pro",
  description: "the best plan for professional instructor",
  features: [
    {
      text: "free course life time",
      tag: "new",
    },
    {
      text: "free course life time",
      tag: "new",
    },
    {
      text: "free course life time",
      tag: "new",
    },
  ],
  withdrawConfig: {
    instapay: {
      min: 8,
      max: 30000,
      feePercent: 0.001,
      processingTimeDays: "Instant - 2 hours",
    },
    eWallet: {
      min: 16,
      max: 25000,
      feePercent: 0.01,
      processingTimeDays: "Instant - 2 hours",
    },
    bankTransfer: {
      min: 80,
      max: 120000,
      feePercent: 0,
      processingTimeDays: "1-3 business days",
    },
    paypal: {
      min: 40,
      max: 12000,
      feePercent: 0.02,
      processingTimeDays: "Instant - 1 day",
    },
  },
};

const getUserPlan = async () => {
  // const session = await auth();
  // const res = await fetch("/api/instructor/plan" + session?.user.plan);
  // const data = await res.json();
  // return data.plan;
  return plan;
};

const getCurrentBalance = async () => {
  return {
    amount: 12000,
    currency: "EGP",
  } as Balance;
};

const getSavedMethods = async () => {
  const savedMethods: SavedMethod[] = [
    {
      type: "instapay",
      metaData: {
        type: "userName",
        userName: "bedo@insta",
        phoneNumber: "",
        amount: 4000,
        currency: "EGP",
      } as InstaPayFormData,
    },
    {
      type: "instapay",
      metaData: {
        type: "phoneNumber",
        userName: "",
        phoneNumber: "+201015753392",
        amount: 8000,
        currency: "EGP",
      } as InstaPayFormData,
    },
    {
      type: "eWallet",
      metaData: {
        company: "vodafone",
        phoneNumber: "+201015753392",
        amount: 4000,
        currency: "EGP",
      } as eWalletFormData,
    },
    {
      type: "bankTransfer",
      metaData: {
        iban: "GB29NWBK60161331926819",
        swiftCode: "HSBCHKHHXXX",
        amount: 40000,
        currency: "EGP",
      } as BankTransferFormData,
    },
    {
      type: "paypal",
      metaData: {
        paypalEmail: "bedo.ahmed416@gmail.com",
        amount: 40000,
        currency: "EGP",
      } as PayPalFormData,
    },
  ];
  return savedMethods;
};

const WithdrawalPage = async () => {
  const userPlan = await getUserPlan();
  const savedMethods = await getSavedMethods();
  const currentBalance = await getCurrentBalance();

  return (
    <div className="space-y-5 px-5">
      <CardHeader className="flex justify-between px-0">
        <div>
          <CardTitle className="text-2xl">Withdrawal</CardTitle>
          <CardDescription>
            Withdraw your earnings to your preferred payment method
          </CardDescription>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Current Balance</p>
          <p className="text-2xl font-black">
            {formatMoney(currentBalance.amount, currentBalance.currency)}
          </p>
          <p className="text-muted-foreground/80 text-xs">Updated just now</p>
        </div>
      </CardHeader>
      <div className="grid gap-4 lg:grid-cols-2">
        <InstaPayTransferCard
          config={userPlan.withdrawConfig.instapay}
          savedMethods={savedMethods}
          balance={currentBalance}
        />
        <EWalletTransferCard
          config={userPlan.withdrawConfig.eWallet}
          savedMethods={savedMethods}
          balance={currentBalance}
        />
        <BankTransferCard
          config={userPlan.withdrawConfig.bankTransfer}
          savedMethods={savedMethods}
          balance={currentBalance}
        />
        <PaypalTransferCard
          config={userPlan.withdrawConfig.paypal}
          savedMethods={savedMethods}
          balance={currentBalance}
        />
      </div>
      <Separator />
      <InstructorRecentWithdrawals />
    </div>
  );
};

export default WithdrawalPage;
