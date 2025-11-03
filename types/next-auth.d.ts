import { Permission_Keys } from "@/constants/enums/Permission_Keys.enum";

export type RoleState =
  | "student"
  | "instructor"
  | "academy_admin"
  | "admin"
  | "unverified";

export interface UserResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: RoleState;
    firstName: string;
    lastName: string;
    userName: string;
    photo: string;
    permissions: Permission_Keys[];
    accessToken: string;
  };
  academy: {
    id: string | null;
    name: string | null;
    slug: string | null;
    image: string | null;
    description: string | null;
  };
  tokens?: {
    access_token: string | undefined;
    refresh_token: string;
  };
}

export type Permission = {
  id: string;
  name: string;
  key: string;
  description: string;
  forUserType: RoleState;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  forUserType?: RoleState;
  companyId?: string | null;
  permissions: Permission[];
  users?: number;
  created_at: string;
};

declare module "next-auth" {
  interface User {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    userName: string | null;
    type: RoleState;
    image: string | null;
    permissions: Permission_Keys[];
    accessToken: string;
    refreshToken: string;
    hasAcademy?: boolean;
    companyId?: string;
    academy: UserResponse["academy"];
    plan?: string;
  }

  interface Session {
    user: User;
    error: string;
    redirectUrl: string | null;
  }
}
