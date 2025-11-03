import AdvancedDataTable from "../AdvancedDataTable";
import { Card, CardDescription, CardHeader, CardTitle } from "../card";
import { generateAdminStudentsColumns } from "@/components/columns/adminStudentsColumns";
import { Student } from "@/store/slices/admin-students-list.slice";

interface StudentOverviewTableProps {
  students?: Student[];
  showPagination?: boolean;
  showFilters?: boolean;
}

const StudentOverviewTable = ({ 
  students = [], 
  showPagination = false,
  showFilters = false 
}: StudentOverviewTableProps) => {
  const columns = generateAdminStudentsColumns();

  return (
    <Card className="space-y-4">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Students</CardTitle>
        <CardDescription>
          {students.length > 0 ? `Showing ${students.length} students` : "No students found"}
        </CardDescription>
      </CardHeader>
      <AdvancedDataTable<Student>
        columns={columns}
        data={students}
        defaultSorting={{
          id: "createdAt",
          desc: true,
        }}
        hidePagination={!showPagination}
        hideSearch={!showFilters}
        hideExport={!showFilters}
        hideColumnManager={!showFilters}
        cellClassName="text-xs"
        filterClassName="px-5"
        paginationClassName="px-5"
        tableClassName="border-t border-b"
      />
    </Card>
  );
};

export default StudentOverviewTable;
