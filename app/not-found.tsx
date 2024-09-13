"use client";

import React from "react";
import Image from "next/image";
import NotFoundImage from "@/public/Images/NotFound.png";
import Link from "next/link";
import ArrowRight from "@/components/SVGS/ArrowRight";
import UseViewPortHeight from "@/utils/UseViewPortHeight";

const NotFound = () => {
  UseViewPortHeight();
  return (
    <div className="flex h-full min-h-screen-vh bg-[#EAEAEA] justify-center items-center px-5 py-2 relative">
      <Image src={NotFoundImage} alt="not found" className="w-full h-full" />

      <div className=" absolute bottom-[70px] left-0 w-full flex justify-center items-center px-5 ">
        <div className="flex flex-col gap-4 items-center text-center">
          <h1 className="text-[20px] font-semibold">
            uh-oh! Page not found...
          </h1>
          <p className="text-center">
            Looks like this page is still cooking, or it might have been
            devoured by a hungry user!
          </p>
          <Link
            className="bg-[#EC5934] text-white rounded-full px-7 py-4 flex items-center "
            href="/home"
          >
            Go home <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
