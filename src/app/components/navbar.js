"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"

const Nav = ({ session, image }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="w-full">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="font-bold text-pink-500 text-lg font-Poppins">
          Anomali Activity
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
          <li>
            <Link href="/" className="hover:text-pink-500 transition">
              Home
            </Link>
          </li>

          {session ? (
            <li className="">
              <Link
                href="/profile"
                className="block px-4 py-3 hover:text-pink-500"
                onClick={() => setOpen(false)}
              >
                Profil
              </Link>
            </li>

          ) : (
            null
          )}

          {session?.user?.role === "admin" && (
            <li>
              <Link href="/admin" className="hover:text-pink-500 transition">
                Admin
              </Link>
            </li>
          )}

          <li>
            {session ? (
              <span className="text-gray-800 font-semibold">
                {session.user.username}
              </span>
            ) : (
              <Link href="/login" className="hover:text-pink-500 transition">
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={menuRef}
          className="md:hidden bg-white border-t shadow-sm"
        >
          <ul className="flex flex-col text-gray-700 font-medium">

            <li className="border-b">
              <Link
                href="/"
                className="block px-4 py-3 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>

            {
              session ? (
                <li className="border-b">
                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Profil
                  </Link>
                </li>

              ) : (
                null
              )
            }

            {session?.user?.role === "admin" && (
              <li className="border-b">
                <Link
                  href="/admin"
                  className="block px-4 py-3 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Admin
                </Link>
              </li>
            )}

            <li>
              {session ? (
                <div className="px-4 py-3 text-gray-900 font-semibold">
                  {session.user.username}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block px-4 py-3 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>

          </ul>
        </div>
      )}
    </nav>
  )
}

export default Nav
