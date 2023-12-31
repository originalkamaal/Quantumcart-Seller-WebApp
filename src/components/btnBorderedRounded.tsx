import React, { FormEvent } from "react";
export const BtnBorderedRounded = ({
  className = "",
  onClick = () => {},
  children,
  type = undefined,
}: {
  className?: string;
  onClick?: (e: FormEvent) => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className}   border border-black rounded px-4 font-bold uppercase shadow-md py-2 flex justify-center`}
    >
      {children}
    </button>
  );
};
