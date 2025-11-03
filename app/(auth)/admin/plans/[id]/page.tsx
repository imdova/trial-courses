"use client";

import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import InfoBlock from "@/components/UI/info-block";
import { Badge } from "@/components/UI/NotificationBadge";
import StatusCardTwo from "@/components/UI/StatusCardTwo";
import { Switch } from "@/components/UI/switch";
import {
  SUBSCRIPTION_PLANS,
  TRANSACTIONS,
} from "@/constants/subscriptionPlans";
import { BadgeVariant } from "@/types";
import { SubscriptionPlan, TransactionType } from "@/types/finance";
import { formatDate } from "@/util";
import { generateTransactionsColumns } from "@/util/columns/transactionsColumns";
import { formatMoney } from "@/util/general";
import {
  ChevronDown,
  CreditCard,
  DollarSign,
  Pen,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const statusCards: StatusCardType[] = [
  {
    title: "Total Subscriptions",
    trend: {
      value: "20%",
      trendDirection: "up",
    },
    value: "100",
    icon: (
      <CreditCard className="block h-11 w-11 rounded-full bg-green-100 p-2 text-green-800" />
    ),
  },
  {
    title: "Employers",
    trend: {
      value: "20%",
      trendDirection: "up",
    },
    value: "100",
    icon: (
      <Users className="block h-11 w-11 rounded-full bg-green-100 p-2 text-green-800" />
    ),
  },
  {
    title: "Active Subscribers",
    trend: {
      value: "20%",
      trendDirection: "up",
    },
    value: "60",
    icon: (
      <UserCheck className="block h-11 w-11 rounded-full bg-purple-100 p-2 text-purple-800" />
    ),
  },
  {
    title: "Revenue",
    value: "100$",
    trend: {
      value: "15%",
      trendDirection: "up",
    },
    icon: (
      <DollarSign className="block h-11 w-11 rounded-full bg-green-100 p-2 text-green-800" />
    ),
  },
];

const badgeVariant: Record<string, BadgeVariant> = {
  Free: "neutral",
  Basic: "info",
  Pro: "success",
  Business: "premium",
};

const getPlan = (id: string): SubscriptionPlan | null => {
  const plan = SUBSCRIPTION_PLANS.find((plan) => plan.id === id);
  return plan || null;
};

const planTransactions = (id: string): TransactionType[] => {
  const transactions = TRANSACTIONS.filter(
    (transaction) => transaction.planId === id,
  );
  return transactions;
};

const PlanPage = (props: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Resolve the params promise
    props.params
      .then((params) => {
        const foundPlan = getPlan(params.id);
        if (!foundPlan) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }
        setPlan(foundPlan);
        setIsLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setIsLoading(false);
      });
  }, [props.params]);

  const transactions = plan ? planTransactions(plan.id) : [];
  const columns = generateTransactionsColumns();

  const updateData = (key: keyof SubscriptionPlan, value: unknown) => {
    if (plan) {
      setPlan((prevPlan) => ({ ...prevPlan!, [key]: value }));
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Handle not found state
  if (notFound || !plan) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Plan Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The subscription plan you are looking for does not exist.
          </p>
          <Button className="mt-4" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 space-y-2 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          <CardDescription className="flex gap-4">
            <InfoBlock label="Date" value={formatDate(plan.created_at)} />
            {plan.badge && (
              <InfoBlock
                label="Badge"
                value={
                  <Badge variant={badgeVariant[plan.name]}>{plan.badge}</Badge>
                }
              />
            )}
            <InfoBlock label="Duration" value={plan.duration + " Months"} />
            <InfoBlock
              label="Price"
              value={formatMoney(plan.discountedPrice || 0)}
            />
            <InfoBlock label="Vat" value={plan.vat} />
            <InfoBlock label="Unlocks" value={plan.unlocks} />
            <InfoBlock label="Jobs" value={plan.jobs} />
            <InfoBlock label="Users" value={plan.users} />
            <InfoBlock
              label="Status"
              value={
                <div className="flex items-center gap-2">
                  <Switch
                    id="airplane-mode"
                    checked={plan.status === "active"}
                    onCheckedChange={(value) =>
                      updateData("status", value ? "active" : "inactive")
                    }
                  />
                  <Badge
                    variant={plan.status === "active" ? "success" : "error"}
                  >
                    {plan.status}
                  </Badge>
                </div>
              }
            />
          </CardDescription>
          <CardAction className="inline-flex w-fit">
            <Button
              variant="outline"
              className="rounded-s-base rounded-none border-r-0 shadow-none focus-visible:z-10"
              asChild
            >
              <Link href={`/admin/plans/edit/${plan.id}`}>
                <Pen />
                Edit
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-e-base rounded-s-none focus-visible:z-10"
                >
                  <ChevronDown />
                  <span className="sr-only">Select option</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                sideOffset={4}
                align="end"
                className="max-w-64 md:max-w-xs!"
              >
                <DropdownMenuRadioGroup>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {statusCards.map((card) => (
          <StatusCardTwo key={card.title} {...card} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="mb-3 text-2xl">
            All Transactions
            <span className="text-secondary ml-1">({transactions.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <AdvancedDataTable
            columns={columns}
            data={transactions}
            filters={[
              { key: "created_at" },
              { key: "total_amount", className: "max-w-38" },
              { key: "payment_method" },
              { key: "type" },
            ]}
            defaultSorting={{
              id: "created_at",
              desc: false,
            }}
            headerClassName="text-sm"
            cellClassName="text-xs"
            filterClassName="px-5"
            paginationClassName="px-5"
            tableClassName="border-t border-b"
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
            hideSearch={false}
            hideExport={false}
            hideColumnManager={false}
            hidePagination={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanPage;
