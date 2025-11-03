"use client";

import { useState } from "react";
import { Search, Download, Trash2, MoreHorizontal, PenSquare, FileEdit, GripVertical } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Badge } from "@/components/UI/badge";
import { Switch } from "@/components/UI/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { Card, CardHeader, CardTitle } from "@/components/UI/card";
import { Category } from "@/types";

interface SubCategoriesTableProps {
  subcategories: Category[];
  onEdit?: (subcategory: Category) => void;
  onFullEdit?: (subcategory: Category) => void;
  onDelete?: (subcategory: Category) => void;
  onToggleStatus?: (subcategory: Category) => void;
  onReorder?: (reorderedSubcategories: Category[]) => void;
}

export default function SubCategoriesTable({ 
  subcategories, 
  onEdit, 
  onFullEdit,
  onDelete, 
  onToggleStatus,
  onReorder
}: SubCategoriesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Filter subcategories based on search query
  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subcategory.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subcategory.parent?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.currentTarget.style.opacity = "1";
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      return;
    }

    // Create a new array with reordered items
    const reorderedSubcategories = [...filteredSubcategories];
    const draggedItem = reorderedSubcategories[draggedIndex];
    
    // Remove the dragged item
    reorderedSubcategories.splice(draggedIndex, 1);
    // Insert it at the new position
    reorderedSubcategories.splice(dropIndex, 0, draggedItem);

    // Update priorities based on new order
    const updatedSubcategories = reorderedSubcategories.map((cat, idx) => ({
      ...cat,
      priority: idx + 1,
    }));

    // Call the parent's onReorder callback
    onReorder?.(updatedSubcategories);
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold">All Sub Categories</CardTitle>
            <Badge className="bg-green-100 text-green-800">
              {filteredSubcategories.length}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              Search
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Sub Category Name</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead className="w-20">Rank</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubcategories.map((subcategory, index) => (
              <TableRow 
                key={subcategory.id}
                className={`cursor-move transition-all ${
                  draggedIndex === index ? 'opacity-50' : ''
                } ${
                  dragOverIndex === index ? 'border-t-2 border-blue-500' : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <TableCell className="text-center">
                  <div className="flex items-center justify-center cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </div>
                </TableCell>
                <TableCell>
                  {subcategory.image ? (
                    <Image 
                      src={subcategory.image} 
                      alt={subcategory.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
                      <span className="text-xs font-medium text-gray-600">
                        {subcategory.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{subcategory.name}</span>
                    <span className="text-sm text-gray-500">{subcategory.slug}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{subcategory.parent?.name || '-'}</span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="font-semibold">
                    {subcategory.priority || 0}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{formatDate(subcategory.created_at)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{subcategory.coursesNumber || 0}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={subcategory.isActive ?? true}
                      onCheckedChange={() => onToggleStatus?.(subcategory)}
                      className="scale-125"
                    />
                    <Badge 
                      variant={(subcategory.isActive ?? true) ? 'default' : 'secondary'}
                      className={(subcategory.isActive ?? true) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {(subcategory.isActive ?? true) ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit?.(subcategory)}
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800"
                      title="Quick Edit"
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFullEdit?.(subcategory)}
                      className="h-8 w-8 p-0 text-green-600 hover:text-green-800"
                      title="Full Edit"
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(subcategory)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit?.(subcategory)}>
                          <PenSquare className="mr-2 h-4 w-4" />
                          Quick Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onFullEdit?.(subcategory)}>
                          <FileEdit className="mr-2 h-4 w-4" />
                          Full Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDelete?.(subcategory)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
