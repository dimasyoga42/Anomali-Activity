import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Foter from "../components/foter";
import Nav from "../components/navbar";
import Adminpage from "../components/admin";

const Adminpanel = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") return redirect("/profile");
  return (
    <div className="max-w-5xl mx-auto">
      <Nav session={session} />
      <Adminpage session={session} />
      <Foter />
    </div>
  )
}
export default Adminpanel
