import ProfileImage from "@/components/UI/ProfileImage";
import SchedulePicker from "@/components/UI/SchedulePicker";
import { uploadFiles } from "@/lib/actions/upload.actions";
import { MenuItem, TextField } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";

interface MainInfoProps {
  formMethods: UseFormReturn<InstructorProfile>;
}

const MainInformation: React.FC<MainInfoProps> = ({ formMethods }) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = formMethods;

  const avatar = getValues("avatar");
  const watchGender = watch("gender");

  const updateImage = async (file: File) => {
    const [avatar] = await uploadFiles([file]);
    setValue("avatar", avatar, { shouldDirty: true });
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  return (
    <div className="space-y-6">
      <h5 className="text-2xl font-semibold text-main">
        Instructor Main Information
      </h5>

      {/* Profile Image and Basic Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <ProfileImage
            currentImageUrl={avatar || ""}
            alt={"instructor image"}
            size="xLarge"
            onImageUpdate={updateImage}
            imageClassName="border-4 border-white shadow-lg rounded-lg"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              First Name *
            </label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter first name"
                  error={!!errors?.firstName?.message}
                />
              )}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter last name"
                  error={!!errors?.lastName?.message}
                />
              )}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="e.g. Dr, Prof"
                />
              )}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  size="small"
                  value={watchGender || ""}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          {/* Birth Date */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Birth Date
            </label>
            <SchedulePicker
              name="birthDate"
              control={control}
              setValue={setValue}
              className="w-full p-2.5 border border-gray-300 hover:border-gray-500 focus:outline-primary rounded text-sm"
              placeholder="Select birth date"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <TextField {...field} select fullWidth size="small">
                  {maritalStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="pb-2">
        <h6 className="text-lg font-semibold text-gray-800 mb-4">
          Professional Information
        </h6>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Department
            </label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="e.g. Computer Science"
                />
              )}
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Specialization
            </label>
            <Controller
              name="specialization"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="e.g. Artificial Intelligence"
                />
              )}
            />
          </div>

          {/* Academic Rank */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Academic Rank
            </label>
            <Controller
              name="academicRank"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="e.g. Professor"
                />
              )}
            />
          </div>

          {/* Total Years Experience */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <Controller
              name="totalYearsExperience"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" fullWidth size="small" />
              )}
            />
          </div>
        </div>
      </div>

      {/* About/Bio */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          About/Bio
        </label>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              placeholder="Tell us about yourself, your qualifications, and experience..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  p: 2,
                  borderRadius: "8px",
                },
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default MainInformation;
