'use client';
import { useState, useEffect } from 'react';
import { Pen } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/app/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import ProfileIcon from './ui/ProfileIcon';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './ui/tooltip';
import { Label } from './ui/label';
import { Input } from './ui/input';
import LoaderComponent from './ui/loader';
import ProfileService from '../services/profileService';
import { toast } from 'react-toastify';
import AuthService from '../services/authService';
import { useRouter } from 'next/navigation';

export default function AppSidebar({ id, firstName, lastName, phone, email, sidebarOpen,setProfile }) {
  const router = useRouter();
  const [first, setFirstName] = useState(firstName ?? '');
  const [last, setLastName] = useState(lastName ?? '');
  const [phoneNumber, setPhone] = useState(phone ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditProfile, setIsEditProfile] = useState(false);

  const phoneRegex = /^\+[0-9]{11,12}$/;
  const resetForm = () => {
    setFirstName(firstName);
    setLastName(lastName);
    setPhone(phone);
    setIsEditProfile(false);
    setIsLoading(false);
    setFormValid(false);
    setErrors({});
  };
  useEffect(() => {
    validateForm();
  }, [first, last, phoneNumber]);

  useEffect(() => {
    if (!sidebarOpen) {
        resetForm()
    }
  }, [sidebarOpen]);
  const handleSignUp = (e) => {
    e.preventDefault();
    if (formValid) {
      setIsLoading(true);
      const data = {
        id,
        firstName: first,
        lastName: last,
        phone: phoneNumber
      };
      ProfileService.updateProfile(data).then((response) => {
        setIsLoading(false);
        toast.success('Profile updated successfully');
        setIsEditProfile(false);
        setProfile(response);
      }).catch((error) => {
        setIsLoading(false);
        console.error('Error updating profile:', error);

      });
      }

    }
    const logout = () => {
      AuthService.logout().then(() => {
        setIsEditProfile(false);
        setProfile(null);
        router.replace("/")
      }).catch((error) => {
       toast.error('Error logging out');
      });
    }
  const validateForm = () => {
    let errs = {};
    let valid = true;
    if (!first.trim()) {
      errs.firstName = 'First name is required';
      valid = false;
    }
    if (!last.trim()) {
      errs.lastName = 'Last name is required';
      valid = false;
    }
    if (!phoneNumber?.trim()) {
      errs.phone = 'Phone number is required';
      valid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      errs.phone = 'Phone number is invalid';
      valid = false;
    }
    console.log(errs)
    setErrors(errs);
    setFormValid(valid);
  };
  return (
    <Sidebar className="bg-white">
      <SidebarHeader className="bg-white">
        <div className=" w-full  overflow-hidden">
          <Link href="/" className="w-full flex justify-start">
            <Image
              src="/logo-crop.png"
              alt="logo"
              width={140}
              height={100}
              className="w-full  scale-[0.5] lg:scale-[0.6] translate-x-[-20px] block md:-ml-[32px] -ml-[44px]"
            />
          </Link>
        </div>
       
      </SidebarHeader>
      <SidebarContent className="bg-white px-4">
        {!isEditProfile ? (
          <div className="border border-gray-200 rounded-xl flex flex-col gap-2 p-2 hero-section relative">
            <ProfileIcon userName={firstName} className="flex-0" />
            <div className="flex gap-2 items-center">
              <div className="text-base font-medium text-primary-dark">
                {firstName} {lastName}
                <div className="text-xs text-muted text-gray-600">
                 {email}
                </div>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="transparent flex w-6 h-6  p-1 items-center  hover:bg-pink-200 rounded-full overflow-hidden absolute top-2 right-4"
                    onClick={() => setIsEditProfile(true)}
                  >
                    <Pen />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-primary-dark text-xs text-white ">
                  <p>Edit Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div className="px-2  py-2">
            <h3 className="text-primary-dark text-lg md:text-xl md:text-md mb-4">
              Edit profile
            </h3>
            <form noValidate>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="firstName" className=" text-sm text-gray-600">
                    First name
                  </Label>
                  <Input
                    name="firstName"
                    id="firstName"
                    type="text"
                    placeholder="Enter fist name"
                    className="w-full focus:shadow-primary text-sm"
                    value={first}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="lastName" className="text-sm text-gray-600">
                    Last name
                  </Label>
                  <Input
                    name="lastName"
                    id="lastName"
                    type="text"
                    value={last}
                    placeholder="Enter last name "
                    className="w-full focus:shadow-primary text-sm"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="phone" className="text-sm text-gray-600">
                    Phone number
                  </Label>
                  <Input
                    name="phone"
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full focus:shadow-primary text-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className=" bg-white px-2 py-4">
        {!isEditProfile ? (
          <button className="bg-white hover:bg-pink-100 text-primary rounded transition px-4 py-1 md:py-2 border border-primary text-sm md:text-base hover:shadow-md" onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              className="bg-white hover:bg-pink-100 flex-1 text-primary rounded transition px-4 py-2 border border-primary text-sm md:text-base hover:shadow-md"
              onClick={() => resetForm()}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white rounded-md flex-1 py-2 px-4 hover:bg-pink-600 hover:shadow-md transition  disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={(e) => handleSignUp(e)}
              disabled={!formValid || isLoading}
              aria-disabled={!formValid || isLoading}
              
            >
              {isLoading ? (
                <div className="py-2">
                  <LoaderComponent />
                </div>
              ) : (
                'Save'
              )}
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
