"use server";

import { revalidateTag as revalidate } from "next/cache";

async function revalidateTag(tag: string) {
  revalidate(tag);
}

export default revalidateTag;
