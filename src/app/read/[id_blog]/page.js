
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Readblog from "@/app/components/read";
import { getServerSession } from "next-auth";

const Bacablog = async () => {
  const seasson = await getServerSession(authOptions)
  return (
    <>
      < Readblog seasson={seasson} />
    </>
  )
}

export default Bacablog;
