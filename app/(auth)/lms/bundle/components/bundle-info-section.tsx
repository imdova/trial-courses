import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/UI/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { BundleFormData } from "../utils/bundle.schema";
import TextEditor from "@/components/editor/editor";
import { useState } from "react";
import { slugify } from "../../course/util/transformToCourseForm";

const BundleInfoSection: React.FC = () => {
  const form = useFormContext<BundleFormData>();
  const [controlledSlug, setControlledSlug] = useState(true);
  return (
    <Card className="space-y-6">
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bundle Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter the title of your Bundle"
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
              <FormLabel>Slug</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="eg. my-awesome-bundle"
                    className="peer pl-20"
                    {...field}
                    onChange={(e) => {
                      setControlledSlug(false);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <span className="text-muted-foreground peer-placeholder-shown:text-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-sm peer-disabled:opacity-50">
                  bundles/
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full max-w-full">
              <FormLabel>Bundle Description</FormLabel>
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
      </CardContent>
    </Card>
  );
};

export default BundleInfoSection;
