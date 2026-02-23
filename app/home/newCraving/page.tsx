"use client";
import Headers from "@/components/headers";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import uploadImg1 from "@/public/Images/uploadImg1.png";
import uploadImg2 from "@/public/Images/uploadImg2.png";
import dropdown from "@/public/Images/dropdown.png";
import info from "@/public/Images/info.png";
import { cravingCategories, uploadCravings } from "@/utils/api";
import { CravingCategory, Cravings } from "@/utils/types";
import { Spinner } from "@/components/Loader";

// const categories = [
//   "Food & Snacks",
//   "Gadgets",
//   "Furniture",
//   "Electronics",
//   "Clothing",
//   "Beauty & Health",
//   "Books",
// ];

const Page = () => {
  const [cravings, setCravings] = useState<Cravings>({
    name: "",
    category: "",
    description: "",
    price_estimate: "",
    delivery_address: "",
    recommended_vendor: "",
    vendor_link: "",
    notes: "",
    image_url: "",
  });

  const [categories, setCategories] = useState<CravingCategory[]>([]);

  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await cravingCategories();
        setCategories(res.data);
      } catch (error: unknown) {
        setErrMsg(error as string);
        console.log(error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-dismiss success message after 4 seconds
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrMsg("");
    setIsSubmitting(true);
    try {
      console.log(cravings);
      await uploadCravings(cravings);
      setSuccessMsg("Your Cravings has been uploaded successfully");
    } catch (error: unknown) {
      setErrMsg(error as string);
      console.log(error);
    } finally {
      setCravings({
        name: "",
        category: "",
        description: "",
        price_estimate: "",
        delivery_address: "",
        recommended_vendor: "",
        vendor_link: "",
        notes: "",
        image_url: "",
      });
      setIsSubmitting(false);
    }
  };
  return (
    <div
      className={` bg-[#EAEAEA] h-full overflow-y-auto pb-28  pt-3 relative `}
    >
      {/* Success Notification Bubble */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-transform duration-500 ease-out ${
          successMsg ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-4 mt-4 w-full max-w-md bg-[#EC5934] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-sm font-medium flex-1">{successMsg}</p>
          <button
            onClick={() => setSuccessMsg("")}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-7">
        <Headers text="Add New Cravings" />{" "}
        <form
          onSubmit={handleSubmit}
          className="flex mt-10 flex-col gap-5 w-full "
          action=""
        >
          <div className="w-full flex flex-col items-center border border-[#000000] border-dashed gap-4  py-5 px-2 rounded-3xl ">
            <Image src={uploadImg1} alt="uploadImg" />
            <button className=" rounded-full bg-[#EC5934] py-3 text-[15px] px-7 text-white font-semibold flex items-center gap-2  ">
              <Image src={uploadImg2} alt="uploadImg" /> Upload A Craving
            </button>
            <p className="text-sm font-medium">or drag and drop image</p>
            <p className="text-[10px] mt-[-14px] ">paste image or ctrl + v</p>
          </div>
          <div className="flex flex-col gap-1" ref={categoryRef}>
            <label className="text-sm">Category</label>
            <div className="relative">
              <div
                className="flex justify-between items-center gap-3 border rounded-md px-2 text-sm py-2 w-full border-black cursor-pointer"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <p
                  className={
                    cravings.category ? "text-black" : "text-[#50555C]"
                  }
                >
                  {cravings.category || "Select a category"}
                </p>
                <Image
                  src={dropdown}
                  alt="dropdown"
                  className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </div>
              {isCategoryOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-black rounded-lg overflow-hidden shadow-lg">
                  {isLoadingCategories ? (
                    <div className="flex items-center justify-center py-4">
                      <svg
                        className="animate-spin h-5 w-5 text-[#EC5934]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  ) : categories.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-[#50555C] text-center">
                      No categories available
                    </div>
                  ) : (
                    categories.map((cat) => (
                      <div
                        key={cat.id}
                        className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 hover:bg-[#EC5934] hover:text-white ${
                          cravings.category === cat.id
                            ? "bg-[#EC5934] text-white font-semibold"
                            : "text-black"
                        }`}
                        onClick={() => {
                          setCravings({ ...cravings, category: cat.id });
                          setIsCategoryOpen(false);
                        }}
                      >
                        {cat.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="itemName">
              Item Name
            </label>
            <input
              className=" outline-none border rounded-md text-sm px-2 py-2 w-full border-black bg-transparent "
              type="text"
              name="itemName"
              value={cravings.name}
              placeholder="Item Name"
              id="itemName"
              onChange={(e) =>
                setCravings({ ...cravings, name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="description">
              Craving Description
            </label>
            <input
              className=" outline-none border rounded-md text-sm px-2 py-2 w-full border-black bg-transparent "
              type="text"
              name="description"
              value={cravings.description}
              placeholder="Black, big, small, etc."
              id="description"
              onChange={(e) =>
                setCravings({ ...cravings, description: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="deliveryAddy">
              Delivery Address
            </label>
            <input
              className=" outline-none border rounded-md text-sm px-2 py-2 w-full border-black bg-transparent "
              type="text"
              name="deliveryAddy"
              value={cravings.delivery_address}
              placeholder="Delivery Address"
              id="deliveryAddy"
              onChange={(e) =>
                setCravings({ ...cravings, delivery_address: e.target.value })
              }
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
            <label className="text-sm" htmlFor="averageCost">
              Average Cost
            </label>
            <div className="flex items-center gap-3 border rounded-lg  w-full border-black ">
              <p className="bg-[#D9D9D9] text-[#50555C] text-xl px-4 rounded-l-lg h-full py-2 ">
                ₦
              </p>
              <input
                className="outline-none border-none bg-transparent text-sm "
                type="number"
                name="averageCost"
                value={cravings.price_estimate}
                placeholder="0.00"
                id="averageCost"
                onChange={(e) =>
                  setCravings({
                    ...cravings,
                    price_estimate: e.target.value.toString(),
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="recVendor">
              Recommended Vendor
            </label>
            <input
              className=" outline-none border rounded-md px-2 text-sm py-2 w-full border-black bg-transparent "
              type="text"
              name="recVendor"
              value={cravings.recommended_vendor}
              placeholder="Recommended Vendor"
              id="recVendor"
              onChange={(e) =>
                setCravings({ ...cravings, recommended_vendor: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="vendorContact">
              Vendor Contact
            </label>
            <input
              className=" outline-none border rounded-md px-2 text-sm py-2 w-full border-black bg-transparent "
              type="text"
              name="vendorContact"
              // value={cravings.phone_number}
              placeholder="Vendor Contact"
              id="vendorContact"
              // onChange={(e) =>
              //   setCravings({ ...cravings, phone_number: e.target.value })
              // }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="link">
              Link
            </label>
            <input
              className=" outline-none border rounded-md px-2 text-sm py-2 w-full border-black bg-transparent "
              type="url"
              name="link"
              value={cravings.vendor_link}
              placeholder="Link"
              id="link"
              onChange={(e) =>
                setCravings({ ...cravings, vendor_link: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="notes">
              {" "}
              Short Notes
            </label>
            <textarea
              rows={7}
              className=" outline-none border rounded-md px-2 text-sm py-2 w-full border-black bg-transparent "
              value={cravings.notes}
              name="notes"
              id="notes"
              onChange={(e) =>
                setCravings({ ...cravings, notes: e.target.value })
              }
            ></textarea>
          </div>
          <button
            className="w-full bg-[#EC5934] font-medium text-base text-white px-3 py-3 rounded-md disabled:opacity-60 flex items-center justify-center gap-2 "
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Add Craving"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
