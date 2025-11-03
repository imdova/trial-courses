"use client";
import React from "react";
import { InstructorPlan } from "@/types/finance";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Separator } from "@/components/UI/separator";
import { Badge } from "@/components/UI/badge";
import { Check } from "lucide-react";
import { cn } from "@/util";

interface PlanCardProps {
  plan: InstructorPlan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <Card
      className={cn(
        "relative h-fit space-y-4 overflow-hidden rounded-xl",
        plan.rank === 2 &&
          "border-primary bg-primary/10 shadow-primary/20 shadow-lg",
        plan.rank === 3 &&
          "border-purple-300 bg-purple-50 shadow-lg shadow-purple-200",
      )}
    >
      {plan.badge && (
        <Badge
          variant={plan.badge.variant}
          className="absolute top-0 right-0 rounded-xl rounded-tl-none rounded-br-none px-4 py-1.5"
        >
          {plan.badge.text}
        </Badge>
      )}

      <CardHeader>
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription>{plan.tagline}</CardDescription>
      </CardHeader>

      <Separator />
      <CardContent className="space-y-4">
        <p className="text-sm font-medium">Features Included:</p>
        <ul className="m-0 list-none space-y-1.5 p-0">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-[#185D43]">
              <Badge
                variant={plan.badge.variant}
                className="size-5 rounded-full p-0.5"
              >
                <Check />
              </Badge>
              <span className="text-xs">{feature.text}</span>
              {Boolean(feature.tag) && (
                <Badge variant={plan.badge.variant}>{feature.tag}</Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <Separator />
      <CardFooter>
        <CardAction className="w-full text-sm">
          <Button
            className="w-full"
            variant={plan.buttonVariant}
            disabled={plan.isCurrent}
          >
            {plan.buttonText}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
