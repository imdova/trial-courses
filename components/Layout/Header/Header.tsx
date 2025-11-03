import HeaderSelector from "./SelectedHeader";
import { auth } from "@/auth";

const DynamicHeader = async () => {
  const session = await auth();
  const user = session?.user;

  return <HeaderSelector user={user} />;
};

export default DynamicHeader;
