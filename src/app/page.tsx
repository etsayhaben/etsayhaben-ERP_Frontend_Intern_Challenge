// app/page.tsx
'use client';

import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user === 'admin') {
        router.push('/hr/admin');
      } else if (user === 'hr') {
        router.push('/hr/hr-staff/employees');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return null;
}