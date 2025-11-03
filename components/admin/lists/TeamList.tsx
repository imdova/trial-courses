"use client";
import { useState } from "react";
import { Company } from "@/types";
import useFetch from "@/hooks/useFetch";
import { useAppSelector } from "@/store/hooks";
// import { updateAdminProfile } from "@/store/slices/admins.slice";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Separator } from "@/components/UI/separator";
import {
  ActionsType,
  generateEmployeesColumns,
} from "@/components/columns/employeesColumns";
import { Button } from "@/components/UI/button";
import { Plus } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { AdminUser } from "@/types/admin";
import {
  AddNewEmployeeDialog,
  AddNewEmployeeForm,
} from "../forms/AddNewEmployee";
import { AssignCompany } from "../forms/assign-company";
import { useSession } from "next-auth/react";
import { AssignAdmins } from "../forms/assign-admins";
import { API_GET_COMPANIES } from "@/constants/api/employer";

const TeamList = () => {
  const { data: session } = useSession();
  const user = session?.user;
  // const dispatch = useAppDispatch();
  const { departments } = usePermissions();
  const { data: admins } = useAppSelector((state) => state.admins);
  const { data: companies } = useFetch<PaginatedResponse<Company>>(
    API_GET_COMPANIES + "?limit=1000",
  );

  const [action, setAction] = useState<ActionsType | null>(null);
  const [defaultValues, setDefaultValues] = useState<AdminUser | null>(null);

  const actionHandler = (row: AdminUser, action: ActionsType) => {
    setAction(action);
    setDefaultValues(row);
  };

  const columns = generateEmployeesColumns(
    companies?.data || [],
    admins || [],
    departments || [],
    actionHandler,
    user,
  );

  // const updateData = (
  //   rowIndex: number,
  //   columnId: string,
  //   value: string | number | boolean,
  // ) => {
  //   dispatch(
  //     updateAdminProfile({
  //       id: admins[rowIndex].id,
  //       updates: {
  //         [columnId]: value,
  //       },
  //     }),
  //   );
  // };

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchAdmins({ filter: { type: "" }, user }));
  //   }
  // }, [dispatch, user]);

  return (
    <>
      {defaultValues && (
        <AddNewEmployeeForm
          open={action === "edit"}
          setOpen={() => setAction(null)}
          defaultValues={defaultValues}
        />
      )}
      {defaultValues && (
        <AssignCompany
          userId={user?.id || ""}
          open={action === "assign-companies"}
          setOpen={() => setAction(null)}
          defaultValues={defaultValues}
        />
      )}
      <AssignAdmins
        userId={user?.id || ""}
        open={action === "assign-admins"}
        setOpen={() => setAction(null)}
        defaultValues={defaultValues}
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Employees
            <span className="text-muted-foreground self-end text-sm">
              ({admins.length})
            </span>
          </CardTitle>
          <CardDescription>You can manage employees here.</CardDescription>
          <CardAction>
            <AddNewEmployeeDialog>
              <Button variant="outline">
                <Plus />
                Add New Employee
              </Button>
            </AddNewEmployeeDialog>
          </CardAction>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="p-0">
          <AdvancedDataTable
            name="medicova-employees"
            columns={columns}
            data={admins}
            hideSearch={false}
            hideColumnManager={false}
            hideExport={false}
            hidePagination={false}
            filters={[
              { key: "type", className: "max-w-44" },
              { key: "departmentId", className: "max-w-44" },
            ]}
            defaultSorting={{
              id: "firstName",
              desc: false,
            }}
            headerClassName="text-sm"
            cellClassName="text-xs"
            filterClassName="px-5"
            paginationClassName="px-5"
            tableClassName="border-t border-b"
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TeamList;
