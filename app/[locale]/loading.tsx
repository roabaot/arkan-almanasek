import React from "react";

const Loading = ({ className = "fixed inset-0" }) => {
  return (
    <div
      className={`z-50 bg-white flex items-center justify-center ${className}`}
    >
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-primaryBlue text-4xl animate-spin flex items-center justify-center border-t-primaryBlue rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-secondaryColor text-2xl animate-spin flex items-center justify-center border-t-secondaryColor rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
