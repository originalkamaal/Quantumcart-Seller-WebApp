import React from "react";

const AuthFormTitles = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <>
      <h1 className="text-3xl text-center text-gray-900 font-bold">{title}</h1>
      <p className="text-sm text-center text-gray-600">{subtitle}</p>
      <div className="my-4 border-b border-gray-300" /> {/* Separator */}
    </>
  );
};

export default AuthFormTitles;
