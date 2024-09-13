"use client";

import Image from "next/image";
import React from "react";
import backarrow from "@/public/Images/backarrowWhite.png";
import Notification from "@/public/Images/notification1.png";
import ProfileImg from "@/public/Images/profileIMG.png";
import ManageProfile from "@/public/Images/userProfile.png";
import Address from "@/public/Images/addresses.png";
import profileNotif from "@/public/Images/profilNotif.png";
import proceed from "@/public/Images/profileArr.png";
import Support from "@/public/Images/support.png";
import FAQ from "@/public/Images/QA.png";
import Toggle from "@/components/toggle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "unauthenticated") {
    redirect("/signin");
  }
  return (
    <div className="bg-[#EAEAEA] h-full ">
      <div className=" px-8 py-8 relative pb-20 w-full flex flex-col gap-8 overflow-clip items-center text-white before:content-[''] before:h-[1500px] before:aspect-square before:absolute before:bottom-0 before:bg-[#EC5934] before:z-0 before:rounded-b-[1500px] ">
        <div className="flex relative items-center justify-between gap-3  w-full ">
          <button onClick={() => router.back()}>
            <Image src={backarrow} alt="back-btn" />
          </button>
          <h2>Profile</h2>
          <div className="relative">
            <Image
              className=""
              src={Notification}
              alt="notification"
              width={30}
            />
            <p className="py-[1px] px-[5px] text-black text-center bg-white absolute top-[-3px] right-[-3px] rounded-full text-[10px] grid place-items-center ">
              {" "}
              2
            </p>
          </div>
        </div>
        <div className="flex relative flex-col items-center gap-1">
          <Image src={ProfileImg} alt="profileImg" />
          <p className=" font-medium text-xl text-center ">Adeleye Oreoluwa</p>

          <p>
            <span>128</span> followers &#8226; <span>100</span> following
          </p>
        </div>
      </div>
      <div className="relative px-5 py-5 pt-10">
        <div className="absolute top-[-40px] left-[50%] bg-[#FFFFFF] translate-x-[-50%] rounded-xl px-10 py-5 flex gap-1 items-center text-black  ">
          <div className="flex items-center px-2">
            <span className="font-bold mr-2">19</span> Pending
          </div>
          <div className=" flex items-center px-3 border-l border-r border-black">
            {" "}
            <span className="font-bold mr-2">1</span> Active
          </div>
          <div className="flex items-center px-2">
            {" "}
            <span className="font-bold mr-2">14</span> Satisfied
          </div>
        </div>

        <div className="bg-white rounded-2xl justify-start flex flex-col gap-5 w-full items-center p-5 ">
          <div className="flex flex-col gap-5 w-full  ">
            <h2 className="font-semibold">My account</h2>
            <div className="flex justify-between items-center w-full mt-1 ">
              <Link
                href={"/home/profile/manage"}
                className="flex text-[#50555C] items-center gap-2"
              >
                <Image src={ManageProfile} alt="icon" /> <p>Manage Profile</p>
              </Link>{" "}
              <Image src={proceed} alt="nextarr" />{" "}
            </div>
            <div className="flex justify-between items-center w-full ">
              <div className="flex text-[#50555C] items-center gap-2">
                <Image src={Address} alt="icon" /> <p>Addresses</p>
              </div>{" "}
              <Image src={proceed} alt="nextarr" />{" "}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full  ">
            <h2 className="font-semibold">Notification</h2>
            <div className="flex justify-between items-center w-full mt-1 ">
              <div className="flex text-[#50555C] items-center gap-2">
                <Image src={profileNotif} alt="icon" /> <p>Notification</p>
              </div>{" "}
              <Toggle />{" "}
            </div>
            <div className="flex justify-between items-center w-full ">
              <div className="flex text-[#50555C] items-center gap-2">
                <Image src={profileNotif} alt="icon" />{" "}
                <p>Promotional Notification </p>
              </div>{" "}
              <Toggle />{" "}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full  ">
            <h2 className="font-semibold">More</h2>
            <div className="flex justify-between items-center w-full mt-1 ">
              <div className="flex text-[#50555C] items-center gap-2">
                <Image src={Address} alt="icon" /> <p>Theme mode</p>
              </div>{" "}
              <div className="flex text-[#50555C] items-center gap-2">
                <p>Light</p>
                <Image src={proceed} alt="nextarr" />
              </div>{" "}
            </div>
            <div className="flex justify-between items-center w-full ">
              <div className="flex text-[#50555C] items-center gap-2">
                <Image src={Support} alt="icon" /> <p>Support</p>
              </div>{" "}
              <Image src={proceed} alt="nextarr" />{" "}
            </div>
            <div className="flex justify-between items-center w-full ">
              <div className="flex text-[#50555C] items-center gap-2">
                <Image src={FAQ} alt="icon" /> <p>FAQ</p>
              </div>{" "}
              <Image src={proceed} alt="nextarr" />{" "}
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="text-white rounded-full px-6 py-2 bg-[#898A8D] "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
