// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import CustomConnectButton from "./custom-connect-button";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 px-5.5 bg-white shadow-md ">
      <div className="flex items-center">
        <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="#004080">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>

        <span className="text-2xl font-bold text-primary-blue">Synesi</span>
      </div>

      <nav className="hidden md:flex space-x-4">
        <Link href="/" className="text-gray-600 hover:text-primary-blue">
          Home
        </Link>
        <Link
          href="/verification"
          className="text-gray-600 hover:text-primary-blue"
        >
          Verification
        </Link>
        <Link href="/courses" className="text-gray-600 hover:text-primary-blue">
          Courses
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-primary-blue">
          About
        </Link>
      </nav>
      <div>
        <CustomConnectButton />
      </div>
    </header>
  );
};

export default Header;
