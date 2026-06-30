'use client';
import { useState } from 'react';
import {
  useEmployeeStore,
  type EmployeeInput,
  type Employee,
} from '../store/employeeStore';


// Material-UI imports (fixed)
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Typography,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const empty: EmployeeInput = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  position: '',
  department: '',
  salary: '',
  address: '',
  status: 'active',
};

export default function EmployeeManager() {
  const { employees, addEmployee, updateEmployee, deleteEmployee, deleteAllEmployees } =
    useEmployeeStore();
  const [employee, setEmployee] = useState<EmployeeInput>(empty);
  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const reset = () => {
    setEmployee(empty);
    setEditId(null);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) updateEmployee(editId, employee);
    else addEmployee(employee);
    reset();
  };

  const edit = (emp: Employee) => {
    const { id, ...rest } = emp;
    setEmployee(rest);
    setEditId(id);
  };

  const del = (id: string) => {
    if (!confirm('Delete?')) return;
    deleteEmployee(id);
    if (editId === id) reset();
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Navigation header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 2,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: 1,
          fontWeight: 'bold',
        }}
      >
        <PeopleIcon color="primary" />
        <Typography variant="h6">HR ADMIN</Typography>
      </Box>

      {/* Form Card */}
      <Card>
        <CardHeader
          title={
            <Typography variant="h5">
              {editId ? 'Edit Employee' : 'Register Employee'}
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={submit}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={employee.firstName}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={employee.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Phone"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={employee.gender}
                  label="Gender"
                  onChange={(e) =>
                    setEmployee((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Position"
                name="position"
                value={employee.position}
                onChange={handleChange}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={employee.department}
                  label="Department"
                  onChange={(e) =>
                    setEmployee((prev) => ({ ...prev, department: e.target.value }))
                  }
                >
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Salary"
                name="salary"
                type="number"
                value={employee.salary}
                onChange={handleChange}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={employee.status}
                  label="Status"
                  onChange={(e) =>
                    setEmployee((prev) => ({
                      ...prev,
                      status: e.target.value as 'active' | 'on leave',
                    }))
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="on leave">On Leave</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Address"
                name="address"
                value={employee.address}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                sx={{ gridColumn: { md: 'span 2' } }}
              />
              <Box sx={{ gridColumn: { md: 'span 2' }, display: 'flex', gap: 2 }}>
                <Button type="submit" variant="contained">
                  {editId ? 'Update' : 'Add'}
                </Button>
                {editId && (
                  <Button type="button" variant="outlined" onClick={reset}>
                    Cancel
                  </Button>
                )}
                {employees.length > 0 && (
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    sx={{ ml: 'auto' }}
                    onClick={() => confirm('Delete all?') && deleteAllEmployees()}
                  >
                    Delete All
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Employee List Card */}
      <Card>
        <CardHeader
          title={
            <Typography variant="h5">
              Employees ({employees.length})
            </Typography>
          }
          action={
            <Chip
              label={`On Leave: ${employees.filter((e) => e.status === 'on leave').length}`}
              color="secondary"
              size="medium"
            />
          }
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ color: 'text.secondary' }}>
                    No employees yet
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp, i) => (
                  <TableRow key={emp.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{`${emp.firstName} ${emp.lastName}`}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.position}</TableCell>
                    <TableCell>
                      <Chip
                        label={emp.status === 'on leave' ? 'On Leave' : 'Active'}
                        color={emp.status === 'on leave' ? 'warning' : 'success'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {emp.salary ? `$${Number(emp.salary).toLocaleString()}` : '—'}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => edit(emp)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => del(emp.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

