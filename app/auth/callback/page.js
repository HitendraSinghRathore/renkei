'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setBearerToken } from '@/app/services/api';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const { hash } = window.location;
    const params = new URLSearchParams(hash ? hash.slice(1) : '');
    const accessToken = params.get('accessToken');

    if (accessToken) {
      setBearerToken(accessToken);
    }
    router.replace('/');
  }, [router]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}