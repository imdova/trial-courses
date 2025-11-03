import { Pen } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAcademy } from "@/hooks/useAcademy";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { AcademyForm, academySchema } from "@/types/academy";
import Link from "next/link";

const AcademyPublicUrlCard = ({ slug }: { slug: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Public URL</CardTitle>
        <CardAction>
          <ContactFormDiagram>
            <Button size="icon" variant="outline">
              <Pen className="text-muted-foreground" />
            </Button>
          </ContactFormDiagram>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-2">
        <Link
          className="bg-primary/10 text-primary line-clamp-2 rounded-lg p-3 text-sm font-medium text-wrap break-all hover:underline"
          href={`/ac/${slug}?isPublic=true`}
          target="_blank"
        >
          {`https://courses.medicova/ac/${slug}`}
        </Link>
      </CardContent>
    </Card>
  );
};
export default AcademyPublicUrlCard;

const ContactFormDiagram: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const { academy, updateAcademyHandler } = useAcademy();

  const form = useForm<AcademyForm>({
    resolver: zodResolver(academySchema),
    mode: "onSubmit",
    defaultValues: {
      slug: academy?.slug || undefined,
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
      <DialogTrigger asChild>{children}</DialogTrigger>
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
            <div className="flex flex-col gap-6 px-4">
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
