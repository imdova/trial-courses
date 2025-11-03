"use client";
import { BlogType, BreakPoints } from "@/types/blog";
import { useBlogStore } from "@/lib/blog/blog-store";
import ArticleCompiler from "./panels/ArticleCompiler";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "./BlogCard";
import { API_GET_BLOGS } from "@/constants/api/blog";

export default function ArticlePreview() {
  const { blocks, settings, forms, currentBreakpoint } = useBlogStore();
  const { data } = useFetch<PaginatedResponse<BlogType>>(API_GET_BLOGS);
  const blog = {
    ...settings,
    content: {
      blocks,
      forms: forms,
      metaData: {},
    },
  } as BlogType;
  const getViewModeWidth = (viewMode: BreakPoints) => {
    switch (viewMode) {
      case "md":
        return "max-w-[1420px]";
      case "sm":
        return "max-w-[1100px]";
      case "xs":
        return "max-w-[375px]";
    }
  };
  return (
    <main
      className={`@container container mx-auto mt-[50px] transition-[max-width] md:px-8 md:py-8 ${getViewModeWidth(currentBreakpoint)}`}
    >
      <div className="mb-10 flex flex-col gap-6 @lg:flex-row">
        <div className="rounded-base @md:shadow-soft border border-gray-200 p-5 @md:p-8 @lg:w-3/4">
          <ArticleCompiler
            blog={blog}
            breakpoint={currentBreakpoint}
            forms={forms}
          />
        </div>
        <div className="m-2 @lg:w-[320px]">
          <div className="space-y-1">
            <h2 className="mb-6 text-2xl font-semibold">View Also</h2>
            {data?.data
              .filter((x) => x.id !== blog.id)
              .map((item) => {
                return (
                  <Link
                    href={`/blogs/${item.id}`}
                    key={item.id}
                    className="bg-background shadow-soft flex items-center gap-4 rounded-md border border-gray-200 p-3 duration-200 hover:bg-gray-50 hover:shadow-lg"
                  >
                    <Image
                      className="h-14 w-14 rounded object-cover"
                      width={400}
                      height={400}
                      src={item.content?.photo || ""}
                      alt={item.title}
                    />
                    <div>
                      <span className="text-primary mb-2 block text-xs">
                        {item.updated_at
                          ? new Date(item.updated_at).toLocaleDateString()
                          : "Recently"}
                      </span>
                      <p className="line-clamp-2 text-sm">{item.title}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
          {blog?.keywords && (
            <div className="box-content">
              <h2 className="mb-6 text-2xl font-semibold">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {blog.keywords?.split(",").map((keyWord, index) => (
                  <button
                    key={index}
                    className="link-smooth bg-primary hover:bg-primary/90 w-fit rounded-md p-2 text-xs font-semibold text-white"
                  >
                    {keyWord}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-5">
        <h2 className="mb-4 text-2xl font-semibold @md:text-3xl">
          Other Blogs
        </h2>
        <div className="grid grid-cols-1 gap-6 @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4">
          {data?.data
            .filter((x) => x.id !== blog.id)
            ?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} isEdit={false} />
            ))}
        </div>
      </div>
    </main>
  );
}
