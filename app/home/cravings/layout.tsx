"use client";
import Headers from "@/components/headers";
import Link from "next/link";
import React, { useState } from "react";
import UseViewPortHeight from "@/utils/UseViewPortHeight";

const page = "My Cravings";
const Layout = ({ children }: { children: any }) => {
  UseViewPortHeight();
  const [cravingStatus, setCravingStatus] = useState("Active");
  return (
    <div className={` bg-[#EAEAEA] min-h-screen-vh h-full  pt-3 pb-7 `}>
      <div className="px-7">
        <Headers text="Cravings" />
        <div>
          <div className="flex justify-end">
            <Link
              className="px-8 py-5 font-semibold text-sm "
              href={"/home/newCraving"}
            >
              Add new
            </Link>
          </div>
          <div className="w-full flex justify-between items-center rounded-3xl bg-[#E1E2E3] relative ">
            <Link
              onClick={() => setCravingStatus("active")}
              className={
                cravingStatus.toLowerCase() == "active"
                  ? " px-6 py-1 h-full max-w-[170px] w-full flex justify-center items-center   bg-black text-white rounded-3xl "
                  : " px-6 py-1 h-full max-w-[170px] w-full flex justify-center items-center   bg-transparent "
              }
              href={"/home/cravings"}
            >
              Active Cravings
            </Link>
            <Link
              onClick={() => setCravingStatus("satisfied")}
              className={
                cravingStatus.toLowerCase() == "satisfied"
                  ? " px-6 py-1 h-full max-w-[170px] w-full flex justify-center items-center   bg-black text-white rounded-3xl "
                  : " px-6 py-1 h-full max-w-[170px] w-full flex justify-center items-center   bg-transparent "
              }
              href={"/home/cravings/satisfied"}
            >
              Satisfied
            </Link>
            {/* <div className="bg-black hidden py-3 text-white absolute w-[50%] text-center rounded-3xl h-full ">
              {page}
            </div> */}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
