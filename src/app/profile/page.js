
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import { useAnomaliStore } from "@/store/authstore";
import Profile from "../components/page";
import Nav from "../components/navbar";
import Foter from "../components/foter";
const ProfilePage = async () => {

  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/login");
  return (
    <>
      <Nav session={session} />
      <Profile session={session} />
      <Foter />
    </>
  )
}
export default ProfilePage
