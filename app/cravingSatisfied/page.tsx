"use client";

import React from "react";
import SuccesTickSmall from "@/components/SVGS/SuccesTickSmall";
import SuccessTickBig from "@/components/SVGS/SuccessTickBig";
import Image from "next/image";
import Confetti from "@/public/Images/confetii.png";
import UseViewPortHeight from "@/utils/UseViewPortHeight";
import Link from "next/link";

const CravingSatisfied = () => {
  UseViewPortHeight();
  return (
    <div className="bg-[#EAEAEA] px-2 h-screen-vh w-full ">
      <div className="w-full flex flex-col px-5 items-center gap-9 py-6 ">
        <div className="bg-[#4081401A] px-3 py-2 rounded-md flex items-center gap-2 ">
          <SuccesTickSmall />{" "}
          <p className="text-[#50555C] text-[12px] font-medium">
            Craving Satisfied
          </p>
        </div>
        <div className="flex items-center justify-center ">
          <SuccessTickBig />
        </div>
        <div className="flex items-center justify-center">
          <Image src={Confetti} alt="confetiImg" />
        </div>
        <div className="flex flex-col items-center max-w-[350px] w-full gap-2 ">
          <h2 className="font-semibold text-xl text-center ">
            Craving Satisfied!
          </h2>
          <p className="text-sm text-center ">
            You have successfully satisfied Pauleye75 craving of Smokey Jollof
            with beef and Plantain
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 w-full ">
          <button className="w-full bg-[#EC5934] px-3 py-2 rounded-lg text-white font-bold text-center ">
            View Cravers Profile
          </button>
          <Link
            href={"/home"}
            className="w-full bg-transparent border border-[#EC5934] text-[#EC5934] font-bold px-3 py-2 rounded-lg text-center "
          >
            {" "}
            Return to Homepage{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CravingSatisfied;
