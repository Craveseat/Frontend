"use client";

import Headers from "@/components/headers";
import React, { useState, useEffect, use } from "react";
import Craving1 from "@/public/Images/craving1.png";
import UseViewPortHeight from "@/utils/UseViewPortHeight";
import Image from "next/image";
import Message from "@/components/SVGS/Message";
import Copy from "@/components/SVGS/Copy";
import Link from "next/link";

interface Reply {
  id: string;
  avatar?: string;
  userName: string;
  comment: string;
  date: string;
  liked: boolean;
}

interface Comment {
  id: string;
  avatar?: string;
  userName: string;
  comment: string;
  date: string;
  liked: boolean;
  reply: Reply[];
}

// Types for cravings (active and satisfied)
interface Craving {
  id: string;
  image: string;
  name: string;
  price: string;
  craveNote: string;
  date: string;
  liked: boolean;
  bookmarked: boolean;
  mirror: boolean;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  mirrorCount: number;
  comments: Comment[];
}

interface SatisfiedCraving {
  id: string;
  image: string;
  name: string;
  price: string;
  dateSatisfied: string;
  anonymous: boolean;
  satisfier: string;
}

// Type for a user
interface User {
  id: string;
  userName: string;
  avatar: string;
  friends: boolean;
  activeCravings: Craving[];
  satisfiedCravings: SatisfiedCraving[];
}
const Satisfy = ({ params }: { params: any }) => {
  UseViewPortHeight();
  const userId = params.Uid;
  const cravingId = params.Cid;

  const [craving, setCraving] = useState<Craving>();
  const [user, setUser] = useState<User>();

  const getCraving = async () => {
    const res = await fetch(`/api/Users/${userId}/${cravingId}`, {
      method: "GET",
    });
    const data = await res.json();
    //console.log(data);
    setCraving(data.specificCraving);
    setUser(data.user);
  };

  useEffect(() => {
    getCraving();
  }, []);

  return (
    <div className="bg-[#EAEAEA] min-h-screen-vh h-full flex flex-col items-center w-full gap-7 pt-3 px-4 pb-[30px] ">
      <Headers text="Satisfy" />
      <div className="w-full flex flex-col gap-2 items-start ">
        <h1 className="w-full font-bold text-black ">{craving?.name}</h1>
        <div className="w-full h-[290px] ">
          <Image
            className="rounded-xl"
            src={craving?.image || Craving1}
            alt="cravingImg"
          />
        </div>
        <div className="bg-[#D9D9D9] mt-5 rounded-lg flex flex-col gap-2 pt-6 pl-4 w-full pb-9 ">
          <div className="w-full flex justify-between gap-4 items-center mb-3 ">
            <h1 className="font-medium  ">Satisfy Craving</h1>
            <button className="bg-[#EC5934] px-2 py-2 rounded-l-full flex gap-1 items-center ">
              <Message />
              <p className="text-white text-[10px] font-medium ">
                Contact Craver
              </p>
            </button>
          </div>
          <div className="w-full flex justify-between gap-4 items-center pr-3 ">
            <h2 className="text-[12px]">Amount</h2>
            <p className="text-[#408140] font-bold  "> {craving?.price} NGN </p>
          </div>
          <div className="w-full flex justify-between gap-4 items-center pr-3 ">
            <h2 className="text-[12px]">Vendors Social </h2>
            <a href="">Instagram</a>
          </div>

          <div className="w-full flex justify-between gap-4 items-center pr-3 ">
            <h2 className="text-[12px]">Location</h2>
            <p className="max-w-[200px] text-[12px] text-right w-full flex items-center gap-[2px] ">
              12 Lorem Ipsum Street, Conse... <Copy />{" "}
            </p>
          </div>
          <div className="w-full flex justify-between gap-4 items-center pr-3 ">
            <h2 className="text-[12px]">Note</h2>
            <p className="max-w-[200px] text-[12px] text-right w-full">
              {craving?.craveNote}
            </p>
          </div>
          <div className="w-full flex justify-between gap-4 items-center pr-3 ">
            <h2 className="text-[12px]">Date</h2>
            <p className="text-[10px] "> {craving?.date} 08:02 AM</p>
          </div>
        </div>
      </div>
      <Link
        href={"/cravingSatisfied"}
        className="w-full rounded-lg px-3 py-4 bg-[#EC5934] flex justify-center items-center text-white font-medium "
      >
        Mark as Satisfied
      </Link>
    </div>
  );
};

export default Satisfy;
