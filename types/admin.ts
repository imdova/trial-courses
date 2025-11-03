import { RegisterCategory } from "../constants/enums/register-category.enum";

export interface AdminUser {
  created_at: string;
  updated_at: string;
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  type: RegisterCategory;
  avatar: string;
  email: string;
  departmentId?: string;
  phone: string;
  active: boolean;

  // TODO: need to be added
  rolesIds?: string[];
  adminIds?: string[];
  companyIds?: string[];
  lastSeen?: string;
}
