import { SUBSCRIPTION_PLANS } from "@/constants/subscriptionPlans";
import {
  Divider,
  InputAdornment,
  SelectChangeEvent,
  SelectProps,
  TextField,
} from "@mui/material";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import PlanOptionItem from "../ui/planOptionItem";

interface SelectAccountManagerProps
  extends Omit<SelectProps<string>, "children"> {
  label?: string;
  onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  value?: string;
}

const SelectPlan: React.FC<SelectAccountManagerProps> = ({
  onChange,
  value,
  label = "Select Account Manager",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-2">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-main text-xl font-semibold">{label}</h2>
        <TextField
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or description"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={15} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="scroll-bar-minimal grid max-h-[300px] grid-flow-row gap-2 overflow-x-hidden overflow-y-auto p-2">
        <button
          type="button"
          className="rounded-base shadow-soft hover:border-primary hover:bg-primary/10 hover:text-primary flex h-[45px] items-center justify-center gap-2 border bg-white text-sm duration-100"
        >
          <Plus size={15} />
          Create Custom Package
        </button>
        <Divider>Or</Divider>
        {SUBSCRIPTION_PLANS.filter(
          (plan) =>
            plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plan.description.toLowerCase().includes(searchTerm.toLowerCase()),
        ).map((plan) => (
          <PlanOptionItem
            key={plan.id}
            plan={plan}
            onChange={onChange}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectPlan;
