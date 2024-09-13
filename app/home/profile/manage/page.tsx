import Close from "@/components/SVGS/Close";
import React from "react";
import ProfileImg from "@/public/Images/profileIMG.png";
import Image from "next/image";
import Edit from "@/components/SVGS/Edit";
import GreaterThan from "@/components/SVGS/GreaterThan";
import User from "@/components/SVGS/User";
import Bio from "@/components/SVGS/Bio";
import Padlock from "@/components/SVGS/Padlock";
import Message from "@/components/SVGS/Message";
import Phone from "@/components/SVGS/Phone";
import Location from "@/components/SVGS/Location";
import Message2 from "@/components/SVGS/Message2";
import Link from "next/link";

const ManageProfile = () => {
  return (
    <div className="bg-[#EC5934] pt-20  ">
      <div className="bg-white rounded-t-[30px] pt-9 px-7 flex flex-col items-center w-full gap-7  ">
        <div className="flex items-center w-full gap justify-between px-4 py-3 ">
          <div></div>
          <p>Manage Profile</p>
          <Link href="/home/profile">
            {" "}
            <Close />{" "}
          </Link>
        </div>

        <div className="w-full flex justify-center items-center ">
          <Image width={130} src={ProfileImg} alt="manage-profile" />
        </div>

        <div className="flex flex-col items-center w-full mt-[24px]  ">
          <div className="flex items-center w-full justify-between border-b border-b-[#0000001A] py-[24px] px-3 ">
            <div>
              <User />
            </div>
            <p className="">Pauleye12</p>
            <div>
              <Edit />
            </div>
          </div>
          <div className="flex items-center w-full justify-between border-b border-b-[#0000001A] py-[24px] px-3 ">
            <div>
              <Bio />
            </div>
            <p className="">Bio</p>
            <div>
              {" "}
              <GreaterThan />{" "}
            </div>
          </div>
          <div className="flex items-center w-full justify-between border-b border-b-[#0000001A] py-[24px] px-3 ">
            <div>
              {" "}
              <Padlock />{" "}
            </div>
            <p className="">Password</p>
            <div>
              {" "}
              <GreaterThan />{" "}
            </div>
          </div>
          <div className="flex items-center w-full justify-between border-b border-b-[#0000001A] py-[24px] px-3 ">
            <div>
              {" "}
              <Message2 />{" "}
            </div>
            <p className="">pauleye.ogunmepon75@gmail.com</p>
            <div>
              {" "}
              <GreaterThan />{" "}
            </div>
          </div>
          <div className="flex items-center w-full justify-between border-b border-b-[#0000001A] py-[24px] px-3 ">
            <div>
              {" "}
              <Phone />{" "}
            </div>
            <p className="">Phone Number</p>
            <div>
              {" "}
              <GreaterThan />{" "}
            </div>
          </div>
          <div className="flex items-center w-full justify-between border-b border-b-[#0000001A] py-[24px] px-3 ">
            <div>
              <Location />
            </div>
            <p className="">Delivery Address</p>
            <div>
              {" "}
              <GreaterThan />{" "}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ManageProfile;
