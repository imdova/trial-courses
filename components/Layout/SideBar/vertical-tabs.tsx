"use client";
// ====== IMPORTS ======
import { useSession } from "next-auth/react"; // Authentication
import Link from "next/link"; // Next.js routing

// ====== TYPES ======
import { User } from "next-auth";
import { NavItem } from "@/types";

// ====== HOOKS ======
import useActiveTab from "@/hooks/useActiveTab";

// ====== CONFIG ======
import { getSideBarLinks } from "@/config/routeConfigs";
import { getUserSharedData } from "@/util/user";
import { cn, isCurrentPage } from "@/util";
import { generateUrl } from "@/util/navigation";

// ====== COMPONENTS ======
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";
import { Separator } from "@/components/UI/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";

// ====== ICONS ======
import { ChevronDown } from "lucide-react";

// ====== TYPES ======
interface SideBarProps {
  user?: User;
  pathname: string;
  isMinimal?: boolean;
}

interface TabComponentProps {
  item: NavItem;
  user?: User;
  pathname: string;
  isActive: boolean;
}

interface ProfileTabProps {
  user: User;
  pathname: string;
  activeTab: number | null;
  isMinimal: boolean;
}

interface CollapseTabProps {
  item: NavItem;
  index: number;
  user?: User;
  activeTab: number | null;
  pathname: string;
  isCollapsed?: number | null;
  setIsCollapsed: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
  isMinimal: boolean;
}

const SectionHeader = ({
  text,
  isMinimal,
}: {
  text?: string;
  isMinimal: boolean;
}) => (
  <div className="h-[45px]">
    <Separator />
    <p
      className={`${
        isMinimal ? "px-1 text-xs" : "px-1 text-xs lg:text-sm"
      } font-medium text-gray-600 normal-case lg:p-4`}
    >
      {text}
    </p>
  </div>
);

const LinkTab = ({
  item,
  user,
  pathname,
  isActive: initialIsActive,
}: TabComponentProps) => {
  const IconComponent = item.icon;
  const disabled = item.path === "#" || item.path === undefined;
  const path = user ? generateUrl(item.path || "#", user) : item.path || "#";
  const activePath = item.pattern || item.path;

  const isActive =
    initialIsActive && activePath && isCurrentPage(pathname, activePath);

  return (
    <Link
      aria-disabled={disabled}
      className={`aria-disabled: mx-2 flex h-[45px] min-h-[40px] flex-row justify-start rounded-[10px] p-1 text-xs transition-all duration-300 ease-in-out aria-disabled:pointer-events-none aria-disabled:opacity-40 ${
        isActive
          ? "bg-secondary text-white opacity-100"
          : "text-muted-foreground"
      } `}
      href={path}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-4 text-left normal-case">
          {IconComponent && <IconComponent className="mx-1 size-4" />}
          <span>{item.label}</span>
        </div>
        {item.notifications && (
          <div
            className={`mr-2 items-center justify-center rounded-full p-0.5 ${
              isActive
                ? "bg-primary-foreground text-secondary"
                : "bg-secondary text-primary-foreground"
            } `}
          >
            <p className="size-4 text-center text-xs">{item.notifications}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

const CollapseTab = ({
  item,
  isCollapsed,
  setIsCollapsed,
  activeTab,
  pathname,
  user,
  index,
  isMinimal,
}: CollapseTabProps) => {
  const IconComponent = item.icon;
  const isOpen = isCollapsed === item.id;

  return (
    <Collapsible open={isOpen} onOpenChange={() => setIsCollapsed(item.id)}>
      <CollapsibleTrigger className="w-full px-2">
        <div
          className={`text-muted-foreground flex h-[45px] min-h-[40px] w-full cursor-pointer flex-row justify-start rounded-[10px] p-1 text-xs transition-all duration-300 ease-in-out`}
        >
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-4 text-left normal-case">
              {IconComponent && <IconComponent className="mx-1 size-4" />}
              <span>{item.label}</span>
            </div>
            <ChevronDown
              className={`${
                isOpen ? "rotate-180" : ""
              } mr-2 size-4 transition-transform duration-300`}
            />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        <div
          className={`${
            isMinimal
              ? "group-hover:ml-10"
              : "max-lg:group-hover:ml-10 lg:ml-10"
          } transition-all duration-300`}
        >
          {item.links?.map((link, linkIndex) => {
            const isActive = isOpen
              ? activeTab === index + linkIndex + 1
              : false;
            return (
              <LinkTab
                pathname={pathname}
                key={link.id}
                item={link}
                user={user}
                isActive={isActive}
              />
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const ProfileTab = ({
  user,
  pathname,
  activeTab,
  isMinimal,
}: ProfileTabProps) => {
  const { image, name, profileUrl, email } = getUserSharedData(user);

  const isActive =
    activeTab === 0 &&
    decodeURIComponent(pathname) === decodeURIComponent(profileUrl);

  return (
    <Link
      className={`${
        isMinimal ? "mx-0" : "lg:mx-2"
      } flex h-[45px] flex-row justify-start rounded-[10px] p-[5px] opacity-100 transition-all duration-300 ease-in-out ${
        isActive ? "bg-secondary text-white" : "text-gray-800/60"
      } `}
      href={profileUrl}
    >
      <div className="flex items-center gap-1">
        <Avatar className="h-10 w-10">
          <AvatarImage src={image} />
          <AvatarFallback
            className={cn(
              "bg-primary/10 text-xs",
              isActive ? "text-secondary bg-white" : "",
            )}
          >
            {name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h6 className="text-left text-sm normal-case">{name}</h6>
          <p className="line-clamp-1 max-w-full text-left text-xs break-all normal-case">
            {email}
          </p>
        </div>
      </div>
    </Link>
  );
};

// ====== MAIN COMPONENT ======

/**
 * VerticalTabs component.
 *
 * Renders a vertical tab navigation with collapsible sections and user profile tab.
 *
 * @param {SideBarProps} props - The props for the component.
 * @param {NextAuthUser} props.user - The user object.
 * @param {string} props.pathname - The current pathname.
 * @return {JSX.Element} The rendered VerticalTabs component.
 */

export default function VerticalTabs({
  user: initialUser,
  pathname,
  isMinimal = false,
}: SideBarProps) {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const user = sessionUser || initialUser;
  const links = getSideBarLinks(user, pathname);
  const { activeTab, isCollapsed, setIsCollapsed } = useActiveTab(
    links,
    pathname,
  );

  // Calculate position of the active indicator
  const indicatorPosition = activeTab ? activeTab * 45 + 7.5 : 7.5;

  return (
    <div className="relative overflow-hidden">
      {/* Active indicator */}
      <div
        style={{ top: `${indicatorPosition}px` }}
        className="indicator bg-secondary absolute left-0 h-[30px] w-1 rounded-full transition-all duration-700 ease-in-out"
      ></div>

      {/* Render navigation items */}
      {links.map((item, index) => {
        // Calculate additional offset for collapsed items
        const collapsedLinkIndex = links.findIndex(
          (link) => link.id === isCollapsed,
        );
        const collapsedLink = links.find((link) => link.id === isCollapsed);
        const additionalItems = isCollapsed
          ? index > collapsedLinkIndex
            ? collapsedLink?.links?.length || 0
            : 0
          : 0;

        // Render appropriate component based on item type
        switch (item.type) {
          case "profile":
            return user ? (
              <ProfileTab
                key={item.id}
                user={user}
                pathname={pathname}
                activeTab={activeTab}
                isMinimal={isMinimal}
              />
            ) : null;
          case "text":
            return (
              <SectionHeader
                key={item.id}
                text={item.section}
                isMinimal={isMinimal}
              />
            );

          case "collapse":
            return (
              <CollapseTab
                key={item.id}
                item={item}
                index={index}
                user={user}
                pathname={pathname}
                activeTab={activeTab}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMinimal={isMinimal}
              />
            );

          default:
            return (
              <LinkTab
                key={item.id}
                user={user}
                item={item}
                pathname={pathname}
                isActive={activeTab === index + additionalItems}
              />
            );
        }
      })}
    </div>
  );
}
