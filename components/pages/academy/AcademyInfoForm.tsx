"use client";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/UI/button";

import { Academy, AcademyForm, academySchema } from "@/types/academy";
import { Card, CardContent } from "@/components/UI/card";
import { useAcademy } from "@/hooks/useAcademy";
import { cn } from "@/util";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import Combobox from "@/components/UI/Combobox";
import { useLocationData } from "@/hooks/useLocationData";
import Flag from "@/components/UI/flag";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { Info } from "lucide-react";
import PreventLeaveDialog from "@/components/UI/PreventLeaveDialog";
import { Switch } from "@/components/UI/switch";
import StringMultipleSelector from "@/components/UI/StringMultipleSelector";
import { useAcademyKeywords } from "@/hooks/useAcademyKeyWords";

const TYPES = ["Training Center", "Academy", "College", "University"];
const SIZE = [
  "1-10",
  "11-50",
  "51-100",
  "101-500",
  "501-1000",
  "1001-5000",
  "5000+",
];

const FOUNDED_YEAR = Array.from({
  length: new Date().getFullYear() - 1800 + 1,
})
  .reverse()
  .map((_, i) => ({
    value: String(new Date().getFullYear() - i),
    label: String(new Date().getFullYear() - i),
  }));

const getDefaultValues = (academy?: Academy | null): Partial<AcademyForm> => ({
  name: academy?.name || undefined,
  image: academy?.image || undefined,
  description: academy?.description || undefined,
  type: academy?.type || undefined,

  fakeStudentsCount: academy?.fakeStudentsCount || undefined,
  displayRealStudentsCount: Boolean(academy?.displayRealStudentsCount),
  keyWords: academy?.keyWords || undefined,

  size: academy?.size || undefined,
  foundedYear: academy?.foundedYear || undefined,

  address: academy?.address || undefined,
  city: academy?.city || undefined,
  country: academy?.country || undefined,
});

const AcademyInfoForm: React.FC = () => {
  const { academy, updateAcademyHandler } = useAcademy();
  const { keyWords } = useAcademyKeywords();
  const form = useForm<AcademyForm>({
    resolver: zodResolver(academySchema),
    defaultValues: getDefaultValues(academy),
  });
  const { countries, states } = useLocationData(form.watch("country")?.code);

  async function onSubmit(values: AcademyForm) {
    updateAcademyHandler(values);
    form.reset(values);
  }

  useEffect(() => {
    form.reset(getDefaultValues(academy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [academy]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"space-y-2"}
          noValidate
        >
          <PreventLeaveDialog />
          <Card>
            <CardContent className="w-full space-y-4">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="eg. Organization Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-fit min-w-44">
                      <FormLabel>Organization Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Short description" {...field} />
                    </FormControl>
                    <FormDescription
                      className={cn(
                        "text-xs",
                        (field.value?.length || 0) > 50 && "text-destructive",
                      )}
                    >
                      <span className="tabular-nums">
                        {50 - (field.value?.length || 0)}
                      </span>{" "}
                      characters left
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="keyWords"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Key Words</FormLabel>
                    <FormControl>
                      <StringMultipleSelector
                        options={keyWords.map((keyword) => ({
                          value: keyword.name,
                          label: keyword.name,
                        }))}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        placeholder="Start by typing Key Words"
                        badgeClassName="text-sm pl-2 text-foreground"
                        emptyIndicator={
                          <p className="text-center text-sm">
                            Now key words found
                          </p>
                        }
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Help us to find your organization in search results minimum 3
                      Key Words
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayRealStudentsCount"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={!field.value}
                          onCheckedChange={(value) => {
                            field.onChange(!value);
                          }}
                        />
                      </FormControl>
                      <FormLabel>Display Fake Students Count</FormLabel>
                    </div>
                    <FormDescription>
                      Check this box to display the fake number of students
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!form.watch("displayRealStudentsCount") && (
                <FormField
                  control={form.control}
                  name="fakeStudentsCount"
                  render={({ field }) => (
                    <FormItem className="ml-5 w-full max-w-2xs">
                      <FormLabel>Fake Students Count</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="eg. 100"
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
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Organization Size</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SIZE.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foundedYear"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Founded Year</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(+value);
                        }}
                        value={field.value?.toString()}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization founded year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {FOUNDED_YEAR.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex flex-1 gap-2">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Combobox
                            options={countries.map((country) => ({
                              value: country.isoCode,
                              label: country.name,
                              icon: (
                                <Flag
                                  code={String(country.isoCode.toLowerCase())}
                                  name={String(country.name || "")}
                                />
                              ),
                            }))}
                            placeholder="Select country"
                            value={field.value?.code}
                            onChange={(value) => {
                              const item = countries.find(
                                (country) => country.isoCode === value,
                              );
                              field.onChange({
                                code: item?.isoCode,
                                name: item?.name,
                              });
                              form.setValue("city", undefined);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="flex h-3.5 items-center gap-2">
                          city
                          {!form.watch("country") && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="text-muted-foreground h-4 w-4" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Select the country first</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Combobox
                            className="w-full"
                            options={states.map((state) => ({
                              value: state.isoCode,
                              label: state.name,
                            }))}
                            placeholder="Select city"
                            value={field.value?.code}
                            disabled={!form.watch("country")}
                            onChange={(value) => {
                              const item = states.find(
                                (state) => state.isoCode === value,
                              );
                              field.onChange({
                                code: item?.isoCode,
                                name: item?.name,
                              });
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {form.formState.isDirty && (
            <div className="rounded-base shadow-soft sticky bottom-2 z-10 flex justify-start border bg-white p-3">
              <Button type="submit">Save Changes</Button>
              <Button
                type="button"
                onClick={() => form.reset()}
                variant="text"
                className="ml-2"
              >
                Reset
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default AcademyInfoForm;
