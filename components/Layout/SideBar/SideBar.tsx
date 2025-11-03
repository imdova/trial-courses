import DynamicSideBar from "./dynamic-side-bar";
import { auth } from "@/auth";

const SideBar = async () => {
  const session = await auth();
  const user = session?.user;
  if(!user) return null;
  return <DynamicSideBar user={user} />;
};

export default SideBar;
