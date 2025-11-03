"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Plus, Edit, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Badge } from "@/components/UI/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";
import { Attribute } from "@/types/category";

interface AttributesTableProps {
  attributes: Attribute[];
  onDelete?: (attribute: Attribute) => void;
}

export default function AttributesTable({ attributes, onDelete }: AttributesTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter attributes based on search query
  const filteredAttributes = useMemo(() => {
    return attributes.filter((attribute) =>
      attribute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attribute.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [attributes, searchQuery]);

  const getStatusBadge = (status: string) => {
    return status === "Published" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        Published
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
        Draft
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Product Attributes</h2>
        <p className="text-gray-600 mt-1">Attributes describe key details of the product such as material, dimensions, or usage type.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Button 
          onClick={() => {
              router.push('/admin/course-settings/attributes/create');
          }} 
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
      </div>

      {/* Attributes Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="flex items-center gap-1">
                Name
                <ChevronDown className="h-4 w-4" />
              </TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttributes.map((attribute) => (
              <TableRow key={attribute.id} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  #{attribute.id}
                </TableCell>
                <TableCell>
                  <span className="text-green-600 font-medium">{attribute.name}</span>
                </TableCell>
                <TableCell className="text-gray-600">{attribute.slug}</TableCell>
                <TableCell className="text-gray-600">{attribute.sortOrder}</TableCell>
                <TableCell className="text-gray-600">
                  {new Date(attribute.createdAt).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </TableCell>
                <TableCell>
                  {getStatusBadge(attribute.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                          router.push(`/admin/course-settings/attributes/edit/${attribute.id}`);
                      }}
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(attribute)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
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
