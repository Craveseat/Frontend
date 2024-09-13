// import Splash1 from "@/components/splash1";
import Splash2 from "@/components/splash2";
import React from "react";
const splashContent = [
  {
    title: "Crave Freely, Satisfy Seamlessly",
    body: "Unlock a world where desires know no bounds. Indulge your desires without restraint and let CraveSeat bring them to vivid reality.",
    BTN: false,
  },
  {
    title: "Craving Made Simple",
    body: "Share your cravings with our vibrant community, and let the satisfiers work their magic. Every craving is an opportunity to connect, inspire, and indulge.",
    BTN: false,
  },
  {
    title: "Satisfaction Delivered, Cravings Conquered",
    body: "Whether it's a birthday wishlist or a spontaneous craving, we've got you covered.",
    BTN: true,
  },
];
const page = () => {
  return (
    <div className="h-full border-3-green w-screen">
      {/* <Splash1 /> */}
      <Splash2 dets={splashContent[0]} />
    </div>
  );
};

export default page;
