import { useFormContext, useFieldArray } from "react-hook-form";
import { ChevronRight, Plus, Trash2, X } from "lucide-react";
import { Card, CardContent } from "@/components/UI/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { Separator } from "@/components/UI/separator";
import { Textarea } from "@/components/UI/textarea";
import MultiTextInput from "@/components/UI/MultiTextInput";
import { Button } from "@/components/UI/button";
import { Step2FormData } from "../util/course.schema";
import TextEditor from "@/components/editor/editor";

const CourseOverViewCard: React.FC = () => {
  const form = useFormContext<Step2FormData>();

  const {
    fields: faqs,
    append: appendFAQ,
    remove: removeFAQ,
  } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  return (
    <Card className="space-y-6">
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="courseOverview"
          render={({ field }) => (
            <FormItem className="w-full max-w-full">
              <FormLabel>Course Overview</FormLabel>
              <TextEditor
                hasLinks={false}
                value={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="whoCanAttend.text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who can Attend this Course ?</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your text" rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <p className="text-muted-foreground text-sm font-medium">
          {form.getValues("whoCanAttend.text")}
        </p>

        <FormField
          control={form.control}
          name="whoCanAttend.items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who can Attend this Course ?</FormLabel>

              <div className="space-y-2">
                {field.value?.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-base flex justify-between gap-2 bg-gray-100 p-2"
                  >
                    <div className="flex gap-2">
                      <ChevronRight className="bg-primary size-6 min-w-6 rounded-full p-1 text-white" />
                      <span className="text-sm break-all">{item}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-5"
                      onClick={() =>
                        field.onChange(
                          field.value?.filter((_, indx) => indx !== index),
                        )
                      }
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
              <FormControl>
                <MultiTextInput
                  disableSplit
                  placeholder="Enter your item and press enter to add"
                  hideTags={true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="whatWillYouLearn.text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What will you learn ?</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your text" rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <p className="text-muted-foreground text-sm font-medium">
          {form.getValues("whatWillYouLearn.text")}
        </p>

        <FormField
          control={form.control}
          name="whatWillYouLearn.items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What will you learn ?</FormLabel>
              <div className="space-y-2">
                {field.value?.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-base flex justify-between gap-2 bg-gray-100 p-2"
                  >
                    <div className="flex gap-2">
                      <ChevronRight className="bg-primary size-6 rounded-full p-1 text-white" />
                      <span className="text-sm break-all">{item}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-5"
                      onClick={() =>
                        field.onChange(
                          field.value?.filter((_, indx) => indx !== index),
                        )
                      }
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
              <FormControl>
                <MultiTextInput
                  placeholder="Enter your learning item and press enter to add"
                  disableSplit
                  hideTags={true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="faqs"
          render={() => (
            <FormItem>
              <FormLabel>Frequently Asked Questions (FAQs)</FormLabel>
              {faqs.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <FormField
                    control={form.control}
                    name={`faqs.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              placeholder={"Question - " + (index + 1)}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            variant="outline"
                            className="text-destructive bg-destructive/10"
                            size="icon"
                            onClick={() => removeFAQ(index)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`faqs.${index}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={"Answer - " + (index + 1)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index < faqs.length - 1 && <Separator />}
                </div>
              ))}
              <FormMessage />
              <Button
                variant="outline"
                className="w-fit"
                onClick={() =>
                  appendFAQ({
                    question: "",
                    answer: "",
                  })
                }
              >
                <Plus /> Add FAQ
              </Button>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CourseOverViewCard;
