import React from "react";
import { assets } from "../../../public/assets/assets";

const Header = () => {
  return (
    <div className="flex justify-center items-center sm:h-[80vh] sm:mt-0 mt-10 px-5">
      <div className="w-fit flex flex-col items-center">
        <img
          src={assets.header_img.src}
          alt=""
          className="w-36 h-36 rounded-full mb-6"
        />
        <h1 className="text-xl sm:text-3xl font-medium mb-2 flex gap-3">
          Hey Developers{" "}
          <img src={assets.hand_wave.src} alt="" className="w-8" />
        </h1>
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          Welcome to our app
        </h2>
        <p className="mb-8 max-w-md text-center">
          Let's start with a quick product tour and we will have you up and
          running in no time!
        </p>
        <button className="border border-gray-500 rounded-full px-8 p-2.5 hover:bg-gray-100 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Header;
