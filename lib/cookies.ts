"use server";

import { cookies } from "next/headers";

export async function setCookies(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
}
export async function getCookies(name: string) {
  const cookieStore = await cookies();
  const data = cookieStore.get(name);
  return data?.value;
}
export async function deleteCookies(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
export async function clearCookies() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}
