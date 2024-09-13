import Link from "next/link";
import React from "react";

const Satisfied = ({
  dets,
}: {
  dets: { title: string; id: number; date: string };
}) => {
  return (
    <div className="bg-[#EAEAEA] flex flex-col gap-3 px-3 py-3 pb-10 w-full border-b border-[#DDDBDB] ">
      <div className="flex w-full justify-between items-end">
        <h1 className="font-medium text-black  ">{dets.title}</h1>
        <p className="text-[10px] font-medium">Craving ID #{dets.id}</p>
      </div>
      <div className="flex w-full justify-between items-end">
        <h1 className="text-[#50555C] text-xs ">{dets.date}</h1>
        <Link className="text-[#EC5934] text-[10px] font-medium  " href={""}>
          View details
        </Link>
      </div>
    </div>
  );
};

export default Satisfied;
