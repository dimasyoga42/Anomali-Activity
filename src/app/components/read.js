"use client";
import Nav from "@/app/components/navbar"
import Foter from "./foter"
import { useAnomaliStore } from "@/store/authstore";
import { useEffect } from "react";
import remarkGfm from 'remark-gfm'
import { useParams } from "next/navigation";
import ReactMarkdown from 'react-markdown'
const Readblog = ({ seasson }) => {
  const { blog, viewBlog, loading, error } = useAnomaliStore()
  const { id_blog } = useParams()
  useEffect(() => {
    const run = async () => {
      await viewBlog(id_blog)
    }
    run()
  }, [viewBlog]);

  if (loading) {

  }
  if (error) {

  }
  return (
    <>
      <div className="min-h-screen bg-white">
        <Nav session={seasson} />

        {/* CONTAINER */}
        <main className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">

          {/* HEADER BLOG */}
          <header className="py-10 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-extrabold text-pink-500 leading-tight">
              {blog.title}
            </h1>

            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-500 italic">
                author by <span className="text-pink-500 font-medium">{blog.author_name}</span>
              </p>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {blog.desc}
              </p>
            </div>
          </header>

          {/* CONTENT BLOG */}
          <article className="py-10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl md:text-4xl font-bold text-pink-500 mt-10 mb-4 leading-tight">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-semibold text-pink-500 mt-10 mb-3">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="text-gray-700 leading-8 text-[16.5px] mb-5">
                    {children}
                  </p>
                ),

                strong: ({ children }) => (
                  <strong className="text-pink-500 font-semibold">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="italic text-gray-600">
                    {children}
                  </em>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 underline underline-offset-4 hover:text-pink-600 transition"
                  >
                    {children}
                  </a>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="leading-relaxed">
                    {children}
                  </li>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-pink-500 pl-4 py-2 my-6 text-gray-600 italic bg-pink-50 rounded">
                    {children}
                  </blockquote>
                ),

                hr: () => (
                  <hr className="my-10 border-gray-200" />
                ),

                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="rounded-lg my-8 mx-auto max-h-[500px] object-contain shadow-sm"
                  />
                ),

                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="w-full border border-gray-200 text-sm">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className="bg-gray-100 text-gray-700">
                    {children}
                  </thead>
                ),

                th: ({ children }) => (
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {children}
                  </td>
                ),

                code({ inline, children }) {
                  return inline ? (
                    <code className="bg-gray-100 text-pink-500 px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-8 text-sm leading-relaxed">
                      <code className="font-mono">{children}</code>
                    </pre>
                  );
                },
              }}
            >
              {blog.isi}
            </ReactMarkdown>
          </article>
        </main>

        <Foter />
      </div>
    </>
  )
}

export default Readblog
