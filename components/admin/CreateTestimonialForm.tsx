/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { Label } from "@/components/UI/label";
import { Card } from "@/components/UI/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import TextEditor from "@/components/editor/editor";
import { Paperclip, Image, Grid, Link, Unlink, Undo, Redo } from "lucide-react";

interface CreateTestimonialFormProps {
  onSubmit?: (data: { 
    title: string; 
    description: string; 
    content: string; 
    status: string;
    customerName: string;
    rating: number;
  }) => void;
  initialData?: {
    title?: string;
    description?: string;
    content?: string;
    status?: string;
    customerName?: string;
    rating?: number;
  };
}

export default function CreateTestimonialForm({ onSubmit, initialData }: CreateTestimonialFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    status: initialData?.status || "Draft",
    customerName: initialData?.customerName || "",
    rating: initialData?.rating || 5,
  });

  const [activeLanguage, setActiveLanguage] = useState<"EN" | "AR">("EN");
  const [editorMode, setEditorMode] = useState<"Visual" | "HTML">("Visual");
  const [showEditor, setShowEditor] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {initialData ? "Edit Testimonial" : "Create New Testimonial"}
          </h1>
          <p className="text-gray-600 mt-2">
            {initialData 
              ? "Update the customer testimonial" 
              : "Add a new customer testimonial to your website"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <Card className="p-6">
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="title"
                      placeholder="Enter title in English"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant={activeLanguage === "EN" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveLanguage("EN")}
                        className={activeLanguage === "EN" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        EN
                      </Button>
                      <Button
                        type="button"
                        variant={activeLanguage === "AR" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveLanguage("AR")}
                        className={activeLanguage === "AR" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        AR
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">EN: X AR: X</p>
                </div>
              </div>
            </Card>

            {/* Description Card */}
            <Card className="p-6">
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Textarea
                      id="description"
                      placeholder="Enter description in English"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="flex-1"
                      rows={3}
                    />
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant={activeLanguage === "EN" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveLanguage("EN")}
                        className={activeLanguage === "EN" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        EN
                      </Button>
                      <Button
                        type="button"
                        variant={activeLanguage === "AR" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveLanguage("AR")}
                        className={activeLanguage === "AR" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        AR
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">EN: X AR: X</p>
                </div>
              </div>
            </Card>

            {/* Content Card */}
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Content (English)*</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant={activeLanguage === "EN" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveLanguage("EN")}
                          className={activeLanguage === "EN" ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          EN
                        </Button>
                        <Button
                          type="button"
                          variant={activeLanguage === "AR" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveLanguage("AR")}
                          className={activeLanguage === "AR" ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          AR
                        </Button>
                      </div>
                    </div>

                    {/* Editor Controls */}
                    <div className="flex items-center justify-between mb-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowEditor(!showEditor)}
                        className="flex items-center gap-2"
                      >
                        <Paperclip className="h-4 w-4" />
                        {showEditor ? "Hide Editor" : "Show Editor"}
                      </Button>
                      
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant={editorMode === "Visual" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setEditorMode("Visual")}
                          className={editorMode === "Visual" ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          Visual
                        </Button>
                        <Button
                          type="button"
                          variant={editorMode === "HTML" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setEditorMode("HTML")}
                          className={editorMode === "HTML" ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          HTML
                        </Button>
                      </div>
                    </div>

                    {/* Rich Text Editor */}
                    {showEditor && (
                      <div className="border border-gray-200 rounded-md">
                        {/* Toolbar */}
                        <div className="flex items-center gap-1 p-3 border-b border-gray-200 bg-gray-50">
                          {/* Text Formatting */}
                          <Button type="button" variant="ghost" size="sm" className="font-bold text-black hover:bg-gray-200">B</Button>
                          <Button type="button" variant="ghost" size="sm" className="italic text-black hover:bg-gray-200">I</Button>
                          <Button type="button" variant="ghost" size="sm" className="underline text-black hover:bg-gray-200">U</Button>
                          
                          {/* Lists */}
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">•</Button>
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">1.</Button>
                          
                          {/* Indentation */}
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">←</Button>
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">↑</Button>
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">→</Button>
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">↓</Button>
                          
                          {/* Special Formatting */}
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">❝</Button>
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">{"</>"}</Button>
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">
                            <Grid className="h-4 w-4" />
                          </Button>
                          
                          {/* Links */}
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">
                            <Link className="h-4 w-4" />
                          </Button>
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">
                            <Unlink className="h-4 w-4" />
                          </Button>
                          
                          {/* Undo/Redo */}
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">
                            <Undo className="h-4 w-4" />
                          </Button>
                          <Button type="button" variant="ghost" size="sm" className="text-black hover:bg-gray-200">
                            <Redo className="h-4 w-4" />
                          </Button>
                          
                          {/* Add Media Button */}
                          {/* <Button type="button" variant="outline" size="sm" className="ml-auto flex items-center gap-1 text-gray-600 border-gray-300 hover:bg-gray-100">
                            <Image className="h-4 w-4" />
                            Add Media
                          </Button> */}
                        </div>
                        
                        {/* Editor Content */}
                        <div className="p-4 min-h-[200px]">
                          <TextEditor
                            value={formData.content}
                            onChange={(e) => handleInputChange("content", e.target.value)}
                            className="min-h-[150px]"
                          />
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-1">EN: X AR: X</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="p-6">
              <div>
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status
                </Label>
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

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
