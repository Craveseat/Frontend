"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   //   weight: "600",
// });

const Headers = ({ text }: { text: string }) => {
  const router = useRouter();
  return (
    <div className=" w-full flex items-center pt-5 auto-cols-fr relative ">
      <button className="flex items-center" onClick={() => router.back()}>
        <ChevronLeft className="text-black" />
        {/* <Image
          className="absolute left-0 "
          src={backarrow2}
          width={24}
          alt="back"
        /> */}
      </button>
      <h2 className="font-medium capitalize text-center w-full ">{text}</h2>
    </div>
  );
};

export default Headers;
