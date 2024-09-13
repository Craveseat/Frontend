import React from "react";
import Image from "next/image";
import SplashIMG from "@/public/Images/splash.png";

const Splash = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 ">
      <Image src={SplashIMG} alt="SplashIMG" />

      <div className="flex flex-col gap-5 items-center justify-center w-full text-black">
        <h1 className="font-bold  text-xl text-center ">
          Lorem ipsum dolor sit amet consectetur.
        </h1>
        <p className=" text-center  ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
          dolores quia nam aliquam eveniet, consequuntur quidem, quae, excepturi
          ipsa voluptatum voluptas. Lorem ipsum dolor sit amet consectetur
          adipisicing elit.{" "}
        </p>
      </div>
    </div>
  );
};

export default Splash;
