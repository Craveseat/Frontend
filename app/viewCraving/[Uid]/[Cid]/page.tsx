"use client";

import React, { useState, useEffect } from "react";
import Headers from "@/components/headers";
import Image from "next/image";
import User3 from "@/public/Images/user3.png";
import Craving1 from "@/public/Images/craving1.png";
import UseViewPortHeight from "@/utils/UseViewPortHeight";
import Craving2 from "@/public/Images/craving2.png";
import Cravenote from "@/components/SVGS/Cravenote";
import Like from "@/components/SVGS/Like";
import Comment from "@/components/SVGS/Comment";
import Bookmark from "@/components/SVGS/Bookmark";
import Mirror from "@/components/SVGS/Mirror";
import Share from "@/components/SVGS/Share";
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

const ViewCraving = ({ params }: { params: any }) => {
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
    <div className="bg-[#EAEAEA] min-h-screen-vh h-full flex flex-col items-center w-full gap-7 pt-3 px-4 pb-[100px] ">
      <Headers text="View Cravings" />
      <div className="w-full flex flex-col gap-2 items-start ">
        <div className="flex w-full justify-between gap-2 items-center ">
          <div className="flex items-center gap-2">
            <Image src={user?.avatar || User3} alt="user" />
            <h1 className="text-[12px]"> {user?.userName} </h1>
            <span className="h-[2px] w-[2px] bg-black rounded-full "></span>
            <p className=" text-[10px] text-[#9E9E9E] ">
              {user?.friends ? "friends" : "add"}
            </p>
          </div>
          <p className=" text-[#979797] w-fit text-[10px] font-light ">
            2hr ago
          </p>
        </div>
        <div className="w-full h-[290px] ">
          <Image
            className="rounded-xl"
            src={craving?.image || Craving1}
            alt="cravingImg"
          />
        </div>
        <div className="flex justify-between w-full gap-3 items-center">
          <div className="flex flex-col gap-1   ">
            <h1 className="text-[#000000] text-[12px] font-medium  ">
              {craving?.name}
            </h1>
            <p className="text-[#979797] text-[10px] font-light  ">
              {" "}
              N{craving?.price}{" "}
              <span className="h-[2px] w-[2px] bg-black rounded-full "></span>{" "}
              8:02AM{" "}
              <span className="h-[2px] w-[2px] bg-black rounded-full "></span>{" "}
              {craving?.date}{" "}
              <span className="h-[2px] w-[2px] bg-black rounded-full "></span>{" "}
              11K Views{" "}
            </p>
          </div>
          <Link
            href={`/satisfy/${userId}/${cravingId}`}
            className=" bg-[#EC5934] px-7 py-2 rounded-sm text-[11px] font-semibold text-white "
          >
            Satisfy
          </Link>
        </div>
      </div>
      <div className=" flex flex-col items-center gap-4 w-full ">
        <div className="w-full flex gap-2 items-start ">
          <div>
            <Cravenote />
          </div>

          <div>
            <h2 className="text-[14px]  ">Crave note</h2>
            <p className="text-[12px] font-extralight text-[#50555C] ">
              {craving?.craveNote}
            </p>
          </div>
        </div>
        <div className="w-full border-y-[1px] border-[#979797] flex items-center gap-6 py-2 pl-8  ">
          <p className="font-light text-[10px] flex gap-1 items-center ">
            {" "}
            <span className="font-medium text-[10px] ">
              {craving?.likeCount}
            </span>{" "}
            Likes
          </p>
          <p className="font-light text-[10px] flex gap-1 items-center ">
            {" "}
            <span className="font-medium text-[10px] ">
              {craving?.commentCount}
            </span>{" "}
            Comments
          </p>
          <p className="font-light text-[10px] flex gap-1 items-center ">
            {" "}
            <span className="font-medium text-[10px] ">
              {craving?.bookmarkCount}
            </span>{" "}
            Bookmarks
          </p>
          <p className="font-light text-[10px] flex gap-1 items-center ">
            {" "}
            <span className="font-medium text-[10px] ">
              {craving?.mirrorCount}
            </span>{" "}
            Mirror
          </p>
        </div>
        <div className="w-full flex gap-4 justify-between items-center border-b-[1px] border-[#979797] text-[#979797] text-[12px] font-light py-2 pb-4 ">
          <div className="flex justify-center items-center gap-1 ">
            <div>
              <Like />
            </div>
            <p>Like</p>
          </div>
          <div className="flex justify-center items-center gap-1 ">
            {" "}
            <div>
              <Comment />
            </div>
            <p>Comment</p>
          </div>
          <div className="flex justify-center items-center gap-1 ">
            {" "}
            <div>
              <Bookmark />
            </div>
            <p>Bookmark</p>
          </div>
          <div className="flex justify-center items-center gap-1 ">
            <div>
              <Mirror />
            </div>
            <p>Miror</p>
          </div>
          <div className="flex justify-center items-center gap-1 ">
            <div>
              <Share />
            </div>
            <p>Share</p>
          </div>
        </div>
        <div className="w-full mt-[-7px] ">
          {craving?.comments.map((comment, index) => (
            <div
              key={index}
              className="flex border-b gap-3 items-center border-[#979797] py-2 "
            >
              <div className="">
                <Image width={40} src={comment?.avatar || ""} alt="userImg" />
              </div>
              <div className="flex flex-col gap-[2px] px-2 w-full ">
                <div className="flex gap-1 items-center w-full ">
                  <h2 className="font-medium text-[14px]  ">
                    {comment?.userName}
                  </h2>
                  <span className="h-[2px] w-[2px] bg-black rounded-full "></span>
                  <p className="font-light text-[12px] text-[#979797] ">
                    {comment?.date}
                  </p>
                </div>

                <p className="w-full text-[13px] font-extralight text-[#50555C] ">
                  {comment?.comment}
                </p>

                <div className="w-full flex items-center gap-6">
                  <p
                    className={
                      comment.liked
                        ? "text-[#EC5934] text-[12px] font-medium flex items-center gap-[2px] "
                        : "text-[#979797] text-[12px] font-medium flex items-center gap-[2px]  "
                    }
                  >
                    <span className="font-semibold"> 7</span> like
                  </p>
                  <p className="text-[#979797] font-semibold text-[10px] ">
                    Reply
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed commentShdw bottom-0 left-0 w-full bg-[#EAEAEA] py-5 px-4 ">
        <div className="flex gap-4 items-center w-full bg-[#EAEAEA] ">
          <div>
            <Image width={40} src={User3} alt="userImg" />
          </div>
          <input
            className="bg-white border-[0.5px] border-[#A4A4A4] px-4 py-4 outline-none rounded-full w-full"
            type="text"
            placeholder="Add a comment..."
          />
        </div>
      </div>
    </div>
  );
};

export default ViewCraving;
