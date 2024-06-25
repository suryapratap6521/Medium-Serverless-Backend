import React from "react";
import { Appbar } from "./Appbar";
import { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-12 px-10 w-full pt-8">
        <div className="bg-red-200 col-span-8 p-4">
          <div className="text-3xl font-extrabold mb-4">{blog.title}</div>
          <div className="text-lg">{blog.content}</div>
        </div>
      </div>
    </div>
  );
};
