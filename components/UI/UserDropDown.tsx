"use client";
import { ChevronDown, CircleUser, LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/util";

const UserDropDown: React.FC<{ user: User; className?: string }> = ({
  user,
  className,
}) => {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  user = sessionUser || user;
  const isStudent = user.type === "student";
  const path = isStudent
    ? `/st/${user.userName}`
    : user.hasAcademy
      ? `/ac/${user.academy?.slug}`
      : `/in/${user.userName}`;
  const settingsPath = user.hasAcademy || user.type === "instructor"
    ? `/instructor/settings`
    : `/student/settings`;
  const name = user.hasAcademy ? user.academy.name : user.firstName;
  const image = user.hasAcademy ? user.academy.image : user.image;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex cursor-pointer items-center gap-2 focus:outline-none">
          <span className="sr-only">Open user menu</span>
          <Avatar className="h-10 w-10">
            <AvatarImage src={image || ""} />
            <AvatarFallback className={cn("bg-primary/10 text-xs", className)}>
              {name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-xs font-semibold">{name}</span>
            <ChevronDown size={18} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={path}>
              <CircleUser className="text-muted-foreground h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={settingsPath}>
              <Settings className="text-muted-foreground h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="text-muted-foreground h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
