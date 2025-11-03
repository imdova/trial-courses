import { auth } from "@/auth";
import BundleForm from "../components/BundleForm";
import { getBundleById } from "@/lib/actions/bundles.actions";
import { bundleItemToForm } from "../utils/transform";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const duplicate = params.duplicate as string | undefined;
  const session = await auth();
  const user = session?.user;
  const data = duplicate
    ? await getBundleById(duplicate, user?.accessToken)
    : null;
  const bundle = bundleItemToForm(data?.data, true);

  return <BundleForm bundle={bundle} />;
};

export default page;
