import LogoIcon from "@/components/icons/logo";
import { Button } from "@/components/UI/button";
import { User } from "next-auth";
import Link from "next/link";

const MinimalHeader: React.FC<{ user?: User }> = ({ user }) => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border border-gray-200 bg-white shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <div className="flex h-[60px] items-center">
          <Link href="/">
            <LogoIcon />
          </Link>
          {!user && (
            <nav className="ml-auto flex space-x-4">
              <Button asChild variant="outline">
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
export default MinimalHeader;
