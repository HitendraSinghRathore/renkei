"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-10 transition-colors duration-300 overflow-hidden transition
        ${
          scrolled
            ? "bg-white shadow-sm border-b border-gray-200"
            : "bg-white"
        }
      `}
    >
      <nav
        aria-label="Main Navigation"
        className="
          flex items-center justify-between
          h-14
          sm:h-20
          md:h-30
          px-6
          sm:px-4
          md:px-8
        "
      >
        <Link href="/">
          <div className="flex items-center justify-items-start ">
            <div className="relative w-20 py-2 h-16 sm:w-24 sm:h-20 md:w-40 md:h-30 translate-y-1 md:translate-y-2 ">
              <Image
                src="/logo.png"
                alt="Renkei Logo"
                fill
                priority
                className="object-contain scale-[1.4] md:scale-[1.75]"
              />
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            href="/auth/login"
            className="
              text-primary
              text-sm 
              sm:text-base
              hover:bg-pink-700
               hover:shadow-md
              rounded-md
              md:rounded-lg
              bg-primary
              text-white
              border border-primary
                px-2
                py-1
                md:px-4
                md:py-2
              transition
            "
          >
            Sign In
          </Link>

          <Link
            href="/auth/signup"
            className="
              text-primary
              text-sm 
              sm:text-base
            hover:bg-pink-100
            hover:shadow-md
            md:rounded-lg
            border border-primary
                px-2
                py-1
               md:px-4
                md:py-2
              rounded-md

              transition
            "
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
