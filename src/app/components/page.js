"use client";

import { useAnomaliStore } from "@/store/authstore";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = ({ session }) => {
  const { user, blog, fetchDatauser, editDatauser, fetchBlogByAuthor, loading, error } = useAnomaliStore();
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [ign, setIgn] = useState("");
  const [image, setImage] = useState(null);
  const [imgurl, setImgurl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!session?.user?.username) return;

    fetchDatauser(session.user.username);
    fetchBlogByAuthor(session.user.id);
  }, [fetchDatauser, fetchBlogByAuthor, session?.user?.username]);

  const openMenu = () => {
    setName(user.name || "");
    setIgn(user.ign || "");
    setImgurl(user.image_url || "");
    setMenu(true);
  };

  const closeMenu = () => setMenu(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    setImage(file);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setImgurl(data.url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    await editDatauser(name, ign, session.user.username, imgurl);
    closeMenu();
  };

  if (loading) return <div className="w-full h-lvh flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <p className="w-full h-lvh flex items-center justify-center text-red-500">Error: {error}</p>;

  return (
    <div className="w-full h-lvh">
      {/* Header Profile */}
      <div className="w-full flex flex-col items-center justify-center mt-5">
        <img
          src={user.image_url || "/default-avatar.png"}
          className="w-[100px] h-[100px] rounded-full bg-gray-300 object-cover"
        />
        <div className="text-center">
          <h1 className="text-sm ml-2 font-bold text-pink-500">{user.name}</h1>
          <p className="text-sm ml-2 text-gray-500">{user.username}</p>
          <button
            aria-haspopup={true}
            aria-expanded={menu}
            onClick={openMenu}
            className="flex justify-center m-auto items-center gap-1 text-sm text-pink-500 hover:text-pink-700 mt-1"
          >
            <Edit className="w-4 h-4" />
            Edit Profil
          </button>
        </div>
      </div>

      {/* MODAL EDIT PROFILE (PERUBAHAN HANYA DI SINI) */}
      {menu && (
        <div
          className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50"
          onClick={closeMenu}
        >
          <div
            className="w-[320px] bg-white rounded-md p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-lg font-bold text-pink-500 mb-3">Edit Profile</h1>

            {/* Preview Avatar */}
            <div className="flex justify-center mb-3">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : imgurl || "/default-avatar.png"
                }
                className="w-20 h-20 rounded-full object-cover bg-gray-200"
              />
            </div>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 border px-3 rounded-md mb-2"
            />

            <input
              type="text"
              placeholder="In Game Name"
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              className="w-full h-10 border px-3 rounded-md mb-2"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full h-10 border px-3 rounded-md mb-3"
            />

            <button
              className="w-full h-10 bg-pink-500 text-white rounded-md"
              onClick={handleSave}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Blog section (TIDAK DIUBAH) */}
      <div className="flex gap-2 mt-9">
        <div className="w-[98%] h-[100px]">
          <div className="flex justify-between items-center">
            <h1 className="text-sm ml-2 font-bold text-gray-500">Blog Terbaru:</h1>
            <div className="flex gap-2 items-center">
              <button className="text-sm ml-2 text-gray-500 bg-pink-500 text-white px-3 py-1 rounded-md mr-2">
                <Link href={`/editor/${user.id}`}>
                  Buat Blog
                </Link>
              </button>
              {/* <button className="text-sm ml-2 text-gray-500 bg-yellow-500 text-white px-3 py-1 rounded-md mr-2">
                <Link href={`/editor/${user.id}`}>
                  Kirim Qs
                </Link>
              </button> */}
            </div>
          </div>

          <div className="flex gap-2 mt-2 flex-col">
            {blog.length ? (
              blog.map((blog, i) => (
                <div key={i}>
                  <h1 className="text-sm ml-2 font-bold text-pink-500"><Link href={`/read/${blog.id}`}>{blog.title}</Link></h1>
                  <p className="text-sm ml-2 text-gray-500">{blog.desc}</p>
                  <p className="text-xs ml-2 text-gray-400">By {blog.author_name}</p>
                  {/* <div className="flex gap-2 items-center">
                    <a className="text-pink-500 ml-2 flex gap-2 items-center"><Edit className="w-4 h-4" />edit</a>
                    <a className="text-pink-500 ml-2 flex gap-2 items-center"><Trash className="w-4 h-4" />detele</a>
                  </div> */}
                </div>
              ))
            ) : (
              <p className="text-sm ml-2 text-gray-400">Belum ada blog</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
