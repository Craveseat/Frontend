import React from "react";
import Satisfied from "@/components/satisfied";

/**
 * Represents the data for the "Satisfied" page in the home section of the Craveseat application.
 */
const satisfiedData = [
  {
    title: "Oraimo Chord",
    id: 5536271,
    date: "25th May, 2024. 3:12",
  },
  {
    title: "Oraimo Chord",
    id: 5536271,
    date: "25th May, 2024. 3:12",
  },
];
const page = () => {
  return (
    <div className="flex flex-col h-full bg-[#EAEAEA] px-2 pt-10  ">
      {satisfiedData.map((dets, index) => (
        <Satisfied dets={dets} key={index} />
      ))}
    </div>
  );
};

export default page;
