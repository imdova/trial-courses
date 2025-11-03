import { cn } from "@/util";
import Image from "next/image";

const LogoIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) => {
  return (
    <Image
      src="/images/logo-dark.png"
      alt="logo"
      width={100}
      height={100}
      className={cn("h-[40px] w-auto text-primary md:h-[50px]", className)}
      {...props}
    />
  );
};

export default LogoIcon;
