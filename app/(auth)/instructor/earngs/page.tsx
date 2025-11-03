"use client";
import RevenueChart from "@/components/UI/Charts/RevenueChart";
import DynamicCardSlider from "@/components/UI/DynamicCardSlider";
import WithdrawTable from "@/components/UI/tables/WithdrawTable";
import WithdrawMoney from "@/components/UI/WithdrawMoney";
import {
  CategoriesForRevenue,
  seriesForRevenue,
} from "@/constants/charts/chart.data";
import { paymentMethods, withdrawals } from "@/constants/payment.data";
import { CreditCard, Crown, Layers, ReceiptText } from "lucide-react";

const EarngPage: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="box-content flex gap-4 items-center">
          <div className="flex justify-center items-center w-16 h-16 bg-[#E4F8FFE5] rounded-md">
            <Layers className="text-[#55BEE6]" size={25} />
          </div>
          <div>
            <h1>$13,804.00</h1>
            <span className="text-sm text-muted-foreground">Total Revenue</span>
          </div>
        </div>
        <div className="box-content flex gap-4 items-center">
          <div className="flex justify-center items-center w-16 h-16 bg-[#EBEBFF] rounded-md">
            <ReceiptText className="text-[#564FFD]" size={25} />
          </div>
          <div>
            <h1>$16,593.00</h1>
            <span className="text-sm text-muted-foreground">Current Balance</span>
          </div>
        </div>
        <div className="box-content flex gap-4 items-center">
          <div className="flex justify-center items-center w-16 h-16 bg-[#D0E0FF] rounded-md">
            <CreditCard className="text-[#557ce6]" size={25} />
          </div>
          <div>
            <h1>$13,184.00</h1>
            <span className="text-sm text-muted-foreground">Total Withdrawals</span>
          </div>
        </div>
        <div className="box-content flex gap-4 items-center">
          <div className="flex justify-center items-center w-16 h-16 bg-[#E1F7E3] rounded-md">
            <Crown className="text-[#23BD33]" size={25} />
          </div>
          <div>
            <h1>$162.00</h1>
            <span className="text-sm text-muted-foreground">Today Revenue</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="box-content lg:w-full ">
          <h2 className="border-b pb-2">Statistic</h2>
          <RevenueChart
            series={seriesForRevenue}
            categories={CategoriesForRevenue}
          />
        </div>
        <div className="box-content lg:w-[650px]">
          <DynamicCardSlider paymentMethods={paymentMethods} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="box-content lg:w-[700px]">
          <WithdrawMoney paymentMethods={paymentMethods} />
        </div>
        <div className="box-content lg:w-full">
          <WithdrawTable WithdrawData={withdrawals} />
        </div>
      </div>
    </div>
  );
};
export default EarngPage;
