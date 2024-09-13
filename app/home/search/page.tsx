"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import close from "@/public/Images/close.png";
import viewMore from "@/public/Images/dropdown.png";
import rightArrow from "@/public/Images/rightArrow.png";
import { useRouter } from "next/navigation";

const searchItems = ["Oraimo Cord", "Samsung UA11059 TV", "Birkin Bag"];
const tags = [
  "Burger meal",
  "Oraimo cord",
  "JBL Speaker",
  "2024 Mercedes GLE SUV",
  "PS5 Console",
  "Dell Alienware M18",
  "Gym gloves",
  "IPhone 15 pro",
];
const Search = () => {
  const router = useRouter();

  const [showItems, setShowItems] = useState(true);
  return (
    <div className="px-6 pt-10 w-full  ">
      <div className=" flex flex-col gap-9 w-full ">
        <div className="flex justify-between gap-5 items-center ">
          <div className=" flex gap-2 items-center border border-[#00000066] rounded-full w-[100%] px-4 py-1">
            <Image
              src={"/Images/search.png"}
              width={25}
              height={25}
              alt="search"
            />
            <input
              className="border-none w-full outline-none px-3 py-2 "
              type="text"
              name="search"
              id="search"
              placeholder="Search"
            />
            <Image
              src={"/Images/filter.png"}
              width={25}
              height={25}
              alt="filter"
            />
          </div>
          <button
            onClick={() => router.back()}
            className=" text-[#979797] font-medium "
          >
            Exit
          </button>
        </div>
        <div className="flex justify-between gap-3 items-center ">
          <p className="text-xl text-black font-semibold ">History</p>
          <button className="text-[#EC5934] font-semibold">Clear All</button>
        </div>
        <div className="flex flex-col gap-2 w-full  ">
          {searchItems?.map(
            (item, index) =>
              showItems && (
                <div
                  key={index}
                  className=" flex justify-between text-[#979797] py-3 font-medium border-b border-b-[#979797]  "
                >
                  <p>{item}</p>
                  <button>
                    <Image src={close} width={14} alt="cancel" />
                  </button>
                </div>
              )
          )}
        </div>
        <div className="text-[#EC5934] flex items-center gap-3 font-semibold ">
          <h3>View More </h3>
          <Image src={viewMore} alt="viewMore" />
        </div>
        <div className="flex justify-between gap-3 w-full ">
          <h3 className="font-semibold text-black  ">Popular Tags</h3>
          <button className="flex items-center gap-3 text-[#EC5934] font-semibold">
            View All <Image src={rightArrow} alt="viewAll" />{" "}
          </button>
        </div>
        <div className="flex flex-wrap w-full gap-3">
          {tags?.map((tag, index) => (
            <button
              key={index}
              className="w-max px-5 py-2 rounded-3xl border border-[#00000066] font-medium capitalize text-black text-xs "
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
