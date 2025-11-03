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
import Combobox from "@/components/UI/Combobox";
import { formatMoney } from "@/util/general";
import { useLocationData } from "@/hooks/useLocationData";
import { BundleFormData } from "../utils/bundle.schema";
import { getDiscountAmount, getSalePrice } from "@/util/forms";

const BundlePricingCard: React.FC = () => {
  const { countries } = useLocationData();
  const form = useFormContext<BundleFormData>();

  const noCourses = form.watch("courseIds").length === 0;
  return (
    <Card>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="is_free"
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
                  <FormLabel>Is Bundle Free</FormLabel>
                  <FormDescription>
                    Enable this option if you want Students to access the
                    content of this Bundle for free
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Collapsible open={!form.watch("is_free")}>
          <CollapsibleContent>
            <FormField
              control={form.control}
              name="pricings.0"
              render={() => {
                const item = form.getValues("pricings.0") || {};
                return (
                  <div className="mt-3 space-y-4 p-1">
                    <div className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`pricings.0.currency_code`}
                        disabled={noCourses}
                        render={({ field }) => (
                          <FormItem className="w-full max-w-24">
                            <FormLabel>Currency</FormLabel>
                            <FormControl className="w-full">
                              <Combobox
                                placeholder="Currency"
                                readOnly
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
                        name={`pricings.0.regular_price`}
                        disabled
                        defaultValue={0}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="space-y-2">
                              <FormLabel>Regular Price</FormLabel>
                              <div className="relative">
                                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex max-w-12 items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <span>{item.currency_code}</span>
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
                                        `pricings.0.sale_price`,
                                        getSalePrice(
                                          value,
                                          item.discount_amount || 0,
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
                        name={`pricings.0.sale_price`}
                        defaultValue={0}
                        disabled={noCourses || form.watch("is_free")}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="w-full space-y-2">
                              <FormLabel>Sale Price</FormLabel>
                              <div className="relative">
                                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex max-w-12 items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <span>{item.currency_code}</span>
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
                                      const discount = getDiscountAmount(
                                        item.regular_price || 0,
                                        value,
                                      );
                                      form.setValue(
                                        `pricings.0.discount_amount`,
                                        discount,
                                      );
                                      form.setValue(
                                        `pricings.0.discount_enabled`,
                                        discount > 0,
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
                        name={`pricings.0.discount_amount`}
                        defaultValue={0}
                        disabled={noCourses || form.watch("is_free")}
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
                                        `pricings.0.sale_price`,
                                        getSalePrice(
                                          item.regular_price || 0,
                                          value,
                                        ),
                                      );
                                      form.setValue(
                                        `pricings.0.discount_enabled`,
                                        value > 0,
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
                      {item?.discount_amount?.toFixed(2) ?? 0}% Discount Applied{" "}
                      {": "}
                      Regular {": "}
                      {formatMoney(
                        item?.regular_price || 0,
                        item?.currency_code,
                      )}
                      {" → Sale: "}
                      {formatMoney(item?.sale_price || 0, item?.currency_code)}
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

export default BundlePricingCard;
