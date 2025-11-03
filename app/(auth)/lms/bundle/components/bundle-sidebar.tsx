import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/UI/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import UploadArea from "@/components/UI/UploadArea";
import { BundleFormData } from "../utils/bundle.schema";

export const BundleSideBar = () => {
  const form = useFormContext<BundleFormData>();
  return (
    <Card>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="thumbnail_url"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bundle Image</FormLabel>
              <FormControl>
                <UploadArea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
