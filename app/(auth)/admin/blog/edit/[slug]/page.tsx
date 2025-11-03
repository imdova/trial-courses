import { notFound } from "next/navigation";
import BlogPage from "@/components/blog/BlogPage";
import { API_GET_BLOG_BY_ID } from "@/constants/api/blog";
import useFetch from "@/hooks/useFetch";
import { BlogType } from "@/types/blog";
import Loading from "@/components/loading/loading";
import { use } from "react";

type EditBlogPageProps = {
  params: Promise<{ slug: string }>;
};

const EditBlogPage = ({ params }: EditBlogPageProps) => {
  const { slug } = use(params);

  const { data: blog, loading } = useFetch<BlogType>(
    API_GET_BLOG_BY_ID + slug,
    { defaultLoading: true },
  );

  if (loading) {
    return <Loading />;
  }

  if (!blog) return notFound();

  return (
    <div>
      <BlogPage blog={blog} />
    </div>
  );
};

export default EditBlogPage;
