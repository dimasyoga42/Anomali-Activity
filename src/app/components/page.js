'use client';

import { useAnomaliStore } from "@/store/authstore";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = ({ session }) => {
  const { user, fetchDatauser, editDatauser, loading, error } = useAnomaliStore();
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [ign, setIgn] = useState("");
  const [image_url, setImage_url] = useState("");

  useEffect(() => {
    if (!session?.user?.username) return;

    fetchDatauser(session.user.username);
  }, [fetchDatauser, session?.user?.username]);

  // Saat menu dibuka, isi state dari user
  const openMenu = () => {
    setName(user.name || "");
    setIgn(user.ign || "");
    setImage_url(user.image_url || "");
    setMenu(true);
  };
  const closeMenu = () => setMenu(false);

  const handleSave = () => {
    // TODO: panggil store function untuk update user
    editDatauser(name, ign, session.user.username, image_url);
    console.log({ name, ign, image_url });
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

      {/* Modal Edit Profile */}
      {menu && (
        <div
          className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50"
          onClick={closeMenu}
        >
          <div
            className="w-[300px] bg-white rounded-md p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-lg font-bold text-pink-500 mb-4">Edit Profile</h1>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 border px-3 rounded-md mb-3"
            />
            <input
              type="text"
              placeholder="In Game Name"
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              className="w-full h-10 border px-3 rounded-md mb-3"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image_url}
              onChange={(e) => setImage_url(e.target.value)}
              className="w-full h-10 border px-3 rounded-md mb-3"
            />

            <button
              className="w-full h-10 bg-pink-500 text-white rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Blog section */}
      <div className="flex gap-2 mt-9">
        <div className="w-[98%] h-[100px]">
          <div className="flex justify-between items-center">
            <h1 className="text-sm ml-2 font-bold text-gray-500">Blog Terbaru:</h1>
            <button className="text-sm ml-2 text-gray-500 bg-pink-500 text-white px-3 py-1 rounded-md mr-2">
              <Link href={`/editor/${user.id}`}>
                Buat Blog
              </Link>
            </button>
          </div>

          <div className="flex gap-2 mt-2 flex-col">
            {user?.blogs?.length ? (
              user.blogs.map((blog, i) => (
                <div key={i}>
                  <h1 className="text-sm ml-2 font-bold text-pink-500">{blog.title}</h1>
                  <p className="text-sm ml-2 text-gray-500">{blog.desc}</p>
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
