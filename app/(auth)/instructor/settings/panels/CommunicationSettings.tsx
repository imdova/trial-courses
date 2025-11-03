"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Switch } from "@/components/UI/switch";

export const formSchema = z.object({
  newEnrollment: z.boolean(),
  courseCompletion: z.boolean(),
  studentQuestions: z.boolean(),
  reviewNotification: z.boolean(),
  ///
  announcements: z.boolean(),
  systemUpdates: z.boolean(),
  weeklyReports: z.boolean(),
});
const CommunicationSettings: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newEnrollment: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"space-y-4"}
        noValidate
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Communication Settings
          </CardTitle>
          <CardDescription>
            Manage how and when you receive notifications about your course and
            students.
          </CardDescription>
        </CardHeader>

        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="newEnrollment"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>New Enrollment</FormLabel>
                  </div>
                  <FormDescription>
                    Receive an email when a student enrolls in your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseCompletion"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Course Completion</FormLabel>
                  </div>
                  <FormDescription>
                    Receive an email when a student completes your course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentQuestions"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Student Questions</FormLabel>
                  </div>
                  <FormDescription>
                    Receive an email when a student asks a question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reviewNotification"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Review Notifications</FormLabel>
                  </div>
                  <FormDescription>
                    Receive an email when a student leaves a review.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle> Platform Notifications</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="announcements"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Announcements</FormLabel>
                  </div>
                  <FormDescription>
                    Receive notifications about platform announcements.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="systemUpdates"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>system Updates</FormLabel>
                  </div>
                  <FormDescription>
                    Receive notifications about system updates and maintenance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weeklyReports"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Weekly Reports</FormLabel>
                  </div>
                  <FormDescription>
                    Receive weekly reports about your courses and earnings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default CommunicationSettings;
