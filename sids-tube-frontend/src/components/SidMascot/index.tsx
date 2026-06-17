import React from "react";

interface SidMascotProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
};

export const SidMascot: React.FC<SidMascotProps> = ({
  size = "md",
  message,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 shadow-inner ring-1 ring-amber-200 dark:bg-amber-900/40 dark:ring-amber-700"
        aria-label="Mascote preguiça do Sid's Tube"
      >
        <span className={sizeClasses[size]} role="img" aria-hidden="true">
          🦥
        </span>
      </div>
      {message && (
        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
          {message}
        </div>
      )}
    </div>
  );
};

export default SidMascot;
