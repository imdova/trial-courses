import { User } from "next-auth";
import AlertDropDown from "@/components/UI/AlertDropDown";
import FavoritesDropDown from "@/components/UI/FavoritesDropDown";
import UserDropDown from "@/components/UI/UserDropDown";
import { notification } from "@/constants";
import { useAppSelector } from "@/store/hooks";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/UI/button";

interface UserActionProps {
  user?: User;
  isHome?: boolean;
}

const HeaderAction: React.FC<UserActionProps> = ({ user, isHome }) => {
  const { courses } = useAppSelector((state) => state.cart);
  if (user && user.id) {
    return (
      <div className="flex items-center gap-1 text-inherit md:gap-3">
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/courses">
            <Search size={18} />
          </Link>
          {user.type === "student" && <FavoritesDropDown />}
          <Link className="relative" href="/cart">
            {courses.length ? (
              <span className="absolute -top-2 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-orange-500 text-[7px]">
                {courses.length}
              </span>
            ) : (
              ""
            )}
            <ShoppingCart size={18} />
          </Link>
          <AlertDropDown notification={notification} />
        </div>
        <UserDropDown user={user} />
      </div>
    );
  } else {
    return (
      <div className="flex gap-3">
        <Button asChild variant="ghost">
          <Link href="/auth/register">Sign Up</Link>
        </Button>
        <Button asChild variant={isHome ? "smoking" : "default"}>
          <Link href="/auth/signin">Login</Link>
        </Button>
      </div>
    );
  }
};

export default HeaderAction;
