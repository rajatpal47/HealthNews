import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className=" bg-slate-900 py-6">
        <div className="lg:max-w-[70%] mx-auto">
          <div className="container mx-auto flex flex-col  items-center gap-4 md:flex-row md:justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-green-500 font-bold text-4xl">Health</span>
              <span className="text-gray-300 font-bold text-4xl">News</span>
            </Link>
            <span className="text-white font-bold tracking-tight flex gap-4">
              <p className="cursor-pointer">Privacy Policy</p>
              <p className="cursor-pointer">Terms of Service</p>
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-600 p-4 bg-slate-800">
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; 2024 HealthNews. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
