"use client";

import { useState } from "react";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { enrollmentsColumns } from "@/constants/columns/enrollmentsColumns";
import { useAdminEnrollmentsList } from "@/hooks/useAdminEnrollmentsList";
import Loading from "@/components/loading/loading";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Button } from "@/components/UI/button";
import { Search, X, Calendar } from "lucide-react";

const EnrollmentList: React.FC = () => {
  const { enrollments, pagination, filters, loading, updateFilters } = useAdminEnrollmentsList(true, 10);
  
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "");
  const [startDate, setStartDate] = useState(filters.startDate || "");
  const [endDate, setEndDate] = useState(filters.endDate || "");

  const handleSearch = () => {
    updateFilters({ 
      search: searchInput,
      page: 1
    });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateFilters({ 
      status: value as "completed" | "active" | "inactive" | "all" | "",
      page: 1
    });
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    updateFilters({ 
      startDate: value,
      page: 1
    });
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    updateFilters({ 
      endDate: value,
      page: 1
    });
  };

  const clearFilters = () => {
    setSearchInput("");
    setStatusFilter("");
    setStartDate("");
    setEndDate("");
    updateFilters({ 
      search: "",
      status: "",
      startDate: "",
      endDate: "",
      page: 1
    });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const hasActiveFilters = searchInput || statusFilter || startDate || endDate;

  if (loading && enrollments.length === 0) {
    return (
      <Card className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">All Enrollments</CardTitle>
          <CardDescription>Complete list of all enrollments with filters</CardDescription>
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
        <CardTitle className="text-lg">All Enrollments</CardTitle>
        <CardDescription>
          {pagination ? `Showing ${enrollments.length} of ${pagination.total} enrollments` : "Complete list of all enrollments"}
        </CardDescription>
      </CardHeader>

      {/* Filters Section */}
      <div className="space-y-4 px-5">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by student or course..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-9"
              />
            </div>
            <Button onClick={handleSearch} size="sm">
              Search
            </Button>
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Start Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="date"
              placeholder="Start date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* End Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="date"
              placeholder="End date"
              value={endDate}
              onChange={(e) => handleEndDateChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear all filters
          </Button>
        )}
      </div>

      {/* Data Table */}
      <AdvancedDataTable
        columns={enrollmentsColumns}
        data={enrollments}
        filters={[]}
        defaultSorting={{
          id: "enrollmentDate",
          desc: true,
        }}
        hideSearch
        hideExport
        hideColumnManager
        hidePagination
        cellClassName="text-xs"
        filterClassName="px-5"
        paginationClassName="px-5"
        tableClassName="border-t border-b"
      />

      {/* Pagination Info */}
      {pagination && (
        <div className="flex items-center justify-between px-5 pb-4 text-sm text-gray-600">
          <div>
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrev || loading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNext || loading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EnrollmentList;
