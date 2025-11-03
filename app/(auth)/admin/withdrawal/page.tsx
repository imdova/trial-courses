"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";
import WithdrawalsList from "@/components/admin/lists/WithdrawalsList";
import WithdrawalsOverView from "@/components/admin/overviews/WithdrawalsOverView";
import { Wallet, LayoutList } from "lucide-react";

const WithdrawalsPage = () => {
  return (
    <Tabs defaultValue="over-view" className="w-full px-5">
      <Card className="flex w-full items-center justify-between gap-3 space-y-0 p-2">
        <TabsList>
          <TabsTrigger value="over-view">
            <LayoutList className="h-5 w-5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="withdrawals">
            <Wallet className="h-5 w-5" />
            Withdrawal Requests
          </TabsTrigger>
        </TabsList>
      </Card>
      <TabsContent value="over-view">
        <WithdrawalsOverView />
      </TabsContent>
      <TabsContent value="withdrawals">
        <WithdrawalsList />
      </TabsContent>
    </Tabs>
  );
};

export default WithdrawalsPage;

