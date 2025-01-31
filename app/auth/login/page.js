import { Eye } from "lucide-react";
import Link from "next/link";

import MainNav from "@/app/components/layouts/MainNav";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";





export default function loginComponent() {
  return (
    <div className="h-screen overflow-hidden">
      <MainNav/>
      <section className="bg-gray-100 w-full h-full py-20 px-2 sm:px-4 md:px-8">
        <div className="mx-auto bg-white rounded-lg shadow pt-8 p-6  md:p-10 w-full sm:w-2/3 max-w-md">
            <h1 className="text-2xl sm:text-3xl text-gray-800 mb-2 text-primary-dark">Sign in </h1>
           <p className="text-md text-gray-600 mb-8 text-muted">Enter your details to start using Renkei.</p>
           <Label htmlFor="email" className="mb-4 text-md text-gray-600">Email</Label>
           <Input name="email" id="email" type="email" placeholder="Email" className="w-full mb-4 focus:shadow-primary"/>
           <div className="relative mb-6">
            <Label htmlFor="password" className="mb-2 text-md text-gray-600">Password</Label>
            <Input name="passoword" id="password" type="password" placeholder="Email" className="w-full mb-4 focus:shadow-primary  pr-10"/>
            <button
            type="button"
            aria-label="Show password"
            className="absolute inset-y-2 top-8 right-0 flex items-center px-3 bg-dark" 
          >
            <Eye size={18} /> 
          </button>
           </div>
          <button className="bg-primary text-white rounded-md py-2 px-4 w-full hover:bg-pink-600 hover:shadow-md transition mb-4">Sign in</button>
          <button className="bg-white border border-primary  rounded-sm md:rounded-md py-2 px-4   w-full text-primary  hover:bg-pink-100 hover:shadow-md transition mb-4">
            Sign in with Google</button>
          <Link className="text-primary text-sm sm:text-md" href="/auth/signup">
            Don&apos; t have an account? Sign up</Link>
        </div>
      </section>
    </div>
  );
}