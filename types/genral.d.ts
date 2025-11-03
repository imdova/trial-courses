type PaginatedResponse<T> = {
  data: T[];
  total: number;
  count?: number;
  page?: number;
  limit?: number;
};

type PaginatedMeta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string, "ASC" | "DESC"][]; // e.g. [["created_at", "DESC"]]
  filter: object;
};

type PaginatedLinks = {
  current: string;
};

type PaginatedResponse_New<T> = {
  data: T[];
  meta: PaginatedMeta;
  links: PaginatedLinks;
};

interface LocationType {
  country?: { code?: string; name?: string } | null;
  state?: { code?: string; name?: string } | null;
  city?: string | null;
}

interface EducationItemData {
  id: string;
  inistitute: string;
  degree: string;
  program?: string;
  grade?: string;
  startYear: number;
  endYear?: number;
  location?: {
    country?: { code?: string; name?: string } | null;
    state?: { code?: string; name?: string } | null;
    city?: string | null;
  };
}

type ProfileTabs = "personal-info" | "professional" | "career-preference";

interface ActionOption<T = object> {
  value?: string;
  label: ((item?: T) => React.ReactNode) | React.ReactNode;
  action?: (item?: T) => void;
  icon?: React.ReactNode;
  hidden?: (item?: T) => boolean;
}

interface StatusCardType {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  trend?: {
    value?: string;
    description?: string;
    trendDirection?: "up" | "down";
  };
}
