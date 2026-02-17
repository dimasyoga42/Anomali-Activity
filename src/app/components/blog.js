'use client';
import { useAnomaliStore } from "@/store/authstore";
import { useEffect } from "react";

const Blogview = () => {
  const { blog, fetchBlog, loading, error } = useAnomaliStore();
  useEffect(() => {
    const run = async () => {
      await fetchBlog();
    }
    run();
  }, [fetchBlog]);
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-2 mt-9 h-lvh">
        <div className="w-[98%] h-[100px]">
          <div className=" flex justify-between items-center">
            <h1 className="text-sm ml-2 font-bold text-gray-500">Blog Terbaru:</h1>
            <div className="flex gap-1 items-center">
              <input type="text" placeholder="search blog" className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent" />
              <button className="text-sm ml-2 text-gray-500 bg-pink-500 text-white px-3 py-1 rounded-md mr-2">search</button>
            </div>
          </div>
          {loading ? (
            <p className="text-sm ml-2 text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-sm ml-2 text-red-500">Error: {error}</p>
          ) : (
            <div className="flex gap-2 mt-2 flex-wrap mx-auto justify-center">
              {blog.map((item, i) => (
                <div key={i} className="h-[100px] lg:w-[350px] w-[85%] flex justify-items-center items-center  border border-gray-300 rounded-md p-2">
                  <div className="">
                    <div className="">
                      <h1 className="text-sm ml-2 font-bold text-pink-500">{item.title}</h1>
                      <p className="text-xs ml-2 text-gray-400">by {item.author_name}</p>
                    </div>
                    <p className="text-sm ml-2 text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Blogview
