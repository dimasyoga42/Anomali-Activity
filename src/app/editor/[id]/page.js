"use client";

import { useAnomaliStore } from "@/store/authstore";
import { useParams } from "next/navigation";
import { useState } from "react";
import Editor from "@monaco-editor/react";

const Editorpage = () => {
  const { blog, insertBlog, loading, error } = useAnomaliStore();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [desc, setDesc] = useState("");

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-red-500 font-semibold text-base sm:text-lg text-center">
          {error}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-500 text-base sm:text-lg animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  const handlerBtn = async () => {
    if (!judul.trim() || !desc.trim() || !isi.trim()) {
      return alert("Isi semua kolom yang tersedia");
    }

    if (!id) {
      return alert("ID tidak ditemukan");
    }

    await insertBlog(judul, desc, isi, id);
    alert("Blog berhasil disimpan");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-3 sm:gap-4">

        {/* Header */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border px-4 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h1 className="text-lg sm:text-xl font-bold text-pink-500">
            Anomali Blog Editor
          </h1>
          <span className="text-xs sm:text-sm text-gray-400">
            Markdown
          </span>
        </div>

        {/* Input */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Judul blog..."
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md sm:rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-400 outline-none transition"
            />

            <input
              type="text"
              placeholder="Deskripsi singkat..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md sm:rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border overflow-hidden">
          <div className="h-[55vh] sm:h-[60vh] lg:h-[65vh]">
            <Editor
              width="100%"
              height="100%"
              language="markdown"
              value={isi}
              theme="vs-light"
              onChange={(value) => setIsi(value || "")}
              options={{
                fontSize: 13,
                wordWrap: "on",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 10, bottom: 10 },
                smoothScrolling: true,
                cursorSmoothCaretAnimation: "on",
                scrollbar: {
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6,
                },
              }}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handlerBtn}
          className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl font-semibold text-white bg-pink-500 hover:bg-pink-600 active:scale-[0.99] transition shadow-sm"
        >
          Simpan Blog
        </button>

      </div>
    </div>
  );
};

export default Editorpage;
