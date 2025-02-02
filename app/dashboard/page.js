'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/app/components/ui/sidebar';
import AppSidebar from '../components/AppSidebar';
import useIsMobile from '../components/hooks/useIsMobile';
import { Separator } from '../components/ui/separator';
import DashboardPage from '../components/layouts/DashboardPage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import AuthService from '../services/authService';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loadingProfile , setLoadingProfile] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const cachedProfile = AuthService.getUserProfile();
    if (cachedProfile) {
      setProfile(cachedProfile);
      setLoadingProfile(false); 
      return;
    }

    AuthService.getProfile()
      .then((profile) => {
        setProfile(profile);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401 && error.response?.data?.redirect) {
          router.replace('/auth/login');
        }
        setProfile(null); 
      })
      .finally(() => setLoadingProfile(false)); 
  }, []);
  const isMobile = useIsMobile(768);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleOpenChange = (open) => {
    setSidebarOpen(open);
  };
  return (
     !loadingProfile ?  
    <div className="bg-gray-200">
      <SidebarProvider
        title=""
        open={sidebarOpen}
        onOpenChange={handleOpenChange}
      >
        {isMobile ? (
          <header className="fixed top-0 bg-white w-full flex items-center justify-between overflow-hidden px-4">
            <Link href="/" className="h-16  object-contain flex-shrink-0">
              <Image
                src="/logo-crop.png"
                alt="Renkei Logo"
                width={400}
                height={100}
                className="w-full scale-[0.5] translate-x-[-20px] block md:-ml-[32px] -ml-[44px] -mt-[8px]"
              />
            </Link>
          </header>
        ) : (
          ''
        )}
        <AppSidebar sidebarOpen={sidebarOpen} firstName={profile?.firstName} lastName={profile?.lastName} phone={profile?.phone} email={profile?.email} id={profile?.id} setProfile={setProfile} />

        <main className="p-4 pt-20 md:p-8 md:pt-12 flex-1 ">
          <header className="flex items-center text-2xl md:text-3xl gap-2 mb-4 md:mb-4">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 bg-gray-400"
            />
            <h1 className="font-bold">Dashboard</h1>
          </header>
          <section className="p-1">
            <div className="mb-10">
            <Select >
              <SelectTrigger className="w-[180px] border border-gray-400">
                <SelectValue placeholder="Select project status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="mine">Mine</SelectItem>
                <SelectItem value="shared">Shared</SelectItem>
              </SelectContent>
            </Select>
            </div>
            <DashboardPage />
          </section>
        </main>
      </SidebarProvider>
    </div> : '' 
  );
}
