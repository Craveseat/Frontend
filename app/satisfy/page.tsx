import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Satisfy = () => {
  const session = useSession();

  if (session.status === "unauthenticated") {
    redirect("/signin");
  }
  return <div>Satisfy</div>;
};

export default Satisfy;
