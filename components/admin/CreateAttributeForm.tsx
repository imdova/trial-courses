/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Card } from "@/components/UI/card";
import { Switch } from "@/components/UI/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  Folder,
  Image as ImageIcon,
  Type
} from "lucide-react";

interface AttributeEntry {
  id: string;
  titleEnglish: string;
  titleArabic: string;
  color: string;
  image?: string;
  isDefault: boolean;
}

interface CreateAttributeFormProps {
  onSubmit?: (data: {
    titleEnglish: string;
    titleArabic: string;
    useImageFromVariation: boolean;
    attributes: AttributeEntry[];
    displayLayout: string;
    searchable: boolean;
    comparable: boolean;
    usedInProductListing: boolean;
    sortOrder: number;
    categories: string[];
    status: string;
  }) => void;
  initialData?: {
    titleEnglish?: string;
    titleArabic?: string;
    useImageFromVariation?: boolean;
    displayLayout?: string;
    searchable?: boolean;
    comparable?: boolean;
    usedInProductListing?: boolean;
    sortOrder?: number;
    categories?: string[];
    status?: string;
  };
}

export default function CreateAttributeForm({ onSubmit, initialData }: CreateAttributeFormProps) {
  const [formData, setFormData] = useState({
    titleEnglish: initialData?.titleEnglish || "",
    titleArabic: initialData?.titleArabic || "",
    useImageFromVariation: initialData?.useImageFromVariation || false,
    displayLayout: initialData?.displayLayout || "Dropdown",
    searchable: initialData?.searchable || false,
    comparable: initialData?.comparable || false,
    usedInProductListing: initialData?.usedInProductListing || false,
    sortOrder: initialData?.sortOrder || 0,
    categories: initialData?.categories || [],
    status: initialData?.status || "Draft",
  });

  const [attributes, setAttributes] = useState<AttributeEntry[]>([
    {
      id: "1",
      titleEnglish: "box-1",
      titleArabic: "صندوق-1",
      color: "#000000",
      isDefault: true,
    },
    {
      id: "2",
      titleEnglish: "box-2",
      titleArabic: "صندوق-2",
      color: "#ffffff",
      isDefault: false,
    },
  ]);

  const categories = [
    { id: "1", name: "Medical Wear" },
    { id: "2", name: "Medical Equipment" },
    { id: "3", name: "Medical Consumables" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      ...formData,
      attributes,
    });
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAttribute = () => {
    const newAttribute: AttributeEntry = {
      id: Date.now().toString(),
      titleEnglish: "",
      titleArabic: "",
      color: "#000000",
      isDefault: false,
    };
    setAttributes(prev => [...prev, newAttribute]);
  };

  const removeAttribute = (id: string) => {
    setAttributes(prev => prev.filter(attr => attr.id !== id));
  };

  const updateAttribute = (id: string, field: string, value: string | boolean) => {
    setAttributes(prev => prev.map(attr => 
      attr.id === id ? { ...attr, [field]: value } : attr
    ));
  };

  const toggleDefault = (id: string) => {
    setAttributes(prev => prev.map(attr => ({
      ...attr,
      isDefault: attr.id === id ? !attr.isDefault : false
    })));
  };

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const selectAllCategories = () => {
    setFormData(prev => ({
      ...prev,
      categories: categories.map(cat => cat.id)
    }));
  };

  const deselectAllCategories = () => {
    setFormData(prev => ({
      ...prev,
      categories: []
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Type className="h-6 w-6 text-gray-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {initialData ? "Edit Product Attribute" : "New Product Attribute"}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attribute Title Section */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titleEnglish" className="text-sm font-medium text-gray-700">
                      Title (English) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="titleEnglish"
                      placeholder="Title"
                      value={formData.titleEnglish}
                      onChange={(e) => handleInputChange("titleEnglish", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="titleArabic" className="text-sm font-medium text-gray-700">
                      Title (Arabic) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="titleArabic"
                      placeholder="Title"
                      value={formData.titleArabic}
                      onChange={(e) => handleInputChange("titleArabic", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="useImageFromVariation"
                    checked={formData.useImageFromVariation}
                    onCheckedChange={(checked) => handleInputChange("useImageFromVariation", checked)}
                  />
                  <Label htmlFor="useImageFromVariation" className="text-sm text-gray-700">
                    Use image from product variation (for Visual Swatch only)
                  </Label>
                </div>
              </div>
            </Card>

            {/* Attributes List Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Attributes list</h3>
                <Button
                  type="button"
                  onClick={addAttribute}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Attribute
                </Button>
              </div>

              <div className="space-y-4">
                {attributes.map((attribute, index) => (
                  <div key={attribute.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={attribute.isDefault}
                          onChange={() => toggleDefault(attribute.id)}
                          className="rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Default</span>
                        {attribute.isDefault && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttribute(attribute.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Title (English)</Label>
                        <Input
                          value={attribute.titleEnglish}
                          onChange={(e) => updateAttribute(attribute.id, "titleEnglish", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Title (Arabic)</Label>
                        <Input
                          value={attribute.titleArabic}
                          onChange={(e) => updateAttribute(attribute.id, "titleArabic", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Color</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="color"
                            value={attribute.color}
                            onChange={(e) => updateAttribute(attribute.id, "color", e.target.value)}
                            className="w-8 h-8 rounded border border-gray-300"
                          />
                          <Input
                            value={attribute.color}
                            onChange={(e) => updateAttribute(attribute.id, "color", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Image</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input placeholder="Upload image" className="flex-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Published Section */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save & Exit
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 flex-1">
                    Published
                  </Button>
                </div>
              </div>
            </Card>

            {/* Display Layout */}
            <Card className="p-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Display Layout <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.displayLayout} onValueChange={(value) => handleInputChange("displayLayout", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dropdown">Dropdown</SelectItem>
                    <SelectItem value="Radio">Radio</SelectItem>
                    <SelectItem value="Checkbox">Checkbox</SelectItem>
                    <SelectItem value="Visual Swatch">Visual Swatch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Toggle Options */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Searchable</Label>
                  <Switch
                    checked={formData.searchable}
                    onCheckedChange={(checked) => handleInputChange("searchable", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Comparable</Label>
                  <Switch
                    checked={formData.comparable}
                    onCheckedChange={(checked) => handleInputChange("comparable", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Used in product listing</Label>
                  <Switch
                    checked={formData.usedInProductListing}
                    onCheckedChange={(checked) => handleInputChange("usedInProductListing", checked)}
                  />
                </div>
              </div>
            </Card>

            {/* Sort Order */}
            <Card className="p-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Sort order</Label>
                <Input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => handleInputChange("sortOrder", parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
            </Card>

            {/* Categories */}
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Categories</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input placeholder="Search c..." className="flex-1" />
                    <Button variant="outline" size="sm" onClick={selectAllCategories}>
                      Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={deselectAllCategories}>
                      Deselect All
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="rounded"
                      />
                      <Folder className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card className="p-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
