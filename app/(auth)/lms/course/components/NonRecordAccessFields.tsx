import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Step1FormData } from "../util/course.schema";

const NonRecordAccessFields = () => {
  const form = useFormContext<Step1FormData>();
  return (
    <>
      <div className="flex items-start gap-2">
        <div className="flex-1 space-y-2">
          <FormLabel>Course Duration</FormLabel>
          <div className={"flex rounded-md"}>
            <FormField
              control={form.control}
              name="courseDuration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the course duration"
                      className="-me-px rounded-e-none shadow-none focus-visible:z-1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseDurationUnit"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-s-none border-l-0 shadow-none">
                        <SelectValue placeholder="Select Duration Unit" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="days" className="pr-2 [&_svg]:hidden">
                        Days
                      </SelectItem>
                      <SelectItem value="weeks" className="pr-2 [&_svg]:hidden">
                        Weeks
                      </SelectItem>
                      <SelectItem
                        value="months"
                        className="pr-2 [&_svg]:hidden"
                      >
                        Months
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="numberOfLectures"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Number of Lectures</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the number of lectures"
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1 space-y-2">
          <FormLabel>Lecture Frequency</FormLabel>
          <div className="flex w-full rounded-md">
            <FormField
              control={form.control}
              name="lectureFrequency"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="-me-px w-full rounded-e-none shadow-none focus-visible:z-1">
                        <SelectValue placeholder="Select Lecture Frequency" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="once" className="pr-2 [&_svg]:hidden">
                        Once
                      </SelectItem>
                      <SelectItem value="twice" className="pr-2 [&_svg]:hidden">
                        Twice
                      </SelectItem>
                      <SelectItem
                        value="three_times"
                        className="pr-2 [&_svg]:hidden"
                      >
                        Three Times
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lectureFrequencyUnit"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-s-none border-l-0 shadow-none">
                        <SelectValue placeholder="Select Duration Unit" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="days" className="pr-2 [&_svg]:hidden">
                        Per day
                      </SelectItem>
                      <SelectItem value="weeks" className="pr-2 [&_svg]:hidden">
                        Per week
                      </SelectItem>
                      <SelectItem
                        value="months"
                        className="pr-2 [&_svg]:hidden"
                      >
                        Per month
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="totalHours"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Total Hours</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the total hours"
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default NonRecordAccessFields;
