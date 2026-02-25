"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import {
  CravingsIcon,
  HomeIcon,
  NotificationsIcon,
  ProfileIcon,
  SearchIcon,
} from "@/app/icons";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

const ACTIVE_COLOR = "#EC5934";
const INACTIVE_COLOR = "#FFFFFF";

const Footer = () => {
  const pathname = usePathname();
  const [tappedLink, setTappedLink] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [archStyle, setArchStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const [isInitial, setIsInitial] = useState(true);

  const links = [
    { href: "/home", label: "Home", Icon: HomeIcon, exact: true },
    { href: "/home/search", label: "Search", Icon: SearchIcon },
    { href: "/home/cravings", label: "Cravings", Icon: CravingsIcon },
    {
      href: "/home/notification",
      label: "Notification",
      Icon: NotificationsIcon,
    },
    { href: "/home/profile", label: "Profile", Icon: ProfileIcon },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const activeIndex = links.findIndex((l) => isActive(l.href, l.exact));

  const measureArch = () => {
    if (!navRef.current || activeIndex === -1) return;
    const activeEl = navRef.current.querySelector(
      `[data-nav-index="${activeIndex}"]`,
    ) as HTMLElement;
    if (!activeEl) return;

    const navRect = navRef.current.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    setArchStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  };

  // Measure after layout is settled; skip transition on first paint
  useEffect(() => {
    requestAnimationFrame(() => {
      measureArch();
      if (isInitial) {
        // allow one frame for the arch to snap into position, then enable transitions
        requestAnimationFrame(() => setIsInitial(false));
      }
    });
  }, [activeIndex, pathname]);

  // Re-measure on window resize
  useEffect(() => {
    const handleResize = () => measureArch();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleTap = (href: string) => {
    setTappedLink(href);
    setTimeout(() => setTappedLink(null), 500);
  };

  return (
    <div
      className={`bg-[#EC5934] fixed bottom-0 left-0 w-full pt-3 ${poppins.className} `}
    >
      <div
        ref={navRef}
        className="grid grid-cols-5 gap-2 pb-3 font-light text-xs relative"
      >
        {/* Sliding arch indicator */}
        {archStyle && (
          <span
            className={`nav-arch ${isInitial ? "no-transition" : ""}`}
            style={{
              left: archStyle.left,
              width: archStyle.width,
              borderRadius:
                activeIndex === 0
                  ? "0 15px 0 0"
                  : activeIndex === links.length - 1
                    ? "15px 0 0 0"
                    : "15px 15px 0 0",
            }}
          />
        )}

        {links.map(({ href, label, Icon, exact }, index) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              data-nav-index={index}
              onClick={() => handleTap(href)}
              className={`nav-link-bubble flex flex-col text-xs font-light justify-center items-center gap-1 relative z-10 `}
            >
              {/* Bubble ripple */}
              {tappedLink === href && <span className="nav-bubble-ring" />}
              <Icon fill={active ? ACTIVE_COLOR : INACTIVE_COLOR} />
              <p style={{ color: active ? ACTIVE_COLOR : INACTIVE_COLOR }}>
                {label}
              </p>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .nav-arch {
          position: absolute;
          top: -12px;
          height: calc(100% + 20px);
          background: white;
          border-radius: 10px 10px 0px 0px;
          transition:
            left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 0;
        }
        .nav-arch.no-transition {
          transition: none;
        }
        .nav-link-bubble {
          -webkit-tap-highlight-color: transparent;
        }
        .nav-bubble-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          margin-top: -5px;
          margin-left: -5px;
          border-radius: 50%;
          background: rgba(236, 89, 52, 0.25);
          animation: bubblePop 0.5s ease-out forwards;
          pointer-events: none;
          z-index: 20;
        }
        @keyframes bubblePop {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          60% {
            opacity: 0.6;
          }
          100% {
            transform: scale(6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;
