import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SupCategory, Category } from "@/types";
import { 
  fetchCoursesCategories, 
  fetchCategoryById,
  updateCategory,
  createCategory,
  deleteCategory
} from "@/store/slices/courses-categories.slice";

export const useCoursesCategories = (id?: string) => {
  const [subCategories, setSubCategories] = useState<SupCategory[]>([]);
  const { data: session } = useSession();
  const user = session?.user;
  const dispatch = useAppDispatch();
  const { data, selectedCategory, fetchingCategory, loading } = useAppSelector(
    (state) => state.coursesCategories
  );

  const categories = data.filter((category) => category.parent === null);
  const subcategories = data.filter((category) => category.parent !== null);
 
  useEffect(() => {
    if (!user) return;
    dispatch(fetchCoursesCategories(user));
  }, [dispatch, user]);

  useEffect(() => {
    if (!id) return;
    setSubCategories(
      data.find((category) => category.id === id)?.subcategories || [],
    );
  }, [id, data]);



  const getCategoryById = async (categoryId: string) => {
    if (!user) return;
    return dispatch(fetchCategoryById({ id: categoryId, user }));
  };

  const updateCategoryById = async (categoryId: string, updates: Partial<Category> & { parentId?: string }) => {
    if (!user) return;
    return dispatch(updateCategory({ id: categoryId, updates, user }));
  };

  const createNewCategory = async (category: Partial<Category>) => {
    if (!user) return;
    return dispatch(createCategory({ ...category, user }));
  };

  const deleteCategoryById = async (categoryId: string) => {
    if (!user) return;
    return dispatch(deleteCategory({ id: categoryId, user }));
  };

  return {
    categories,
    subcategories,
    subCategories,
    selectedCategory,
    fetchingCategory,
    loading,
    getCategoryById,
    updateCategoryById,
    createNewCategory,
    deleteCategoryById,
  };
};
