import { Mail, Pen, Phone } from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import PhoneNumberInput from "@/components/UI/phoneNumber";
import { AcademyForm, academySchema } from "@/types/academy";

const PrivateContactInfoCard = ({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Info</CardTitle>
        <CardAction>
          <ContactFormDiagram>
            <Button size="icon" variant="outline">
              <Pen className="text-muted-foreground" />
            </Button>
          </ContactFormDiagram>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-sm">
          <Mail className="mr-2 inline-block size-4" />
          {email || "Not available"}
        </p>
        <p className="text-muted-foreground text-sm">
          <Phone className="mr-2 inline-block size-4" />
          {phone || "Not available"}
        </p>
      </CardContent>
    </Card>
  );
};
export default PrivateContactInfoCard;

const ContactFormDiagram: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const { academy, updateAcademyHandler } = useAcademy();

  const form = useForm<AcademyForm>({
    resolver: zodResolver(academySchema),
    mode: "onSubmit",
    defaultValues: {
      contactEmail: academy?.contactEmail || undefined,
      phone: academy?.phone || undefined,
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
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This email will be used for contact purposes only. It
                      won’t affect your account email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneNumberInput {...field} />
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
