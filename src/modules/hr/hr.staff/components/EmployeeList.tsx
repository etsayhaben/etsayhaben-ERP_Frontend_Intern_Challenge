'use client';

import { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEmployees } from '@/modules/hooks/useEmployees';
import { Employee } from '@/modules/services/employeeService';

// Hardcoded values (you can fetch these dynamically from data later)
const positions = ['All', 'kjnopi', 'knops', 'Manager', 'Developer'];
const departments = ['All', 'engineering', 'sales', 'marketing', 'hr'];

export default function EmployeeList() {
  const [nameQuery, setNameQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const filters = {
    name: nameQuery || undefined,
    position: positionFilter === 'All' ? undefined : positionFilter,
    department: departmentFilter === 'All' ? undefined : departmentFilter,
  };

  const { data, isLoading, error, refetch } = useEmployees(filters);

  // ✅ Define columns with proper typing (GridColDef<Employee>)
  const columns: GridColDef<Employee>[] = [
    { field: 'id', headerName: '#', width: 70 },
    {
      field: 'fullName',
      headerName: 'Name',
      flex: 1,
      // ✅ Correct valueGetter signature: (value, row) => string
      valueGetter: (_value, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'position', headerName: 'Position', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color={params.value === 'active' ? 'success.main' : 'warning.main'}
        >
          {params.value === 'active' ? 'Active' : 'On Leave'}
        </Typography>
      ),
    },
    {
      field: 'salary',
      headerName: 'Salary',
      flex: 1,
      renderCell: (params) =>
        params.value ? `$${Number(params.value).toLocaleString()}` : '—',
    },
  ];

  // Handle loading, error, and empty states
  if (isLoading) return <Typography>Loading employees...</Typography>;
  if (error) return <Typography color="error">Failed to load employees.</Typography>;
  if (!data || data.length === 0) {
    return <Typography>No employees found. Please register some users.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Search & Filter Controls */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <TextField
          select
          label="Filter by Position"
          size="small"
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {positions.map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos === 'All' ? 'All Positions' : pos}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Filter by Department"
          size="small"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept === 'All' ? 'All Departments' : dept}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" onClick={() => refetch()}>
          Refresh
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setNameQuery('');
            setPositionFilter('All');
            setDepartmentFilter('All');
          }}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Data Grid */}
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
}