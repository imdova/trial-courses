export interface Category {
  id: string;
  name: string;
  nameArabic: string;
  priority: number;
  logo: string;
  products: number;
  orders: number;
  totalSales: string;
  status: boolean;
  createdAt: string;
}

export const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    nameArabic: 'إلكترونيات',
    priority: 1,
    logo: '/images/electronics.png',
    products: 450,
    orders: 500,
    totalSales: '150K EGP',
    status: true,
    createdAt: '2025-05-15',
  },
  {
    id: '2',
    name: 'Clothing',
    nameArabic: 'ملابس',
    priority: 2,
    logo: '/images/clothing.png',
    products: 450,
    orders: 500,
    totalSales: '150K EGP',
    status: true,
    createdAt: '2025-05-15',
  },
  {
    id: '3',
    name: 'Home & Garden',
    nameArabic: 'المنزل والحديقة',
    priority: 3,
    logo: '/images/home.png',
    products: 450,
    orders: 500,
    totalSales: '150K EGP',
    status: true,
    createdAt: '2025-05-15',
  },
];

export interface SubCategory {
  id: string;
  name: string;
  nameArabic: string;
  parentCategory: string;
  parentCategoryId: string;
  products: number;
  orders: number;
  totalSales: number;
  currency: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt?: string;
}

export interface Attribute {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  status: 'Published' | 'Draft';
  createdAt: string;
  updatedAt?: string;
}

export const MOCK_ATTRIBUTES: Attribute[] = [
  {
    id: '1',
    name: 'Color',
    slug: 'color',
    sortOrder: 1,
    status: 'Published',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Size',
    slug: 'size',
    sortOrder: 2,
    status: 'Published',
    createdAt: '2024-01-16',
  },
  {
    id: '3',
    name: 'Material',
    slug: 'material',
    sortOrder: 3,
    status: 'Draft',
    createdAt: '2024-01-17',
  },
];

export const MOCK_SUBCATEGORIES: SubCategory[] = [
  {
    id: '1',
    name: 'Smartphones',
    nameArabic: 'الهواتف الذكية',
    parentCategory: 'Electronics',
    parentCategoryId: '1',
    products: 120,
    orders: 150,
    totalSales: 50000,
    currency: 'EGP',
    status: 'Active',
    createdAt: '2025-05-15',
  },
  {
    id: '2',
    name: 'Laptops',
    nameArabic: 'أجهزة الكمبيوتر المحمولة',
    parentCategory: 'Electronics',
    parentCategoryId: '1',
    products: 80,
    orders: 90,
    totalSales: 40000,
    currency: 'EGP',
    status: 'Inactive',
    createdAt: '2025-05-15',
  },
  {
    id: '3',
    name: "Men's Wear",
    nameArabic: 'ملابس رجالية',
    parentCategory: 'Clothing',
    parentCategoryId: '2',
    products: 200,
    orders: 180,
    totalSales: 60000,
    currency: 'EGP',
    status: 'Inactive',
    createdAt: '2025-05-15',
  },
];
