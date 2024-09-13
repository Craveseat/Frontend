"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/Images/logo.png";
import user from "@/public/Images/user.png";
import password from "@/public/Images/password.png";
// import eye from "@/public/Images/eye.png";
import google from "@/public/Images/google.png";
import { Montserrat } from "next/font/google";
import Link from "next/link";
// import Butto from "@/components/button";
import { useRouter } from "next/navigation";
import UseViewPortHeight from "@/utils/UseViewPortHeight";
import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  //   weight: "600",
});

function Page() {
  UseViewPortHeight();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  //form details state
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  // function to update  form state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setLoginDetails((prev) => ({
      ...prev,
      [field]: e.target.value.toLowerCase(),
    }));
  };

  //function to redirect
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/home");
    }
  }, [sessionStatus, router]);

  //handle login
  const signInRedrct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = loginDetails;

    if (!username || !password) {
      alert("please fill in all fields");
    }

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    console.log(res);
    if (res?.error) {
      if (res?.url) {
        router.replace("/home");
      }

      alert("Invalid username or password");
    } else {
      alert("Login successful");
    }
    // router.push("/home");
  };

  return (
    <div
      className={`w-screen min-h-screen-vh p-10 px-14 bg-[#EAEAEA] flex flex-col justify-center items-center gap-6 ${montserrat.className}  `}
    >
      <div className="mt-10">
        <Image src={logo} alt="craveseatLogo" width={180} height={180} />
      </div>
      <div className=" w-full flex flex-col items-center gap-6 ">
        <h2 className={`font-bold text-left w-full text-3xl`}>Sign In</h2>
        <form
          className="flex flex-col w-full gap-5 items-center "
          action="post"
          onSubmit={signInRedrct}
        >
          <div className="p-3 px-7 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
            <Image src={user} alt="user" />
            <input
              className=" rounded-lg bg-transparent outline-none w-full border-none "
              type="text"
              name="username"
              placeholder="username"
              value={loginDetails.username}
              onChange={(e) => handleChange(e, "username")}
              id=""
            />
          </div>
          <div className="p-3 px-7 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
            <Image src={password} alt="password" />
            <input
              className=" rounded-lg bg-transparent outline-none w-full border-none "
              type="password"
              name="password"
              placeholder="password"
              value={loginDetails.password}
              onChange={(e) => handleChange(e, "password")}
              id=""
            />
          </div>
          <Link href="/forgotPassword" className=" w-full text-right ">
            Forgot password?
          </Link>
          <button
            type="submit"
            className="bg-[#EC5934] w-full text-white rounded-2xl px-5 py-4 shadow-lg "
          >
            Sign in
          </button>
          {/* <Butto func={signInRedrct} text="Sign in" /> */}
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
          Do not have an account?{" "}
          <Link href="/signup" className="text-[#EC5934] font-semibold">
            Sign Up
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
