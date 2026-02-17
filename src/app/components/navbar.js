import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <div className="">
      <nav className="w-full h-16 flex justify-between justify-items-center items-center">
        <h1 className="font-bold ml-2 font-Poppins text-pink-500">Anomali Activity</h1>
        <ul className="flex gap-3 mr-5 text-gray-500">
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/profile">Info</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Nav
