import { AdminUser } from "@/types/admin";
import { useState } from "react";
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
import useFetch from "@/hooks/useFetch";
import { RowSelectionState } from "@tanstack/react-table";
import { generateEmployeesColumns } from "@/components/columns/employeesColumns";
import { usePermissions } from "@/hooks/usePermissions";
import { useSession } from "next-auth/react";
import { API_GET_ADMIN_PROFILES } from "@/constants/api/employees";

interface AssignAdminsProps {
  defaultValues: AdminUser | null;
  userId: string;
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function getSelectedData<T>(data: T[], rowSelection: RowSelectionState): T[] {
  return Object.keys(rowSelection)
    .filter((key) => rowSelection[key]) // keep only `true` selected keys
    .map((key) => data[Number(key)]) // rowId is the index by default
    .filter((item): item is T => item !== undefined);
}

export const AssignAdmins: React.FC<AssignAdminsProps> = ({
  defaultValues: initialValues,
  open,
  setOpen,
  children,
}) => {
  const { data: session } = useSession();
  const user = session?.user;
  const { departments } = usePermissions();
  const [selection, setSelection] = useState({});
  const adminsColumns = generateEmployeesColumns(
    [],
    [],
    departments,
    undefined,
    user,
  );
  const { data: admins } = useFetch<PaginatedResponse<AdminUser>>(
    API_GET_ADMIN_PROFILES,
  );
  async function assignCompaniesToAdmin() {
    const selectedData = getSelectedData(admins?.data || [], selection);
    console.log("🚀 ~ onSubmit ~ selectedData:", selectedData);
    onOpenChange(false);
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelection({});
    }
    setOpen(open);
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="text-xl">
            Assign Admins to {initialValues?.firstName}{" "}
            {initialValues?.lastName}
          </SheetTitle>
          <SheetDescription>
            you can assign multiple admins to this employee select the admins
            you want to assign
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col gap-6 overflow-y-auto rounded-lg">
          <AdvancedDataTable
            name="admins"
            columns={adminsColumns}
            data={admins?.data || []}
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
                key: "departmentId",
              },
              {
                key: "type",
              },
            ]}
            initialPagination={{
              pageIndex: 0,
              pageSize: 100,
            }}
          />
          <DialogFooter className="sticky bottom-0 border-t bg-white p-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={assignCompaniesToAdmin}>Assign</Button>
          </DialogFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
