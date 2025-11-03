"use client";
import { Button } from "@/components/UI/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Separator } from "@/components/UI/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { useEffect } from "react";
import { ScrollArea } from "@/components/UI/scroll-area";
import {
  Academy,
  AcademyInstructor,
  AcademyInstructorForm,
  academyInstructorSchema,
} from "@/types/academy";
import TextEditor from "../editor/editor";
import AvatarInput from "../UI/AvatarInput";
import { useAcademyInstructors } from "@/hooks/useAcademyInstructors";

export const InstructorDialogForm = ({
  open,
  onOpenChange,
  item,
  onSuccess,
  onPending,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  item?: Partial<AcademyInstructor> | null;
  onSuccess?: (instructor: AcademyInstructor) => void;
  onPending?: (instructor: Academy["instructors"][number]) => void;
}) => {
  const { createAcademyInstructorHandler, updateAcademyInstructorHandler } =
    useAcademyInstructors();

  const isEdit = Boolean(item?.id);

  const form = useForm<AcademyInstructorForm>({
    resolver: zodResolver(academyInstructorSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      photoUrl: "",
      biography: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: item?.name || "",
        photoUrl: item?.photoUrl || "",
        biography: item?.biography || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  async function onSubmit(values: AcademyInstructorForm) {
    onOpenChange(false);
    form.reset(values);

    if (item?.id) {
      const updatedInstructor = await updateAcademyInstructorHandler(
        item.id!,
        values,
      );
      if (updatedInstructor) {
        return onSuccess?.(updatedInstructor);
      }
    } else {
      const tempId = "temp-" + Date.now();
      const template: AcademyInstructor = {
        id: tempId,
        photoUrl: values.photoUrl,
        name: values.name,
        biography: values.biography,
      };
      onPending?.(template);
      const instructor = await createAcademyInstructorHandler(values, template);
      if (instructor) {
        onSuccess?.(instructor);
      }
    }
  }

  const onOpenChangeHandler = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="gap-0 p-0 py-5 sm:max-w-xl">
        <DialogHeader className="px-5">
          <DialogTitle>Create New Instructor</DialogTitle>
          <DialogDescription>
            You can create a new instructor here, and update it later.
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-4" />

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // prevent HTML submit
              e.stopPropagation(); // prevent bubbling to outer form
              form.handleSubmit(onSubmit)(e); // run RHF submit handler
            }}
            className="flex flex-col"
            noValidate
          >
            <ScrollArea className="max-h-[60vh]">
              <div className="grid gap-4 p-5">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="photoUrl"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AvatarInput
                            {...field}
                            autoUpload
                            className="bg-accent border-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter the name of your course"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="biography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <TextEditor
                        withFormControl
                        hasLinks={false}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <Separator className="mb-4" />
            <DialogFooter className="px-5">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {isEdit ? "Update Instructor" : "Create Instructor"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
