import { Appbar } from "../Components/Appbar";
import { BlogCard } from "../Components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Appbar />
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id} 
          authorName={blog.author.name}
          title={blog.title}
          content={blog.content}
          publishDate="12 Nov 2024" 
        />
      ))}
    </div>
  );
};
