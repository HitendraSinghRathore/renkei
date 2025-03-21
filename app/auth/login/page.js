'use client';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import MainNav from '@/app/components/layouts/MainNav';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import LoaderComponent from '@/app/components/ui/loader';
import { API_DOMAIN, setBearerToken } from '@/app/services/api';
import AuthService from '@/app/services/authService';

export default function LoginComponent() {
  const router = useRouter();

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = useCallback(() => {
    const errs = {};
    let valid = true;

    if (!email.trim()) {
      errs.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      errs.email = 'Email is invalid';
      valid = false;
    }
    if (!password) {
      errs.password = 'Valid Password is required';
      valid = false;
    }
    setErrors(errs);
    setFormValid(valid);
  }, [email, password, emailRegex]);

  useEffect(() => {
    validateForm();
  }, [email, password, validateForm]);

  const handleGoogleRedirect = useCallback(() => {
    window.location.href = `${API_DOMAIN}/auth/google`;
  }, []);

  
  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (formValid) {
        setLoading(true);
        AuthService.login({ email, password })
          .then((res) => {
            if (res?.data?.accessToken) {
              toast.success(res?.data?.msg ?? 'Successfully logged in.');
              setBearerToken(res?.data?.accessToken);
              router.push('/');
            } else {
              toast.error('Something went wrong');
            }
          })
          .catch((err) => {
            toast.error(err.response?.data?.msg || 'Something went wrong');
          })
          .finally(() => setLoading(false));
      }
    },
    [formValid, email, password, router]
  );

  return (
    <div className="h-screen overflow-hidden">
      <MainNav />
      <section className="bg-gray-100 w-full h-full py-20 px-2 sm:px-4 md:px-8">
        <div className="mx-auto bg-white rounded-lg shadow pt-8 p-6 md:p-10 w-full sm:w-2/3 max-w-md">
          <h1 className="text-2xl sm:text-3xl text-gray-800 mb-2 text-primary-dark">
            Sign in
          </h1>
          <p className="text-md text-gray-600 mb-8 text-muted">
            Enter your details to start using Renkei.
          </p>
          <form noValidate>
            <Label htmlFor="email" className="mb-4 text-md text-gray-600">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              className="w-full mb-4 focus:shadow-primary"
            />
            <div className="relative mb-8">
              <Label htmlFor="password" className="mb-2 text-md text-gray-600">
                Password
              </Label>
              <Input
                name="passoword"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full mb-4 focus:shadow-primary pr-10"
              />
              <button
                type="button"
                aria-label="Show password"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-2 top-8 right-0 flex items-center px-3 bg-dark"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </form>
          <button
            className="bg-primary text-white rounded-md py-2 px-4 w-full hover:bg-pink-600 hover:shadow-md transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleLogin}
            disabled={!formValid || loading}
            aria-disabled={!formValid || loading}
          >
            {loading ? (
              <div className="py-2">
                <LoaderComponent />
              </div>
            ) : (
              'Sign in'
            )}
          </button>
          <button
            className="bg-white border border-primary rounded-sm md:rounded-md py-2 px-4 w-full text-primary hover:bg-pink-100 hover:shadow-md transition mb-4 flex items-center justify-center"
            onClick={handleGoogleRedirect}
          >
            <img
              src="/google-logo.svg"
              alt="Google Logo"
              className="h-5 w-5 mr-2"
            />
            <span> Sign in with Google</span>
          </button>
          <Link className="text-primary text-sm sm:text-md" href="/auth/signup">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </section>
    </div>
  );
}
