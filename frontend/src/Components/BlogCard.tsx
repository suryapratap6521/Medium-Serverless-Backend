import {Link} from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishDate: string;
    id:number;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishDate,
    id
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
        <div>
              <div> <Avatar name={authorName} size={6} /> {authorName} . {publishDate}</div>
            <div>{title}</div>
            <div>{content.length > 100 ? content.slice(0, 100) + "..." : content}</div>
            <div>{`${Math.ceil(content.length / 100)} minute`}</div>
            <div className="bg-slate-200 h-1 w-full"></div>
        </div>
        </Link>
    )
}

export function Avatar({ name, size }: { name: string; size: number }) {
    return (
      <div
        className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
      >
        <span className="text-xs text-gray-600 dark:text-gray-300">
          {name.charAt(0)}
        </span>
      </div>
    );
  }
