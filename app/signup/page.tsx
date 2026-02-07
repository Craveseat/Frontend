"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { authServices } from "@/utils/api";
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
import { SignUpDetails } from "@/utils/types";

const montserrat = Montserrat({
  subsets: ["latin"],
  //   weight: "600",
});

const formDetails: SignUpDetails = {
  username: "",
  fullName: "",
  phone_number: "",
  email: "",
  password: "",
  confirm_password: "",
};
function Page() {
  UseViewPortHeight();
  const router = useRouter();
  const [formData, setFormData] = useState(formDetails);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const editFormDetails = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  useEffect(() => {
    if (authServices.getAccessToken()) {
      router.push("/home");
    }
  }, [authServices, router]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    const {
      username,
      email,
      password,
      confirm_password,
      fullName,
      phone_number,
    } = formData;

    if (
      !username ||
      !email ||
      !password ||
      !confirm_password ||
      !fullName ||
      !phone_number
    ) {
      setError("Please fill in all the fields");
      return;
    } else if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await authServices.signUp(formData);
      console.log(formData);
      console.log(res);
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`w-screen min-h-screen-vh p-10 px-7 bg-[#EAEAEA] flex flex-col lg:flex-row-reverse justify-center items-center gap-6 ${montserrat.className}  `}
    >
      <div className="w-full flex flex-col gap-6 items-center">
        <div className="grid place-items-center gap-2 w-full ">
          {/* <button onClick={() => router.back()}>
          <Image src={backarrow2} width={32} height={32} alt="back" />
        </button> */}
          <Image
            src={logo}
            priority={true}
            width={100}
            height={100}
            placeholder="blur"
            alt="craveseatlogo"
          />
        </div>
        <div className="flex flex-col max-w-[500px] items-center w-full gap-3 ">
          <h1 className="text-center font-medium text-xl ">
            Welcome to Craveseat
          </h1>
          <p className="text-center">
            Unlock a world where desires know no bounds. Indulge your desires
            without restraint and let CraveSeat bring them to vivid reality.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 items-center ">
        <div className=" w-full max-w-[600px] flex flex-col items-center gap-4 ">
          <h2 className={`font-bold text-left w-full text-xl`}>Sign Up</h2>
          <form
            onSubmit={handleSignUp}
            action="post"
            className="flex flex-col lg:grid lg:grid-cols-2 w-full gap-5 items-center "
          >
            <label className="flex flex-col w-full gap-1" htmlFor="email">
              <span className="text-sm text-gray-500 ">Email</span>
              <div className="p-3 px-3 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
                <Image src={user} alt="user" />
                <input
                  className=" rounded-lg bg-transparent outline-none w-full border-none "
                  onChange={(e) => editFormDetails(e, "email")}
                  value={formData.email}
                  type="email"
                  name="email"
                  required
                  placeholder="email"
                  id="email"
                />
              </div>
            </label>

            <label className="flex flex-col w-full gap-1" htmlFor="fullName">
              <span className="text-sm text-gray-500 ">Full name</span>
              <div className="p-3 px-3 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
                <Image src={user} alt="user" />
                <input
                  className=" rounded-lg bg-transparent outline-none w-full border-none "
                  onChange={(e) => editFormDetails(e, "fullName")}
                  value={formData.fullName}
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  required
                  id="fullName"
                />
              </div>
            </label>

            <label className="flex flex-col w-full gap-1" htmlFor="username">
              <span className="text-sm text-gray-500 ">Username</span>
              <div className="p-3 px-3 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
                <Image src={user} alt="user" />
                <input
                  className=" rounded-lg bg-transparent outline-none w-full border-none "
                  onChange={(e) => editFormDetails(e, "username")}
                  value={formData.username}
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                  id="username"
                />
              </div>
            </label>

            <label
              className="flex flex-col w-full gap-1"
              htmlFor="phone_number"
            >
              <span className="text-sm text-gray-500 ">Phone number</span>
              <div className="p-3 px-3 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
                <Image src={user} alt="user" />
                <input
                  className=" rounded-lg bg-transparent outline-none w-full border-none "
                  onChange={(e) => editFormDetails(e, "phone_number")}
                  value={formData.phone_number}
                  type="tel"
                  name="phone_number"
                  placeholder="+234 800 000 0000"
                  required
                  id="phone_number"
                />
              </div>
            </label>

            <label className="flex flex-col w-full gap-1" htmlFor="password">
              <span className="text-sm text-gray-500 ">Password</span>
              <div className="p-3 px-3 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
                <Image src={password} alt="password" />
                <input
                  className=" rounded-lg bg-transparent outline-none w-full border-none "
                  onChange={(e) => editFormDetails(e, "password")}
                  value={formData.password}
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  id="password"
                />
              </div>
            </label>

            <label
              className="flex flex-col w-full gap-1"
              htmlFor="confirm_password"
            >
              <span className="text-sm text-gray-500 ">Confirm password</span>
              <div className="p-3 px-3 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
                <Image src={password} alt="password" />
                <input
                  className=" rounded-lg bg-transparent outline-none w-full border-none "
                  onChange={(e) => editFormDetails(e, "confirm_password")}
                  value={formData.confirm_password}
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  required
                  id="confirm_password"
                />
              </div>
            </label>
            <label
              htmlFor="terms"
              className="text-sm w-full flex  items-center gap-2 lg:col-span-2"
            >
              <input
                className="accent-[#EC5934]"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                name="terms"
                id="terms"
              />
              <p className="text-center mt-[15px] text-xs ">
                By continuing, you agree to Craveseat’s Terms of Service and
                acknowledge you’ve read our Privacy Policy.
              </p>
            </label>

            <button
              type="submit"
              disabled={!acceptTerms}
              className="bg-[#EC5934] w-full text-white rounded-2xl px-5 py-4 lg:col-span-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed "
            >
              Continue
            </button>
            {error && (
              <p className="text-red-600 text-sm -my-4 lg:col-span-2 font-medium text-center">
                {error}
              </p>
            )}
          </form>
        </div>
        <div className=" w-full max-w-[600px] flex items-center flex-col gap-4 ">
          <div className="flex gap-8 items-center">
            <div className="w-10 h-[1px] bg-[#A4A4A4]"></div>
            <div>or</div>
            <div className="w-10 h-[1px] bg-[#A4A4A4]"></div>
          </div>
          <button className="bg-transparent rounded-2xl border border-[#00000066] w-full flex gap-3 px-3 py-4 justify-center items-center shadow-lg ">
            {" "}
            <Image className="" src={google} alt="google" /> Continue with
            google
          </button>
          <h2 className="font-semibold text-sm">
            Already a member?{" "}
            <Link href="/signin" className="text-[#EC5934] font-semibold">
              Sign In
            </Link>
          </h2>

          <p>
            Are you a business?{" "}
            <span className="underline">Get started here!</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
