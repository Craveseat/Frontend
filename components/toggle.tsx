"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const slideBtn = {
  monthly: {
    x: "0",
    backgroundColor: "#EC5934",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  yearly: {
    x: "19px",
    backgroundColor: "#EAEAEA",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  bgRed: {
    backgroundColor: "#EAEAEA",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },

  bgWhite: {
    backgroundColor: "#EC5934",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
function Toggle() {
  const [swipe, setSwipe] = useState(false);
  return (
    <motion.div
      variants={slideBtn}
      animate={swipe ? "bgWhite" : "bgRed"}
      onClick={() => setSwipe(!swipe)}
      className=" w-10 h-5 relative p-[2px] rounded-full cursor-pointer"
    >
      <motion.div
        variants={slideBtn}
        animate={swipe ? "yearly" : "monthly"}
        className="bg-[#EC5934] rounded-full top-0.5 left-0.5 bottom-0.5 aspect-square absolute"
      ></motion.div>
    </motion.div>
  );
}

export default Toggle;
