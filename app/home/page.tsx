"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Location from "@/public/Images/location.png";
import Downarrow from "@/public/Images/downarrow.png";
import Notification from "@/public/Images/notification.png";
import Search from "@/public/Images/search.png";
import Filter from "@/public/Images/filter.png";
import Supermarket from "@/public/Images/shopping.png";
import Resturant from "@/public/Images/resturant.png";
import Pharmacy from "@/public/Images/pharmacy2.png";
import LocalMarket from "@/public/Images/localMarket.png";
import CupidTray from "@/public/Images/cupidTray.png";
import Bookmark from "@/components/SVGS/Bookmark";
import Like from "@/components/SVGS/Like";
import User1 from "@/public/Images/user1.png";
import User2 from "@/public/Images/user2.png";
import User3 from "@/public/Images/user3.png";
import Craving1 from "@/public/Images/craving1.png";
import Craving2 from "@/public/Images/craving2.png";
import Craving3 from "@/public/Images/craving3.png";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
// import Footer from "@/components/footer";

const section = [
  {
    image: Resturant,
    text: "Restaurants",
    bgColor:
      "flex flex-col items-center gap-1 max-w-[110px] w-full px-2 py-2 rounded-xl bg-[#F8DCE5]",
  },
  {
    image: Supermarket,
    text: "Supermarket",
    bgColor:
      "flex flex-col items-center gap-1 max-w-[110px] w-full px-2 py-2 rounded-xl bg-[#FEF3EF]",
  },
  {
    image: Pharmacy,
    text: "Pharmacy",
    bgColor:
      "flex flex-col items-center gap-1 max-w-[110px] w-full px-2 py-2 rounded-xl bg-[#EDF3FF]",
  },
  {
    image: LocalMarket,
    text: "Local Market",
    bgColor:
      "flex flex-col items-center gap-1 max-w-[110px] w-full px-2 py-2 rounded-xl bg-[#E5FAF3]",
  },
  {
    image: Resturant,
    text: "Mall",
    bgColor:
      "flex flex-col items-center gap-1 max-w-[110px] w-full px-2 py-2 rounded-xl bg-[#FFC9DD]",
  },
  {
    image: Resturant,
    text: "More",
    bgColor:
      "flex flex-col items-center gap-1 max-w-[110px] w-full px-2 py-2 rounded-xl bg-[#F5FAFE]",
  },
];
const Explore = [
  {
    image: CupidTray,
    name: "Cupid's Tray",
    price: "20,000",
    liked: false,
    bookmarked: false,
  },
  {
    image: CupidTray,
    name: "Cupid's Tray",
    price: "20,000",
    liked: false,
    bookmarked: false,
  },
  {
    image: CupidTray,
    name: "Cupid's Tray",
    price: "20,000",
    liked: false,
    bookmarked: false,
  },
  {
    image: CupidTray,
    name: "Cupid's Tray",
    price: "20,000",
    liked: false,
    bookmarked: false,
  },
  {
    image: CupidTray,
    name: "Cupid's Tray",
    price: "20,000",
    liked: false,
    bookmarked: false,
  },
];
const Cravers = [
  {
    image: Craving1,
    avatar: User1,
    name: "Smokey Jollof with beef and Plantain",
    price: "6,000",
    date: "June 7",
    userName: "thecraver256",
    liked: false,
    bookmarked: false,
    id: 1,
    friends: false,
  },
  {
    image: Craving2,
    avatar: User2,
    name: "Samsung S23 Ultra - 512Gb",
    price: "800,000",
    date: "June 7",
    userName: "Pauleye",
    liked: false,
    bookmarked: false,
    id: 2,
    friends: true,
  },
  {
    image: Craving3,
    avatar: User3,
    name: "Venum Boxing Gloves",
    price: "20,000",
    date: "June 7",
    userName: "hungrybird132",
    liked: false,
    bookmarked: false,
    id: 3,
    friends: false,
  },
  {
    image: Craving1,
    avatar: User1,
    name: "Smokey Jollof with beef and Plantain",
    price: "6,000",
    date: "June 7",
    userName: "thecraver256",
    liked: false,
    bookmarked: false,
    id: 4,
    friends: false,
  },
  {
    image: Craving2,
    avatar: User2,
    name: "Samsung S23 Ultra - 512Gb",
    price: "800,000",
    date: "June 7",
    userName: "Pauleye",
    liked: false,
    bookmarked: false,
    id: 5,
    friends: true,
  },
  {
    image: Craving3,
    avatar: User3,
    name: "Venum Boxing Gloves",
    price: "20,000",
    date: "June 7",
    userName: "hungrybird132",
    liked: false,
    bookmarked: false,
    id: 6,
    friends: false,
  },
  {
    image: Craving1,
    avatar: User1,
    name: "Smokey Jollof with beef and Plantain",
    price: "6,000",
    date: "June 7",
    userName: "thecraver256",
    liked: false,
    bookmarked: false,
    id: 7,
    friends: false,
  },
  {
    image: Craving2,
    avatar: User2,
    name: "Samsung S23 Ultra - 512Gb",
    price: "800,000",
    date: "June 7",
    userName: "Pauleye",
    liked: false,
    bookmarked: false,
    id: 8,
    friends: true,
  },
  {
    image: Craving3,
    avatar: User3,
    name: "Venum Boxing Gloves",
    price: "20,000",
    date: "June 7",
    userName: "hungrybird132",
    liked: false,
    bookmarked: false,
    id: 9,
    friends: false,
  },
  {
    image: Craving1,
    avatar: User1,
    name: "Smokey Jollof with beef and Plantain",
    price: "6,000",
    date: "June 7",
    userName: "thecraver256",
    liked: false,
    bookmarked: false,
    id: 10,
    friends: false,
  },
  {
    image: Craving2,
    avatar: User2,
    name: "Samsung S23 Ultra - 512Gb",
    price: "800,000",
    date: "June 7",
    userName: "Pauleye",
    liked: false,
    bookmarked: false,
    id: 11,
    friends: true,
  },
  {
    image: Craving3,
    avatar: User3,
    name: "Venum Boxing Gloves",
    price: "20,000",
    date: "June 7",
    userName: "hungrybird132",
    liked: false,
    bookmarked: false,
    id: 12,
    friends: false,
  },
  {
    image: Craving1,
    avatar: User1,
    name: "Smokey Jollof with beef and Plantain",
    price: "6,000",
    date: "June 7",
    userName: "thecraver256",
    liked: false,
    bookmarked: false,
    id: 13,
    friends: false,
  },
  {
    image: Craving2,
    avatar: User2,
    name: "Samsung S23 Ultra - 512Gb",
    price: "800,000",
    date: "June 7",
    userName: "Pauleye",
    liked: false,
    bookmarked: false,
    id: 14,
    friends: true,
  },
  {
    image: Craving3,
    avatar: User3,
    name: "Venum Boxing Gloves",
    price: "20,000",
    date: "June 7",
    userName: "hungrybird132",
    liked: false,
    bookmarked: false,
    id: 15,
    friends: false,
  },
  {
    image: Craving1,
    avatar: User1,
    name: "Smokey Jollof with beef and Plantain",
    price: "6,000",
    date: "June 7",
    userName: "thecraver256",
    liked: false,
    bookmarked: false,
    id: 16,
    friends: false,
  },
  {
    image: Craving2,
    avatar: User2,
    name: "Samsung S23 Ultra - 512Gb",
    price: "800,000",
    date: "June 7",
    userName: "Pauleye",
    liked: false,
    bookmarked: false,
    id: 17,
    friends: true,
  },
  {
    image: Craving3,
    avatar: User3,
    name: "Venum Boxing Gloves",
    price: "20,000",
    date: "June 7",
    userName: "hungrybird132",
    liked: false,
    bookmarked: false,
    id: 18,
    friends: false,
  },
  {
    image: Craving1,
    avatar: User1,
    name: "Smokey Jollof with beef and Plantain",
    price: "6,000",
    date: "June 7",
    userName: "thecraver256",
    liked: false,
    bookmarked: false,
    id: 19,
    friends: false,
  },
  {
    image: Craving2,
    avatar: User2,
    name: "Samsung S23 Ultra - 512Gb",
    price: "800,000",
    date: "June 7",
    userName: "Pauleye",
    liked: false,
    bookmarked: false,
    id: 20,
    friends: true,
  },
  {
    image: Craving3,
    avatar: User3,
    name: "Venum Boxing Gloves",
    price: "20,000",
    date: "June 7",
    userName: "hungrybird132",
    liked: false,
    bookmarked: false,
    id: 21,
    friends: false,
  },
  {
    image: Craving1,
    avatar: User1,
    name: "Smokey Jollof with beef and Plantain",
    price: "6,000",
    date: "June 7",
    userName: "thecraver256",
    liked: false,
    bookmarked: false,
    id: 22,
    friends: false,
  },
  {
    image: Craving2,
    avatar: User2,
    name: "Samsung S23 Ultra - 512Gb",
    price: "800,000",
    date: "June 7",
    userName: "Pauleye",
    liked: false,
    bookmarked: false,
    id: 23,
    friends: true,
  },
  {
    image: Craving3,
    avatar: User3,
    name: "Venum Boxing Gloves",
    price: "20,000",
    date: "June 7",
    userName: "hungrybird132",
    liked: false,
    bookmarked: false,
    id: 24,
    friends: false,
  },
];

// Declaring type for users
// Types for comments and replies
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

function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();

  // if (session.status === "unauthenticated") {
  //   redirect("/signin");
  // }
  const fetchUsers = async () => {
    const response = await fetch("api/Users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col items-center gap-6 w-screen bg-[#EAEAEA] pb-20 ">
      <div className="bg-[#EAEAEA] overflow-clip relative before:content-[''] before:h-[800px] before:w-[1000px] before:absolute before:translate-x-[3%] before:left-[-78%] before:bottom-0 before:bg-[#EC5934] before:z-0 before:rounded-b-[800px] w-full pb-14  ">
        <div className="flex flex-col gap-4 relative px-6 pt-5 ">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-[2px] ">
              <h1 className="text-lg font-semibold text-white">
                Welcome,{" "}
                <span className="text-[#3CB9A3]">{session?.user?.email}</span>{" "}
              </h1>
              <div className="flex items-center gap-2 ">
                <Image src={Location} alt="location" />
                <p className="text-[11px] font-normal text-white ">
                  12, Atilola hostel, Agbowo Ibadan.
                </p>
                <Image src={Downarrow} alt="Dropdown" />
              </div>
            </div>
            <div>
              <Image src={Notification} alt="notification" />
              <div className="absolute rounded-full "></div>
            </div>
          </div>
          <div className="w-full bg-white rounded-xl flex gap-2 items-center h-[40px] px-6 py-2 ">
            <Image src={Search} alt="search" />
            <input
              className="outline-none bg-transparent h-full px-2 w-full font-medium   "
              type="text"
              name="search"
              id="search"
              placeholder="Search"
            />
            <Image src={Filter} alt="filter" />
          </div>
          <div className="flex mt-5 justify-center items-center gap-3 flex-wrap ">
            {section.map((e, index) => (
              <div className={e.bgColor} key={index}>
                <Image src={e.image} alt="sectionImg" />
                <p className="text-[#000000] font-medium text-sm ">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-3 ">
        <div className="flex justify-between w-full items-center px-6">
          <h2 className="text-sm text-black font-medium">Explore</h2>{" "}
          <p className="text-[#EC5934] text-[12px]  ">see all</p>
        </div>
        <div className="flex overflow-x-auto pb-5 w-full ">
          {Explore.map((e, index) => (
            <div
              className="rounded-3xl flex flex-col gap-1 ml-5 w-[300px] bg-[#F1F1F1] "
              key={index}
            >
              <div className=" w-[300px] rounded-t-3xl">
                <Image
                  className="w-full rounded-t-3xl h-[130px] "
                  src={e.image}
                  alt={e.name}
                />
              </div>
              <div className="flex px-4 py-3 justify-between gap-2 items-center ">
                <div className="flex flex-col items-start gap-[2px]  ">
                  <h2 className=" font-medium text-[12px] text-black ">
                    {e.name}
                  </h2>
                  <p className=" text-[10px] text-[#9E9E9E] "># {e.price}</p>
                  <div className="flex gap-1 items-center ">
                    <Like />
                    <Bookmark />
                  </div>
                </div>
                <button className="bg-[#EC5934] px-5 flex justify-center item-center py-[6px] text-[12px] rounded text-white text-center ">
                  Crave
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-3 gap-4 px-6 ">
        <h1 className="w-full font-medium text-sm text-black ">Cravers</h1>
        <div className="flex flex-col gap-7 w-full ">
          {users?.map((e, index) => {
            const firstCraving = e.activeCravings[0];
            return (
              <div className="w-full flex flex-col gap-4 " key={index}>
                <div className="flex items-center gap-2 w-full ">
                  <Image src={e.avatar} alt={e.userName} />
                  <h1 className="text-[12px]">{e.userName}</h1>
                  <span className="h-[2px] w-[2px] bg-black rounded-full "></span>
                  {e.friends ? (
                    <p className=" text-[10px] text-[#9E9E9E] ">friends</p>
                  ) : (
                    <p className="cursor-pointer text-[#EC5934] text-[10px] font-semibold ">
                      Add
                    </p>
                  )}
                </div>
                <div className=" flex flex-col gap-1 w-full ">
                  <div className=" w-full rounded-3xl">
                    <Image
                      className="w-full rounded-3xl h-[280px] "
                      src={firstCraving.image}
                      alt={firstCraving.name}
                    />
                  </div>
                  <div className="flex px-4 py-3 justify-between gap-2 items-start ">
                    <div className="flex flex-col items-start gap-[2px]  ">
                      <h2 className=" font-medium text-[12px] text-black ">
                        {firstCraving.name}
                      </h2>
                      <p className=" text-[10px] text-[#9E9E9E] ">
                        # {firstCraving.price} <span>{firstCraving.date}</span>{" "}
                      </p>
                      <div className="flex gap-2 items-center ">
                        <Like />
                        <Bookmark />
                        <Link
                          href={`/viewCraving/${e.id}/${firstCraving.id}`}
                          className="border border-[#50555C] text-[#50555C] text-[7px] px-3 py-1 "
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    <Link
                      href={`/satisfy/${e.id}/${firstCraving.id}`}
                      className="border-[#50555C] bg-[#EC5934] px-5 flex justify-center item-center py-[6px] text-[12px] rounded text-white text-center "
                    >
                      Satisfy
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
