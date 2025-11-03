import { TextField } from "@mui/material";
import PhoneNumberInput from "@/components/UI/phoneNumber";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { isValidPhoneNumber } from "@/util/forms";

interface InstructorContactProps {
  control: Control<InstructorProfile>;
  errors: FieldErrors<InstructorProfile>;
}

const InstructorContactInputs: React.FC<InstructorContactProps> = ({
  control,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <h5 className="text-main text-2xl font-semibold">Contact Information</h5>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email *
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="instructor@university.edu"
                error={!!errors?.email?.message}
                helperText={errors?.email?.message}
              />
            )}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: "Phone Number is required",
              validate: (value) =>
                isValidPhoneNumber(value || "") ||
                "Please enter a valid phone number",
            }}
            render={({ field }) => (
              <PhoneNumberInput
                {...field}
                value={field.value ?? ""}
                id="phone"
                placeholder="+201001234567"
              />
            )}
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            WhatsApp
          </label>
          <Controller
            name="whatsapp"
            control={control}
            render={({ field }) => (
              <PhoneNumberInput
                {...field}
                value={field.value ?? ""}
                id="whatsapp"
                placeholder="+201001234567"
              />
            )}
          />
        </div>

        {/* Website */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Website
          </label>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="https://drmohamed.com"
                type="url"
              />
            )}
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-4">
        <h6 className="mb-3 text-lg font-semibold text-gray-800">
          Social Media
        </h6>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* LinkedIn */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <Controller
              name="socialLinks.linkedin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="https://linkedin.com/in/drmohamed"
                  type="url"
                />
              )}
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Twitter
            </label>
            <Controller
              name="socialLinks.twitter"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="https://twitter.com/drmohamed"
                  type="url"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorContactInputs;
