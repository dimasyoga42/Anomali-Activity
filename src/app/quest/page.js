import { getServerSession } from "next-auth";
import Nav from "../components/navbar";
import { authOptions } from "../api/auth/[...nextauth]/route";
const Questpage = async () => {
  const seasson = await getServerSession(authOptions);
  return (
    <>
      <Nav session={seasson} />
    </>
  );
};
export default Questpage;
