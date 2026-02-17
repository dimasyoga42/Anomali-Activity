"use client";

import { useParams } from "next/navigation";

const Editorpage = () => {
  const { id } = useParams();

  return <>{id}</>;
};

export default Editorpage;
