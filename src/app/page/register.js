import { Link } from "react-router-dom"

const Registerpage = () => {
  return (
    <div className="w-full h-lvh flex justify-center justify-items-center items-center">
      <div className="w-[250px] h-[300px] rounded-lg shadow-sm flex flex-col gap-5 items-center justify-center">
        <h1 className="font-bold text-xl text-pink-500">Anomali Activity</h1>
        <input type="text" placeholder="Name" name="name" className="w-[200px] h-10 rounded-md border border-gray-300 px-3" />
        <input type="text" placeholder="in game name" name="ign" className="w-[200px] h-10 rounded-md border border-gray-300 px-3" />
        <input type="text" placeholder="Username" name="username" className="w-[200px] h-10 rounded-md border border-gray-300 px-3" />
        <input type="password" placeholder="Password" name="password" className="w-[200px] h-10 rounded-md border border-gray-300 px-3" />
        <button className="w-[200px] h-10 bg-pink-500 text-white rounded-md">Register</button>
        <small className="text-sm">sudah punya akun? <Link className="text-sky-500" to="/login">login</Link></small>
      </div>
    </div>

  )
}
export default Registerpage
