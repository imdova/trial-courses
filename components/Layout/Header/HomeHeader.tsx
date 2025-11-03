import LogoIcon from "@/components/icons/logo.png";
import { BaseHeaderProps } from "@/types";
import Link from "next/link";
import HeaderAction from "./HeaderAction";
import { isCurrentPage } from "@/util";
import Image from "next/image";
import Advertisement from "@/components/UI/Advertisement";
import { useState } from "react";
import { Drawer } from "@/components/UI/Drawer";
import { Menu } from "lucide-react";
import { getNavLinks } from "@/config/routeConfigs";

const HomeHeader: React.FC<BaseHeaderProps> = ({ user, pathname }) => {
  const links = getNavLinks(user, pathname);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header className="bg-primary sticky top-0 z-50 w-full text-white shadow-md transition-colors duration-300">
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          <div className="flex h-[70px] items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="block lg:hidden"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={25} />
              </button>
              <Link href="/">
                <Image
                  src={LogoIcon}
                  alt="medicova logo"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <nav>
              <div className="hidden items-center space-x-5 lg:flex">
                {links.map((link, i) => {
                  const path = link.pattern || link.path;
                  const isPage = isCurrentPage(pathname, path);
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={i}
                      href={link?.path || "#"}
                      className={`flex items-center gap-2 text-sm font-medium ${
                        isPage ? "text-white" : ""
                      }`}
                    >
                      {IconComponent && (
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            isPage && "text-primary bg-white"
                          }`}
                        >
                          <IconComponent size={16} />
                        </span>
                      )}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
            <HeaderAction user={user} isHome />
          </div>
        </div>
        <div className="hidden md:block">
          <Advertisement
            type="banner"
            closable={true}
            localStorageKey="promo_ad"
          >
            <Link href={"#"}>
              <Image
                className="w-full"
                width={700}
                height={700}
                src={"/images/adj.png"}
                alt=""
              />
            </Link>
          </Advertisement>
        </div>
      </header>
      <div className="relative">
        <Drawer
          width="w-[250px]"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="left"
        >
          <div className="mt-4 space-y-3">
            {links.map((link, i) => {
              const path = link.pattern || link.path;
              const isPage = isCurrentPage(pathname, path);
              const IconComponent = link.icon;
              return (
                <Link
                  key={i}
                  href={link?.path || "#"}
                  className={`flex items-center gap-2 rounded-xl p-4 text-sm font-medium transition ${
                    isPage ? "bg-primary text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {IconComponent && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full">
                      <IconComponent size={16} />
                    </span>
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default HomeHeader;
