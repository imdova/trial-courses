import DynamicRadioGroup from "@/components/UI/DynamicRadioGroup";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
interface OwnershipProps {
  control: Control<InstructorProfile>;
  errors: FieldErrors<InstructorProfile>;
}

const InstructorOwnership: React.FC<OwnershipProps> = ({ control }) => {
  const academicRankOptions = [
    { value: "assistant", label: "Assistant Professor" },
    { value: "associate", label: "Associate Professor" },
    { value: "professor", label: "Professor" },
    { value: "lecturer", label: "Lecturer" },
  ];

  const employmentTypeOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "visiting", label: "Visiting" },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <h5 className="text-2xl font-semibold text-main">
        Instructor Employment Information
      </h5>

      {/* Employment Status */}
      <div className="pb-4">
        <h6 className="text-lg font-semibold text-gray-800 mb-4">
          Employment Status
        </h6>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Employment Type
            </label>
            <Controller
              name="employmentType"
              control={control}
              render={({ field }) => (
                <DynamicRadioGroup
                  {...field}
                  options={employmentTypeOptions}
                  row
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Academic Rank */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Academic Rank
              </label>
              <Controller
                name="academicRank"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select fullWidth size="small">
                    {academicRankOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Total Years of Experience
              </label>
              <Controller
                name="totalYearsExperience"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    fullWidth
                    size="small"
                    InputProps={{ inputProps: { min: 0, max: 50 } }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Institution Information */}
      <div className="pb-4">
        <h6 className="text-lg font-semibold text-gray-800 mb-4">
          Institution Information
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

          {/* Office Location */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Office Location
            </label>
            <Controller
              name="officeLocation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Building, Room Number"
                />
              )}
            />
          </div>

          {/* Office Hours */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Office Hours
            </label>
            <Controller
              name="officeHours"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="e.g. Mon-Wed 10AM-12PM"
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Career Information */}
      <div className="pb-4">
        <h6 className="text-lg font-semibold text-gray-800 mb-4">
          Career Information
        </h6>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Year Started Teaching */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Year Started Teaching
            </label>
            <Controller
              name="yearStartedTeaching"
              control={control}
              render={({ field }) => (
                <TextField {...field} select fullWidth size="small">
                  {yearOptions.map((year) => (
                    <MenuItem key={year} value={year.toString()}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          {/* Courses Taught */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Courses Taught (Comma Separated)
            </label>
            <Controller
              name="coursesTaught"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="e.g. AI Basics, Machine Learning"
                />
              )}
            />
          </div>

          {/* Research Interests */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Research Interests
            </label>
            <Controller
              name="researchInterests"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  placeholder="List your research interests separated by commas"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorOwnership;
