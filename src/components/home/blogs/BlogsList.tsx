import BlogCard from "./BlogCard";
import { blogs } from "./blog.data";

export default function BlogsList() {
  return (
    <div
      className="
        w-full
        flex
        gap-6
        overflow-x-auto
        scroll-smooth
        snap-x
        snap-mandatory
        pb-8
        no-scrollbar
      "
    >
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}