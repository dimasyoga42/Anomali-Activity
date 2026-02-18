
import Nav from "./components/navbar";
import Foter from "./components/foter";
import Homepage from "./home/home";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Blogview from "./components/blog";
export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="max-w-5xl mx-auto">
      <Nav session={session} />
      <div>
        <Blogview />
      </div>
    </div>
  );
}
