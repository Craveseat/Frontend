"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
// import backarrow from "@/public/Images/backarrowWhite.png";
import Notification from "@/public/Images/notification1.png";
import ProfileImg from "@/public/Images/profileIMG.png";
import ManageProfileIcon from "@/public/Images/userProfile.png";
import Address from "@/public/Images/addresses.png";
import profileNotif from "@/public/Images/profilNotif.png";
// import proceed from "@/public/Images/profileArr.png";
import Support from "@/public/Images/support.png";
import FAQ from "@/public/Images/QA.png";
import Toggle from "@/components/toggle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserDetails } from "@/contexts/UserDetailsContext";
import { authServices, userProfile } from "@/utils/api";
import ManageProfile from "./manage/page";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BellOrangeIcon,
  FAQOrangeIcon,
  HeadphonesOrangeIcon,
  ThemeOrangeIcon,
  UserOrangeIcon,
} from "@/app/icons";
// import { signOut, useSession } from "next-auth/react";

const Profile = () => {
  const router = useRouter();
  const { user, setUserDetails } = useUserDetails();
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  // const [localUser, setLocalUser] = useState(user || null);
  const handleSignOut = () => {
    authServices.logout();
  };

  const handleCloseProfile = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowProfile(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    const getUserProfile = async () => {
      console.log("loading user", user);
      try {
        const res = await userProfile();
        console.log(res.data);
        setUserDetails(res.data);
        // setUserDetails(res.data);
        // setUserDetails(res.data?.user);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("user loaded");
      }
    };
    getUserProfile();
  }, []);

  return (
    <div className="bg-[#EAEAEA] h-full ">
      <div className=" px-8 py-8 relative pb-20 w-full flex flex-col gap-8 overflow-clip items-center text-white before:content-[''] before:h-[1500px] before:aspect-square before:absolute before:bottom-0 before:bg-[#EC5934] before:z-0 before:rounded-b-[1500px] ">
        <div
          className={`flex relative items-center justify-between gap-3  w-full transition-opacity duration-300 ease-in-out ${showProfile ? "opacity-0 " : "opacity-100"}`}
        >
          <button onClick={() => router.back()}>
            <ChevronLeft />
          </button>
          <h2>Profile</h2>
          <div className="relative">
            <Bell />
            <p className="py-[1px] px-[5px] text-black text-center bg-white absolute top-[-3px] right-[-3px] rounded-full text-[9px] grid place-items-center ">
              {" "}
              2
            </p>
          </div>
        </div>

        <div className="flex relative flex-col items-center gap-1">
          <Image src={ProfileImg} alt="profileImg" />
          <p className=" font-medium text-lg text-center ">{user?.full_name}</p>

          <p className="text-sm">
            <span>128</span> followers &#8226; <span>100</span> following
          </p>
        </div>
      </div>
      <div className="relative px-5 py-5 pt-10">
        <div className="absolute shadow-md top-[-40px] left-[50%] bg-[#FFFFFF] translate-x-[-50%] rounded-lg px-6 py-3 flex gap-1 items-center text-black text-sm  ">
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

        <div className="bg-white rounded-2xl justify-start flex flex-col gap-5 w-full items-center p-6 shadow-md ">
          <div className="flex flex-col gap-5 w-full  ">
            <h2 className="font-semibold">My account</h2>
            <button
              onClick={() => setShowProfile(true)}
              // href={"/home/profile/manage"}
              className="flex justify-between items-center w-full mt-1 "
            >
              <div className="flex text-[#50555C] items-center gap-2">
                <UserOrangeIcon />
                <p>Manage Profile</p>
              </div>{" "}
              <ChevronRight />
            </button>
            {/* <div className="flex justify-between items-center w-full ">
              <div className="flex text-[#50555C] items-center gap-2">
                <Image src={Address} alt="icon" /> <p>Addresses</p>
              </div>{" "}
              <Image src={proceed} alt="nextarr" />{" "}
            </div> */}
          </div>
          <div className="flex flex-col gap-5 w-full  ">
            <h2 className="font-semibold">Notification</h2>
            <div className="flex justify-between items-center w-full mt-1 ">
              <div className="flex text-[#50555C] items-center gap-2">
                <BellOrangeIcon />
                <p>Notification</p>
              </div>{" "}
              <Toggle />{" "}
            </div>
            <div className="flex justify-between items-center w-full ">
              <div className="flex text-[#50555C] items-center gap-2">
                <BellOrangeIcon />
                <p>Promotional Notification </p>
              </div>{" "}
              <Toggle />{" "}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full  ">
            <h2 className="font-semibold">More</h2>
            <div className="flex justify-between items-center w-full mt-1 ">
              <div className="flex text-[#50555C] items-center gap-2">
                <ThemeOrangeIcon />
                <p>Theme mode</p>
              </div>{" "}
              <div className="flex text-[#50555C] items-center gap-2">
                <p>Light</p>
                <ChevronRight />
              </div>{" "}
            </div>
            <div className="flex justify-between items-center w-full ">
              <div className="flex text-[#50555C] items-center gap-2">
                <HeadphonesOrangeIcon />
                <p>Support</p>
              </div>{" "}
              <ChevronRight />{" "}
            </div>
            <div className="flex justify-between items-center w-full ">
              <div className="flex text-[#50555C] items-center gap-2">
                <FAQOrangeIcon />
                <p>FAQ</p>
              </div>{" "}
              <ChevronRight />{" "}
            </div>
          </div>
          <button
            onClick={() => handleSignOut()}
            className="text-white rounded-full px-6 py-2 bg-[#898A8D] "
          >
            Logout
          </button>
        </div>
      </div>
      {showProfile && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50"
          style={{
            animation: isClosing
              ? "slideDown 0.3s ease-in forwards"
              : "slideUp 0.3s ease-out forwards",
          }}
        >
          <ManageProfile setShowProfile={handleCloseProfile} />
        </div>
      )}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
