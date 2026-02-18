'use client';

import { useAnomaliStore } from "@/store/authstore";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const Adminpage = () => {
  const { member, deleteMember, fetchMember, editMember, loading, error } = useAnomaliStore();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [name, setName] = useState("");
  const [ign, setIgn] = useState("");
  const [image_url, setImage_url] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  const openModal = (m) => {
    setSelectedId(m.id);
    setName(m.name || "");
    setIgn(m.ign || "");
    setImage_url(m.image_url || "");
    setRole(m.role || "");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const hendler = (id) => {
    deleteMember(id)
  }

  const handleSave = async () => {
    // TODO: panggil updateMember dari store
    console.log("Update member:", {
      id: selectedId,
      name,
      ign,
      image_url,
    });
    await editMember(selectedId, name, ign, image_url, role);
    closeModal();
  };

  if (loading) {
    return (
      <div className="w-full h-lvh flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="w-full h-lvh flex items-center justify-center text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="h-lvh">
      <div className="w-[300px] mx-auto lg:mx-0">
        <h1 className="text-lg font-bold mb-2 text-pink-500">Member:</h1>

        {member?.map((m) => (
          <div
            key={m.id}
            className="flex flex-col w-full mb-2 p-3 rounded-md bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <img
                src={m.image_url}
                alt={m.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="w-full">
                <div className="flex justify-between">
                  <h1 className="text-pink-500">{m.name}</h1>
                  <p className="text-gray-500 text-xs">{m.ign}</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-500 text-sm">{m.role}</p>

                  <button
                    onClick={() => openModal(m)}
                    className="hover:text-yellow-500"
                  >
                    <Edit className="w-4 h-4 text-yellow-500" />
                  </button>

                  <button className="hover:text-red-500" onClick={hendler(m.id)}>
                    <Trash className="w-4 h-4 text-rose-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {member?.length === 0 && (
          <p className="text-gray-500">Belum ada member</p>
        )}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="w-[300px] bg-white rounded-md p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-lg font-bold text-pink-500 mb-4">
              Edit Member
            </h1>

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
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
    </div>
  );
};

export default Adminpage;
