import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/UI/card";
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
import { Collapsible, CollapsibleContent } from "@/components/UI/Collapsible";
import { Badge } from "@/components/UI/badge";
import Combobox from "@/components/UI/Combobox";
import { formatMoney } from "@/util/general";
import { useLocationData } from "@/hooks/useLocationData";
import { Step1FormData } from "../util/course.schema";

const getSalePrice = (regular: number, discount: number) =>
  +(regular * (1 - discount / 100)).toFixed(2);

const getDiscountAmount = (regular: number, sale: number) =>
  regular > 0 ? +(((regular - sale) / regular) * 100).toFixed(2) : 0;

const CoursePricingCard: React.FC = () => {
  const { countries } = useLocationData();

  const form = useFormContext<Step1FormData>();

  return (
    <Card>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="isCourseFree"
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
                  <FormLabel>Is Course Free</FormLabel>
                  <FormDescription>
                    Enable this option if you want Students to access the
                    content of this course for free
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowPlatformCoupons"
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
                  <FormLabel>
                    Allow Platform Coupons{" "}
                    <Badge variant="neutral">Recommended</Badge>
                  </FormLabel>
                  <FormDescription>
                    Enable this option if you want to allow platform coupons to
                    be Applied to your course
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Collapsible open={!form.watch("isCourseFree")}>
          <CollapsibleContent>
            <FormField
              control={form.control}
              name="pricing.0"
              render={() => {
                const item = form.getValues("pricing.0") || {};
                return (
                  <div className="mt-3 space-y-4 p-1">
                    <div className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`pricing.0.currencyCode`}
                        render={({ field }) => (
                          <FormItem className="w-full max-w-24">
                            <FormLabel>Currency</FormLabel>
                            <FormControl className="w-full">
                              <Combobox
                                placeholder="Currency"
                                options={countries.map((country) => ({
                                  value: country.currency,
                                  label: (
                                    <p>
                                      {country.currency}{" "}
                                      <span className="text-muted-foreground">
                                        ( {country.name} )
                                      </span>
                                    </p>
                                  ),
                                  accessory: country.currency,
                                }))}
                                {...field}
                                name="Currency"
                                className="w-24"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`pricing.0.regularPrice`}
                        disabled={form.watch("isCourseFree")}
                        defaultValue={0}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="space-y-2">
                              <FormLabel>Regular Price</FormLabel>
                              <div className="relative">
                                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex max-w-12 items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <span>{item.currencyCode}</span>
                                </div>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    className="peer ps-12"
                                    placeholder="00.00"
                                    {...field}
                                    onChange={(e) => {
                                      const value = +e.target.value;
                                      form.setValue(
                                        `pricing.0.salePrice`,
                                        getSalePrice(
                                          value,
                                          item.discountAmount || 0,
                                        ),
                                      );
                                      field.onChange(value);
                                    }}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`pricing.0.salePrice`}
                        defaultValue={0}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="w-full space-y-2">
                              <FormLabel>Sale Price</FormLabel>
                              <div className="relative">
                                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex max-w-12 items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <span>{item.currencyCode}</span>
                                </div>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    className="peer ps-12"
                                    placeholder="00.00"
                                    {...field}
                                    onChange={(e) => {
                                      const value = +e.target.value;
                                      form.setValue(
                                        `pricing.0.discountAmount`,
                                        getDiscountAmount(
                                          item.regularPrice || 0,
                                          value,
                                        ),
                                      );
                                      field.onChange(value);
                                    }}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`pricing.0.discountAmount`}
                        defaultValue={0}
                        render={({ field }) => (
                          <FormItem>
                            <div className="w-full min-w-28 space-y-2">
                              <FormLabel>Discount</FormLabel>
                              <div className="relative">
                                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex max-w-12 items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <span>%</span>
                                </div>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="1"
                                    className="peer ps-8"
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) => {
                                      const value = +e.target.value;
                                      form.setValue(
                                        `pricing.0.salePrice`,
                                        getSalePrice(
                                          item.regularPrice || 0,
                                          value,
                                        ),
                                      );
                                      field.onChange(value);
                                    }}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormDescription className="col-span-3 text-xs">
                      {item?.discountAmount?.toFixed(2) ?? 0}% Discount Applied{" "}
                      {": "}
                      Regular {": "}
                      {formatMoney(item?.regularPrice || 0, item?.currencyCode)}
                      {" → Sale: "}
                      {formatMoney(item?.salePrice || 0, item?.currencyCode)}
                    </FormDescription>
                  </div>
                );
              }}
            />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CoursePricingCard;
