import Headers from "@/components/headers";
import React from "react";
import Image from "next/image";
import uploadImg1 from "@/public/Images/uploadImg1.png";
import uploadImg2 from "@/public/Images/uploadImg2.png";
import dropdown from "@/public/Images/dropdown.png";
import info from "@/public/Images/info.png";
const Page = () => {
  return (
    <div className={` bg-[#EAEAEA] h-full overflow-y-auto pb-28  pt-10 `}>
      <div className="px-7">
        {" "}
        <Headers text="Add New Cravings" />{" "}
        <form className="flex mt-10 flex-col gap-5 w-full " action="">
          <div className="w-full flex flex-col items-center border border-[#000000] border-dashed gap-4  py-5 px-2 rounded-3xl ">
            <Image src={uploadImg1} alt="uploadImg" />
            <button className=" rounded-full bg-[#EC5934] py-3 text-[15px] px-7 text-white font-semibold flex items-center gap-2  ">
              <Image src={uploadImg2} alt="uploadImg" /> Upload A Craving
            </button>
            <p className="text-sm font-medium">or drag and drop image</p>
            <p className="text-[10px] mt-[-14px] ">paste image or ctrl + v</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Category">Category</label>
            <div className="flex justify-between items-center gap-3 border rounded-lg px-3 py-3 w-full border-black ">
              <p>Category</p>
              <Image src={dropdown} alt="dropdown" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="itemName">Item Name</label>
            <input
              className=" outline-none border rounded-lg pl-5 px-3 py-3 w-full border-black bg-transparent "
              type="text"
              name="itemName"
              placeholder="Item Name"
              id="itemName"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="deliveryAddy">Delivery Address</label>
            <input
              className=" outline-none border rounded-lg pl-5 px-3 py-3 w-full border-black bg-transparent "
              type="text"
              name="deliveryAddy"
              placeholder="Delivery Address"
              id="deliveryAddy"
            />
            <div className="flex gap-1 w-full items-start">
              {" "}
              <Image src={info} width={40} alt="info" />{" "}
              <p className="text-[#50555C] text-[10px] text-wrap ">
                For security purpose, we strongly advice you set an open place
                as delivery address as this is public to every user who engages
                your craving.
              </p>{" "}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="averageCost">Average Cost</label>
            <div className="flex items-center gap-3 border rounded-lg  w-full border-black ">
              <p className="bg-[#D9D9D9] text-[#50555C] text-xl px-4 rounded-l-lg h-full py-3 ">
                N
              </p>
              <input
                className="outline-none border-none bg-transparent px-3 py-3 text-xl "
                type="number"
                name="averageCost"
                placeholder="0.00"
                id="averageCost"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="recVendor">Recommended Vendor</label>
            <input
              className=" outline-none border rounded-lg pl-5 px-3 py-3 w-full border-black bg-transparent "
              type="text"
              name="recVendor"
              placeholder="Recommended Vendor"
              id="recVendor"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="vendorContact">Vendor Contact</label>
            <div className="flex justify-between items-center gap-3 border rounded-lg px-3 py-3 w-full border-black ">
              <p>Vendor Contact</p>
              <Image src={dropdown} alt="dropdown" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="link">Link</label>
            <input
              className=" outline-none border rounded-lg pl-5 px-3 py-3 w-full border-black bg-transparent "
              type="text"
              name="link"
              placeholder="Link"
              id="link"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="notes">Notes</label>
            <textarea
              rows={7}
              className=" outline-none border rounded-lg pl-5 px-3 py-3 w-full border-black bg-transparent "
              name="notes"
              id="notes"
            ></textarea>
          </div>
          <button
            className="w-full bg-[#EC5934] font-semibold text-xl text-white px-3 py-4 rounded-md  "
            type="submit"
          >
            Add Craving
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
