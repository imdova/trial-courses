import { RouteConfig } from "@/types/navigation";

export const matchRoute = (
  routeConfigs: RouteConfig[],
  pathname: string,
): RouteConfig | undefined => {
  return routeConfigs.find((route) => isCurrentPage(pathname, route.pattern));
};

export const isCurrentPage = (pathname?: string, pattern?: string): boolean => {
  if (!pathname || !pattern) return false;
  const escapedPattern = pattern.replace(/[.+?^${}()|\\]/g, "\\$&");
  const regexPattern = escapedPattern
    .replace(/\/\*$/, "(\\/.*)?")
    .replace(/\/\\\*$/, "(\\/.*)?")
    .replace(/\[([^\]]+)\]/g, "[^\\/]+");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
};

export function generateUrl(template: string, user: Object): string {
  return template.replace(/\[\[(\w+)\]\]/g, (_, key: keyof typeof user) => {
    return user[key] !== undefined ? String(user[key]) : `[[${key}]]`;
  });
}
