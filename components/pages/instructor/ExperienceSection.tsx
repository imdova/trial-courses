/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";
import experiencesImage from "@/components/icons/briefcase.png";

// Types
type OptExperienceData = ExperienceData & {
  startYear: string;
  endYear: string;
  startMonth: string;
  endMonth: string;
  jobTitle: string;
};

// UI Components
import EmptyCard from "@/components/UI/emptyCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { IconButton } from "@mui/material";
import { Add, Edit, LocationOnOutlined } from "@mui/icons-material";

// Utils
// import { formatLocation } from "@/util/general";
import { formatDate, getDuration } from "@/util";
import Image from "next/image";
import { useLocationData } from "@/hooks/useLocationData";
// import ExperienceSkeleton from "@/components/loading/skeleton-experince";
import { FieldConfig } from "@/types/forms";
import FormModal from "@/components/FormModal/FormModal";
import { Button } from "@/components/UI/button";
import { Plus } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                CONFIGURATION                               */
/* -------------------------------------------------------------------------- */
const years = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (v, k) => k + 1900,
).reverse();
const months = [
  { full: "January", short: "Jan", number: "01" },
  { full: "February", short: "Feb", number: "02" },
  { full: "March", short: "Mar", number: "03" },
  { full: "April", short: "Apr", number: "04" },
  { full: "May", short: "May", number: "05" },
  { full: "June", short: "Jun", number: "06" },
  { full: "July", short: "Jul", number: "07" },
  { full: "August", short: "Aug", number: "08" },
  { full: "September", short: "Sep", number: "09" },
  { full: "October", short: "Oct", number: "10" },
  { full: "November", short: "Nov", number: "11" },
  { full: "December", short: "Dec", number: "12" },
];
// Preview limits
const INITIAL_VISIBLE_ITEMS = 2;

/* -------------------------------------------------------------------------- */
/*                               HELPER FUNCTIONS                            */
/* -------------------------------------------------------------------------- */

const getInitialValues = (values: Partial<ExperienceData>) => {
  const initialValues: Partial<OptExperienceData> = values
    ? {
        ...values,
        id: values.id, // ensure id is present
        jobTitle: (values as any).title || (values as any).jobTitle || "",
        title: (values as any).title || (values as any).jobTitle || "",
        startYear: values.startDate?.split("-")[0],
        endYear: values.isPresent ? "" : values.endDate?.split("-")[0],
        startMonth: values.startDate?.split("-")[1],
        endMonth: values.isPresent ? "" : values.endDate?.split("-")[1],
      }
    : {};
  return initialValues;
};

/* -------------------------------------------------------------------------- */
/*                               HELPER COMPONENTS                            */
/* -------------------------------------------------------------------------- */

/**
 * Renders the Experience modal form.
 */
const ExperienceFormModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onCreate: (formData: Partial<ExperienceData>) => void;
  onUpdate: (formData: Partial<ExperienceData>) => void;
  onDelete: (formData: Partial<ExperienceData>) => void;
  initialValue: Partial<ExperienceData>;
  isLoading?: boolean;
}> = ({ open, onClose, onCreate, onUpdate, onDelete, initialValue, isLoading }) => {
  const [countryCode, setCountryCode] = useState(
    initialValue?.country?.code || "",
  );
  const { countries, states } = useLocationData(countryCode);
  
  const fields: FieldConfig[] = [
    {
      name: "jobTitle",
      type: "text",
      label: "Job Title",
      textFieldProps: { placeholder: "Enter Job Title" },
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: "Company | Organization",
      textFieldProps: { placeholder: "Enter Company" },
    },
    {
      name: "startYear",
      type: "search-select",
      label: "Start Year",
      gridProps: { xs: 6 },
      textFieldProps: { placeholder: "Start Year" },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      required: true,
    },
    {
      name: "startMonth",
      label: "Start Month",
      type: "search-select",
      gridProps: { xs: 6 },
      textFieldProps: { placeholder: "Start Month" },
      options: months.map((month) => ({
        value: month.number,
        label: month.full,
      })),
      required: true,
    },
    {
      name: "endYear",
      label: "End Year",
      type: "search-select",
      gridProps: { xs: 6 },
      textFieldProps: { placeholder: "End Year" },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      rules: {
        validate: (value: string, formValues: OptExperienceData) => {
          return !value ||
            !formValues?.startYear ||
            Number(value) >= Number(formValues.startYear)
            ? true
            : "End Year must be after start year";
        },
      },
      required: true,
    },
    {
      name: "endMonth",
      label: "End Month",
      type: "search-select",
      gridProps: { xs: 6 },
      textFieldProps: { placeholder: "End Month" },
      options: months.map((month) => ({
        value: month.number,
        label: month.full,
      })),
      required: true,
    },
    {
      name: "isPresent",
      label: "I currently work there",
      type: "checkbox",
      resetFields: ["endYear", "endMonth"],
      hideFieldNames: ["endYear", "endMonth"],
    },
    {
      name: "country.code",
      type: "search-select",
      label: "Country",
      required: true,
      resetFields: ["state.code"],
      textFieldProps: {
        placeholder: "Select country",
      },
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value) => setCountryCode(value),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "state.code",
      type: "search-select",
      label: "State",
      required: true,
      dependsOn: "country.code",
      textFieldProps: {
        placeholder: "Select state",
      },
      options: states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      required: true,
      textFieldProps: {
        placeholder: "Enter City",
      },
      gridProps: { xs: 12, md: 4 },
      rules: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  const onSubmit = (formData: Partial<OptExperienceData>) => {
    const { state: formState, country: formCountry } = formData;
    const country =
      countries.find((country) => country.isoCode === formCountry?.code) ||
      null;
    const state =
      states.find((state) => state.isoCode === formState?.code) || null;

    const startDate = formData.startYear + "-" + formData.startMonth;
    const endDate = formData.isPresent
      ? null
      : formData.endYear + "-" + formData.endMonth;

    const body = {
      ...formData,
      id: formData.id, // ensure id is present
      title: formData.jobTitle || "", // Always map jobTitle to title
      country: { code: country?.isoCode, name: country?.name },
      state: { code: state?.isoCode, name: state?.name },
      startDate,
      endDate,
    } as ExperienceData;

    if (body?.id) {
      onUpdate(body);
    } else {
      onCreate(body);
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      onDelete={initialValue?.id ? onDelete : undefined}
      fields={fields}
      title="Add Experience"
      deleteButtonText="Delete Experience"
      initialValues={initialValue}
      loading={isLoading}
    />
  );
};

/**
 * Renders the Experience section content with collapsible preview.
 */
const ExperienceContent: React.FC<{
  experiences: ExperienceData[];
  onAdd: () => void;
  onEdit: (item: ExperienceData) => void;
}> = ({ experiences, onAdd, onEdit }) => {
  return (
    <div className="rounded-base shadow-soft mt-5 border border-gray-200 bg-white p-3 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-main text-xl font-semibold">Experiences</h3>
        <IconButton
          className="rounded border border-solid border-gray-200 p-2"
          onClick={onAdd}
        >
          <Add />
        </IconButton>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
        {experiences
          .slice(0, INITIAL_VISIBLE_ITEMS)
          .map((experience, index) => (
            <ExperienceItem
              key={index}
              item={experience}
              index={index}
              length={experiences.length}
              onEdit={onEdit}
            />
          ))}
        {INITIAL_VISIBLE_ITEMS < experiences.length && (
          <Collapsible className="col-span-2">
            <CollapsibleContent className="CollapsibleContent">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {experiences
                  .slice(INITIAL_VISIBLE_ITEMS)
                  .map((experience, index) => (
                    <ExperienceItem
                      key={index + INITIAL_VISIBLE_ITEMS}
                      item={experience}
                      index={index + INITIAL_VISIBLE_ITEMS}
                      length={experiences.length}
                      onEdit={onEdit}
                    />
                  ))}
              </div>
            </CollapsibleContent>
            <CollapsibleTrigger className="group text-muted-foreground hover:text-main mt-2 w-full text-center text-sm">
              Show
              <span className="text-sm group-aria-expanded:hidden">
                {" "}
                {experiences.length - INITIAL_VISIBLE_ITEMS} more{" "}
              </span>
              <span className="hidden text-sm group-aria-expanded:inline">
                {" "}
                less{" "}
              </span>
              experiences
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </div>
    </div>
  );
};

type ApiExperience = {
  jobTitle?: string;
  startYear?: number | null;
  startMonth?: number | null;
  endYear?: number | null;
  endMonth?: number | null;
  currentlyWorkHere?: boolean;
  city?: string;
  country?: { name?: string; code?: string };
  state?: { name?: string; code?: string };
};

// Add type guard for API shape
const isApiExperience = (itm: any): itm is ApiExperience =>
  itm.startYear !== undefined && itm.startMonth !== undefined;

// Normalize API or local experience to local shape
function normalizeExperience(item: ExperienceData | ApiExperience): ExperienceData {
  if ((item as ExperienceData).startDate !== undefined) {
    return item as ExperienceData;
  }
  // Convert API shape to local shape
  const apiItem = item as any;
  return {
    ...item,
    startDate: apiItem.startYear && apiItem.startMonth
      ? `${apiItem.startYear}-${String(apiItem.startMonth).padStart(2, "0")}`
      : undefined,
    endDate: apiItem.endYear && apiItem.endMonth
      ? `${apiItem.endYear}-${String(apiItem.endMonth).padStart(2, "0")}`
      : undefined,
    isPresent: apiItem.currentlyWorkHere,
    title: apiItem.jobTitle,
  } as ExperienceData;
}

const ExperienceItem: React.FC<{
  item: ExperienceData | ApiExperience;
  index: number;
  length: number;
  onEdit: (item: ExperienceData) => void;
}> = ({ item, index, length, onEdit }) => {
  const isLastItem = index === length - 1;
  const isOddLength = length % 2 !== 0;
  const spanTwoCols = isOddLength && isLastItem;

  // Support both local ExperienceData shape and API metadata shape
  const isLocal = (itm: ExperienceData | ApiExperience): itm is ExperienceData =>
    (itm as ExperienceData).startDate !== undefined;

  const jobTitle = isLocal(item) ? (item.title || "") : (item.jobTitle || "");

  const startYear = isLocal(item)
    ? Number(item.startDate?.split("-")[0])
    : (item.startYear ?? undefined);
  const startMonth = isLocal(item)
    ? Number(item.startDate?.split("-")[1])
    : (item.startMonth ?? undefined);
  const endYear = isLocal(item)
    ? (item.endDate ? Number(item.endDate?.split("-")[0]) : undefined)
    : (item.endYear ?? undefined);
  const endMonth = isLocal(item)
    ? (item.endDate ? Number(item.endDate?.split("-")[1]) : undefined)
    : (item.endMonth ?? undefined);
  const isPresent = isLocal(item)
    ? Boolean(item.isPresent)
    : Boolean(item.currentlyWorkHere);

  const startDateIso = startYear && startMonth
    ? `${startYear}-${String(startMonth).padStart(2, "0")}`
    : (isLocal(item) ? item.startDate : undefined);
  const endDateIso = isPresent
    ? undefined
    : (endYear && endMonth
      ? `${endYear}-${String(endMonth).padStart(2, "0")}`
      : (isLocal(item) ? item.endDate : undefined));

  const city = isLocal(item) ? item.city : item.city;
  const countryName = isLocal(item) ? item.country?.name : item.country?.name;
  const stateName = isLocal(item) ? item.state?.name : item.state?.name;
  const location = [city, stateName, countryName].filter(Boolean).join(", ");
  const duration = getDuration({
    startDate: startDateIso || "",
    endDate: endDateIso || undefined,
  });
  
  return (
    <div
      className={`${spanTwoCols ? "col-span-2" : "col-span-1"} rounded-base flex items-center gap-3 border border-gray-200 p-2`}
    >
      <Image src={experiencesImage} alt="Experience" width={60} height={60} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h6 className="text-main leading-tight font-semibold">{isLocal(item) ? item.name : jobTitle || "Experience"}</h6>
          <IconButton onClick={() => isLocal(item) && onEdit(item)} disabled={!isLocal(item)}>
            <Edit className="h-5 w-5" />
          </IconButton>
        </div>
        <p className="text-muted-foreground text-sm">{jobTitle}</p>
        <p className="text-muted-foreground text-sm">
          {formatDate(startDateIso || "", { year: true, month: true, day: false })}{" "}
          -{" "}
          {isPresent
            ? "Now"
            : formatDate(endDateIso || "", {
                year: true,
                month: true,
                day: false,
              })}{" "}
          {duration}
        </p>
        <div className="text-muted-foreground flex text-sm">
          <LocationOnOutlined className="-ml-1 text-base" />
          <p className="text-muted-foreground text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const InstructorExperienceSection = () => {
  const { data: session } = useSession();
  const { getProfile, saveProfile, profile, loading, updating } = useProfile();
  
  // Get user ID from props, instructor, or session
  const targetUserId = session?.user?.id;
  // const isOwnProfile = session?.user?.id === targetUserId;
  
  // State for experiences from profile metadata
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [initialValue, setInitialValue] = useState<Partial<ExperienceData>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load profile data on component mount
  useEffect(() => {
    if (targetUserId && !profile) {
      getProfile(targetUserId);
    }
  }, [targetUserId, getProfile, profile]);

  // Update experiences when profile data changes
  useEffect(() => {
    if (profile?.metadata) {
      try {
        const metadata = typeof profile.metadata === 'string' 
          ? JSON.parse(profile.metadata) 
          : profile.metadata;
        
        // Use the experience key from metadata
        if (metadata?.experience && Array.isArray(metadata.experience)) {
          setExperiences(metadata.experience.map(normalizeExperience));
        } else {
          setExperiences([]);
        }
      } catch (error) {
        console.error("Error parsing profile metadata:", error);
        setExperiences([]);
      }
    } else {
      setExperiences([]);
    }
  }, [profile]);

  const createInitialValue = () => ({
    country: profile?.country || { code: "", name: "" },
    state: profile?.state || { code: "", name: "" },
    city: profile?.city || "",
    isPresent: true,
    jobTitle: "",
  });

  const handleOpen = () => {
    setInitialValue(createInitialValue());
    setIsModalOpen(true);
  };

  const onEdit = (item: ExperienceData) => {
    setInitialValue(getInitialValues(item));
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setInitialValue(createInitialValue());
  };

  const updateProfileExperience = async (newExperiences: ExperienceData[]) => {
    if (!targetUserId || !profile) return;
  
    try {
      // Parse existing metadata
      const existingMetadata = profile.metadata 
        ? (typeof profile.metadata === 'string' ? JSON.parse(profile.metadata) : profile.metadata)
        : {};
  
      // Transform experiences to match API expectations
      const formattedExperiences = newExperiences.map(exp => {
        const startYearStr = exp.startDate?.split("-")[0];
        const startMonthStr = exp.startDate?.split("-")[1];
        const endYearStr = exp.endDate?.split("-")[0];
        const endMonthStr = exp.endDate?.split("-")[1];

        const startYear = startYearStr ? parseInt(startYearStr, 10) : undefined;
        const startMonth = startMonthStr ? parseInt(startMonthStr, 10) : undefined;
        const endYear = exp.isPresent ? null : (endYearStr ? parseInt(endYearStr, 10) : null);
        const endMonth = exp.isPresent ? null : (endMonthStr ? parseInt(endMonthStr, 10) : null);

        // Basic validation to satisfy API constraints
        if (!startYear || startYear < 1900) {
          throw new Error("Start year must be >= 1900");
        }
        if (!startMonth || startMonth < 1 || startMonth > 12) {
          throw new Error("Start month must be between 1 and 12");
        }
        if (!exp.isPresent) {
          if (endYear !== null && endYear !== undefined && endYear < 1900) {
            throw new Error("End year must be >= 1900");
          }
          if (endMonth !== null && endMonth !== undefined && (endMonth < 1 || endMonth > 12)) {
            throw new Error("End month must be between 1 and 12");
          }
        }

        return {
          jobTitle: String(exp.title || ""),
          startYear,
          startMonth,
          endYear,
          endMonth,
          currentlyWorkHere: Boolean(exp.isPresent),
          city: exp.city,
          country: {
            name: exp.country?.name?.toString(),
            code: exp.country?.code,
          },
          state: {
            name: exp.state?.name?.toString(),
            code: exp.state?.code,
          },
        };
      });
  
      // Update experience key in metadata
      const updatedMetadata = {
        ...existingMetadata,
        experience: formattedExperiences,
      };
  
      // Prepare profile data for update
      const profileData = {
        metadata: updatedMetadata,
      };
  
      // Save to API using useProfile hook
      await saveProfile(targetUserId, profileData);
      
      // Update local state
      setExperiences(newExperiences);
      
      console.log("Experience updated successfully");
    } catch (error) {
      console.error("Error updating experience:", error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleCreate = async (formData: Partial<ExperienceData>) => {
    const newExperience: ExperienceData = {
      ...formData,
      id: Date.now().toString(), // Generate temporary ID
    } as ExperienceData;

    const updatedExperiences = [...experiences, newExperience];
    await updateProfileExperience(updatedExperiences);
    handleClose();
  };

  const handleUpdate = async (formData: Partial<ExperienceData>) => {
    if (!formData.id) return;

    const updatedExperiences = experiences.map(exp => 
      exp.id === formData.id ? { ...exp, ...formData } as ExperienceData : exp
    );
    
    await updateProfileExperience(updatedExperiences);
    handleClose();
  };

  const handleDelete = async (formData: Partial<ExperienceData>) => {
    if (!formData.id) return;

    const updatedExperiences = experiences.filter(exp => exp.id !== formData.id);
    await updateProfileExperience(updatedExperiences);
    handleClose();
  };

  // Show loading state
  if (loading && !profile) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading experience data...</p>
        </div>
      </div>
    );
  }

  // // Don't show section if not own profile and no experiences
  // if (!isOwnProfile && experiences.length === 0) {
  //   return null;
  // }

  const ExperienceEmpty = experiences.length === 0;

  return (
    <>
      {/* Experience Form Modal */}
      <ExperienceFormModal
        open={isModalOpen}
        onClose={handleClose}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        initialValue={initialValue}
        isLoading={updating}
      />

      {/* If empty show placeholder, else show content */}
      {ExperienceEmpty ? (
         (
          <Card>
            <CardHeader>
              <CardTitle>Experiences :</CardTitle>
              <CardAction>
                <Button onClick={handleOpen} size="icon" variant="outline">
                  <Plus className="text-muted-foreground" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-2">
              <EmptyCard
                src="/images/activities.png"
                description="Your Experience Section is empty."
                buttonText="Add Experience"
                onClick={handleOpen}
              />
            </CardContent>
          </Card>
        )
      ) : (
        <ExperienceContent
          experiences={experiences}
          onAdd={handleOpen}
          onEdit={onEdit}
        />
      )}
    </>
  );
};

export default InstructorExperienceSection;
