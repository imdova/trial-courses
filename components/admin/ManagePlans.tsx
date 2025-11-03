import PlanCard from "@/components/plan/planCard";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Button } from "@/components/UI/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/UI/card";
import { SUBSCRIPTION_PLANS } from "@/constants/subscriptionPlans";
import { SubscriptionPlan } from "@/types/finance";
import { Grid, List, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { generateManagePlansColumns } from "@/util/columns/plansColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";

const generatePlans = (): SubscriptionPlan[] => SUBSCRIPTION_PLANS;

interface ManagePlansProps {
  title?: string;
  hideFilters?: boolean;
  data?: SubscriptionPlan[];
}

const ManagePlans: React.FC<ManagePlansProps> = ({
  title = "All plans",
  hideFilters = false,
  data,
}) => {
  const [plans, setPlans] = useState(data ?? generatePlans());

  const updatePlan = (rowIndex: number, columnId: string, value: unknown) => {
    setPlans((old) =>
      old.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [columnId]: value,
            }
          : row,
      ),
    );
  };

  const columns = generateManagePlansColumns(updatePlan);

  const handleGetStarted = (planName: string) => {
    console.log(`Getting started with ${planName} plan`);
    // Add your logic here
  };

  return (
    <Tabs defaultValue="list">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {title}
            <span className="text-secondary ml-1">({plans.length})</span>
          </CardTitle>
          <CardAction>
            <TabsList className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
              <Button
                className="rounded-s-base rounded-none shadow-none focus-visible:z-10"
                variant="outline"
                asChild
              >
                <TabsTrigger value="list">
                  <List />
                  <span className="sr-only">List</span>
                </TabsTrigger>
              </Button>
              <Button
                className="rounded-e-base rounded-none shadow-none focus-visible:z-10"
                variant="outline"
                asChild
              >
                <TabsTrigger value="grid">
                  <Grid />
                </TabsTrigger>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/plans/create">
                  <Plus />
                  Create Plan
                </Link>
              </Button>
            </TabsList>
          </CardAction>
        </CardHeader>
      </Card>

      <TabsContent value="list">
        <Card>
          <AdvancedDataTable
            columns={columns}
            data={plans}
            hideSearch={hideFilters}
            defaultSorting={{
              id: "created_at",
              desc: false,
            }}
            headerClassName="text-sm"
            cellClassName="text-xs"
            filterClassName="px-5 justify-between"
            paginationClassName="px-5"
            tableClassName="border-t border-b"
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
            hideExport={hideFilters}
            hidePagination={hideFilters}
          />
        </Card>
      </TabsContent>
      <TabsContent value="grid">
        <div className="my-8 grid grid-cols-2 justify-center gap-3 lg:grid-cols-4">
          {SUBSCRIPTION_PLANS.filter((x) => !Boolean(x.optionTo)).map(
            (plan, index) => (
              <PlanCard
                edit={true}
                key={plan.name}
                plan={plan}
                index={index}
                onGetStarted={handleGetStarted}
              />
            ),
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ManagePlans;
