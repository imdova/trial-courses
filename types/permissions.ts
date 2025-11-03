import { NotificationEnum } from "@/constants/enums/notifications.enum";
import { Permission_Keys } from "@/constants/enums/Permission_Keys.enum";
import { RoleState } from "./next-auth";

export type Permission =
  | "access_analytics"
  | "view_jobs"
  | "manage_users"
  | "manage_company_profile"
  | "edit_payment_method_&_payment_plan"
  | "handle_invoicing"
  | "manage_subscriptions_and_payments"
  | "search_candidate"
  | "access_financial_reports"
  | "export_job_applicants_to_file"
  | "manage_job_applications"
  | "view_all_applicants"
  | "schedule_interviews"
  | "communicate_with_candidates"
  | "unlock_seeker"
  | "view_saved_seekers"
  | "view_job_applicants"
  | "post_job"
  | "manage_jobs";

export type PermissionsNotifications = {
  type: NotificationEnum;
  permissions: Permission_Keys[];
};

export interface RoleFormData {
  id?: string;
  name: string;
  description: string;
  permissionsIds: string[];
  forUserType: RoleState;
  companyId?: string;
}
