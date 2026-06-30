// app/theme.ts
'use client';

import { createTheme } from '@mui/material/styles';

// ✅ Create theme OUTSIDE the component
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;