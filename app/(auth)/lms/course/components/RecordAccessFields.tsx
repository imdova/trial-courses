import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { Switch } from "@/components/UI/switch";
import { cn } from "@/util";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";
import { Button } from "@/components/UI/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/UI/calendar";
import { formatPublishDate } from "@/util/date";
import { Step1FormData } from "../util/course.schema";

const RecordAccessFields = () => {
  const form = useFormContext<Step1FormData>();

  const publishLater = form.watch("publishLater");
  return (
    <>
      <FormField
        control={form.control}
        name="publishLater"
        render={({ field }) => (
          <FormItem>
            <div className="flex gap-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel>Publish Later</FormLabel>
                <FormDescription>Publish the course later</FormDescription>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {publishLater && (
        <div className="space-y-2">
          <div className="flex max-w-md items-start gap-4">
            <FormField
              control={form.control}
              name="publishDate"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel>Publish Date</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date-picker"
                          className={cn(
                            "justify-between font-normal",
                            field.value ? "" : "text-zinc-400",
                          )}
                        >
                          {field.value
                            ? new Date(field.value).toLocaleDateString()
                            : "Select Publish data"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(value) =>
                          field.onChange(value?.toISOString())
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishTime"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel htmlFor="time-picker" className="px-1">
                    Publish Time
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription>
            {form.watch("publishDate") && form.watch("publishTime")
              ? "your course will be published, "
              : ""}
            {formatPublishDate(
              form.watch("publishDate"),
              form.watch("publishTime"),
            )}
          </FormDescription>
        </div>
      )}
    </>
  );
};

export default RecordAccessFields;
