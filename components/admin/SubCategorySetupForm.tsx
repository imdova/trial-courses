"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Textarea } from "@/components/UI/textarea";
import { Card } from "@/components/UI/card";
import {
  Upload,
  Loader2,
  Image as ImageIcon,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import useFileUploader from "@/hooks/useFileUploader";
import { toast } from "@/components/UI/toast";
import { Badge } from "@/components/UI/badge";
import { Category } from "@/types";
import TextEditor from "@/components/editor/editor";
import { Separator } from "@/components/UI/separator";

interface FAQ {
  question: string;
  answer: string;
}

interface SubCategorySetupFormProps {
  categories?: Category[];
  onSubmit?: (data: {
    name: string;
    slug: string;
    description: string;
    image: string | null;
    parentId: string;
    icon?: string;
    priority?: number;
    headline?: string;
    richDescription?: string;
    faqs?: FAQ[];
    metaTitle?: string;
    metaKeywords?: string[];
    metaDescription?: string;
  }) => void;
  initialData?: {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
    parentId?: string;
    icon?: string;
    priority?: number;
    headline?: string;
    richDescription?: string;
    faqs?: FAQ[];
    metaTitle?: string;
    metaKeywords?: string[];
    metaDescription?: string;
  };
}

export default function SubCategorySetupForm({
  categories = [],
  onSubmit,
  initialData,
}: SubCategorySetupFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    parentId: initialData?.parentId || "",
    icon: initialData?.icon || "",
    priority: initialData?.priority || 1,
    headline: initialData?.headline || "",
    richDescription: initialData?.richDescription || "",
    faqs: initialData?.faqs || [],
    metaTitle: initialData?.metaTitle || "",
    metaKeywords: initialData?.metaKeywords || [],
    metaDescription: initialData?.metaDescription || "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData?.image || null,
  );
  const [uploading, setUploading] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  // Use file uploader hook with 5MB max size
  const { uploadFiles } = useFileUploader(5 * 1024 * 1024);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      image: formData.image || null,
      parentId: formData.parentId,
      icon: formData.icon || undefined,
      priority: formData.priority,
      headline: formData.headline || undefined,
      richDescription: formData.richDescription || undefined,
      faqs: formData.faqs.length > 0 ? formData.faqs : undefined,
      metaTitle: formData.metaTitle || undefined,
      metaKeywords:
        formData.metaKeywords.length > 0 ? formData.metaKeywords : undefined,
      metaDescription: formData.metaDescription || undefined,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "",
      parentId: "",
      icon: "",
      priority: 1,
      headline: "",
      richDescription: "",
      faqs: [],
      metaTitle: "",
      metaKeywords: [],
      metaDescription: "",
    });
    setCurrentKeyword("");
    setLogoPreview(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add keyword to metaKeywords array
  const handleAddKeyword = () => {
    const trimmedKeyword = currentKeyword.trim();
    if (trimmedKeyword && !formData.metaKeywords.includes(trimmedKeyword)) {
      setFormData((prev) => ({
        ...prev,
        metaKeywords: [...prev.metaKeywords, trimmedKeyword],
      }));
      setCurrentKeyword("");
    } else if (formData.metaKeywords.includes(trimmedKeyword)) {
      toast.error("This keyword already exists");
    }
  };

  // Remove keyword from metaKeywords array
  const handleRemoveKeyword = (keywordToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      metaKeywords: prev.metaKeywords.filter((kw) => kw !== keywordToRemove),
    }));
  };

  // Handle Enter key press in keyword input
  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  // FAQ management functions
  const addFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const updateFAQ = (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq,
      ),
    }));
  };

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    }));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const urls = await uploadFiles([file]);
      if (urls && urls.length > 0) {
        const uploadedUrl = urls[0];
        setFormData((prev) => ({ ...prev, image: uploadedUrl }));
        setLogoPreview(uploadedUrl);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image. Please try again.");
        setLogoPreview(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image. Please try again.");
      setLogoPreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Handle icon (SVG) file upload
  const handleIconFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - only SVG
    if (file.type !== "image/svg+xml") {
      toast.error("Invalid file type. Only SVG files are allowed.");
      return;
    }

    // Upload file
    setUploading(true);
    try {
      const urls = await uploadFiles([file]);
      if (urls && urls.length > 0) {
        const uploadedUrl = urls[0];
        setFormData((prev) => ({ ...prev, icon: uploadedUrl }));
        toast.success("Icon uploaded successfully!");
      } else {
        toast.error("Failed to upload icon. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading icon. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const urls = await uploadFiles([file]);
      if (urls && urls.length > 0) {
        const uploadedUrl = urls[0];
        setFormData((prev) => ({ ...prev, image: uploadedUrl }));
        setLogoPreview(uploadedUrl);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image. Please try again.");
        setLogoPreview(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image. Please try again.");
      setLogoPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Sub Category Setup
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column - Form Fields */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Sub Category Name <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  {formData.icon && (
                    <div className="flex items-center gap-1">
                      <Image
                        src={formData.icon}
                        alt="Sub Category icon"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, icon: "" }))}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => iconInputRef.current?.click()}
                    disabled={uploading}
                    className="h-7 gap-1 text-xs"
                  >
                    <Upload className="h-3 w-3" />
                    <span>{formData.icon ? "Change" : "Upload"} SVG</span>
                  </Button>
                  <input
                    ref={iconInputRef}
                    type="file"
                    accept="image/svg+xml"
                    onChange={handleIconFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
              <Input
                id="name"
                placeholder="Enter subcategory name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="slug"
                className="text-sm font-medium text-gray-700"
              >
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                placeholder="subcategory-slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                className="mt-2"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Auto-generated from name (editable)
              </p>
            </div>

            <div>
              <Label
                htmlFor="priority"
                className="text-sm font-medium text-gray-700"
              >
                Priority
              </Label>
              <Input
                id="priority"
                type="number"
                min="0"
                step="1"
                placeholder="Enter priority (0 or higher)"
                value={formData.priority}
                onChange={(e) => {
                  const value = e.target.value;
                  const numValue = value === '' ? 0 : Math.max(0, Math.floor(Number(value)));
                  handleInputChange("priority", String(numValue));
                }}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-gray-500">
                Optional: Display order for the subcategory (defaults to 0)
              </p>
            </div>

            <div>
              <Label
                htmlFor="parentId"
                className="text-sm font-medium text-gray-700"
              >
                Parent Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.parentId}
                onValueChange={(value) => handleInputChange("parentId", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose Parent Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Enter subcategory description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="mt-2"
                rows={4}
                required
              />
            </div>

            {/* FAQs Section */}
            <div className="col-span-1 lg:col-span-2">
              <div className="mb-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Frequently Asked Questions (Optional)
                    </h4>
                    <p className="text-xs text-gray-500">
                      Add common questions and answers about this subcategory
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {formData.faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder={`Question - ${index + 1}`}
                        value={faq.question}
                        onChange={(e) =>
                          updateFAQ(index, "question", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-destructive/10 text-destructive"
                        size="icon"
                        onClick={() => removeFAQ(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <TextEditor
                      value={faq.answer}
                      onChange={(e) =>
                        updateFAQ(index, "answer", e.target.value)
                      }
                      wrapperClassName="min-h-[120px]"
                      hasLinks
                    />
                    {index < formData.faqs.length - 1 && <Separator />}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-fit"
                  onClick={addFAQ}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add FAQ
                </Button>
              </div>
            </div>

            {/* SEO Meta Fields Section */}
            <div className="col-span-1 lg:col-span-2">
              <div className="mb-4 border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  SEO Meta Information (Optional)
                </h4>
                <p className="text-xs text-gray-500">
                  Improve search engine visibility for this subcategory
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="col-span-1 lg:col-span-2">
                  <Label
                    htmlFor="metaTitle"
                    className="text-sm font-medium text-gray-700"
                  >
                    Meta Title
                  </Label>
                  <Input
                    id="metaTitle"
                    placeholder="Enter meta title"
                    value={formData.metaTitle}
                    onChange={(e) =>
                      handleInputChange("metaTitle", e.target.value)
                    }
                    className="mt-2"
                    maxLength={60}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <Label
                    htmlFor="metaDescription"
                    className="text-sm font-medium text-gray-700"
                  >
                    Meta Description
                  </Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="Enter meta description for search engines"
                    value={formData.metaDescription}
                    onChange={(e) =>
                      handleInputChange("metaDescription", e.target.value)
                    }
                    className="mt-2"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: 150-160 characters
                  </p>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <Label
                    htmlFor="metaKeywords"
                    className="text-sm font-medium text-gray-700"
                  >
                    Meta Keywords
                  </Label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      id="metaKeywords"
                      placeholder="Enter a keyword"
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyPress={handleKeywordKeyPress}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddKeyword}
                      disabled={!currentKeyword.trim()}
                      size="icon"
                      variant="outline"
                      className="shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Display added keywords as badges */}
                  {formData.metaKeywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.metaKeywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1 px-3 py-1"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="hover:bg-destructive/20 ml-1 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="mt-1 text-xs text-gray-500">
                    Press Enter or click + to add a keyword
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Upload, Headline, and Rich Description */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Sub Category Image
              </Label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="mt-2 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-green-500"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-green-600" />
                    <p className="text-sm text-gray-600">Uploading image...</p>
                  </div>
                ) : logoPreview ? (
                  <div className="space-y-4">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center">
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded object-contain"
                      />
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleBrowseClick}
                        disabled={uploading}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Change
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setLogoPreview(null);
                          setFormData((prev) => ({ ...prev, image: "" }));
                        }}
                        disabled={uploading}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3" onClick={handleBrowseClick}>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Drag and drop an image here
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        or click to browse
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        JPEG, PNG, WebP • Max 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Headline Input */}
            <div>
              <Label
                htmlFor="headline"
                className="text-sm font-medium text-gray-700"
              >
                Sub Category Headline
              </Label>
              <Input
                id="headline"
                placeholder="Enter a catchy headline"
                value={formData.headline}
                onChange={(e) => handleInputChange("headline", e.target.value)}
                className="mt-2"
                maxLength={100}
              />
              <p className="mt-1 text-xs text-gray-500">
                Optional: A short, catchy headline for the subcategory
              </p>
            </div>

            {/* Rich Description Editor */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Rich Description
              </Label>
              <div className="mt-2">
                <TextEditor
                  value={formData.richDescription}
                  onChange={(e) =>
                    handleInputChange("richDescription", e.target.value)
                  }
                  wrapperClassName="min-h-[200px]"
                  hasLinks
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Optional: Add a detailed description with formatting
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="px-6"
            disabled={uploading}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-green-600 px-6 hover:bg-green-700"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Create Sub Category"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
