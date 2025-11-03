// Types
export type HeaderType =
  | "none"
  | "home"
  | "minimal"
  | "full"
  | "centered"
  | "transparent"
  | "dark";
export type SideBarType =
  | "minimal"
  | "full"
  | "admin-full"
  | "admin-minimal"
  | "none";
export type LinksType = "default" | "userType";
export interface RouteConfig {
  pattern: string;
  headerType: HeaderType;
  sideBarType: SideBarType;
  linksType?: LinksType;
}
