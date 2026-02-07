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
// import { signIn, useSession } from "next-auth/react";
import { UserRound } from "lucide-react";
import { authServices } from "@/utils/api";
import { useUserDetails } from "@/contexts/UserDetailsContext";

// import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  //   weight: "600",
});

function Page() {
  UseViewPortHeight();
  const router = useRouter();
  // const { data: session, status: sessionStatus } = useSession();
  const { setUserDetails } = useUserDetails();
  //form details state
  const [loginDetails, setLoginDetails] = useState({
    email_or_username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // function to update  form state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setLoginDetails((prev) => ({
      ...prev,
      [field]: e.target.value.toLowerCase(),
    }));
  };

  //function to redirect
  useEffect(() => {
    if (authServices.getAccessToken()) {
      router.push("/home");
    }
  }, [authServices, router]);

  //handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { email_or_username, password } = loginDetails;

    if (!email_or_username || !password) {
      setError("please fill in all fields");
    }
    try {
      const res = await authServices.loginUser(loginDetails);
      console.log(res);
      setUserDetails(res?.data?.user);
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      setError(error.message || "An error occurred while logging you in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-screen min-h-screen-vh p-10 px-7 bg-[#EAEAEA] flex flex-col lg:flex-row-reverse justify-center items-center gap-6 ${montserrat.className}  `}
    >
      <div className="mt-10  w-full flex flex-col justify-center items-center gap-20 ">
        <Image src={logo} alt="craveseatLogo" width={220} height={180} />
        <p className="hidden max-w-[500px] w-full text-center lg:block text-lg  ">
          Share your cravings with our vibrant community, and let the satisfiers
          work their magic. Every craving is an opportunity to connect, inspire,
          and indulge.
        </p>
      </div>
      <div className="flex w-full  flex-col justify-center items-center gap-6 ">
        <div className=" w-full max-w-[400px] flex flex-col items-center gap-4 lg:gap-6 ">
          <h2
            className={`font-semibold text-left lg:text-center lg:text-xl w-full text-xl`}
          >
            Sign In
          </h2>
          <form
            className="flex flex-col w-full gap-5 items-center "
            action="post"
            onSubmit={handleLogin}
          >
            <label className="flex flex-col w-full gap-1" htmlFor="username">
              <span className="text-sm text-gray-500 ">Username/Email</span>
              <div className="p-3 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
                <UserRound size={24} />
                <input
                  className=" rounded-lg bg-transparent outline-none w-full border-none "
                  type="text"
                  name="email_or_username"
                  placeholder="username/email"
                  value={loginDetails.email_or_username}
                  onChange={(e) => handleChange(e, "email_or_username")}
                  id=""
                />
              </div>
            </label>

            <label className="flex flex-col w-full gap-1" htmlFor="password">
              <span className="text-sm text-gray-500 ">Password</span>
              <div className="p-3 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
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
            </label>
            <Link
              href="/forgotPassword"
              className=" w-full text-right text-sm "
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#EC5934] w-full text-white rounded-2xl px-5 py-4 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed "
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            {error && (
              <p className="text-red-600 text-sm -my-4 lg:col-span-2 font-medium text-center">
                {error}
              </p>
            )}
            {/* <Butto func={signInRedrct} text="Sign in" /> */}
          </form>
        </div>
        <div className=" w-full  max-w-[400px] flex items-center flex-col gap-4 ">
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
          <h2 className="font-semibold">
            Do not have an account?{" "}
            <Link href="/signup" className="text-[#EC5934] font-semibold">
              Sign Up
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Page;
