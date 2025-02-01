"use client"; 

import React, { useState, useEffect } from "react";

import MainNavContent from "./MainNavContent"; 

function MainNav({ isAuthenticated }) {  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setScrolled(window.scrollY > 0);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <MainNavContent scrolled={scrolled} isAuthenticated={isAuthenticated} /> 
  );
}

export default MainNav;