"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Headers from "@/components/headers";
import UseViewPortHeight from "@/utils/UseViewPortHeight";
import Phone from "@/public/Images/Phone2.png";
import Cart from "@/public/Images/Cart2.png";
import Image from "next/image";
import { getUserCravings } from "@/utils/api";
import CravingCard from "@/components/cravingCard";
import { CravingCardType } from "@/utils/types";
import { PageLoader, Spinner } from "@/components/Loader";

const Page = () => {
  UseViewPortHeight();
  const [cravingStatus, setCravingStatus] = useState("open");
  const [cravings, setCravings] = useState<CravingCardType[]>([]);
  const [cravingsLoading, setCravingsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchCravings = async () => {
      try {
        setErrMsg("");
        setCravingsLoading(true);
        const res = await getUserCravings(10, cravingStatus);
        console.log("All cravings", res.data);
        setCravings(res.data);
      } catch (error: any) {
        setErrMsg(error.message);
        console.log(error);
      } finally {
        setCravingsLoading(false);
      }
    };
    fetchCravings();
  }, [cravingStatus]);
  return (
    <div className={` min-h-screen-vh h-full bg-[#EAEAEA]  `}>
      <div className="px-7">
        <Headers text="Cravings" />
        <div>
          <div className="flex justify-end">
            <Link
              className="px-8 py-5 text-sm text-[#EC5934] "
              href={"/home/newCraving"}
            >
              Add new
            </Link>
          </div>
          <div className="w-full flex justify-between items-center rounded-3xl bg-[#E1E2E3] relative ">
            <Link
              onClick={() => setCravingStatus("open")}
              className={
                cravingStatus.toLowerCase() == "open"
                  ? " px-6 py-1 h-full max-w-[170px] text-sm w-full flex justify-center items-center   bg-black text-white rounded-3xl "
                  : " px-6 py-1 h-full max-w-[170px] text-sm w-full flex justify-center items-center   bg-transparent "
              }
              href={"/home/cravings"}
            >
              Active Cravings
            </Link>
            <Link
              onClick={() => setCravingStatus("close")}
              className={
                cravingStatus.toLowerCase() == "close"
                  ? " px-6 py-1 h-full max-w-[170px] text-sm w-full flex justify-center items-center   bg-black text-white rounded-3xl "
                  : " px-6 py-1 h-full max-w-[170px] text-sm w-full flex justify-center items-center   bg-transparent "
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
      <div className="grid place-items-center h-full w-full py-10 pb-[80px] px-7 ">
        <p className="text-sm w-full -mt-8  text-[#898A8D] font-medium ">
          {cravings.length} items
        </p>
        {cravingsLoading ? (
          <PageLoader fullScreen={false} message="Loading cravings" />
        ) : cravings.length === 0 ? (
          <div className="max-w-[300px] text-center w-full flex flex-col gap-14  ">
            <div className="flex flex-col gap-6 items-center ">
              <div className="flex items-center">
                <Image src={Phone} alt="phone" />
                <Image
                  className=" translate-x-[-25px] translate-y-6 "
                  src={Cart}
                  alt="cart"
                />
              </div>
              <p className="text-[#898A8D]">You have no current cravings</p>
            </div>
            <Link
              className="py-2 px-2 bg-[#EC5934] text-center w-full text-white rounded-md"
              href={"/home/newCraving"}
            >
              Add new craving
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center ">
            {cravings.map((craving: CravingCardType) => (
              <CravingCard key={craving.id} craving={craving} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
