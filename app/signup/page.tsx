"use client";
import React, { useState } from "react";
import Image from "next/image";
// import backarrow from "@/public/Images/backarrow.png";
import backarrow2 from "@/public/Images/backarrow2.png";
import logo from "@/public/Images/logo.png";
import user from "@/public/Images/user.png";
import password from "@/public/Images/password.png";
// import eye from "@/public/Images/eye.png";
import google from "@/public/Images/google.png";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import UseViewPortHeight from "@/utils/UseViewPortHeight";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  //   weight: "600",
});
interface formDetailsType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const formDetails: formDetailsType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function Page() {
  UseViewPortHeight();
  const router = useRouter();
  const [formData, setFormData] = useState(formDetails);

  const editFormDetails = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all the fields");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: password.toLowerCase(),
          confirmPassword: confirmPassword.toLowerCase(),
        }),
      });
      console.log(formData);
      const newRes = await res.json();

      if (res.ok) {
        alert("Successfully created user");
        router.push("/signin");
      } else {
        alert(newRes.error);
      }
    } catch (error) {
      alert("failed to create user");
    }
  };
  return (
    <div
      className={`w-screen min-h-screen-vh p-10 px-14 bg-[#EAEAEA] flex flex-col justify-center items-center gap-6 ${montserrat.className}  `}
    >
      <div className="grid grid-cols-3 gap-2 w-full ">
        <button onClick={() => router.back()}>
          <Image src={backarrow2} width={32} height={32} alt="back" />
        </button>
        <Image
          src={logo}
          priority={true}
          placeholder="blur"
          alt="craveseatlogo"
        />
      </div>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center font-medium text-[28px] ">
          Welcome to Craveseat
        </h1>
        <p className="text-center">Have your cravings satisfied by others</p>
      </div>
      <div className=" w-full flex flex-col items-center gap-6 ">
        <h2 className={`font-bold text-left w-full text-3xl`}>Sign Up</h2>
        <form
          onSubmit={handleSignUp}
          action="post"
          className="flex flex-col w-full gap-5 items-center "
        >
          <div className="p-3 px-7 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
            <Image src={user} alt="user" />
            <input
              className=" rounded-lg bg-transparent outline-none w-full border-none "
              onChange={(e) => editFormDetails(e, "email")}
              value={formData.email}
              type="email"
              name="email"
              placeholder="email"
              id="email"
            />
          </div>
          <div className="p-3 px-7 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
            <Image src={user} alt="user" />
            <input
              className=" rounded-lg bg-transparent outline-none w-full border-none "
              onChange={(e) => editFormDetails(e, "username")}
              value={formData.username}
              type="text"
              name="username"
              placeholder="username"
              id="username"
            />
          </div>

          <div className="p-3 px-7 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
            <Image src={password} alt="password" />
            <input
              className=" rounded-lg bg-transparent outline-none w-full border-none "
              onChange={(e) => editFormDetails(e, "password")}
              value={formData.password}
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
            />
          </div>
          <div className="p-3 px-7 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
            <Image src={password} alt="password" />
            <input
              className=" rounded-lg bg-transparent outline-none w-full border-none "
              onChange={(e) => editFormDetails(e, "confirmPassword")}
              value={formData.confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              id="confirmPassword"
            />
          </div>
          <button
            type="submit"
            className="bg-[#EC5934] w-full text-white rounded-2xl px-5 py-4 shadow-lg "
          >
            Continue
          </button>
        </form>
      </div>
      <div className=" w-full flex items-center flex-col gap-4 ">
        <div className="flex gap-8 items-center">
          <div className="w-10 h-[1px] bg-[#A4A4A4]"></div>
          <div>or</div>
          <div className="w-10 h-[1px] bg-[#A4A4A4]"></div>
        </div>
        <button className="bg-transparent rounded-3xl border border-[#00000066] w-full flex gap-3 px-3 py-4 justify-center items-center shadow-lg ">
          {" "}
          <Image className="" src={google} alt="google" /> Continue with google
        </button>
        <h2 className="font-semibold">
          Already a member?{" "}
          <Link href="/signin" className="text-[#EC5934] font-semibold">
            Sign In
          </Link>
        </h2>
        <p className="text-center mt-[15px] ">
          By continuing, you agree to Craveseat’s Terms of Service and
          acknowledge you’ve read our Privacy Policy.
        </p>
        <p>
          Are you a business?{" "}
          <span className="underline">Get started here!</span>{" "}
        </p>
      </div>
    </div>
  );
}

export default Page;
