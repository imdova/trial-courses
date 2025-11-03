import DurationInput from "@/components/UI/DurationInput";
import { RadioGroup } from "@/components/UI/RadioGroup";
import SchedulePicker from "@/components/UI/SchedulePicker";
import { QuizFormValuesTwo, RadioGroupOption } from "@/types/forms";
import { BringToFront, Clock, Settings } from "lucide-react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface QuizSettingsProps {
  register: UseFormRegister<QuizFormValuesTwo>;
  errors: FieldErrors<QuizFormValuesTwo>;
  watch: UseFormWatch<QuizFormValuesTwo>;
  control: Control<QuizFormValuesTwo>;
  setValue: UseFormSetValue<QuizFormValuesTwo>;
}

const availabilityOptions = [
  { value: "permanent", label: "Permanent" },
  { value: "setTimeLimit", label: "Set Time Limit" },
];
const takenTimeOptions: RadioGroupOption[] = [
  { value: "unlimited", label: "Unlimited" },
  { value: "one", label: "One" },
  {
    value: "multiple",
    label: "Multiple",
    showInput: true,
    inputProps: {
      name: "multipleTakenTime",
      label: "times",
      placeholder: "0 (no limit) or a positive number",
      type: "number",
      validation: {
        required: "This field is required",
        min: {
          value: 0,
          message: "Must be 0 or a positive number",
        },
      },
    },
  },
];

export default function QuizSettings({
  watch,
  register,
  errors,
  control,
  setValue,
}: QuizSettingsProps) {
  const currentAvailability = watch("availability");
  const timeControl = watch("timeControl");
  const currentPassingScoreAllawed = watch("passingScoreAllawed");
  const PerPersonPerDay = watch("per_person_per_day");
  return (
    <div className="overflow-hidden  mb-4 p-3">
      <div className="space-y-8">
        <div>
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
            <Settings size={20} /> Quiz Settings
          </h2>
          <RadioGroup
            name="availability"
            options={availabilityOptions}
            label="Availability"
            required
            variant="solid"
            className="mb-4"
            register={register}
            errors={errors}
            control={control}
          />
          {currentAvailability === "setTimeLimit" && (
            <>
              <p className="text-muted-foreground text-sm mb-2">
                Dates and times will apply to your timezone
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <SchedulePicker
                    name="startDate"
                    className="w-full"
                    placeholder="YYYY-MM-DD HH:mm"
                    mode="start-only"
                    control={control}
                    setValue={setValue}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <SchedulePicker
                    name="endDate"
                    className="w-full"
                    placeholder="YYYY-MM-DD HH:mm"
                    mode="start-only"
                    control={control}
                    setValue={setValue}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Late Time:
          </label>
          <input
            type="number"
            className="w-full max-w-[100px] px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none"
            {...register("lateTime")}
          />
          <p className="text-sm">
            minutes{" "}
            <span className="text-muted-foreground text-sm">
              (Candidates will not be allowed to take the exam, X mins after the
              exam begining.)
            </span>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
            <Clock size={20} /> Time Settings
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 ">
            <div>
              <div>
                <RadioGroup
                  name="takenTime"
                  options={takenTimeOptions}
                  label="Exam Taken Times"
                  variant="solid"
                  className="mb-4"
                  register={register}
                  errors={errors}
                  control={control}
                />
              </div>
              <div className="flex gap-6 items-center">
                <label
                  htmlFor="per_person_per_day"
                  className="flex gap-3 items-center cursor-pointer w-fit"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="per_person_per_day"
                      {...register("per_person_per_day")}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold">Per Person Per Day</h2>
                  </div>
                </label>
                {PerPersonPerDay && (
                  <div className="flex gap-2 items-center text-sm">
                    <input
                      placeholder="0 (no limit) or a positive number"
                      type="number"
                      className="w-full max-w-[100px] px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none"
                      {...register("perPersonPerDayTakenTime")}
                    />
                    times
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-7">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Answer Time Control
              </span>

              {/* Radio-style toggle group */}
              <div className="space-y-4">
                {/* Flexible Option */}
                <label className="flex gap-3 items-center cursor-pointer w-fit">
                  <div className="relative">
                    <input
                      type="radio"
                      name="timeControl"
                      value="flexible"
                      checked={timeControl === "flexible"}
                      onChange={() => setValue("timeControl", "flexible")}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-12 h-6 rounded-full ${
                        timeControl === "flexible"
                          ? "bg-primary"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                        timeControl === "flexible"
                          ? "transform translate-x-6"
                          : ""
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold">Flexible</h2>
                  </div>
                </label>

                {/* Quiz Timer Option */}
                <div className="flex gap-6 items-end">
                  <label className="flex gap-3 items-center cursor-pointer w-fit">
                    <div className="relative">
                      <input
                        type="radio"
                        name="timeControl"
                        value="quizTimer"
                        checked={timeControl === "quizTimer"}
                        onChange={() => setValue("timeControl", "quizTimer")}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-12 h-6 rounded-full ${
                          timeControl === "quizTimer"
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                          timeControl === "quizTimer"
                            ? "transform translate-x-6"
                            : ""
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold">Enable Quiz Timer</h2>
                    </div>
                  </label>
                  {timeControl === "quizTimer" && (
                    <DurationInput
                      name="quizTimer"
                      control={control}
                      errors={errors}
                    />
                  )}
                </div>

                {/* Per Question Option */}
                <div className="flex gap-6 items-end">
                  <label className="flex gap-3 items-center cursor-pointer w-fit">
                    <div className="relative">
                      <input
                        type="radio"
                        name="timeControl"
                        value="perQuestion"
                        checked={timeControl === "perQuestion"}
                        onChange={() => setValue("timeControl", "perQuestion")}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-12 h-6 rounded-full ${
                          timeControl === "perQuestion"
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                          timeControl === "perQuestion"
                            ? "transform translate-x-6"
                            : ""
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold">
                        Time Limit Per Question
                      </h2>
                    </div>
                  </label>
                  {timeControl === "perQuestion" && (
                    <DurationInput
                      name="limitQuestionTime"
                      control={control}
                      errors={errors}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" block">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
            <BringToFront size={20} /> Questions Order
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="randomizeQuestions"
                className="flex gap-3 items-center w-fit cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="randomizeQuestions"
                    {...register("randomizeQuestions")}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
                </div>
                <div>
                  <h2 className="text-sm font-bold">Randomize Questions</h2>
                  <span className="text-xs font-medium text-muted-foreground">
                    Shuffle questions for each participant
                  </span>
                </div>
              </label>
            </div>
            <div>
              <label
                htmlFor="randomizeAnswers"
                className="flex gap-3 items-center w-fit  cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="randomizeAnswers"
                    {...register("randomizeAnswers")}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
                </div>
                <div>
                  <h2 className="text-sm font-bold">Randomize Answers</h2>
                  <span className="text-xs font-medium text-muted-foreground">
                    Shuffle answers for each question
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
          <Settings size={20} /> Grading
        </h2>
        <div className="space-y-3">
          <div>
            <label
              htmlFor="passingScoreAllawed"
              className="flex gap-4 items-center cursor-pointer w-fit"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="passingScoreAllawed"
                  {...register("passingScoreAllawed")}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
              </div>
              <div>
                <h2 className="text-sm font-bold">Pass Score</h2>
                <span className="text-xs font-medium text-muted-foreground">
                  set passing score for this quiz
                </span>
              </div>
            </label>
          </div>
          {currentPassingScoreAllawed && (
            <div>
              <label className="block w-full text-sm font-medium text-gray-700 mb-1">
                Passing Score (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className={`px-3 w-full max-w-[150px] py-2 border ${
                  errors.passingScore ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none `}
                {...register("passingScore", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be positive" },
                  max: { value: 100, message: "Cannot exceed 100" },
                })}
              />
              {errors.passingScore && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.passingScore.message}
                </p>
              )}
            </div>
          )}
        </div>
        <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
          <Settings size={20} /> Feedback and Summary
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="feedbackByEmail"
              className="flex gap-3 items-center w-fit cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="feedbackByEmail"
                  {...register("feedbackByEmail")}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
              </div>
              <div>
                <h2 className="text-sm font-bold">Feedback By Email</h2>
                <span className="text-xs font-medium text-muted-foreground">
                  Send feadback to Student email
                </span>
              </div>
            </label>
          </div>
          <div>
            <label
              htmlFor="answerSummary"
              className="flex gap-3 items-center w-fit  cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="answerSummary"
                  {...register("answerSummary")}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
              </div>
              <div>
                <h2 className="text-sm font-bold">Answers Summary</h2>
                <span className="text-xs font-medium text-muted-foreground">
                  Show correct answers after each quaestion
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
