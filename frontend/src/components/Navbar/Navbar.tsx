import React from "react";
import { assets } from "../../../public/assets/assets";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  console.log(assets.logo);

  return (
    <div className="w-full flex justify-between items-center p-4 sm:px-24 shadow-sm">
      <Link href={"/"}>
        <img src={assets.logo.src} alt="" className="w-28 sm:w-32" />
      </Link>
      <Link href={"/login"}>
        <button className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all">
          Login <ArrowRight size={16} />
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
