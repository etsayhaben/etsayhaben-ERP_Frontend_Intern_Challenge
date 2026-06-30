// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
} from '@mui/material';
import { useAuth } from '@/providers/auth-provider';

export default function LoginPage() {
  const [role, setRole] = useState<'admin' | 'hr'>('admin');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    // Redirect based on role
    if (role === 'admin') {
      router.push('/hr/hr-admin/register-user');
    } else {
      router.push('/hr/hr-staff/employees');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Card>
          <CardHeader
            title={<Typography variant="h5" align="center">Login</Typography>}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="role-select-label">Select Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  value={role}
                  label="Select Role"
                  onChange={(e) => setRole(e.target.value as 'admin' | 'hr')}
                >
                  <MenuItem value="admin"> HR Admin</MenuItem>
                  <MenuItem value="hr">HR Staff</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}