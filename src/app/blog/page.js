
import { getServerSession } from "next-auth"
import Nav from "../components/navbar"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Blogview from "../components/blog";
import Foter from "../components/foter";

const Blogpage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full">
      <div className="flex gap-2 mt-9 h-lvh">
        <div className="w-[98%] h-[100px]">
          <Blogview />
        </div>
      </div>
      <Foter />
    </div>
  )
}
export default Blogpage
