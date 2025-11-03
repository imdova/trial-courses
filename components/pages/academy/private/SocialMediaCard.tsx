import React, { type ReactElement } from "react";
import { Tooltip } from "@mui/material";
import {
  Facebook,
  Instagram,
  Language,
  LinkedIn,
  LinkOutlined,
  Pinterest,
  Reddit,
  Telegram,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";
import { Academy } from "@/types/academy";
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
import { Linkedin, Pen } from "lucide-react";
type PrivateSocialMediaCardProps = {
  academy: Academy;
};

export const socialMediaIcons: {
  [K in keyof Academy["socialLinks"]]: ReactElement;
} = {
  instagram: <Instagram sx={{ color: "rgba(241, 9, 234, 1)" }} />,
  twitter: <Twitter sx={{ color: "rgba(91, 146, 250, 1)" }} />,
  linkedin: <LinkedIn sx={{ color: "rgba(0, 119, 181, 1)" }} />,
  website: <Language sx={{ color: "rgba(46, 174, 125, 1)" }} />,
  facebook: <Facebook sx={{ color: "rgba(59, 89, 152, 1)" }} />,
  youtube: <YouTube sx={{ color: "rgba(255, 0, 0, 1)" }} />,
  // tiktok: <TikTok sx={{ color: "rgba(0, 0, 0, 1)" }} />,
  // snapchat: <Snapchat sx={{ color: "rgba(255, 252, 0, 1)" }} />,
  pinterest: <Pinterest sx={{ color: "rgba(189, 8, 28, 1)" }} />,
  reddit: <Reddit sx={{ color: "rgba(255, 69, 0, 1)" }} />,
  // discord: <Discord sx={{ color: "rgba(114, 137, 218, 1)" }} />,
  telegram: <Telegram sx={{ color: "rgba(0, 136, 204, 1)" }} />,
  whatsapp: <WhatsApp sx={{ color: "rgba(37, 211, 102, 1)" }} />,
};

const PrivateSocialMediaCard: React.FC<PrivateSocialMediaCardProps> = ({
  academy,
}) => {
  const socialLinks = academy?.socialLinks;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardAction>
          <SocialMediaFormDiagram>
            <Button size="icon" variant="outline">
              <Pen className="text-muted-foreground" />
            </Button>
          </SocialMediaFormDiagram>
        </CardAction>
      </CardHeader>
      <CardContent className="flex gap-2">
        {!socialLinks || Object.keys(socialLinks).length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No social media links found.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {Object.entries(socialLinks).map(
              ([key, link]) =>
                link && (
                  <Tooltip key={key} title={key} placement="bottom">
                    <Link href={link} target="_blank" rel="noopener noreferrer">
                      {socialMediaIcons[
                        key as keyof Academy["socialLinks"]
                      ] || <LinkOutlined />}
                    </Link>
                  </Tooltip>
                ),
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrivateSocialMediaCard;

const SocialMediaFormDiagram: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const { academy, updateAcademyHandler } = useAcademy();

  const form = useForm<AcademyForm>({
    resolver: zodResolver(academySchema),
    mode: "onSubmit",
    defaultValues: {
      socialLinks: academy?.socialLinks || undefined,
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
            <div className="flex flex-col gap-3 px-4">
              <FormField
                control={form.control}
                name="socialLinks.instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <div className="relative">
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                        <Instagram sx={{ color: "rgba(241, 9, 234, 1)" }} />
                        <span className="sr-only">Instagram link</span>
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Instagram link"
                          className="peer pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialLinks.website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <div className="relative">
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                        <Language sx={{ color: "rgba(46, 174, 125, 1)" }} />
                        <span className="sr-only">Website link</span>
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Website link"
                          className="peer pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialLinks.facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <div className="relative">
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                        <Facebook sx={{ color: "rgba(59, 89, 152, 1)" }} />
                        <span className="sr-only">Facebook link</span>
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Facebook link"
                          className="peer pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialLinks.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <div className="relative">
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                        <Linkedin className="text-blue-400" />
                        <span className="sr-only">LinkedIn link</span>
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="LinkedIn link"
                          className="peer pl-10"
                          {...field}
                        />
                      </FormControl>
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
