import { auth } from "@/auth";
import BundleForm from "../../components/BundleForm";
import { getBundleById } from "@/lib/actions/bundles.actions";
import { bundleItemToForm } from "../../utils/transform";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;

  const data = id ? await getBundleById(id, user?.accessToken) : null;
  const bundle = bundleItemToForm(data?.data);
  return <BundleForm bundle={bundle} />;
};

export default page;
