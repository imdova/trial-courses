import { z } from "zod";
import { emailSchema, nameSchema, phoneSchema } from "./schemas";
import { RegisterCategory } from "@/constants/enums/register-category.enum";


const baseSchema = z.object({
  id: z.uuid().optional(),
  firstName: nameSchema,
  lastName: nameSchema,
  avatar: z.string().optional(),
  email: emailSchema,
  phone: phoneSchema,
  title: nameSchema,
  category: z.nativeEnum(RegisterCategory),
  departmentId: z.string().uuid().optional(),
  rolesIds: z
    .array(z.object({ value: z.string().uuid(), label: z.string() }))
    .optional(),
});

export const userFormSchema = baseSchema.superRefine((data, ctx) => {
  // Condition 1: Department is required only for ADMIN_EMPLOYEE.
  if (data.category === RegisterCategory.ADMIN_EMPLOYEE && !data.departmentId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Department is required for Admin Employees.',
      path: ['departmentId'],
    });
  }

  // Condition 2: Roles are required for everyone EXCEPT SUPER_ADMIN.
  if (data.category !== RegisterCategory.SUPER_ADMIN && (!data.rolesIds || data.rolesIds.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'At least one role is required.',
      path: ['rolesIds'],
    });
  }
});

