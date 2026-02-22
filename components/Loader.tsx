import React from "react";

/* ─── Spinner (inline / button use) ─── */
export const Spinner = ({
  size = 20,
  color = "#ffffff",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) => (
  <svg
    className={`animate-spin ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeOpacity="0.25"
      strokeWidth="3"
    />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Button Loader ─── */
export const ButtonLoader = ({
  isLoading,
  children,
  loadingText,
  onClick,
  disabled,
  className = "",
  variant = "primary",
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#EC5934] text-white hover:bg-[#d94e2e] shadow-lg",
    secondary: "bg-[#898A8D] text-white hover:bg-[#6e6f72]",
    outline:
      "border border-[#EC5934] text-[#EC5934] hover:bg-[#EC5934] hover:text-white",
  };

  const spinnerColor = variant === "outline" && !isLoading ? "#EC5934" : "#fff";

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <>
          <Spinner size={18} color={spinnerColor} />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
};

/* ─── Page / Full-screen Loader ─── */
export const PageLoader = ({
  message = "Loading...",
  fullScreen = true,
}: {
  message?: string;
  fullScreen?: boolean;
}) => (
  <div
    className={`flex flex-col items-center justify-center gap-4 ${
      fullScreen ? "fixed inset-0 bg-white/90 z-[100]" : "w-full py-20"
    }`}
  >
    {/* Bouncing dots animation */}
    <div className="flex items-center gap-[6px]">
      <span className="page-loader-dot" style={{ animationDelay: "0ms" }} />
      <span className="page-loader-dot" style={{ animationDelay: "150ms" }} />
      <span className="page-loader-dot" style={{ animationDelay: "300ms" }} />
    </div>
    <p className="text-sm text-[#898A8D] font-medium animate-pulse">
      {message}
    </p>

    <style jsx>{`
      .page-loader-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #ec5934;
        animation: bounce 0.6s ease-in-out infinite alternate;
      }
      @keyframes bounce {
        from {
          transform: translateY(0);
          opacity: 0.4;
        }
        to {
          transform: translateY(-12px);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

/* ─── Skeleton line (for content placeholders) ─── */
export const Skeleton = ({
  width = "100%",
  height = 16,
  rounded = true,
  className = "",
}: {
  width?: string | number;
  height?: number;
  rounded?: boolean;
  className?: string;
}) => (
  <div
    className={`skeleton-shimmer ${rounded ? "rounded-full" : "rounded-lg"} ${className}`}
    style={{ width, height }}
  >
    <style jsx>{`
      .skeleton-shimmer {
        background: linear-gradient(
          90deg,
          #eaeaea 25%,
          #f5f5f5 50%,
          #eaeaea 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }
      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `}</style>
  </div>
);
