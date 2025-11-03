import { ColumnDef } from "@tanstack/react-table";

export type ColumnConfig<T> = ColumnDef<T> & {
  accessorKey?: keyof T;
};
