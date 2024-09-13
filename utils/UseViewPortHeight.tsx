// useViewportHeight.ts
import { useEffect } from "react";

const UseViewPortHeight = () => {
  useEffect(() => {
    const updateVh = (): void => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVh();
    window.addEventListener("resize", updateVh);

    return () => window.removeEventListener("resize", updateVh);
  }, []);
};

export default UseViewPortHeight;
