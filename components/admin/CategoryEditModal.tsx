"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Textarea } from "@/components/UI/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Loader2, Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { Category } from "@/types";
import useFileUploader from "@/hooks/useFileUploader";
import { toast } from "@/components/UI/toast";
import { Badge } from "@/components/UI/badge";

interface FAQ {
  question: string;
  answer: string;
}

interface ExtendedCategory extends Category {
  headline?: string;
  richDescription?: string;
  faqs?: FAQ[];
  metaTitle?: string;
  metaKeywords?: string[];
  metaDescription?: string;
}

interface CategoryEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  loading?: boolean;
  onSubmit?: (data: {
    name: string;
    slug: string;
    description: string;
    image: string | null;
    icon?: string;
    priority?: number;
    headline?: string;
    richDescription?: string;
    faqs?: FAQ[];
    metaTitle?: string;
    metaKeywords?: string[];
    metaDescription?: string;
  }) => void;
}

export default function CategoryEditModal({
  open,
  onOpenChange,
  category,
  loading,
  onSubmit,
}: CategoryEditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    icon: "",
    priority: 1,
    headline: "",
    richDescription: "",
    faqs: [] as FAQ[],
    metaTitle: "",
    metaKeywords: [] as string[],
    metaDescription: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  
  // Use file uploader hook with 5MB max size for category images
  const { uploadFiles } = useFileUploader(5 * 1024 * 1024);

  useEffect(() => {
    if (category) {
      const extendedCategory = category as ExtendedCategory & { icon?: string };
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        image: category.image || "",
        icon: extendedCategory.icon || "",
        priority: category.priority || 1,
        headline: extendedCategory.headline || "",
        richDescription: extendedCategory.richDescription || "",
        faqs: extendedCategory.faqs || [],
        metaTitle: extendedCategory.metaTitle || "",
        metaKeywords: extendedCategory.metaKeywords || [],
        metaDescription: extendedCategory.metaDescription || "",
      });
      setLogoPreview(category.image);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      image: formData.image || null,
      icon: formData.icon || undefined,
      priority: formData.priority,
      headline: formData.headline || undefined,
      richDescription: formData.richDescription || undefined,
      faqs: formData.faqs.length > 0 ? formData.faqs : undefined,
      metaTitle: formData.metaTitle || undefined,
      metaKeywords: formData.metaKeywords.length > 0 ? formData.metaKeywords : undefined,
      metaDescription: formData.metaDescription || undefined,
    });
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

  // FAQ management functions (not used in quick edit modal)
  // const addFAQ = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     faqs: [...prev.faqs, { question: "", answer: "" }],
  //   }));
  // };

  // const removeFAQ = (index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     faqs: prev.faqs.filter((_, i) => i !== index),
  //   }));
  // };

  // const updateFAQ = (index: number, field: "question" | "answer", value: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     faqs: prev.faqs.map((faq, i) =>
  //       i === index ? { ...faq, [field]: value } : faq
  //     ),
  //   }));
  // };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG, PNG, and WebP images are allowed.");
      return;
    }

    // Create preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
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

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG, PNG, and WebP images are allowed.");
      return;
    }

    // Create preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Category Name and Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                placeholder="category-slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                required
                className="h-10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Enter category description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* Icon Upload */}
          <div className="space-y-2">
            <Label>Category Icon (SVG)</Label>
            <div className="flex items-center gap-2">
              {formData.icon && (
                <div className="flex items-center gap-1">
                  <Image
                    src={formData.icon}
                    alt="Category icon"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, icon: "" }))}
                    className="h-7 w-7 p-0"
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
                className="h-8 gap-1 text-xs"
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

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">
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
              className="h-10"
            />
          </div>

          {/* SEO Meta Fields Section (Collapsed) */}
          <div className="space-y-2 border-t pt-4 hidden">
            <h4 className="text-sm font-semibold text-gray-900">
              SEO Meta Information (Optional)
            </h4>
            <p className="text-xs text-gray-500">
              Improve search engine visibility for this category
            </p>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <Label htmlFor="metaTitle">
                  Meta Title
                </Label>
                <Input
                  id="metaTitle"
                  placeholder="Enter meta title"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                  className="mt-2"
                  maxLength={60}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Recommended: 50-60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription">
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Enter meta description for search engines"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  className="mt-2"
                  rows={3}
                  maxLength={160}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Recommended: 150-160 characters
                </p>
              </div>

              <div>
                <Label htmlFor="metaKeywords">
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
                          className="ml-1 rounded-full hover:bg-destructive/20"
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

          {/* Logo Upload Area */}
          <div className="space-y-2">
            <Label>Category Image</Label>
            
            {/* Hidden file input */}
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
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
                  <p className="text-gray-600">Uploading image...</p>
                </div>
              ) : logoPreview ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-32 h-32">
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleBrowseClick}
                      disabled={uploading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Change Image
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
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium mb-1">
                      Drag and drop an image here
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                      or click to browse (JPEG, PNG, WebP - Max 5MB)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleBrowseClick}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Browse Files
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading || uploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={loading || uploading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Update Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

