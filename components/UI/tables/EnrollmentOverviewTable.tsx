"use client";

import AdvancedDataTable from "../AdvancedDataTable";
import { Card, CardDescription, CardHeader, CardTitle } from "../card";
import { enrollmentsColumns } from "@/constants/columns/enrollmentsColumns";
import { useAdminEnrollmentsList } from "@/hooks/useAdminEnrollmentsList";
import Loading from "@/components/loading/loading";

const EnrollmentOverviewTable = () => {
  const { enrollments, loading } = useAdminEnrollmentsList(true, 10);

  if (loading && enrollments.length === 0) {
    return (
      <Card className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Enrollments</CardTitle>
          <CardDescription>List of all enrollments</CardDescription>
        </CardHeader>
        <div className="p-8">
          <Loading />
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Enrollments</CardTitle>
        <CardDescription>Showing last 10 enrollments</CardDescription>
      </CardHeader>
      <AdvancedDataTable
        columns={enrollmentsColumns}
        data={enrollments}
        filters={[
          { key: "status", className: "flex-1 min-w-32 lg:max-w-32" },
          { key: "courseName", className: "flex-1 min-w-20 lg:max-w-44" },
          { key: "studentName", className: "flex-1 min-w-32 lg:max-w-44" },
          { key: "enrollmentDate", className: "flex-1 min-w-32 lg:max-w-44" },
        ]}
        defaultSorting={{
          id: "enrollmentDate",
          desc: true,
        }}
        hidePagination
        hideSearch
        hideExport
        hideColumnManager
        cellClassName="text-xs"
        filterClassName="px-5"
        paginationClassName="px-5"
        tableClassName="border-t border-b"
      />
    </Card>
  );
};

export default EnrollmentOverviewTable;
