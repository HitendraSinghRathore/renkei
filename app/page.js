"use client";
import Image from 'next/image';
import { useState, useEffect } from "react";

import FeatureSection from './components/FeatureSection';
import HeroSection from './components/HeroSection';
import MainNav from './components/layouts/MainNav';
import MainFooter from './components/MainFooter';

import AuthService from "@/app/services/authService";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    function checkProfile() {
      const cachedProfile = AuthService.getUserProfile();
      if (cachedProfile) {
        setIsAuthenticated(true);
        return;
      }
       AuthService.getProfile().then((profile) => {
          setIsAuthenticated(!!profile);
        }).catch((error) =>{
          console.error("Error fetching profile:", error);
          setIsAuthenticated(false);
        });
    }
    checkProfile();
  }, []);

  return (
    <div>
      <MainNav isAuthenticated={isAuthenticated}/>
      <main>
        <HeroSection className="mb-20 md:mb-40" />
        <section className="mb-20 md:mb-40 px-4 sm:px-8 pt-16">
          <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-10 sm:gap-20">
      

            <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-10 w-full">
              <div className="w-full md:w-1/2 flex justify-center">
                <Image
                  src="/undraw_about.svg"
                  alt="About icon Renkei"
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain max-w-sm md:max-w-md"
                />
              </div>

              <div className="w-full md:w-1/2">
                <div
                  className="
            px-4 py-6
            -mx-4 
            sm:-mx-8
            sm:m-0 
            sm:px-8 
            sm:py-10
          "
                >
                  <p className="text-primary-dark text-center md:text-left text-base lg:text-lg tracking-wide leading-[1.6]">
                    Renkei is a collaborative whiteboard app to create and share
                    your ideas. On mobile devices, this background spans the
                    entire screen, but on larger screens it remains in this
                    column only. You can use Renkei to collaborate with others people on your team and share the same ideas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FeatureSection/>
        <MainFooter/>
      </main>
    </div>
  );
}
