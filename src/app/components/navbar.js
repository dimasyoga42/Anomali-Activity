import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <>
      <nav className="w-full h-16 flex justify-between justify-items-center items-center">
        <h1 className="font-bold ml-2 font-Poppins">Anomali Activity</h1>
        <Link to="/login" className="mr-5">login</Link>
      </nav>
    </>
  )
}
export default Nav
