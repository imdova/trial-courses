"use client";
import { InstructorPlan } from "@/types/finance";
import PlanCard from "./planCard";

const INSTRUCTOR_PLANS: InstructorPlan[] = [
  {
    name: "Free",
    tagline: "The essential starting point for new course creators.",
    rank: 1,
    isRecommended: false,
    badge: {
      text: "Base Level",
      variant: "neutral",
    },
    buttonText: "Current Plan",
    isCurrent: true,
    buttonVariant: "muted",
    features: [
      // Core Limitations
      { text: "Platform Fee: 15% (Higher Cost)" },
      { text: "Payout: 85% of Your Revenue" },
      { text: "Withdrawal: Standard 10-Day Payout Delay" },

      // Core Benefits
      { text: "Course Limit: Publish up to 5 Courses", tag: "Core" },
      { text: "Support: Basic Email (3-day response)", tag: "Core" },
      { text: "Analytics: Basic Dashboard Access", tag: "Core" },
    ],
  },
  {
    name: "Pro",
    tagline:
      "The optimal choice for growing your catalog and maximizing profit.",
    isRecommended: true,
    rank: 2,
    badge: {
      text: "Recommended Growth",
      variant: "secondary",
    },
    buttonText: "Upgrade to Pro",
    buttonVariant: "default",
    features: [
      // Pro Benefits
      { text: "Platform Fee: 8% (Low Cost)" },
      { text: "Payout: 92% Maximized Profitability" },
      { text: "Withdrawal: Fast 3-Day Payout Processing" },
      { text: "Course Limit: Publish up to 50 Courses" },
      { text: "Priority Support with 24-Hour Response" },
      { text: "Advanced Course Performance Analytics" },

      // Free Limitations NOT in Pro
      { text: "No Mandatory Watermarks on Course Content", tag: "Exclusive" },
      { text: "Early Access to New Platform Features", tag: "Exclusive" },
    ],
  },
  {
    name: "Premium",
    tagline:
      "Unrestricted growth, dedicated partnership, and immediate cash flow.",
    isRecommended: false,
    badge: {
      text: "Elite Partnership",
      variant: "premium",
    },
    rank: 3,
    buttonText: "Upgrade to Premium",
    buttonVariant: "premium",
    features: [
      // Premium Benefits (All Pro benefits are implied/included)
      { text: "Platform Fee: 5% (Lowest Operating Cost)" },
      { text: "Payout: 95% Elite Commission Rate" },
      { text: "Withdrawal: 24-Hour Instant Payouts" },
      { text: "Course Limit: Unlimited Course Publishing" },
      { text: "Dedicated Account Manager & Training", tag: "Exclusive" },
      { text: "Custom Data Export and Integration Access", tag: "Exclusive" },

      // Unique Premium Features
      { text: "Dedicated Course Promotion Budget", tag: "Exclusive" },
      {
        text: "Whitelabeling Options for Corporate Training",
        tag: "Exclusive",
      },
    ],
  },
];

const page = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
          Choose Your Plan
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          Your plan determines your course fees, platform commission, and the
          tools you have access to. Grow your business by upgrading!
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        {INSTRUCTOR_PLANS.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default page;
