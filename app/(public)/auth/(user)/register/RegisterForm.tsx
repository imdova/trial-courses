"use client";
import { Button } from "@/components/UI/button";
import { Input, PasswordInput } from "@/components/UI/input";
import { cn } from "@/util";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/UI/form";
import { DevIconGoogle } from "@/components/icons/icons";
import Link from "next/link";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  slugSchema,
} from "@/constants/schemas";
import { slugify } from "@/app/(auth)/lms/course/util/transformToCourseForm";

export const formSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    academyName: nameSchema.optional(),
    slug: slugSchema.optional(),
    role: z.enum(["instructor", "academy"]),
    password: passwordSchema,
  })
  .refine(
    (data) => data.role !== "academy" || (data.academyName && data.slug), // both required if role is academy
    {
      message: "Academy name and slug are required for academy role",
      path: ["academyName"], // error will show under academyName
    },
  );

export function RegisterForm({
  className,
  role,
  ...props
}: React.ComponentProps<"form"> & { role: "instructor" | "academy" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [controlledSlug, setControlledSlug] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: role,
      password: "",
    },
  });

  useEffect(() => {
    if (!role) return;
    if (role !== form.getValues("role")) {
      form.setValue("role", role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const academy =
      role === "academy"
        ? {
            academyName: values.academyName,
            academySlug: values.slug,
          }
        : {};
    try {
      const result = await signIn("register-Credentials", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role:
          role === "instructor" || role === "academy"
            ? "instructor"
            : "student",
        ...academy,
        redirect: false,
      });
      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : "An error occurred during sign in",
        );
      } else {
        if (typeof window !== "undefined") {
          window.location.replace("/me");
        }
      }
    } catch {
      setError("Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
        noValidate
      >
        {role === "instructor" ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Become an Instructor</h1>
            <p className="text-muted-foreground w-full text-sm">
              Join our team of experts and share your knowledge with the world.
              Inspire students, build your brand, and earn income by teaching
              what you love.
            </p>
          </div>
        ) : role === "academy" ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold">Join Us as Academy </h2>
            <p className="text-muted-foreground w-full text-sm">
              Join our platform and offer online courses, workshops, or develop
              your brand.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Join Our Learning Community!</h1>
            <p className="text-muted-foreground w-full text-sm">
              Create your student account to begin your journey. Access a world
              of knowledge and connect with expert instructors.
            </p>
          </div>
        )}
        <div className="grid gap-4">
          <div className="flex items-start justify-center gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="eg. James" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="eg. Bond" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {role === "academy" && (
            <>
              <FormField
                control={form.control}
                name="academyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academy / Organization Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. Oxford University"
                        {...field}
                        onChange={(e) => {
                          if (controlledSlug) {
                            form.setValue("slug", slugify(e.target.value));
                          }
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academy URL</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="eg. oxford-university"
                          className="peer pl-36"
                          {...field}
                          onChange={(e) => {
                            setControlledSlug(false);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <span className="text-muted-foreground peer-placeholder-shown:text-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-sm peer-disabled:opacity-50">
                        medicova.com/in/
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading
              ? "...loading"
              : role === "instructor"
                ? "Apply to Become an Instructor"
                : role === "academy"
                  ? "Create My Academy Account"
                  : "Create My Student Account"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="text-muted-foreground relative z-10 bg-white px-2">
              Or continue with
            </span>
          </div>
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            className="w-full"
          >
            <DevIconGoogle />
            {isLoading ? "...loading" : "Register with Google"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have account!{" "}
          <Link href="/auth/signin" className="underline underline-offset-4">
            Login
          </Link>
        </div>
        {!role && (
          <div className="text-center text-sm">
            Are you a teacher?{" "}
            <Link
              href="/auth/register?role=instructor"
              className="underline underline-offset-4"
            >
              Register as a teacher
            </Link>
          </div>
        )}
        {role === "academy" && (
          <div className="text-center text-sm">
            Are you a teacher?{" "}
            <Link
              href="/auth/register?role=instructor"
              className="underline underline-offset-4"
            >
              Register as a teacher
            </Link>
          </div>
        )}
        {role === "instructor" && (
          <div className="text-center text-sm">
            Are you an educational institution, organization, or commercial
            company?{" "}
            <Link
              href="/auth/register?role=academy"
              className="underline underline-offset-4"
            >
              Sign up as a business user.
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
