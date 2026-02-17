"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Loginpage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Username atau password salah");
      return;
    }

    router.push("/profile");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-lvh flex justify-center items-center"
    >
      <div className="w-[250px] h-[300px] rounded-lg shadow-sm flex flex-col gap-5 items-center justify-center">
        <h1 className="font-bold text-xl text-pink-500">
          Anomali Activity
        </h1>

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
          {loading ? "Loading..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}

        <small>
          Belum punya akun?{" "}
          <Link href="/register" className="text-sky-500">
            Register
          </Link>
        </small>
      </div>
    </form>
  );
};

export default Loginpage;
