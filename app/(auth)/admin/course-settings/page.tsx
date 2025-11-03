"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import CategorySetupForm from "@/components/admin/CategorySetupForm";
import CategoriesTable from "@/components/admin/CategoriesTable";
import CategoryEditModal from "@/components/admin/CategoryEditModal";
import SubCategorySetupForm from "@/components/admin/SubCategorySetupForm";
import SubCategoryEditModal from "@/components/admin/SubCategoryEditModal";
import SubCategoriesTable from "@/components/admin/SubCategoriesTable";
import AttributesTable from "@/components/admin/AttributesTable";
import TagSetupForm from "@/components/admin/TagSetupForm";
import TagsTable, { Tag } from "@/components/admin/TagsTable";
import TagEditModal from "@/components/admin/TagEditModal";
import CourseVariableForm from "@/components/admin/CourseVariableForm";
import CourseVariableTable, { CourseVariable } from "@/components/admin/CourseVariableTable";
import CourseVariableEditModal from "@/components/admin/CourseVariableEditModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";
import { MOCK_ATTRIBUTES } from "@/types/category";
import { Attribute } from "@/types/category";
import { Category } from "@/types";
import { useCoursesCategories } from "@/hooks/useCoursesCategories";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Plus, Download } from "lucide-react";

interface ExtendedCategory extends Category {
  icon?: string;
  headline?: string;
  richDescription?: string;
  faqs?: Array<{ question: string; answer: string }>;
  metaTitle?: string;
  metaKeywords?: string[];
  metaDescription?: string;
}

export default function CourseSettingsPage() {
  const [activeTab, setActiveTab] = useState("categories");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  
  // Subcategory states
  const [subEditModalOpen, setSubEditModalOpen] = useState(false);
  const [subDeleteDialogOpen, setSubDeleteDialogOpen] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState<Category | null>(null);
  const [subDeleteConfirmText, setSubDeleteConfirmText] = useState("");
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [subCategoryToEdit, setSubCategoryToEdit] = useState<Category | null>(null);
  
  // Tags states
  const [tags, setTags] = useState<Tag[]>([
    {
      id: "1",
      name: "Advanced",
      slug: "advanced",
      description: "Advanced level courses",
      color: "#3B82F6",
      isActive: true,
      coursesCount: 12,
    },
    {
      id: "2",
      name: "Beginner Friendly",
      slug: "beginner-friendly",
      description: "Perfect for beginners",
      color: "#10B981",
      isActive: true,
      coursesCount: 25,
    },
    {
      id: "3",
      name: "Certification",
      slug: "certification",
      description: "Includes certification",
      color: "#F59E0B",
      isActive: true,
      coursesCount: 8,
    },
  ]);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [tagEditModalOpen, setTagEditModalOpen] = useState(false);
  const [tagDeleteDialogOpen, setTagDeleteDialogOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const [tagDeleteConfirmText, setTagDeleteConfirmText] = useState("");
  
  // Course Variables states
  const [courseVariables, setCourseVariables] = useState<CourseVariable[]>([
    { id: "1", name: "Recorded", value: "recorded", type: "courseType", priority: 1, isActive: true },
    { id: "2", name: "Live", value: "live", type: "courseType", priority: 2, isActive: true },
    { id: "3", name: "Offline", value: "offline", type: "courseType", priority: 3, isActive: true },
    { id: "4", name: "Hybrid", value: "hybrid", type: "courseType", priority: 4, isActive: true },
    { id: "5", name: "Course", value: "course", type: "programType", priority: 1, isActive: true },
    { id: "6", name: "Certificate of Achievement", value: "certificate_of_achievement", type: "programType", priority: 2, isActive: true },
    { id: "7", name: "Professional Diploma", value: "professional_diploma", type: "programType", priority: 3, isActive: true },
    { id: "8", name: "Master", value: "master", type: "programType", priority: 4, isActive: true },
    { id: "9", name: "Doctorate", value: "doctorate", type: "programType", priority: 5, isActive: true },
    { id: "10", name: "USD", value: "usd", type: "currency", priority: 1, isActive: true },
    { id: "11", name: "EUR", value: "eur", type: "currency", priority: 2, isActive: true },
    { id: "12", name: "GBP", value: "gbp", type: "currency", priority: 3, isActive: true },
    { id: "13", name: "EGP", value: "egp", type: "currency", priority: 4, isActive: true },
    { id: "14", name: "English", value: "english", type: "language", priority: 1, isActive: true },
    { id: "15", name: "Arabic", value: "arabic", type: "language", priority: 2, isActive: true },
    { id: "16", name: "French", value: "french", type: "language", priority: 3, isActive: true },
    { id: "17", name: "Spanish", value: "spanish", type: "language", priority: 4, isActive: true },
    { id: "18", name: "Beginner", value: "beginner", type: "courseLevel", priority: 1, isActive: true },
    { id: "19", name: "Intermediate", value: "intermediate", type: "courseLevel", priority: 2, isActive: true },
    { id: "20", name: "Advanced", value: "advanced", type: "courseLevel", priority: 3, isActive: true },
    { id: "21", name: "Expert", value: "expert", type: "courseLevel", priority: 4, isActive: true },
  ]);
  const [selectedVariable, setSelectedVariable] = useState<CourseVariable | null>(null);
  const [variableEditModalOpen, setVariableEditModalOpen] = useState(false);
  const [variableDeleteDialogOpen, setVariableDeleteDialogOpen] = useState(false);
  const [variableToDelete, setVariableToDelete] = useState<CourseVariable | null>(null);
  const [variableDeleteConfirmText, setVariableDeleteConfirmText] = useState("");
  
  const { 
    categories, 
    subcategories,
    selectedCategory, 
    loading,
    getCategoryById,
    updateCategoryById,
    createNewCategory,
    deleteCategoryById
  } = useCoursesCategories();

  const handleCategorySubmit = async (data: {
    name: string;
    slug: string;
    description: string;
    image: string | null;
    icon?: string;
    priority?: number;
    headline?: string;
    richDescription?: string;
    faqs?: Array<{ question: string; answer: string }>;
    metaTitle?: string;
    metaKeywords?: string[];
    metaDescription?: string;
  }) => {
    // Validate and convert priority to integer
    const priority = data.priority !== undefined && data.priority !== null && !isNaN(Number(data.priority))
      ? Math.max(0, Math.floor(Number(data.priority)))
      : 0;

    if (categoryToEdit) {
      // Update existing category
      await updateCategoryById(categoryToEdit.id, {
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        icon: data.icon,
        priority: priority,
        headline: data.headline,
        richDescription: data.richDescription,
        faqs: data.faqs,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
      } as Partial<Category>);
      setCategoryToEdit(null);
    } else {
      // Create new category
      await createNewCategory({
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        icon: data.icon,
        priority: priority,
        headline: data.headline,
        richDescription: data.richDescription,
        faqs: data.faqs,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
      } as Partial<Category>);
    }
    setShowCategoryForm(false);
  };

  const handleEditCategory = async (category: Category) => {
    await getCategoryById(category.id);
    setEditModalOpen(true);
  };

  const handleFullEditCategory = async (category: Category) => {
    await getCategoryById(category.id);
    setCategoryToEdit(category);
    setShowCategoryForm(true);
  };

  const handleEditModalSubmit = async (data: {
    name: string;
    slug: string;
    description: string;
    image: string | null;
    icon?: string;
    priority?: number;
    headline?: string;
    richDescription?: string;
    faqs?: Array<{ question: string; answer: string }>;
    metaTitle?: string;
    metaKeywords?: string[];
    metaDescription?: string;
  }) => {
    if (!selectedCategory) return;
    
    // Validate and convert priority to integer
    const priority = data.priority !== undefined && data.priority !== null && !isNaN(Number(data.priority))
      ? Math.max(0, Math.floor(Number(data.priority)))
      : 0;
    
    await updateCategoryById(selectedCategory.id, {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image,
      icon: data.icon,
      priority: priority,
      headline: data.headline,
      richDescription: data.richDescription,
      faqs: data.faqs,
      metaTitle: data.metaTitle,
      metaKeywords: data.metaKeywords,
      metaDescription: data.metaDescription,
    } as Partial<Category>);
    
    setEditModalOpen(false);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    
    await deleteCategoryById(categoryToDelete.id);
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
    setDeleteConfirmText("");
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
    setDeleteConfirmText("");
  };

  const handleToggleStatus = async (category: Category) => {
    await updateCategoryById(category.id, {
      isActive: !(category.isActive ?? true),
    });
  };

  const handleCategoryReorder = async (reorderedCategories: Category[]) => {
    try {
      // Update each category's priority in the backend
      await Promise.all(
        reorderedCategories.map((category) =>
          updateCategoryById(category.id, {
            priority: category.priority,
          })
        )
      );
      
      // Categories will be automatically refreshed from Redux store after updates
    } catch (error) {
      console.error("Failed to reorder categories:", error);
    }
  };

  const handleSubCategorySubmit = async (data: {
    name: string;
    slug: string;
    description: string;
    image: string | null;
    parentId: string;
    icon?: string;
    priority?: number;
    headline?: string;
    richDescription?: string;
    faqs?: Array<{ question: string; answer: string }>;
    metaTitle?: string;
    metaKeywords?: string[];
    metaDescription?: string;
  }) => {
    // Validate and convert priority to integer
    const priority = data.priority !== undefined && data.priority !== null && !isNaN(Number(data.priority))
      ? Math.max(0, Math.floor(Number(data.priority)))
      : 0;

    if (subCategoryToEdit) {
      // Update existing subcategory
      await updateCategoryById(subCategoryToEdit.id, {
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        parentId: data.parentId,
        icon: data.icon,
        priority: priority,
        headline: data.headline,
        richDescription: data.richDescription,
        faqs: data.faqs,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
      } as Partial<Category> & { parentId: string });
      setSubCategoryToEdit(null);
    } else {
      // Create new subcategory
      await createNewCategory({
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        parentId: data.parentId,
        icon: data.icon,
        priority: priority,
        headline: data.headline,
        richDescription: data.richDescription,
        faqs: data.faqs,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
      } as Partial<Category> & { parentId: string });
    }
    setShowSubCategoryForm(false);
  };

  const handleEditSubCategory = async (subCategory: Category) => {
    await getCategoryById(subCategory.id);
    setSubEditModalOpen(true);
  };

  const handleFullEditSubCategory = async (subCategory: Category) => {
    await getCategoryById(subCategory.id);
    setSubCategoryToEdit(subCategory);
    setShowSubCategoryForm(true);
  };

  const handleSubEditModalSubmit = async (data: {
    name: string;
    slug: string;
    description: string;
    image: string | null;
    parentId: string;
    icon?: string;
    priority?: number;
    headline?: string;
    richDescription?: string;
    faqs?: Array<{ question: string; answer: string }>;
    metaTitle?: string;
    metaKeywords?: string[];
    metaDescription?: string;
  }) => {
    if (!selectedCategory) return;
    
    // Validate and convert priority to integer
    const priority = data.priority !== undefined && data.priority !== null && !isNaN(Number(data.priority))
      ? Math.max(0, Math.floor(Number(data.priority)))
      : 0;
    
    await updateCategoryById(selectedCategory.id, {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image,
      parentId: data.parentId,
      icon: data.icon,
      priority: priority,
      headline: data.headline,
      richDescription: data.richDescription,
      faqs: data.faqs,
      metaTitle: data.metaTitle,
      metaKeywords: data.metaKeywords,
      metaDescription: data.metaDescription,
    } as Partial<Category> & { parentId: string });
    
    setSubEditModalOpen(false);
  };

  const handleDeleteSubCategory = (subCategory: Category) => {
    setSubCategoryToDelete(subCategory);
    setSubDeleteDialogOpen(true);
  };

  const handleConfirmSubDelete = async () => {
    if (!subCategoryToDelete) return;
    
    await deleteCategoryById(subCategoryToDelete.id);
    setSubDeleteDialogOpen(false);
    setSubCategoryToDelete(null);
    setSubDeleteConfirmText("");
  };

  const handleCancelSubDelete = () => {
    setSubDeleteDialogOpen(false);
    setSubCategoryToDelete(null);
    setSubDeleteConfirmText("");
  };

  const handleToggleSubCategoryStatus = async (subCategory: Category) => {
    await updateCategoryById(subCategory.id, {
      isActive: !(subCategory.isActive ?? true),
      parentId: subCategory.parent?.id,
    });
  };

  const handleSubCategoryReorder = async (reorderedSubcategories: Category[]) => {
    try {
      // Update each subcategory's priority in the backend
      await Promise.all(
        reorderedSubcategories.map((subcategory) =>
          updateCategoryById(subcategory.id, {
            priority: subcategory.priority,
            parentId: subcategory.parent?.id,
          })
        )
      );
      
      // Subcategories will be automatically refreshed from Redux store after updates
    } catch (error) {
      console.error("Failed to reorder subcategories:", error);
    }
  };

  const handleDeleteAttribute = (attribute: Attribute) => {
    console.log("Delete attribute:", attribute);
    // TODO: Implement delete attribute functionality
  };

  // Tag handlers
  const handleTagSubmit = (data: { name: string; slug: string; description: string; color: string }) => {
    const newTag: Tag = {
      id: Date.now().toString(),
      ...data,
      isActive: true,
      coursesCount: 0,
    };
    setTags([...tags, newTag]);
  };

  const handleEditTag = (tag: Tag) => {
    setSelectedTag(tag);
    setTagEditModalOpen(true);
  };

  const handleTagEditModalSubmit = (data: { name: string; slug: string; description: string; color: string }) => {
    if (!selectedTag) return;
    
    setTags(tags.map(tag => 
      tag.id === selectedTag.id 
        ? { ...tag, ...data }
        : tag
    ));
    
    setTagEditModalOpen(false);
    setSelectedTag(null);
  };

  const handleDeleteTag = (tag: Tag) => {
    setTagToDelete(tag);
    setTagDeleteDialogOpen(true);
  };

  const handleConfirmTagDelete = () => {
    if (!tagToDelete) return;
    
    setTags(tags.filter(tag => tag.id !== tagToDelete.id));
    setTagDeleteDialogOpen(false);
    setTagToDelete(null);
    setTagDeleteConfirmText("");
  };

  const handleCancelTagDelete = () => {
    setTagDeleteDialogOpen(false);
    setTagToDelete(null);
    setTagDeleteConfirmText("");
  };

  const handleToggleTagStatus = (tag: Tag) => {
    setTags(tags.map(t => 
      t.id === tag.id 
        ? { ...t, isActive: !t.isActive }
        : t
    ));
  };

  // Course Variable handlers
  const handleVariableSubmit = (data: { 
    name: string; 
    value: string; 
    type: "courseType" | "programType" | "currency" | "language" | "courseLevel";
    priority: number;
  }) => {
    const newVariable: CourseVariable = {
      id: Date.now().toString(),
      ...data,
      isActive: true,
    };
    setCourseVariables([...courseVariables, newVariable]);
  };

  const handleEditVariable = (variable: CourseVariable) => {
    setSelectedVariable(variable);
    setVariableEditModalOpen(true);
  };

  const handleVariableEditModalSubmit = (data: {
    name: string;
    value: string;
    type: "courseType" | "programType" | "currency" | "language" | "courseLevel";
    priority: number;
  }) => {
    if (!selectedVariable) return;
    
    setCourseVariables(courseVariables.map(v => 
      v.id === selectedVariable.id 
        ? { ...v, ...data }
        : v
    ));
    
    setVariableEditModalOpen(false);
    setSelectedVariable(null);
  };

  const handleDeleteVariable = (variable: CourseVariable) => {
    setVariableToDelete(variable);
    setVariableDeleteDialogOpen(true);
  };

  const handleConfirmVariableDelete = () => {
    if (!variableToDelete) return;
    
    setCourseVariables(courseVariables.filter(v => v.id !== variableToDelete.id));
    setVariableDeleteDialogOpen(false);
    setVariableToDelete(null);
    setVariableDeleteConfirmText("");
  };

  const handleCancelVariableDelete = () => {
    setVariableDeleteDialogOpen(false);
    setVariableToDelete(null);
    setVariableDeleteConfirmText("");
  };

  const handleToggleVariableStatus = (variable: CourseVariable) => {
    setCourseVariables(courseVariables.map(v => 
      v.id === variable.id 
        ? { ...v, isActive: !v.isActive }
        : v
    ));
  };

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Card className="flex w-full items-center justify-between gap-3 space-y-0 p-0">  
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="subcategories">Sub Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="course-variables">Course Variables</TabsTrigger>
        </TabsList>
        </Card>
        <TabsContent value="categories" className="space-y-6">
          {showCategoryForm ? (
            <>
              {/* Category Setup Form */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {categoryToEdit ? "Edit Category" : "Add New Category"}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCategoryForm(false);
                    setCategoryToEdit(null);
                  }}
                >
                  Back to Categories
                </Button>
              </div>
              <CategorySetupForm 
                onSubmit={handleCategorySubmit}
                initialData={categoryToEdit ? {
                  name: categoryToEdit.name,
                  slug: categoryToEdit.slug,
                  description: categoryToEdit.description || "",
                  image: categoryToEdit.image || "",
                  icon: (categoryToEdit as ExtendedCategory).icon || "",
                  priority: categoryToEdit.priority || 1,
                  headline: (categoryToEdit as ExtendedCategory).headline || "",
                  richDescription: (categoryToEdit as ExtendedCategory).richDescription || "",
                  faqs: (categoryToEdit as ExtendedCategory).faqs || [],
                  metaTitle: (categoryToEdit as ExtendedCategory).metaTitle || "",
                  metaKeywords: (categoryToEdit as ExtendedCategory).metaKeywords || [],
                  metaDescription: (categoryToEdit as ExtendedCategory).metaDescription || "",
                } : undefined}
              />
            </>
          ) : (
            <>
              {/* Action Buttons */}
              <div className="mb-4 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    // TODO: Implement download functionality
                    console.log("Download categories");
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  onClick={() => setShowCategoryForm(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New
                </Button>
              </div>

              {/* Categories Table */}
              <CategoriesTable
                categories={categories}
                onEdit={handleEditCategory}
                onFullEdit={handleFullEditCategory}
                onDelete={handleDeleteCategory}
                onToggleStatus={handleToggleStatus}
                onReorder={handleCategoryReorder}
              />
            </>
          )}

          {/* Category Edit Modal */}
          <CategoryEditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            category={selectedCategory}
            loading={loading}
            onSubmit={handleEditModalSubmit}
          />

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the category{" "}
                  <span className="font-semibold">&quot;{categoryToDelete?.name}&quot;</span>?
                  This action cannot be undone and will permanently remove the
                  category from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-700 mb-2">
                  Type <span className="font-bold text-red-600">DELETE</span> to confirm this action:
                </p>
                <Input
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="font-mono"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancelDelete} disabled={loading}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmDelete}
                  disabled={loading || deleteConfirmText !== "DELETE"}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {loading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        <TabsContent value="subcategories" className="space-y-6">
          {showSubCategoryForm ? (
            <>
              {/* Sub Category Setup Form */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {subCategoryToEdit ? "Edit Sub Category" : "Add New Sub Category"}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSubCategoryForm(false);
                    setSubCategoryToEdit(null);
                  }}
                >
                  Back to Sub Categories
                </Button>
              </div>
              <SubCategorySetupForm 
                categories={categories}
                onSubmit={handleSubCategorySubmit}
                initialData={subCategoryToEdit ? {
                  name: subCategoryToEdit.name,
                  slug: subCategoryToEdit.slug,
                  description: subCategoryToEdit.description || "",
                  image: subCategoryToEdit.image || "",
                  parentId: subCategoryToEdit.parent?.id || "",
                  icon: (subCategoryToEdit as ExtendedCategory).icon || "",
                  priority: subCategoryToEdit.priority || 1,
                  headline: (subCategoryToEdit as ExtendedCategory).headline || "",
                  richDescription: (subCategoryToEdit as ExtendedCategory).richDescription || "",
                  faqs: (subCategoryToEdit as ExtendedCategory).faqs || [],
                  metaTitle: (subCategoryToEdit as ExtendedCategory).metaTitle || "",
                  metaKeywords: (subCategoryToEdit as ExtendedCategory).metaKeywords || [],
                  metaDescription: (subCategoryToEdit as ExtendedCategory).metaDescription || "",
                } : undefined}
              />
            </>
          ) : (
            <>
              {/* Add New Button */}
              <div className="mb-4 flex items-center justify-end">
                <Button
                  onClick={() => setShowSubCategoryForm(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New
                </Button>
              </div>

              {/* Sub Categories Table */}
              <SubCategoriesTable
                subcategories={subcategories}
                onEdit={handleEditSubCategory}
                onFullEdit={handleFullEditSubCategory}
                onDelete={handleDeleteSubCategory}
                onToggleStatus={handleToggleSubCategoryStatus}
                onReorder={handleSubCategoryReorder}
              />
            </>
          )}

          {/* Sub Category Edit Modal */}
          <SubCategoryEditModal
            open={subEditModalOpen}
            onOpenChange={setSubEditModalOpen}
            category={selectedCategory}
            categories={categories}
            loading={loading}
            onSubmit={handleSubEditModalSubmit}
          />

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={subDeleteDialogOpen} onOpenChange={setSubDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Sub Category</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the subcategory{" "}
                  <span className="font-semibold">&quot;{subCategoryToDelete?.name}&quot;</span>?
                  This action cannot be undone and will permanently remove the
                  subcategory from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-700 mb-2">
                  Type <span className="font-bold text-red-600">DELETE</span> to confirm this action:
                </p>
                <Input
                  value={subDeleteConfirmText}
                  onChange={(e) => setSubDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="font-mono"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancelSubDelete} disabled={loading}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmSubDelete}
                  disabled={loading || subDeleteConfirmText !== "DELETE"}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {loading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          {/* Tag Setup Form */}
          <TagSetupForm 
            onSubmit={handleTagSubmit} 
            onExcelUpload={(file) => {
              console.log("Tags Excel upload:", file);
              // TODO: Implement Excel file parsing and bulk tags creation
            }}
          />

          {/* Tags Table */}
          <TagsTable
            tags={tags}
            onEdit={handleEditTag}
            onDelete={handleDeleteTag}
            onToggleStatus={handleToggleTagStatus}
          />

          {/* Tag Edit Modal */}
          <TagEditModal
            open={tagEditModalOpen}
            onOpenChange={setTagEditModalOpen}
            tag={selectedTag}
            loading={loading}
            onSubmit={handleTagEditModalSubmit}
          />

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={tagDeleteDialogOpen} onOpenChange={setTagDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Tag</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the tag{" "}
                  <span className="font-semibold">&quot;{tagToDelete?.name}&quot;</span>?
                  This action cannot be undone and will remove the tag from all associated courses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-700 mb-2">
                  Type <span className="font-bold text-red-600">DELETE</span> to confirm this action:
                </p>
                <Input
                  value={tagDeleteConfirmText}
                  onChange={(e) => setTagDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="font-mono"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancelTagDelete} disabled={loading}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmTagDelete}
                  disabled={loading || tagDeleteConfirmText !== "DELETE"}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {loading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        <TabsContent value="course-variables" className="space-y-6">
          {/* Course Variable Setup Form */}
          <CourseVariableForm onSubmit={handleVariableSubmit} />

          {/* Course Variables Table */}
          <CourseVariableTable
            variables={courseVariables}
            onEdit={handleEditVariable}
            onDelete={handleDeleteVariable}
            onToggleStatus={handleToggleVariableStatus}
          />

          {/* Variable Edit Modal */}
          <CourseVariableEditModal
            open={variableEditModalOpen}
            onOpenChange={setVariableEditModalOpen}
            variable={selectedVariable}
            loading={loading}
            onSubmit={handleVariableEditModalSubmit}
          />

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={variableDeleteDialogOpen} onOpenChange={setVariableDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Course Variable</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the{" "}
                  {variableToDelete?.type === "courseType" ? "course type" : 
                   variableToDelete?.type === "programType" ? "program type" :
                   variableToDelete?.type === "currency" ? "currency" :
                   variableToDelete?.type === "language" ? "language" :
                   variableToDelete?.type === "courseLevel" ? "course level" :
                   "variable"}{" "}
                  <span className="font-semibold">&quot;{variableToDelete?.name}&quot;</span>?
                  This action cannot be undone and may affect existing courses using this variable.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-700 mb-2">
                  Type <span className="font-bold text-red-600">DELETE</span> to confirm this action:
                </p>
                <Input
                  value={variableDeleteConfirmText}
                  onChange={(e) => setVariableDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="font-mono"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancelVariableDelete} disabled={loading}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmVariableDelete}
                  disabled={loading || variableDeleteConfirmText !== "DELETE"}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {loading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        <TabsContent value="attributes" className="space-y-6">
          <AttributesTable
            attributes={MOCK_ATTRIBUTES}
            onDelete={handleDeleteAttribute}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
