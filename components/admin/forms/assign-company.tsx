import { Company } from "@/types";
import { AdminUser } from "@/types/admin";
import { useEffect, useState } from "react";
import { DialogClose, DialogFooter } from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/sheet";
import { Separator } from "@/components/UI/separator";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { generateEmployersColumns } from "@/components/columns/employersColumns";
import useFetch from "@/hooks/useFetch";
import { RowSelectionState } from "@tanstack/react-table";

import { toast } from "sonner";
import { Loader } from "lucide-react";
import {
  API_ASSIGN_COMPANIES,
  API_GET_ASSIGNED_COMPANIES,
} from "@/constants/api/employees";
import { API_GET_COMPANIES } from "@/constants/api/employer";

interface AssignCompanyProps {
  defaultValues: AdminUser;
  userId: string;
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface AssignCompanyFormValues {
  actorId: string;
  adminId: string;
  companiesIds: string[];
}

function getSelectedData<T>(data: T[], rowSelection: RowSelectionState): T[] {
  return Object.keys(rowSelection)
    .filter((key) => rowSelection[key]) // keep only `true` selected keys
    .map((key) => data[Number(key)]) // rowId is the index by default
    .filter((item): item is T => item !== undefined);
}

export const AssignCompany: React.FC<AssignCompanyProps> = ({
  userId,
  defaultValues: initialValues,
  open,
  setOpen,
  children,
}) => {
  const { data: assignedCompanies, loading: assignedCompaniesLoading } =
    useFetch<Company[]>(
      API_GET_ASSIGNED_COMPANIES.replace("{targetAdminId}", initialValues?.id) +
        userId,
      {
        fetchOnce: false,
        fetchOnUrlChange: true,
      },
    );

  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState({});
  console.log("🚀 ~ AssignCompany ~ selection:", selection);
  const employersColumns = generateEmployersColumns();
  const { data: companies } = useFetch<PaginatedResponse<Company>>(
    API_GET_COMPANIES + "?limit=1000",
  );

  async function assignCompaniesToAdmin() {
    setLoading(true);
    const selectedData = getSelectedData(companies?.data || [], selection);
    try {
      const body: AssignCompanyFormValues = {
        actorId: userId,
        adminId: initialValues?.id,
        companiesIds: selectedData.map((company) => company.id),
      };
      const response = await fetch(API_ASSIGN_COMPANIES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to assign companies to admin");
      }
      toast.success("Companies assigned successfully", {
        description: "you have assigned " + selectedData.length + " companies",
        position: "bottom-right",
        style: {
          "--normal-bg": "color-mix(in oklab, var(--primary) 10%, white)",
          "--normal-text": "var(--primary)",
          "--normal-border": "var(--primary)",
        } as React.CSSProperties,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to assign companies to admin", {
          description: error.message,
          position: "bottom-right",
          style: {
            "--normal-bg": "color-mix(in oklab, var(--destructive) 5%, white)",
            "--normal-text": "var(--destructive)",
            "--normal-border":
              "color-mix(in oklab, var(--destructive) 25%, white)",
          } as React.CSSProperties,
        });
      }
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelection({});
    }
    setOpen(open);
  };

  useEffect(() => {
    if (open && assignedCompanies?.length) {
      assignedCompanies.forEach((company) => {
        const index = companies?.data?.findIndex((c) => c.id === company.id);
        if (index !== undefined) {
          setSelection((prev) => ({ ...prev, [index]: true }));
        }
      });
    } else {
      setSelection({});
    }
  }, [open, assignedCompanies, companies]);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="text-xl">
            Assign Companies to {initialValues?.firstName}{" "}
            {initialValues?.lastName}
          </SheetTitle>
          <SheetDescription>
            you can assign multiple companies to this employee select the
            companies you want to assign
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col gap-6 overflow-y-auto rounded-lg">
          {assignedCompaniesLoading ? (
            <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <AdvancedDataTable
              name="companies"
              columns={employersColumns}
              data={companies?.data || []}
              defaultSorting={{
                id: "name",
                desc: false,
              }}
              hideSearch={false}
              cellClassName="text-xs"
              headerClassName="text-xs"
              tableClassName="text-xs rounded-0"
              hideColumnManager={false}
              filters={[
                {
                  key: "created_at",
                },
                {
                  key: "completencePercent",
                  className: "min-w-32",
                },
                {
                  key: "country",
                  className: "min-w-32",
                },
                {
                  key: "state",
                  className: "min-w-32",
                },
                {
                  key: "city",
                },
                {
                  key: "size",
                },
                {
                  key: "companyTypeName",
                },
                {
                  key: "companySectorName",
                },
              ]}
              initialPagination={{
                pageIndex: 0,
                pageSize: 100,
              }}
            />
          )}
          <DialogFooter className="sticky bottom-0 border-t bg-white p-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={assignCompaniesToAdmin} disabled={loading}>
              {loading ? "Loading..." : "Assign"}
            </Button>
          </DialogFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
