import Link from "next/link"

const Nav = ({ session, image }) => {
  return (
    <div className="">
      <nav className="w-full h-16 flex justify-between justify-items-center items-center">
        <h1 className="font-bold ml-2 font-Poppins text-pink-500">Anomali Activity</h1>
        <ul className="flex gap-3 mr-5 text-gray-500">
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/profile">Info</Link>
          </li>
          <li>
            {session ? <p>{session.user?.username}</p> : <Link href="/login">Login</Link>}
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Nav
