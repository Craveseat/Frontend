"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Like from "@/components/SVGS/Like";
import Bookmark from "@/components/SVGS/Bookmark";
import { CravingCardType } from "@/utils/types";
import CravingPlaceholder from "@/public/Images/cravingPlaceholder.svg";

const CravingCard = ({ craving }: { craving: CravingCardType }) => {
  return (
    <div className="rounded-3xl flex flex-col w-full max-w-[400px] bg-[#F1F1F1] overflow-hidden">
      {/* Image */}
      <div className="w-full">
        <Image
          className="w-full object-cover"
          width={400}
          height={160}
          src={craving?.image_url || CravingPlaceholder}
          alt={craving.name}
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-3 px-4 py-4">
        {/* Header: Name, Price & Actions */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-[2px]">
            <h2 className="font-semibold text-[13px] text-black leading-tight">
              {craving.name}
            </h2>
            <span className="text-[11px] text-[#898A8D] font-medium">
              ₦ {craving?.price_estimate}
            </span>
          </div>
          <div className="flex gap-2 items-center pt-[2px]">
            <Like />
            <Bookmark />
          </div>
        </div>

        {/* Description */}
        {craving?.description && (
          <p className="text-[11px] text-[#6B6B6B] leading-relaxed line-clamp-2">
            {craving.description}
          </p>
        )}

        {/* Vendor Info */}
        {craving?.recommended_vendor && (
          <>
            <hr className="border-[#E0E0E0]" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-[#9E9E9E] uppercase tracking-wider font-medium">
                Recommended Vendor
              </span>
              <div className="flex justify-between items-center">
                <p className="text-[12px] text-black font-medium">
                  {craving.recommended_vendor}
                </p>
                {craving.vendor_link && (
                  <Link
                    href={craving.vendor_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#EC5934] font-medium hover:underline"
                  >
                    Visit →
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CravingCard;
