import Link from "next/link";
import React from "react";
import Phone from "@/public/Images/Phone2.png";
import Cart from "@/public/Images/Cart2.png";
import Image from "next/image";

const Page = () => {
  return (
    <div className="grid place-items-center  w-full pt-[130px] p-10 ">
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
          className="py-3 px-2 bg-[#EC5934] text-center w-full text-white font-semibold text-xl rounded-lg"
          href={"/home/newCraving"}
        >
          Add new craving
        </Link>
      </div>
    </div>
  );
};

export default Page;
