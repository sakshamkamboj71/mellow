import React from "react";

const SoftLoading = () => {
  return (
    <div className="inset-0 bg-[#1f1f1f] flex justify-center items-center w-full h-full enableScroll">
      <div className="text-2xl sm:text-4xl p-14 sm:p-28 bg-[#030101] rounded-lg text-white text-center">
        LOADING
      </div>
    </div>
  );
};

export default SoftLoading;
