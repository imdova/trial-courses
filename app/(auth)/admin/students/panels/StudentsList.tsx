"use client";

import { useState } from "react";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { generateAdminStudentsColumns } from "@/components/columns/adminStudentsColumns";
import { Student } from "@/store/slices/admin-students-list.slice";
import { useAdminStudentsList } from "@/hooks/useAdminStudentsList";
import Loading from "@/components/loading/loading";
import { Button } from "@/components/UI/button";
import { ChevronLeft, ChevronRight, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";

const StudentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [showAllFilters, setShowAllFilters] = useState(false);
  
  // Local filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState<"all" | "male" | "female">("all");
  const [category, setCategory] = useState("");
  const [speciality, setSpeciality] = useState("");

  const { students, pagination, loading, updateFilters, clearFilters } = useAdminStudentsList(true, pageSize);

  const columns = generateAdminStudentsColumns();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateFilters({ page: newPage });
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    updateFilters({
      page: 1,
      search: searchQuery,
      minAge: minAge ? parseInt(minAge) : undefined,
      maxAge: maxAge ? parseInt(maxAge) : undefined,
      gender: gender !== "all" ? gender : undefined,
      category: category || undefined,
      speciality: speciality || undefined,
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setMinAge("");
    setMaxAge("");
    setGender("all");
    setCategory("");
    setSpeciality("");
    setCurrentPage(1);
    clearFilters();
  };

  if (loading && students.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      {/* Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm">Search</Label>
              <Input
                id="search"
                placeholder="Filter by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
              />
            </div>

            {/* Min Age */}
            <div className="space-y-2">
              <Label htmlFor="minAge" className="text-sm">Min Age</Label>
              <Input
                id="minAge"
                type="number"
                placeholder="Filter by minimum age"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
              />
            </div>

            {/* Max Age */}
            <div className="space-y-2">
              <Label htmlFor="maxAge" className="text-sm">Max Age</Label>
              <Input
                id="maxAge"
                type="number"
                placeholder="Filter by maximum age"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm">Gender</Label>
              <Select value={gender} onValueChange={(value) => setGender(value as "all" | "male" | "female")}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Filters - Show only when expanded */}
            {showAllFilters && (
              <>
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm">Category</Label>
                  <Input
                    id="category"
                    placeholder="Filter by Profile Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                {/* Speciality */}
                <div className="space-y-2">
                  <Label htmlFor="speciality" className="text-sm">Speciality</Label>
                  <Input
                    id="speciality"
                    placeholder="Filter by Profile Speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Filter Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button onClick={handleApplyFilters} className="bg-green-600 hover:bg-green-700">
              <Search className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button onClick={handleClearFilters} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
            <Button 
              onClick={() => setShowAllFilters(!showAllFilters)} 
              variant="outline"
              className="ml-auto"
            >
              {showAllFilters ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Show More Filters
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="relative">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">All Students</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {pagination ? `Showing ${students.length} of ${pagination.total} students` : "Loading..."}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <AdvancedDataTable<Student>
            data={students}
            columns={columns}
            hidePagination={true}
            hideSearch={true}
            hideExport={false}
            hideColumnManager={false}
            initialPagination={{
              pageIndex: 0,
              pageSize: pageSize,
            }}
            cellClassName="p-3 text-sm"
            headerClassName="text-sm uppercase text-gray-500 bg-gray-100"
            tableClassName="border-none"
          />

          {/* Custom Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="border-t border-gray-200 p-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrev || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {[...Array(Math.min(pagination.totalPages, 5))].map((_, idx) => {
                    const pageNumber = idx + 1;
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={loading}
                        className="h-8 w-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                  {pagination.totalPages > 5 && (
                    <>
                      <span className="px-2 text-gray-400">...</span>
                      <Button
                        variant={currentPage === pagination.totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={loading}
                        className="h-8 w-8 p-0"
                      >
                        {pagination.totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNext || loading}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
