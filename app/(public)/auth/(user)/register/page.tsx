import { RegisterForm } from "./RegisterForm";
import OnboardingRafikiImage from "@/assets/images/Onboarding-rafiki.svg";
import teacherImage from "@/assets/images/Mathematics-bro.svg";
import academyImage from "@/assets/images/college students-rafiki.svg";
import Image from "next/image";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ role: string }>;
}) => {
  const params = await searchParams;
  const role = params.role as "academy" | "instructor";
  return (
    <div className="grid min-h-svh pt-[60px] lg:grid-cols-2">
      {role === "instructor" ? (
        <div className="bg-primary/5 hidden h-full w-full lg:block">
          <Image
            src={teacherImage}
            alt="Image"
            width={1000}
            height={1000}
            className="mx-auto h-full w-3/4 object-contain"
          />
        </div>
      ) : role === "academy" ? (
        <div className="bg-primary/30 hidden h-full w-full lg:block">
          <Image
            src={academyImage}
            alt="Image"
            width={1000}
            height={1000}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="bg-primary/30 hidden h-full w-full lg:block">
          <Image
            src={OnboardingRafikiImage}
            alt="Image"
            width={1000}
            height={1000}
            className="h-full w-full object-contain"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <RegisterForm role={role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
