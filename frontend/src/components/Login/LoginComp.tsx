"use client";
import React, { useState } from "react";
import { assets } from "../../../public/assets/assets";

const LoginComp = () => {
  const [type, setType] = useState("Sign Up");

  return (
    <div className="flex items-center flex-col pt-20 h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo.src}
        alt=""
        className="w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm mt-3">
        <h2 className="text-2xl text-white text-center">
          {type === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center mt-2">
          {" "}
          {type === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>
        <div className="mt-3">
          <form action="">
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
              <img src={assets.person_icon.src} alt="" />
              <input
                className="bg-transparent outline-none"
                type="text"
                name=""
                id=""
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
              <img src={assets.mail_icon.src} alt="" />
              <input
                className="bg-transparent outline-none"
                type="email"
                name=""
                id=""
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
              <img src={assets.lock_icon.src} alt="" />
              <input
                className="bg-transparent outline-none"
                type="password"
                name=""
                id=""
                placeholder="password"
                required
              />
            </div>
            <div className="">
              <p className="mb-4 text-indigo-500 cursor-pointer">
                Forgot password ?
              </p>
              <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
                {type}
              </button>
            </div>
          </form>
          <div className="">
            <p className=""></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
