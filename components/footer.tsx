import React from "react";
import Image from "next/image";
import Link from "next/link";
import Home from "@/public/Images/home.svg";
import Search from "@/public/Images/search.svg";
import Notifications from "@/public/Images/notifications.svg";
import Cravings from "@/public/Images/cravings.svg";
import Profile from "@/public/Images/profile.svg";
import { Poppins } from "next/font/google";
import {
  CravingsIcon,
  HomeIcon,
  NotificationsIcon,
  ProfileIcon,
  SearchIcon,
} from "@/app/icons";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});
const Footer = () => {
  return (
    <div
      className={`bg-[#EAEAEA] fixed bottom-0 left-0 w-full px-8 py-3 ${poppins.className} `}
    >
      <div className="flex text-[#A4A4A4] justify-between items-end gap-2 font-light text-xs ">
        <Link
          href={"/home"}
          className="flex flex-col justify-center items-center gap-1  "
        >
          <HomeIcon />
          <p>Home</p>
        </Link>
        <Link
          href={"/home/search"}
          className="flex flex-col justify-center items-center gap-1  "
        >
          <SearchIcon />
          <p>Search</p>
        </Link>
        <Link
          href="/home/cravings"
          className="flex flex-col justify-center items-center gap-1 "
        >
          <CravingsIcon />
          <p>Cravings</p>{" "}
        </Link>
        <Link
          href={"/home/notification"}
          className="flex flex-col justify-center items-center gap-1 "
        >
          <NotificationsIcon />
          <p>Notification</p>
        </Link>
        <Link
          href={"/home/profile"}
          className="flex flex-col justify-center items-center gap-1 "
        >
          <ProfileIcon />
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
