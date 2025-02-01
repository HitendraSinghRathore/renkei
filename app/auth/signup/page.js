"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

import MainNav from "@/app/components/layouts/MainNav";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import LoaderComponent from "@/app/components/ui/loader";
import { API_DOMAIN } from "@/app/services/api";
import AuthService from "@/app/services/authService";


export default function SignUpComponent() {
  const router = useRouter();
  // Form state
  const [firstName, setFirstName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, phone, password, confirmPassword]);

  const validateForm = () => {
    let errs = {};
    let valid = true;
    if (!firstName.trim()) {
      errs.firstName = "First name is required";
      valid = false;
    }
    if (!lastName.trim()) {
      errs.lastName = "Last name is required";
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!email.trim()) {
      errs.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      errs.email = "Email is invalid";
      valid = false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.trim()) {
      errs.phone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      errs.phone = "Phone number is invalid";
      valid = false;
    }
    if (!password || !passwordRegex.test(password)) {
      errs.password = "Valid Password is required";
      valid = false;
    }
    if (!confirmPassword) {
      errs.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(errs);
    setFormValid(valid);
    return valid;
  };
  const handleGoogleRedirect = () => {
    window.location.href = `${API_DOMAIN}/auth/google`;
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      AuthService.signup({
        firstName,
        lastName,
        email,
        phone: `+91${phone}`,
        password,
        confirmPassword,
      }).then((res) => {
        toast.success(res?.data?.msg ?? "Successfully signed up. Login to continue");
        setLoading(false);
        router.push('/auth/login');
      }).catch((err) => {
          setLoading(false);
          toast.error(err.response?.data?.msg || 'Something went wrong')
      });
    }
  };

  return (
    <div className="h-screen sm:overflow-hidden bg-gray-100">
      <MainNav />
      <section className="bg-gray-100 w-full h-full py-10 px-2 sm:px-4 md:px-8">
        <div className="mx-auto bg-white rounded-lg shadow pt-8 p-6 md:p-10 w-full sm:w-3/4 max-w-lg">
          <h1 className="text-2xl sm:text-3xl text-gray-800 mb-2 text-primary-dark">
            Sign up
          </h1>
          <p className="text-md text-gray-600 mb-4 text-muted sm:mb-8">
            Create an account to start using Renkei.
          </p>
          <div className="flex sm:flex-row flex-col gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="firstName" className="mb-4 text-md text-gray-600">
                First name
              </Label>
              <Input
                name="firstName"
                id="firstName"
                type="text"
                placeholder="Enter fist name"
                className="w-full focus:shadow-primary"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName" className="text-md text-gray-600">
                Last name
              </Label>
              <Input
                name="lastName"
                id="lastName"
                type="text"
                placeholder="Enter last name"
                className="w-full focus:shadow-primary"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="email" className="mb-4 text-md text-gray-600">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                className="w-full focus:shadow-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="phone" className="text-md text-gray-600">
                Phone number
              </Label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 font-semibold left-0 flex items-center pl-3 text-gray-500">
                  +91
                </span>
                <Input
                  name="phone"
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full focus:shadow-primary pl-10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="relative">
            <Label htmlFor="password" className="mb-2 text-md text-gray-600">
              Password
            </Label>
            <Input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full focus:shadow-primary pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label="Show password"
              className="absolute inset-y-2 top-8 right-0 flex items-center px-3 bg-dark"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <span className="text-gray-400 text-xs mb-4 mt-4">8+ characters: uppercase, lowercase, numbers, and a symbol</span>
          <div className="relative mb-8">
            <Label htmlFor="confirmPassword" className="mb-2 text-md text-gray-600">
              Confirm password
            </Label>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              className="w-full mb-4 focus:shadow-primary pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label="Show password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-2 top-8 right-0 flex items-center px-3 bg-dark"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            className="bg-primary text-white rounded-md py-2 px-4 w-full hover:bg-pink-600 hover:shadow-md transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => handleSignUp(e)}
            disabled={!formValid || loading}
          > 
            {loading ? <div className="py-2"><LoaderComponent /></div> :   "Sign up" }
          </button>
          <button className="bg-white border border-primary rounded-sm md:rounded-md py-2 px-4 w-full text-primary hover:bg-pink-100 hover:shadow-md transition mb-4 flex items-center justify-center" onClick={() => {
            handleGoogleRedirect();
          }}>
            <img
              src="/google-logo.svg"
              alt="Google Logo"
              className="h-5 w-5 mr-2"
            />
            <span> Sign up with Google</span>
          </button>
          <Link className="text-primary text-sm sm:text-md" href="/auth/login">
            Already have an account? Sign in
          </Link>
        </div>
      </section>
    </div>
  );
}