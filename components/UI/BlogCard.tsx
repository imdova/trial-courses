"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/util";
import { BlogType } from "@/types/blog";
import { UserAvatar } from "./Avatar";

type Props = {
  blog: BlogType;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (blog: BlogType) => void;
  onDelete?: (blog: BlogType) => void;
  onToggleTemplate?: (blog: BlogType) => void;
  onPublish?: (blog: BlogType) => void;
  onUnpublish?: (blog: BlogType) => void;
  className?: string;
  isEdit?: boolean;
};

const BlogCard: React.FC<Props> = ({
  blog,
  isSelected = false,
  className,
  isEdit = false,
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md",
        isSelected && "ring-primary ring-2",
        className,
      )}
    >
      {/* Template Badge */}
      {blog.isTemplate && (
        <div className="absolute top-12 right-2 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
            <Star className="h-3 w-3" />
            Template
          </span>
        </div>
      )}

      {/* Status Badge */}
      {isEdit && (
        <div className="absolute top-2 left-2 z-10">
          <span
            className={cn(
              "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
              !blog.isDraft
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800",
            )}
          >
            {blog.isDraft ? "Draft" : "Published"}
          </span>
        </div>
      )}

      <div className="flex h-full flex-col justify-between">
        <Link href={`/blogs/${blog.id}`} className="flex-1">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg rounded-b-none">
            <Image
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              src={blog.content?.photo || ""}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="space-y-3 p-4">
            <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">
              {blog.title}
            </h2>

            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <UserAvatar
                  className="object-cover"
                  src={blog.author?.photo}
                  alt={blog.author?.name}
                  size={40}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {blog.author?.name}
                </span>
                <span className="text-xs text-gray-500">
                  {blog.author?.title}

                  {/* {new Date(blog.created_at).toLocaleDateString()} */}
                </span>
              </div>
            </div>

            <p className="line-clamp-2 text-sm text-gray-600">
              {blog.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {blog.keywords?.split(",").map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between border-t border-gray-100 p-4">
          <Link
            className="hover:text-primary/80 text-primary text-sm font-medium transition-colors"
            href={`/blogs/${blog.id}`}
          >
            Read More
          </Link>
          <span className="text-xs text-gray-500">
            Updated{" "}
            {blog.updated_at
              ? new Date(blog.updated_at).toLocaleDateString()
              : "Recently"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
