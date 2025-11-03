"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Trash2,
  MoreVertical,
  PenSquare,
  FileEdit,
  GripVertical,
} from "lucide-react";
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
import { Category } from "@/types";

interface CategoriesTableProps {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onFullEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  onToggleStatus?: (category: Category) => void;
  onReorder?: (reorderedCategories: Category[]) => void;
}

export default function CategoriesTable({
  categories,
  onEdit,
  onFullEdit,
  onDelete,
  onToggleStatus,
  onReorder,
}: CategoriesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, searchQuery]);

  const handleSearch = () => {
    // Search is handled by the filteredCategories useMemo
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
    // Add a slight opacity to the dragged element
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
    const reorderedCategories = [...filteredCategories];
    const draggedItem = reorderedCategories[draggedIndex];
    
    // Remove the dragged item
    reorderedCategories.splice(draggedIndex, 1);
    // Insert it at the new position
    reorderedCategories.splice(dropIndex, 0, draggedItem);

    // Update priorities based on new order
    const updatedCategories = reorderedCategories.map((cat, idx) => ({
      ...cat,
      priority: idx + 1,
    }));

    // Call the parent's onReorder callback
    onReorder?.(updatedCategories);
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // const handleDownload = () => {
  //   console.log("Downloading categories data...");
  //   // TODO: Implement download functionality
  // };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">
            All Categories
          </h3>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {filteredCategories.length}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700"
          >
            Search
          </Button>
          {/* <Button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700"
          >
            Download
          </Button> */}
        </div>
      </div>

      {/* Categories Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead className="w-20">Rank</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category, index) => (
              <TableRow 
                key={category.id} 
                className={`hover:bg-gray-50 cursor-move transition-all ${
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
                  {category.image ? (
                    <Image
                      src={category.image} 
                      alt={category.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
                      <span className="text-xs font-medium text-gray-600">
                        {category.name.substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">
                      {category.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {category.slug}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="font-semibold">
                    {category.priority || 0}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">
                  {new Date(category.created_at).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="text-gray-600">
                  {category.coursesNumber || 0}
                </TableCell>
                <TableCell>
                <div className="flex items-center gap-3">
                    <Switch
                      checked={category.isActive ?? true}
                      onCheckedChange={() => onToggleStatus?.(category)}
                      className="scale-125"
                    />
                    <Badge 
                      variant={(category.isActive ?? true) ? 'default' : 'secondary'}
                      className={(category.isActive ?? true) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {(category.isActive ?? true) ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit?.(category)}
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800"
                      title="Quick Edit"
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFullEdit?.(category)}
                      className="h-8 w-8 p-0 text-green-600 hover:text-green-800"
                      title="Full Edit"
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(category)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
