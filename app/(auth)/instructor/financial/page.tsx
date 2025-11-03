import { Card } from "@/components/UI/card";
import { ScrollArea, ScrollBar } from "@/components/UI/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import FinanceOverViewTab from "./panels/OverViewTab";
import TransactionsTab from "./panels/TransactionsTab";
import InstructorWithdrawalsTab from "./panels/InstructorWithdrawalsTab";

const page = () => {
  return (
    <Tabs defaultValue="overView" className="px-4">
      <Card className="p-0">
        <ScrollArea className="grid max-w-full p-0">
          <TabsList>
            <TabsTrigger value="overView">Overview</TabsTrigger>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            <TabsTrigger value="withdrawals">All Withdrawals</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
      <TabsContent value="overView">
        <FinanceOverViewTab />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionsTab />
      </TabsContent>
      <TabsContent value="withdrawals">
        <InstructorWithdrawalsTab />
      </TabsContent>
    </Tabs>
  );
};

export default page;
