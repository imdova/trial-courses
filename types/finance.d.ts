/// transactions

export interface TransactionType {
  id: string;
  invoice_id: string;
  created_at: string;
  payment_method: string;
  type: "subscription" | "add-on";
  plan: string;
  planId: string;
  employer: {
    image: string;
    username: string;
    name: string;
  };
  total_amount: number;
  download_receipt_url: string;
}

/// plans

// Define the specific feature structure
export interface PlanFeature {
  text: string;
  tag?: string;
}

// Define the core structure for the Instructor Plans
export interface InstructorPlan {
  name: string;
  tagline: string;
  rank: number;
  badge: {
    text: string;
    variant: "neutral" | "secondary" | "premium";
  };
  isRecommended: boolean;
  isCurrent?: boolean;
  buttonText: string;
  buttonVariant: "muted" | "default" | "premium";
  features: PlanFeature[];
}


export interface WithdrawConfig {
  min: number;
  max: number;
  feePercent: number;
  processingTimeDays: string;
}

export type WithdrawMethods =
  | "instapay"
  | "eWallet"
  | "bankTransfer"
  | "paypal";

export interface Plan {
  name: string;
  description: string;
  features: {
    text: string;
    tag?: string;
  }[];
  withdrawConfig: Record<WithdrawMethods, WithdrawConfig>;
}

// Withdrawals

export interface Balance {
  amount: number;
  currency: string;
}


export interface SavedMethod<T = unknown> {
  type: WithdrawMethods;
  metaData: T;
}

export interface WithdrawCardProps {
  config: WithdrawConfig;
  savedMethods: SavedMethod[];
  balance: Balance;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  optionTo?: string;
  description: string;
  highlight: boolean;
  badge?: string;
  duration: number;
  vat: number;
  vatDescription: string;
  price: number;
  discountedPrice?: number;
  currency?: string;
  features: { name: string; tag?: string }[];
  views: number;
  unlocks: number;
  jobs: number;
  invitations: number;
  users: number;
  extraAccess: number;
  status: "active" | "inactive";

  created_at: string;
}

export interface PlansReport {
  id: string;
  name: string;
  price: number;
  purchases: number;
  employers: number;
  revenue: number;
  status: "active" | "inactive";
}

/// invoices

export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
}

export interface InvoiceType {
  id: string;
  created_at: string;
  due_date: string;
  created_by: {
    id: string;
    image: string;
    name: string;
    role: string;
  };
  isCreatedBySystem: boolean;
  type: "subscription" | "add-on";
  payment_method?: string | null;
  status: "paid" | "overdue" | "canceled" | "pending";
  payment_type: "one-time" | "recurring";

  employer: {
    id: string;
    image: string;
    username: string;
    name: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  currency: string;
  tax: number;
  total: number;
}
