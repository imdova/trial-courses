"use client";

import { useState } from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
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
import { FAQ_CATEGORIES, FAQ } from "@/types/faq";
import { Paperclip, ImageIcon } from "lucide-react";

interface CreateFAQFormProps {
  onSubmit?: (data: { category: string; question: string; answer: string; status: string }) => void;
  initialData?: FAQ;
}

export default function CreateFAQForm({ onSubmit, initialData }: CreateFAQFormProps) {
  const [formData, setFormData] = useState({
    category: initialData?.category || "",
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    status: initialData?.status || "Draft",
  });

  const [activeLanguage, setActiveLanguage] = useState<"EN" | "AR">("EN");
  const [editorMode, setEditorMode] = useState<"Visual" | "HTML">("Visual");
  const [showEditor, setShowEditor] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {initialData ? "Edit FAQ" : "Create New FAQ"}
          </h1>
          <p className="text-gray-600 mt-2">
            {initialData
              ? "Update the frequently asked question"
              : "Add a new frequently asked question to your website"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category and Question Card */}
            <Card className="p-6">
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {FAQ_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Question */}
                <div>
                  <Label htmlFor="question" className="text-sm font-medium text-gray-700">
                    Question <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <Input
                        id="question"
                        placeholder="Enter the question"
                        value={formData.question}
                        onChange={(e) => handleInputChange("question", e.target.value)}
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
              </div>
            </Card>

            {/* Answer Card */}
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Answer</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm text-gray-600">Content (English)*</Label>
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
                        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-gray-50">
                          <Button type="button" variant="ghost" size="sm" className="font-bold">B</Button>
                          <Button type="button" variant="ghost" size="sm" className="italic">I</Button>
                          <Button type="button" variant="ghost" size="sm" className="underline">U</Button>
                          <div className="w-px h-6 bg-gray-300 mx-2" />
                          <Button type="button" variant="ghost" size="sm">•</Button>
                          <Button type="button" variant="ghost" size="sm">1.</Button>
                          <div className="w-px h-6 bg-gray-300 mx-2" />
                          <Button type="button" variant="ghost" size="sm">⬅</Button>
                          <Button type="button" variant="ghost" size="sm">⬆</Button>
                          <Button type="button" variant="ghost" size="sm">➡</Button>
                          <Button type="button" variant="ghost" size="sm">⬇</Button>
                          <div className="w-px h-6 bg-gray-300 mx-2" />
                          <Button type="button" variant="ghost" size="sm">❝</Button>
                          <Button type="button" variant="ghost" size="sm">{"</>"}</Button>
                          <div className="w-px h-6 bg-gray-300 mx-2" />
                          <Button type="button" variant="ghost" size="sm">🔗</Button>
                          <Button type="button" variant="ghost" size="sm">🔗̸</Button>
                          <Button type="button" variant="ghost" size="sm">↶</Button>
                          <Button type="button" variant="ghost" size="sm">↷</Button>
                          <div className="w-px h-6 bg-gray-300 mx-2" />
                          <Select>
                            <SelectTrigger className="w-24 h-8">
                              <SelectValue placeholder="Paragraph" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paragraph">Paragraph</SelectItem>
                              <SelectItem value="h1">Heading 1</SelectItem>
                              <SelectItem value="h2">Heading 2</SelectItem>
                              <SelectItem value="h3">Heading 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1">
                            <ImageIcon className="h-4 w-4" />
                            Add Media
                          </Button>
                        </div>

                        {/* Editor Content */}
                        <div className="p-4 min-h-[200px]">
                          <TextEditor
                            value={formData.answer}
                            onChange={(e) => handleInputChange("answer", e.target.value)}
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

            {/* Create/Update Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            >
              {initialData ? "Update FAQ" : "Create FAQ"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
