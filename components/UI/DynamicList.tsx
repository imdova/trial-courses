"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

type ListProps = {
  children: ReactNode;
  className?: string;
};

export const List = ({ children, className }: ListProps) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white p-4 ${className}`}
  >
    {children}
  </div>
);

export const ListHeader = ({ title }: { title: string }) => (
  <h2 className="mb-6 text-xl font-bold text-gray-800">{title}</h2>
);

export const ListItems = ({ children }: { children: ReactNode }) => (
  <ul className="space-y-3">{children}</ul>
);

export const ListItem = ({ children }: { children: ReactNode }) => (
  <li className="w-full">{children}</li>
);

export const ListContent = ({
  image,
  title,
  subtitle,
  link,
}: {
  image?: string;
  title: string;
  subtitle?: string;
  link?: string;
}) => (
  <Link href={link ?? "#"} className="flex items-center gap-3">
    {image && (
      <Image
        className="h-12 w-12 rounded-lg object-cover shadow-sm"
        src={image}
        width={48}
        height={48}
        alt={title}
      />
    )}
    <div>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  </Link>
);

export const ListActions = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-2">{children}</div>
);

export const ListFooter = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => (
  <div className="mt-6 flex justify-center">
    <Link
      href={href}
      className="bg-primary hover:bg-primary/90 w-full rounded-xl px-4 py-2 text-center font-medium text-white shadow-md transition"
    >
      {label}
    </Link>
  </div>
);
