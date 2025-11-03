import { ArrowUpRight, CheckCircle } from "lucide-react";

interface PricingPlan {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

// PricingCard Component
const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <div
      className={`rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 ${
        plan.popular ? "relative" : ""
      }`}
    >
      {plan.popular && (
        <div className="bg-primary absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full px-4 py-1 text-sm font-medium text-white">
          Most Popular
        </div>
      )}

      <div className="p-8 text-center">
        <h3 className="mb-2 text-2xl font-bold text-slate-800">{plan.name}</h3>
        <div className="mb-6">
          <span className="text-primary text-4xl font-bold">${plan.price}</span>
          <span className="text-slate-500">.00</span>
        </div>
        <p className="mb-8 text-slate-600">{plan.description}</p>

        <ul className="mb-8 space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="text-primary mr-3 h-5 w-5" />
              <span className="text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-fit cursor-pointer rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-300 ${
            plan.popular
              ? "bg-primary text-white"
              : "bg-slate-100 text-slate-800 hover:bg-slate-200"
          }`}
        >
          Purchase Now <ArrowUpRight className="ml-2 inline-block h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
export default PricingCard;
