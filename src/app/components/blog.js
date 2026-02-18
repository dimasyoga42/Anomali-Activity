'use client';
import { useAnomaliStore } from "@/store/authstore";
import Link from "next/link";
import { useEffect } from "react";

const Blogview = () => {
  const { blog, fetchBlog, loading, error } = useAnomaliStore();

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="w-auto">
      <div className="mt-9">
        <div className="w-[98%]">

          <div className="flex justify-between items-center">
            <h1 className="text-sm ml-2 font-bold text-gray-500">
              Blog Terbaru:
            </h1>
          </div>

          {loading && (
            <p className="text-sm ml-2 text-gray-400">Loading...</p>
          )}

          {error && (
            <p className="text-sm ml-2 text-red-500">Error: {error}</p>
          )}

          {!loading && !error && (
            <>
              {Array.isArray(blog) && blog.length > 0 ? (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {blog.map((item, i) => (
                    <div
                      key={item.id || i}
                      className="h-[90px] lg:w-[200px] w-[85%] flex items-center shadow border border-gray-200 rounded-md p-2 bg-white hover:shadow-md transition"
                    >
                      <div>
                        <h1 className="text-lg font-bold text-pink-500 leading-tight">
                          <Link href={`/read/${item.id}`}>
                            {item.title}
                          </Link>
                        </h1>

                        <p className="text-xs text-gray-400">
                          by {item.author_name}
                        </p>

                        <p className="text-sm text-gray-500 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm ml-2 text-gray-400">
                  Belum ada blog.
                </p>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Blogview;
