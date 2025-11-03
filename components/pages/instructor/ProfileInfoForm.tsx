/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import useIsLeaving from "@/hooks/useIsLeaving";
import { useForm } from "react-hook-form";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import React, { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useCategories } from "@/hooks/useCategories";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { uploadFiles } from "@/lib/actions/upload.actions";
import ProfileImage from "@/components/UI/ProfileImage";
import { Input } from "@/components/UI/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneNumberInput from "@/components/UI/phoneNumber";
import RadioGroupChip from "./RadioGroupChip";
import DatePicker from "@/components/UI/DatePicker";
import { Info, Mars, Venus } from "lucide-react";
import { Option } from "@/types/forms";
import { maritalStatusOptions, nationalitiesOptions } from "./ProfileForm";
import { useLocationData } from "@/hooks/useLocationData";
import CompoBox from "@/components/UI/Combobox";
import Flag from "@/components/UI/flag";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { Button } from "@/components/UI/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Checkbox } from "@/components/UI/Check-Box";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const gendersOptions: Option[] = [
  {
    label: "Male",
    value: "male",
    icon: (
      <Mars className="mr-2 inline h-5 w-5 text-blue-500 group-aria-selected:text-white" />
    ),
  },
  {
    label: "Female",
    value: "female",
    icon: (
      <Venus className="mr-2 inline h-5 w-5 text-pink-500 group-aria-selected:text-white" />
    ),
  },
];

const instructorProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userName: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  phoneNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  hasWhatsapp: z.boolean().optional(),
  // birthDate: z.preprocess((val) => {
  //   if (!val) return undefined;
    
  //   const formatDateToLocal = (date: Date): string => {
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, '0');
  //     const day = String(date.getDate()).padStart(2, '0');
  //     return `${year}-${month}-${day}`;
  //   };
    
  //   if (val instanceof Date) {
  //     return formatDateToLocal(val);
  //   }
  //   if (typeof val === 'string') {
  //     try {
  //       const date = new Date(val);
  //       if (isNaN(date.getTime())) return undefined;
  //       return formatDateToLocal(date);
  //     } catch {
  //       return undefined;
  //     }
  //   }
  //   return undefined;
  // }, z.string().optional()),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.string().optional(),
  hasDrivingLicense: z.boolean().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  category: z.string().optional(),
  specialization: z.string().optional(),
  linkedinUrl: z.string().optional(),
  isPublic: z.boolean().optional(),
});

// Add interface for props

export const ProfileInfoForm = () => {
  const { profile, saveProfile, updating, updateError } = useProfile();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const session = useSession();
  
  const form = useForm<z.infer<typeof instructorProfileSchema>>({
    resolver: zodResolver(instructorProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      avatar: "",
      phoneNumber: "",
      whatsappNumber: "",
      hasWhatsapp: false,
      birthDate: "",
      gender: undefined,
      nationality: "",
      maritalStatus: undefined,
      hasDrivingLicense: false,
      country: "",
      state: "",
      city: "",
      category: "",
      specialization: "",
      linkedinUrl: "",
      isPublic: false,
    },
  });

  const {
    formState: { isDirty },
    reset,
    control,
    watch,
    setValue,
    getValues,
  } = form;

  // Watch the category field to conditionally show specializations
  const selectedCategory = watch("category");
  
  // Find the selected category object and get its specializations
  const selectedCategoryData = categories.find(cat => cat.slug === selectedCategory);
  const availableSpecializations = selectedCategoryData?.specialities || [];

  // Reset specialization when category changes
  useEffect(() => {
    if (selectedCategory) {
      setValue("specialization", "");
    }
  }, [selectedCategory, setValue]);

  // Update form with real data when user or profile changes
  useEffect(() => {
    if (profile) {
      const userData =  profile;
      if (userData) {
        // Function to format API date (YYYY-MM-DD) to display format
        const formatDateForDisplay = (dateString: string | undefined) => {
          if (!dateString) return "";
          try {
            const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
            if (isNaN(date.getTime())) return "";
            // Return formatted string instead of Date object
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          } catch {
            return "";
          }
        };

        const formData = {
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          userName: userData.userName || "",
          email: userData.contactEmail || userData.user.email || "",
          avatar: userData.photoUrl || "",
          phoneNumber: userData.phoneNumber || "",
          whatsappNumber: userData.phoneNumbertForWhatsapp || "",
          birthDate: formatDateForDisplay(userData.dateOfBirth) || "",
          gender: userData.gender || "",
          nationality: userData.nationality?.toLowerCase().trim() || "",
          maritalStatus: userData.maritalStatus || "",
          hasDrivingLicense: userData.hasDrivingLicense || false,
          hasWhatsapp: userData.hasWhatsapp || false,
          country: userData.country?.code || userData.country?.name || "",
          state: userData.state?.code || userData.state?.name || "",
          city: userData.city || "",
          category: userData.category || "",
          specialization: userData.speciality || "",
          linkedinUrl: userData.linkedinUrl || "",
          isPublic: userData.isPublic || false,
          // Remove this line: phoneNumbertForWhatsapp: userData.whatsappNumber || ""
        };
        
        console.log("Setting form data:", {
          nationality: formData.nationality,
          category: formData.category,
          rawNationality: userData.nationality
        });
        
        reset(formData);
      }
    }
  }, [profile, reset]);

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const avatar = watch("avatar");
  const country = watch("country");
  const hasWhatsapp = watch("hasWhatsapp");

  const { countries, states } = useLocationData(country);
  
  const updateImage = async (file: File) => {
    try {
      // Upload the image file
      const uploadedUrls = await uploadFiles([file]);
      
      if (uploadedUrls.length > 0) {
        const imageUrl = uploadedUrls[0];
        
        // Update the form field with the new image URL
        setValue("avatar", imageUrl, { shouldDirty: true });
        
        toast.success("Profile image updated successfully!");
      } else {
        throw new Error("No image URLs returned from upload");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const onSubmit = async (data: z.infer<typeof instructorProfileSchema>) => {
    try {
      setIsSubmitting(true);
      
      if (session.data?.user.id) {
        const userId = session.data?.user.id;
        
        // Format dateOfBirth to ISO 8601 date string (YYYY-MM-DD)
        const formatDateOfBirth = (dateString: string | undefined) => {
          if (!dateString) return null;
          try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return null;
            // Return only the date part in YYYY-MM-DD format
            return date.toISOString().split('T')[0];
          } catch {
            return null;
          }
        };
        
        // Map form data to the API structure you provided
        const profileData = {
          firstName: data.firstName,
          lastName: data.lastName,
          photoUrl: data.avatar,
          userName: data.userName,
          phoneNumber: data.phoneNumber,
          hasWhatsapp: data.hasWhatsapp,
          phoneNumbertForWhatsapp: data.hasWhatsapp ? data.whatsappNumber : null,
          dateOfBirth: formatDateOfBirth(data.birthDate),
          ...(data.gender && data.gender.trim() !== "" && { gender: data.gender }),
          nationality: data.nationality,
          // maritalStatus: data.maritalStatus,
          hasDrivingLicense: data.hasDrivingLicense,
          contactEmail: data.email,
          linkedinUrl: data.linkedinUrl || null,
          isPublic: data.isPublic,
          country: {
            name: countries.find(c => c.isoCode === data.country)?.name || data.country,
            code: data.country
          },
          // Only include state if it has a valid value
          ...(data.state && data.state.trim() !== "" && {
            state: {
              name: states.find(s => s.isoCode === data.state)?.name || data.state,
              code: data.state
            }
          }),
          city: data.city,
          // Only include category and specialization if they have values and are not null
          ...(data.category && data.category !== null && data.category.trim() !== "" && { category: data.category }),
          ...(data.specialization && data.specialization !== null && data.specialization.trim() !== "" && { specialization: data.specialization }),
          // Add metadata structure if needed
          metadata: {
            // These would be handled by other forms/components
            experience: [],
            education: [],
            courses: [],
            skills: [],
            activities: []
          }
        };

        if (userId) {
          await saveProfile(userId, profileData);
          console.log("Profile updated successfully");
          
          // Reset form dirty state after successful save
          reset(data);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"space-y-2"}
          noValidate
        >
          <div className="rounded-base rounded-t-base shadow-soft flex w-full flex-col items-center gap-8 overflow-hidden border bg-white p-5 lg:flex-row">
            <ProfileImage
              currentImageUrl={avatar || ""}
              alt={getValues("firstName") || "profile_image"}
              size="large"
              onImageUpdate={updateImage}
            />
            <div className="flex h-fit w-full flex-col items-start justify-center gap-3 sm:flex-row">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. James"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. Bond"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="rounded-base shadow-soft w-full space-y-3 border bg-white p-5">
            <div className="flex gap-4 w-full">

            <div className="flex gap-4 md:w-1/2">
              <FormField
                control={control}
                name="userName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. james.bond"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex gap-4 md:w-1/2">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="eg. james@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>
            
            <div className="flex gap-4 w-full"> 

            <div className="flex gap-4 md:w-1/2">
              <FormField
                control={control}
                name="phoneNumber"
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
            <div className="flex gap-4 md:w-1/2">
              <FormField
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <DatePicker placeholder="eg. 1990-01-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>

            <div className="flex items-center space-x-2">
              <FormField
                control={control}
                name="hasWhatsapp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I have WhatsApp on this number
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {hasWhatsapp && (
              <div className="flex gap-4 md:w-1/2">
                <FormField
                  control={control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <PhoneNumberInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}


            <div className="flex gap-4 w-full"> 

            <div className="flex gap-4 md:w-1/2">
              <FormField
                control={control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroupChip
                        items={gendersOptions}
                        value={String(field.value) || ""}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 md:w-1/2">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nationality</FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a nationality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nationalitiesOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>
            
            

            {
              /**
            <div className="flex gap-4 md:w-1/2">
              <FormField
                control={control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                      <RadioGroupChip
                        items={maritalStatusOptions}
                        value={String(field.value) || ""}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
               
            <div className="flex items-center space-x-2">
              <FormField
                control={control}
                name="hasDrivingLicense"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I have a driving license
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 md:w-1/2">
              <FormField
                control={control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
               */
            }
            


            <div className="flex items-center space-x-2">
              {/* <FormField
                control={control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Make my profile public
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              /> */}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 gap-4 md:w-1/2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <Select
                        key={field.value || 'empty'}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading categories...
                            </SelectItem>
                          ) : categoriesError ? (
                            <SelectItem value="error" disabled>
                              Error loading categories
                            </SelectItem>
                          ) : categories.length === 0 ? (
                            <SelectItem value="empty" disabled>
                              No categories available
                            </SelectItem>
                          ) : (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.slug}>
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 gap-4 md:w-1/2">
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Specialization</FormLabel>
                      {!selectedCategory ? (
                        <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                          Please select a category first
                        </div>
                      ) : availableSpecializations.length === 0 ? (
                        <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                          No specializations available for this category
                        </div>
                      ) : (
                        <Select
                          key={field.value || 'empty'}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a specialization" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableSpecializations.map((specialization) => (
                              <SelectItem key={specialization} value={specialization}>
                                {specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 md:w-1/2">
                <FormField
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <CompoBox
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
                          {...field}
                          onChange={(value) => {
                            field.onChange(value);
                            setValue("state", "");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 md:w-1/2">
                <FormField
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex h-3.5 items-center gap-2">
                        State
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="text-muted-foreground h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Select the country first</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <CompoBox
                          className="w-full"
                          options={states.map((state) => ({
                            value: state.isoCode,
                            label: state.name,
                          }))}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="min-w-[250px] flex-1 md:w-1/2">
                <FormField
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Show error message if update failed */}
          {updateError && (
            <div className="rounded-base shadow-soft border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">Error: {updateError}</p>
            </div>
          )}

          {isDirty && (
            <div className="rounded-base shadow-soft sticky bottom-2 z-10 flex justify-start border bg-white p-3">
              <Button 
                type="submit" 
                disabled={isSubmitting || updating}
              >
                {isSubmitting || updating ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                onClick={() => reset()}
                variant="outline"
                className="ml-2"
                disabled={isSubmitting || updating}
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


