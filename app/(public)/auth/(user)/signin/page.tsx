import { LoginForm } from "./LoginForm";
import partner from "../../../../../assets/images/Helping a partner-cuate.svg";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh pt-[60px] lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="w-full bg-primary/30 h-full">
        <Image
          src={partner}
          alt="Image"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
