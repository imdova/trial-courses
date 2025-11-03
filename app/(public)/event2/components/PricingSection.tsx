"use client";
import PricingCard from "./PricingCard";

interface PricingPlan {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const PricingSection = () => {
  const plans: PricingPlan[] = [
    {
      id: 1,
      name: "Silver Pass",
      price: 19,
      description: "Perfect for individuals getting started",
      features: [
        "Access To Mobile App",
        "Access To 1000+ Talk",
        "Access To Exhibition Floor",
        "Email 24/7 Support",
        "Exhibition Floor Area",
        "Basic Support",
      ],
    },
    {
      id: 2,
      name: "Golden Pass",
      price: 29,
      description: "Ideal for professionals and small teams",
      features: [
        "Everything in Silver",
        "Priority Email Support",
        "Access To Workshop Materials",
        "Networking Events",
        "Downloadable Resources",
        "Advanced Analytics",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Platinum Pass",
      price: 49,
      description: "For organizations needing full access",
      features: [
        "Everything in Golden",
        "Dedicated Account Manager",
        "Early Access to New Features",
        "Customizable Dashboard",
        "API Access",
        "Premium Support 24/7",
      ],
    },
  ];

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <span className="border-primary text-primary bg-primary-foreground mx-auto mb-2 block w-fit rounded-md border px-4 py-2 text-xs font-medium uppercase">
          Tickets Packadges
        </span>
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-slate-800">
            Explore Flexible Pricing Plans
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-slate-600">
            Like Previous Year This Year We Are Arranging World Marketing Summit
            2024. Its The Gathering Of All The Big
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
