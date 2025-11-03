"use client";

import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Instructor } from "@/types/courses";
import { List, Star, Eye, Edit, Trash, CheckCircle, XCircle, Clock, Download } from "lucide-react";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";

interface CoursesListProps {
  instructors: Instructor[];
}

type InstructorStatus = "all" | "approved" | "pending" | "rejected" | "top";

// Extended Instructor type with approval status
interface InstructorWithApproval extends Instructor {
  approvalStatus?: "approved" | "pending" | "rejected";
}

const InstructorsList: React.FC<CoursesListProps> = ({ instructors }) => {
  const [selectedStatus, setSelectedStatus] = useState<InstructorStatus>("all");
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorWithApproval | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Add approval status to instructors (mock data - replace with actual API data)
  const instructorsWithApproval: InstructorWithApproval[] = useMemo(() => {
    return instructors.map((instructor, index) => ({
      ...instructor,
      approvalStatus: index % 3 === 0 ? "pending" : index % 3 === 1 ? "approved" : "rejected",
    }));
  }, [instructors]);

  const handleApproveClick = useCallback((instructor: InstructorWithApproval) => {
    setSelectedInstructor(instructor);
    setApproveDialogOpen(true);
  }, []);

  const handleRejectClick = useCallback((instructor: InstructorWithApproval) => {
    setSelectedInstructor(instructor);
    setRejectDialogOpen(true);
  }, []);

  const handleConfirmApprove = async () => {
    if (!selectedInstructor) return;
    
    setLoading(true);
    try {
      console.log("Approve instructor:", selectedInstructor.id);
      // TODO: Implement API call to approve instructor
      // await approveInstructorAPI(selectedInstructor.id);
      
      // Update local state (temporary until refetch from API)
      // This would be replaced with actual data refetch
      
      setApproveDialogOpen(false);
      setSelectedInstructor(null);
    } catch (error) {
      console.error("Error approving instructor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedInstructor) return;
    
    setLoading(true);
    try {
      console.log("Reject instructor:", selectedInstructor.id);
      // TODO: Implement API call to reject instructor
      // await rejectInstructorAPI(selectedInstructor.id);
      
      // Update local state (temporary until refetch from API)
      // This would be replaced with actual data refetch
      
      setRejectDialogOpen(false);
      setSelectedInstructor(null);
    } catch (error) {
      console.error("Error rejecting instructor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelApprove = () => {
    setApproveDialogOpen(false);
    setSelectedInstructor(null);
  };

  const handleCancelReject = () => {
    setRejectDialogOpen(false);
    setSelectedInstructor(null);
  };

  const handleExportToExcel = () => {
    try {
      // Dynamically import xlsx to avoid SSR issues
      import('xlsx').then((XLSX) => {
        // Prepare data for export
        const exportData = filteredInstructors.map((instructor) => ({
          'ID': instructor.id,
          'Name': instructor.name,
          'Email': instructor.email,
          'Phone': instructor.phone,
          'Country': instructor.country,
          'Join Date': instructor.joinDate,
          'Type': instructor.type,
          'Courses': instructor.courses,
          'Students': instructor.students,
          'Revenue': `$${instructor.revenu}`,
          'Account Manager': instructor.accountManager,
          'Approval Status': instructor.approvalStatus || 'pending',
          'Is Top': instructor.isTop ? 'Yes' : 'No',
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        
        // Set column widths
        const columnWidths = [
          { wch: 10 }, // ID
          { wch: 25 }, // Name
          { wch: 30 }, // Email
          { wch: 15 }, // Phone
          { wch: 15 }, // Country
          { wch: 12 }, // Join Date
          { wch: 15 }, // Type
          { wch: 10 }, // Courses
          { wch: 10 }, // Students
          { wch: 12 }, // Revenue
          { wch: 20 }, // Account Manager
          { wch: 15 }, // Approval Status
          { wch: 10 }, // Is Top
        ];
        worksheet['!cols'] = columnWidths;

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Instructors');

        // Generate filename with current date
        const date = new Date().toISOString().split('T')[0];
        const filename = `instructors_${selectedStatus}_${date}.xlsx`;

        // Save file
        XLSX.writeFile(workbook, filename);
      });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  // Define columns for the AdvancedDataTable
  const columns = useMemo<ColumnDef<InstructorWithApproval>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="accent-primary h-4 w-4 cursor-pointer rounded border-gray-300 text-green-600"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="accent-primary h-4 w-4 cursor-pointer rounded border-gray-300 text-green-600"
          />
        ),
        enableSorting: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ getValue }) => (
          <div className="whitespace-nowrap">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const instructor = row.original;
          return (
            <div className="flex items-center">
              <div className="h-9 w-9 flex-shrink-0">
                <Image
                  className="h-10 w-10 rounded-lg object-cover"
                  src={instructor.avatar}
                  width={40}
                  height={40}
                  alt="Instructor Image"
                />
              </div>
              <div className="ml-4">
                <Link href={`/admin/instructors/${instructor.id}`}>
                  <span className="text-sm font-medium text-gray-900">
                    {instructor.name}
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {instructor.email}
                  </p>
                </Link>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ getValue }) => (
          <div className="text-sm whitespace-nowrap text-gray-500">
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "country",
        header: "Country",
        cell: ({ getValue }) => (
          <div className="text-sm whitespace-nowrap text-gray-500">
            {getValue() as string}
          </div>
        ),
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "joinDate",
        accessorFn: (row) => new Date(row.joinDate!).getTime(),
        header: "Join Date",
        cell: ({ getValue }) => (
          <div className="text-sm whitespace-nowrap text-gray-500">
            {getValue() as string}
          </div>
        ),
        meta: {
          filterVariant: "date-range",
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => (
          <div className="text-sm whitespace-nowrap text-gray-500">
            {getValue() as string}
          </div>
        ),
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "courses",
        header: "Courses",
        cell: ({ getValue }) => (
          <div className="text-sm whitespace-nowrap text-gray-500">
            {getValue() as number}
          </div>
        ),
      },
      {
        accessorKey: "students",
        header: "Students",
        cell: ({ getValue }) => (
          <div className="text-sm whitespace-nowrap text-gray-500">
            {getValue() as number}
          </div>
        ),
      },
      {
        accessorKey: "revenu",
        header: "Revenue",
        cell: ({ getValue }) => (
          <div className="text-sm whitespace-nowrap text-gray-500">
            ${getValue() as number}
          </div>
        ),
      },
      {
        accessorKey: "accountManager",
        header: "Account Manager",
        cell: ({ getValue }) => (
          <div className="text-sm whitespace-nowrap text-gray-500 capitalize">
            {getValue() as string}
          </div>
        ),
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "approvalStatus",
        header: "Approval",
        cell: ({ row }) => {
          const instructor = row.original;
          const status = instructor.approvalStatus || "pending";
          
          return (
            <div className="flex items-center gap-2">
              <Badge 
                variant={
                  status === "approved" ? "success" : 
                  status === "rejected" ? "destructive" : 
                  "default"
                }
                className={
                  status === "approved" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                  status === "rejected" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                  "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                }
              >
                {status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                {status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                {status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              
              {status === "pending" && (
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => handleApproveClick(instructor)}
                    title="Approve"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRejectClick(instructor)}
                    title="Reject"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          );
        },
        enableSorting: false,
        meta: {
          filterVariant: "select",
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const instructor = row.original;
          return (
            <OptionsDropdown
              actions={[
                {
                  label: "View",
                  icon: <Eye className="h-4 w-4" />,
                  onClick: () => console.log("View clicked", instructor.id),
                },
                {
                  label: "Edit",
                  icon: <Edit className="h-4 w-4" />,
                  onClick: () => console.log("Edit clicked", instructor.id),
                },
                {
                  label: "Delete",
                  icon: <Trash className="h-4 w-4" />,
                  onClick: () => console.log("Delete clicked", instructor.id),
                  danger: true,
                },
              ]}
            />
          );
        },
        enableSorting: false,
        enableGlobalFilter: false,
      },
    ],
    [handleApproveClick, handleRejectClick],
  );

  // Filter instructors based on selected status
  const filteredInstructors = useMemo(() => {
    if (selectedStatus === "all") return instructorsWithApproval;
    if (selectedStatus === "top") return instructorsWithApproval.filter((i) => i.isTop);
    return instructorsWithApproval.filter((i) => i.approvalStatus === selectedStatus);
  }, [instructorsWithApproval, selectedStatus]);

  // Get counts for each tab
  const tabCounts = {
    all: instructorsWithApproval.length,
    top: instructorsWithApproval.filter((instructor) => instructor.isTop).length,
    approved: instructorsWithApproval.filter((instructor) => instructor.approvalStatus === "approved").length,
    pending: instructorsWithApproval.filter((instructor) => instructor.approvalStatus === "pending").length,
    rejected: instructorsWithApproval.filter((instructor) => instructor.approvalStatus === "rejected").length,
  };

  return (
    <div className="max-w-full">
      {/* Top Controls */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 lg:flex-row">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center lg:justify-start">
          <Tabs
            value={selectedStatus}
            onValueChange={(value) =>
              setSelectedStatus(value as InstructorStatus)
            }
            className="w-full"
          >
            <TabsList className="gap-3 rounded-lg bg-white">
              {[
                {
                  value: "all",
                  label: "All Instructors",
                  icon: List,
                  count: tabCounts.all,
                },
                {
                  value: "top",
                  label: "Top Instructors",
                  icon: Star,
                  count: tabCounts.top,
                },
                {
                  value: "approved",
                  label: "Approved",
                  icon: CheckCircle,
                  count: tabCounts.approved,
                },
                {
                  value: "pending",
                  label: "Pending",
                  icon: Clock,
                  count: tabCounts.pending,
                },
                {
                  value: "rejected",
                  label: "Rejected",
                  icon: XCircle,
                  count: tabCounts.rejected,
                },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-xs text-gray-600 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm">
                      {tab.label}
                      <span className="ml-1 text-xs">({tab.count})</span>
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Export Button */}
        <div className="flex gap-2">
          <Button
            onClick={handleExportToExcel}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <AdvancedDataTable
        columns={columns}
        data={filteredInstructors}
        filters={[
          { key: "country", className: "min-w-32" },
          { key: "type", className: "min-w-32" },
          { key: "accountManager", className: "min-w-32" },
          { key: "approvalStatus", className: "min-w-32" },
        ]}
        hideSearch={true} // We have our own search
        initialPagination={{
          pageIndex: 0,
          pageSize: 5,
        }}
      />

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Approve Instructor
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve{" "}
              <span className="font-semibold text-gray-900">
                {selectedInstructor?.name}
              </span>
              ? This will allow them to create and manage courses on the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelApprove} disabled={loading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmApprove}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <span className="mr-2">Approving...</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Instructor
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Reject Instructor
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject{" "}
              <span className="font-semibold text-gray-900">
                {selectedInstructor?.name}
              </span>
              ? This will deny their request to become an instructor on the platform.
              <div className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-800">
                <strong>Note:</strong> The instructor will be notified of this rejection.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelReject} disabled={loading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmReject}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                <>
                  <span className="mr-2">Rejecting...</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Instructor
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InstructorsList;
