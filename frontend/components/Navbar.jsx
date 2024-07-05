import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className="h-14 bg-white rounded-lg shadow-md p-4 overflow-x-hidden">
      <nav className="flex items-center justify-between h-full">
        {" "}
        <Link href={"/"} className="md:text-2xl text-xl font-semibold">
          Book
          <span className="bg-black text-white px-2 ml-1 rounded-md">
            Portal
          </span>
        </Link>
        <Link
          className="bg-black text-white p-2 rounded-md hidden sm:inline"
          href={"/create"}
        >
          + Add Book
        </Link>
        <Link
          className="bg-black text-white p-1 rounded-md inline sm:hidden"
          href={"/create"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
