"use client"; 

import React, { useState, useEffect } from "react";

import MainNavContent from "./MainNavContent"; 

function MainNav({ isAuthenticated }) {  
  const [scrolled, setScrolled] = useState(false);
  const [auth, setAuth] = useState(isAuthenticated);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setScrolled(window.scrollY > 0);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [isAuthenticated]);

  return (
    <MainNavContent scrolled={scrolled} isAuthenticated={auth} setAuthenticated={setAuth} /> 
   

  );
}

export default MainNav;