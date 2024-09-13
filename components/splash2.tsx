"use client";
import React from "react";
// import Splash from "./splash";
import Image from "next/image";
import SplashIMG from "@/public/Images/splashIMG.png";
import Link from "next/link";
import UseViewPortHeight from "@/utils/UseViewPortHeight";

const Splash2 = ({
  dets,
}: {
  dets: { title: string; body: string; BTN: boolean };
}) => {
  UseViewPortHeight();
  return (
    <div className="w-full h-screen-vh flex flex-col items-center justify-between pt-[100px] px-9 pb-16 gap-10 ">
      <div className=" w-full flex flex-col items-center gap-5 ">
        <div className="w-full flex flex-col items-center justify-center gap-10 ">
          <Image src={SplashIMG} alt="SplashIMG" />

          <div className="flex flex-col gap-5 items-center justify-center w-full text-black">
            <h1 className="font-bold  text-xl text-center ">{dets.title}</h1>
            <p className=" text-center  ">{dets.body}</p>
          </div>
        </div>
      </div>

      {dets.BTN ? (
        <div className=" flex w-full">
          <Link
            href={"/welcome"}
            className="bg-[#EC5934] rounded-xl px-8 text-white font-semibold w-full text-center py-[18px] "
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="flex justify-end w-full ">
          <Link
            className="px-8 py-3 rounded-lg bg-[#EC593414] "
            href={"/welcome"}
          >
            Skip
          </Link>
        </div>
      )}
    </div>
  );
};

export default Splash2;
