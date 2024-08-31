import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 lg:max-w-[70%] mx-auto flex justify-between py-6 border-b border-slate-500 items-center mb-5">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-green-500 font-bold text-4xl">Health</span>
        <span className="text-gray-900 font-bold text-4xl">News</span>
      </Link>
      <div className="md:flex hidden gap-5">
        <Link to="/bookmarks">Bookmarked Articles</Link>
        <Link to="/about" className="mr-4">
          About
        </Link>
      </div>
      <button
        className="md:hidden flex items-center text-gray-900"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-white border border-gray-300 shadow-lg rounded-lg p-4">
          <Link to="/bookmarks" className="block mb-2">
            Bookmarked Articles
          </Link>
          <Link to="/about" className="block">
            About
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
