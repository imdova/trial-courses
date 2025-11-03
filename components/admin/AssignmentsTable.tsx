"use client";

import { useState } from "react";
import { Assignment } from "@/types/assignment";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Checkbox } from "@/components/UI/Check-Box";
import { MoreHorizontal, Search, Download, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";

interface AssignmentsTableProps {
  assignments: Assignment[];
  onEdit?: (assignment: Assignment) => void;
  onDelete?: (assignment: Assignment) => void;
  onView?: (assignment: Assignment) => void;
}

export default function AssignmentsTable({
  assignments,
  onEdit,
  onDelete,
  onView,
}: AssignmentsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredAssignments.map((assignment) => assignment.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (assignmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, assignmentId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== assignmentId));
    }
  };


  const isOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search all columns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Columns
          </Button>
          <Button variant="outline" size="sm" disabled={selectedRows.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export
            {selectedRows.length > 0 && (
              <span className="ml-2 text-xs text-gray-500">
                ({selectedRows.length} of {filteredAssignments.length} row(s) selected)
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === filteredAssignments.length && filteredAssignments.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Start Date & Time</TableHead>
              <TableHead>Due Date & Time</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(assignment.id)}
                    onCheckedChange={(checked) => handleSelectRow(assignment.id, !!checked)}
                    aria-label="Select row"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-600">📄</span>
                    </div>
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-gray-500">
                        {assignment.questions} questions
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{assignment.startDate}</div>
                    <div className="text-sm text-gray-500">{assignment.startTime}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className={`font-medium ${isOverdue(assignment.dueDate) ? 'text-red-600' : ''}`}>
                      {assignment.dueDate}
                    </div>
                    <div className="text-sm text-gray-500">{assignment.dueTime}</div>
                    {isOverdue(assignment.dueDate) && (
                      <div className="text-sm text-red-600 font-medium">Overdue</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {assignment.submissions} students
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{assignment.points}</div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{assignment.instructor.name}</div>
                    <div className="text-sm text-gray-500">{assignment.course.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView?.(assignment)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(assignment)}>
                        Edit Assignment
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete?.(assignment)}
                        className="text-red-600"
                      >
                        Delete Assignment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Rows per page</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">1-{filteredAssignments.length} of {filteredAssignments.length}</span>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>
              ⏮️
            </Button>
            <Button variant="outline" size="sm" disabled>
              ⏪
            </Button>
            <Button variant="outline" size="sm" disabled>
              ⏩
            </Button>
            <Button variant="outline" size="sm" disabled>
              ⏭️
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
