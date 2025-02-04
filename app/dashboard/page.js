'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';
import { SearchIcon } from 'lucide-react';

import { SidebarProvider, SidebarTrigger } from '@/app/components/ui/sidebar';
import { Separator } from '../components/ui/separator';
import DashboardPage from '../components/layouts/DashboardPage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Button } from '../components/ui/button';

import AppSidebar from '../components/AppSidebar';
import useIsMobile from '../components/hooks/useIsMobile';

import AuthService from '../services/authService';
import projectService from '../services/projectService';

export default function Dashboard() {

  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const [filters, setFilters] = useState({
    name: '',
    status: 'all',
    page: 1,
    limit: 10,
  });


  const router = useRouter();
  const isMobile = useIsMobile(768);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleOpenChange = useCallback((open) => {
    setSidebarOpen(open);
  }, []);

  const debouncedFilterUpdate = useCallback(
    debounce((value) => {
      setFilters((prev) => ({ ...prev, name: value, page: 1 }));
    }, 500),
    []
  );

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilterUpdate(value);
  }

  const handleStatusChange = (newStatus) => {
    setFilters((prev) => ({ ...prev, status: newStatus, page: 1 }));
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const cachedProfile = AuthService.getUserProfile();
        if (cachedProfile) {
          setProfile(cachedProfile);
          return;
        }
        const profileData = await AuthService.getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error?.response?.status === 401 && error.response?.data?.redirect) {
          router.replace('/auth/login');
        }
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [router]);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = () => {
      setLoadingProjects(true);
      projectService
        .getProjects(filters)
        .then((data) => {
          if (isMounted) {
            setProjects(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        })
        .finally(() => {
          if (isMounted) {
            setLoadingProjects(false);
          }
        });
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, [filters]);


  if (loadingProfile) {
    return null;
  }

  
  return (
    <div className="bg-gray-200">
      <SidebarProvider title="" open={sidebarOpen} onOpenChange={handleOpenChange}>
        {isMobile && (
          <header className="fixed top-0 bg-white w-full flex items-center justify-between overflow-hidden px-4 header-float">
            <Link href="/" className="h-16 object-contain flex-shrink-0 ">
              <Image
                src="/logo-crop.png"
                alt="Renkei Logo"
                width={400}
                height={100}
                className="w-full scale-[0.5] translate-x-[-20px] block md:-ml-[32px] -ml-[44px] -mt-[8px]"
              />
            </Link>
          </header>
        )}

        <AppSidebar
          sidebarOpen={sidebarOpen}
          firstName={profile?.firstName}
          lastName={profile?.lastName}
          phone={profile?.phone}
          email={profile?.email}
          id={profile?.id}
          setProfile={setProfile}
        />

        <main className="p-4 pt-20 md:p-8 md:pt-12 flex-1">
          <header className="flex items-center justify-between text-2xl md:text-3xl gap-2 mb-4 md:mb-4 ">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4 bg-gray-400" />
              <h1 className="font-bold">Dashboard</h1>
            </div>
            <Button className="bg-primary text-white rounded-md py-1 px-2 sm:py-2 sm:px-4 hover:bg-pink-600 hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed">
              New project
            </Button>
          </header>

          <section className="p-1">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 md:mb-10">
              <div className="relative mb-2 md:mb-0">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon className="h-4 w-4" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-white focus:border-pink-500"
                  placeholder="Search project name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <div>
                <Select value={filters.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px] border border-gray-300 rounded active:ring-pink-500 focus:ring-pink-500 focus:border-pink-500">
                    <SelectValue placeholder="Select project status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="mine">Mine</SelectItem>
                    <SelectItem value="shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DashboardPage projects={projects} isLoading={loadingProjects} />
          </section>
        </main>
      </SidebarProvider>
    </div>
  );
}
