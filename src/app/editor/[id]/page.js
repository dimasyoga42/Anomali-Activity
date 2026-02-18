"use client";

import { useAnomaliStore } from "@/store/authstore";
import { useParams } from "next/navigation";
import { useState } from "react";
import Editor from "@monaco-editor/react";

const Editorpage = () => {
  const { blog, insertBlog, loading, error } = useAnomaliStore();
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id


  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [desc, setDesc] = useState("");

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
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
    <>
      <div className="max-w-5xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="w-full h-16 flex items-center">
          <h1 className="text-2xl font-bold text-pink-500 ml-2">
            Anomali blog
          </h1>
        </div>

        {/* Input */}
        <div className="w-full flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Title"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="lg:w-[50%] w-[49%] p-3 shadow-sm lg:shadow-md rounded-md outline-none"
          />

          <input
            type="text"
            placeholder="Deskripsi"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="lg:w-[50%] w-[49%] p-3 shadow-sm lg:shadow-md rounded-md outline-none"
          />
        </div>

        {/* Editor */}
        <div className="flex-1 border rounded-md overflow-hidden">
          <Editor
            width="100%"
            height="100%"
            language="markdown"
            value={isi}
            theme=""
            onChange={(value) => setIsi(value || "")}
            options={{
              wordWrap: "on",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              hideCursorInOverviewRuler: true,
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
            }}
          />
        </div>

        {/* Button */}
        <button
          onClick={handlerBtn}
          className="mt-3 p-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md"
        >
          Simpan Blog
        </button>
      </div>
    </>
  );
};

export default Editorpage;
