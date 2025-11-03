"use client";

import { createUrl } from "@/util";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, Suspense, useState, useEffect } from "react";
import CustomInput from "./CustomInput";

// Extend the SearchProps to accept the search handler function.
interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void; // Prop for passing search query to parent
  pathname?: string;
  children?: React.ReactNode;
  parentClassName?: string;
  label?: string;
  placeholder?: string;
}

let timer: NodeJS.Timeout;

function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const Input: React.FC<SearchProps> = ({
  onSearch,
  pathname: initialPathname,
  children,
  parentClassName,
  label,
  placeholder,
  ...props
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();
  const newPathname = initialPathname || pathname;
  const initialSearchText = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialSearchText);

  useEffect(() => {
    const newSearchText = searchParams.get("q") || "";
    setQuery(newSearchText);
  }, [searchParams]);

  function submit() {
    const newParams = new URLSearchParams(searchParams.toString());
    if (query) {
      newParams.set("q", query);
      newParams.delete("page");
    } else {
      newParams.delete("q");
    }
    router.push(createUrl(newPathname, newParams));
    onSearch?.(query); // Trigger the search query change in the parent component
  }

  const updateSearchParams = debounce((value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("q", value);
    newParams.delete("page");
    router.push(createUrl(pathname, newParams));
    onSearch?.(value); // Update search query in the parent component
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (currentPage === "shop") {
      updateSearchParams(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className={parentClassName}>
      <CustomInput
        {...props}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        label={label}
        placeholder={placeholder}
      />
      <input type="submit" hidden />
      {children}
    </div>
  );
};

const SearchBar: React.FC<SearchProps> = (props) => {
  return (
    <Suspense>
      <Input {...props} />
    </Suspense>
  );
};

export default SearchBar;
