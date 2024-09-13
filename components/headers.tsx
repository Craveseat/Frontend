"use client";

import React from "react";
import Image from "next/image";
import backarrow2 from "@/public/Images/backarrow2.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   //   weight: "600",
// });

const Headers = ({ text }: { text: string }) => {
  const router = useRouter();
  return (
    <div className=" w-full auto-cols-fr relative ">
      <button onClick={() => router.back()}>
        <Image
          className="absolute left-0 "
          src={backarrow2}
          width={24}
          alt="back"
        />
      </button>
      <h2 className="font-medium capitalize text-center w-full ">{text}</h2>
    </div>
  );
};

export default Headers;
