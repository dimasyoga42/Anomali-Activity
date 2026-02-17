"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Registerpage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [ign, setIgn] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/reg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, ign, username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/login");
  };

  return (
    <form
      onSubmit={handleRegister}
      className="w-full h-lvh flex justify-center items-center"
    >
      <div className="w-[250px] h-[320px] rounded-lg shadow-sm flex flex-col gap-4 items-center justify-center">
        <h1 className="font-bold text-xl text-pink-500">
          Anomali Activity
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[200px] h-10 border px-3 rounded-md"
          required
        />

        <input
          type="text"
          placeholder="In Game Name"
          value={ign}
          onChange={(e) => setIgn(e.target.value)}
          className="w-[200px] h-10 border px-3 rounded-md"
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[200px] h-10 border px-3 rounded-md"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[200px] h-10 border px-3 rounded-md"
          required
        />

        <button
          type="submit"
          className="w-[200px] h-10 bg-pink-500 text-white rounded-md"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}

        <small>
          Sudah punya akun?{" "}
          <Link href="/login" className="text-sky-500">
            Login
          </Link>
        </small>
      </div>
    </form>
  );
};

export default Registerpage;
