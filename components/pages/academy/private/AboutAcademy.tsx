"use client";

import React, { useState } from "react";

// UI Components
import EmptyCard from "@/components/UI/emptyCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Pen, Plus } from "lucide-react";
import { Button } from "@/components/UI/button";

// Utils
import { findCutIndex } from "@/util/forms";
import { AcademyForm, academySchema } from "@/types/academy";
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
import TextEditor from "@/components/editor/editor";
import { useControllableState } from "@/hooks/useControllableState";
import { useAcademy } from "@/hooks/useAcademy";

// Preview limits
const PREVIEW_LIMIT = 400;
const MAX_LIMIT = 500;

const AboutAcademy: React.FC<{ about: string }> = ({ about }) => {
  const [open, setOpen] = useState(false);
  const aboutEmpty =
    !about || about.trim() === "" || about.trim() === "<p></p>";

  const cutIndex = findCutIndex(about, PREVIEW_LIMIT);
  const isLong = about.length > MAX_LIMIT;
  const previewHTML = isLong ? about.slice(0, cutIndex) : about;
  const restHTML = isLong ? about.slice(cutIndex) : "";
  return (
    <>
      <AboutDialogForm isOpen={open} onOpenChange={setOpen} />
      {/* If empty show placeholder, else show content */}
      <Card>
        <CardHeader>
          <CardTitle>About :</CardTitle>
          <CardAction>
            <Button onClick={() => setOpen(true)} size="icon" variant="outline">
              {aboutEmpty ? (
                <Plus className="text-muted-foreground" />
              ) : (
                <Pen className="text-muted-foreground" />
              )}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-2">
          {aboutEmpty ? (
            <EmptyCard
              src="/images/activities.png"
              description="Your About Section is empty."
              buttonText="Write About Your Academy"
              onClick={() => setOpen(true)}
            />
          ) : (
            <Collapsible>
              <div
                className="prose text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: previewHTML }}
              />
              {isLong && (
                <>
                  <CollapsibleContent className="CollapsibleContent mx-1">
                    <div
                      className="prose text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: restHTML }}
                    />
                  </CollapsibleContent>

                  <CollapsibleTrigger className="group text-muted-foreground hover:text-main mt-2 w-full text-center text-sm">
                    <span className="text-sm group-aria-expanded:hidden">
                      Show more
                    </span>
                    <span className="hidden text-sm group-aria-expanded:inline">
                      Show less
                    </span>
                  </CollapsibleTrigger>
                </>
              )}
            </Collapsible>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AboutAcademy;

export const AboutDialogForm = ({
  isOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (next: boolean | ((prev: boolean) => boolean)) => void;
}) => {
  const { academy, updateAcademyHandler } = useAcademy();
  const [open, setOpen] = useControllableState({
    value: isOpen,
    onChange: onOpenChange,
    defaultValue: false,
  });

  const form = useForm<AcademyForm>({
    resolver: zodResolver(academySchema),
    mode: "onSubmit",
    defaultValues: {
      about: academy?.about || undefined,
    },
  });

  async function onSubmit(values: AcademyForm) {
    updateAcademyHandler(values);
    setOpen(false);
    form.reset(values);
  }

  const onOpenChangeHandler = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setOpen(open);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="p-0 py-5 sm:max-w-xl">
        <DialogHeader className="px-5">
          <DialogTitle>Write about your academy</DialogTitle>
          <DialogDescription>
            Write about your academy to help potential students understand what
            your academy offers.
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            noValidate
          >
            <div className="grid gap-4 px-5">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <TextEditor
                        withFormControl
                        wrapperClassName="max-h-[400px] py-4 overflow-y-auto"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />
            <DialogFooter className="px-5">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={!form.formState.isDirty}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
