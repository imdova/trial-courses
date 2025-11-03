import React from "react";

type MainBtnProps = {
  children: string | React.ReactNode;
  width: string;
};

const MainBtn: React.FC<MainBtnProps> = ({ children, width }) => {
  return (
    <button
      style={{ width: width }}
      className="flex text-white transition-all duration-300 hover:bg-black hover:text-white justify-center items-center rounded-md w-full bg-primary py-2 px-4">
      {children}
    </button>
  );
};

export default MainBtn;
