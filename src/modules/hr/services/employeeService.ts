// -- BUSINESS LOGIC ----------------------------------------------------------
// Validation and HR-specific calculations live here so components stay small.

import { Department, Employee, EmployeeFormValues } from '../types'

export const DEPARTMENTS: Department[] = [
  'Engineering',
  'HR',
  'Finance',
  'Operations',
  'Sales',
  'Marketing',
]

export function validateEmployee(values: EmployeeFormValues): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!values.phone.trim()) errors.phone = 'Phone is required'
  if (!values.role.trim()) errors.role = 'Role is required'
  if (!values.startDate) errors.startDate = 'Start date is required'

  return errors
}

export function countEmployeesOnLeave(employees: Employee[]): number {
  return employees.filter((employee) => employee.status === 'on-leave').length
}

export function countEmployeesForDepartment(employees: Employee[], department: string | null): number {
  return department
    ? employees.filter((employee) => employee.department === department).length
    : employees.length
}

