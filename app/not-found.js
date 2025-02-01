import Image from "next/image";
import Link from "next/link";

import MainNav from "./components/layouts/MainNav";
import MainFooter from "./components/MainFooter";

export default function NotFound() {
    return (
        <div>
           <MainNav />
           <section className="container h-full mb-10 sm:mb-20 mx-auto py-20 px-2 sm:px-4 md:px-8 flex flex-col justify-center md:flex-row gap-20 lg:gap-40 items-center justify-center">
            <div className="px-4 md:px-6 ">
                <Image src="/404.svg" alt="404 not found image" width={400} height={400} className="w-full h-auto object-contain " />
            </div>
            <div className="w-full md:w-2/3 flex flex-col md:items-start items-center text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 mb-2 text-primary-dark leading-[1.05] tracking-tight mb-4 md:mb-4">
                    Page not found
                </h1>
                <p className="text-md md:text-lg text-gray-500 lg:w-2/3  mb-10">The page you are looking for does not exist. Please check the URL or go back to home page</p> 
                <button className="bg-primary text-white rounded-md py-2 px-4 hover:bg-pink-600 hover:shadow-md transition mb-4" aria-label="Navigate to Home">
                    <Link href="/">Go to Home</Link>
                </button>
            </div>
           </section>
           <MainFooter className="fixed bottom-0"/>
        </div>
    )
}