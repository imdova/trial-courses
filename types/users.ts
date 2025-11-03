import { RoleState, UserResponse } from "./next-auth";

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleState;
  academy?: UserResponse["academy"];
}
export interface SigninFormData {
  email: string;
  password: string;
}
