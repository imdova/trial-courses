"use Client";

import { X } from "lucide-react";
import IconBtn from "./Buttons/IconBtn";

const ItemTag: React.FC<{
  item?: string;
  label: React.ReactNode;
  onRemove?: (item: string) => void;
}> = ({ item, label, onRemove }) => (
  <div className="space-x-2 flex items-center rounded-base border bg-primary/10 py-1 pl-2 pr-1 text-main duration-100">
    {typeof label === "string" ? (
      <span className="text-xs">{label}</span>
    ) : (
      label
    )}
    {onRemove && item && (
      <IconBtn
        className="p-1 block w-fit hover:bg-red-100 hover:text-red-500"
        onClick={() => onRemove(item)}
      >
        <X className="h-3 w-3" />
      </IconBtn>
    )}
  </div>
);

export default ItemTag;
