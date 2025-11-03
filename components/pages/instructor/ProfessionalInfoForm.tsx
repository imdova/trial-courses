/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "@/hooks/useProfile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import { Textarea } from "@/components/UI/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/UI/Check-Box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

const professionalInfoSchema = z.object({
  about: z.string().optional(),
  resumePath: z.string().optional(),
  experience: z.array(z.object({
    jobTitle: z.string().optional(),
    startYear: z.number().optional(),
    startMonth: z.number().optional(),
    currentlyWorkHere: z.boolean().optional(),
    endYear: z.number().optional(),
    endMonth: z.number().optional(),
  })).optional(),
  education: z.array(z.object({
    institute: z.string().optional(),
    programName: z.string().optional(),
    degreeAwarded: z.string().optional(),
    finalGrade: z.string().optional(),
    yearOfAdmission: z.number().optional(),
    yearOfGraduation: z.number().optional(),
  })).optional(),
  courses: z.array(z.object({
    courseTitle: z.string().optional(),
    courseDescription: z.string().optional(),
  })).optional(),
  skills: z.array(z.string()).optional(),
  activities: z.array(z.object({
    activityTitle: z.string().optional(),
    organizationInstitution: z.string().optional(),
    activityDate: z.string().optional(),
  })).optional(),
  languages: z.array(z.object({
    language: z.string().optional(),
    level: z.string().optional(),
  })).optional(),
});

interface ProfessionalInfoFormProps {
  user?: InstructorData;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const languageLevels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Native"];

export const ProfessionalInfoForm: React.FC<ProfessionalInfoFormProps> = ({ user }) => {
  const { saveProfile, updating, updateError } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<z.infer<typeof professionalInfoSchema>>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      about: "",
      resumePath: "",
      experience: [],
      education: [],
      courses: [],
      skills: [],
      activities: [],
      languages: [],
    },
  });

  const { control, handleSubmit, reset, watch, setValue, getValues } = form;

  const experienceFields = useFieldArray({
    control,
    name: "experience",
  });

  const educationFields = useFieldArray({
    control,
    name: "education",
  });

//   const coursesFields = useFieldArray({
//     control,
//     name: "courses",
//   });

//   const activitiesFields = useFieldArray({
//     control,
//     name: "activities",
//   });

  const languagesFields = useFieldArray({
    control,
    name: "languages",
  });

  // Update form with real data when user or profile changes
  useEffect(() => {
    if (user) {
      const userData = user;
      if (userData) {
        const metadata = userData.metadata || {};
        
        reset({
          about: userData.about || "",
          resumePath: userData.resumePath || userData.resumePath || "",
          experience: metadata.experience || [],
          education: metadata.education || [],
          courses: metadata.courses || [],
          skills: metadata.skills || [],
          activities: metadata.activities || [],
          languages: userData.languages ? userData.languages.map(lang => ({
            language: ('language' in lang ? lang.language : (lang as any).name) as string,
            level: ('level' in lang ? lang.level : (lang as any).proficiency) as string
          })) : [],
        });
      }
    }
  }, [user, reset]);

  const onSubmit = async (data: z.infer<typeof professionalInfoSchema>) => {
    try {
      setIsSubmitting(true);
      
      if (user?.id) {
        const userId = user?.id;
        
        // Map form data to the API structure
        const profileData = {
          about: data.about,
          resumePath: data.resumePath,
          languages: data.languages,
          metadata: {
            experience: data.experience,
            education: data.education,
            courses: data.courses,
            skills: data.skills,
            activities: data.activities,
          }
        };

        if (userId) {
          await saveProfile(userId, profileData);
          console.log("Professional info updated successfully");
        }
      }
    } catch (error) {
      console.error("Error updating professional info:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = getValues("skills");
      if(currentSkills && currentSkills?.length > 0 ){
          setValue("skills", [...currentSkills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = getValues("skills");
    if(currentSkills && currentSkills?.length > 0 ){
        setValue("skills", currentSkills.filter((_, i) => i !== index));
    }
  };

  const skills = watch("skills");

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Resume Section */}
        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name="resumePath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume URL/Path</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="/uploads/resume.pdf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Experience
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => experienceFields.append({
                  jobTitle: "",
                  startYear: new Date().getFullYear(),
                  startMonth: 1,
                  currentlyWorkHere: false,
                  endYear: new Date().getFullYear(),
                  endMonth: 12,
                })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {experienceFields.fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => experienceFields.remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <FormField
                  control={control}
                  name={`experience.${index}.jobTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Instructor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`experience.${index}.startYear`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`experience.${index}.startMonth`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Month</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((month, idx) => (
                              <SelectItem key={month} value={(idx + 1).toString()}>
                                {month}
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
                  control={control}
                  name={`experience.${index}.currentlyWorkHere`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I currently work here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {!watch(`experience.${index}.currentlyWorkHere`) && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`experience.${index}.endYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`experience.${index}.endMonth`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Month</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(parseInt(value))}
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select month" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {months.map((month, idx) => (
                                <SelectItem key={month} value={(idx + 1).toString()}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Education
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => educationFields.append({
                  institute: "",
                  programName: "",
                  degreeAwarded: "",
                  finalGrade: "",
                  yearOfAdmission: new Date().getFullYear() - 4,
                  yearOfGraduation: new Date().getFullYear(),
                })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {educationFields.fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => educationFields.remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`education.${index}.institute`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute</FormLabel>
                        <FormControl>
                          <Input placeholder="Cairo University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`education.${index}.programName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Computer Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`education.${index}.degreeAwarded`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree Awarded</FormLabel>
                        <FormControl>
                          <Input placeholder="BSc" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`education.${index}.finalGrade`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Final Grade</FormLabel>
                        <FormControl>
                          <Input placeholder="Excellent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`education.${index}.yearOfAdmission`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Admission</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`education.${index}.yearOfGraduation`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Graduation</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button type="button" onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
                
              {skills && skills.length > 0 && skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1"
                >
                  <span>{skill}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Languages
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => languagesFields.append({
                  language: "",
                  level: "",
                })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {languagesFields.fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-end">
                <FormField
                  control={control}
                  name={`languages.${index}.language`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input placeholder="English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`languages.${index}.level`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languageLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => languagesFields.remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Show error message if update failed */}
        {updateError && (
          <div className="rounded-base shadow-soft border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">Error: {updateError}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting || updating}
          >
            {isSubmitting || updating ? "Saving..." : "Save Professional Info"}
          </Button>
        </div>
      </form>
    </Form>
  );
};