// ── BUSINESS LOGIC ───────────────────────────────────────────────
// Sits between components and api/. Validation and calculations live
// here so they're reusable and testable without React.

import { EmployeeFormValues, Employee } from '../types'

// Minimal email shape check — enough for the directory, no external deps.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmployee(values: EmployeeFormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Email is invalid'
  if (!values.role.trim()) errors.role = 'Role is required'
  if (!values.hiredAt) errors.hiredAt = 'Hired date is required'
  if (!Number.isFinite(values.salary)) errors.salary = 'Salary must be a number'
  else if (values.salary < 0) errors.salary = 'Salary cannot be negative'
  return errors
}

// Used by the navbar badge — counts employees currently on leave
export function countOnLeave(employees: Employee[]): number {
  return employees.filter((employee) => employee.status === 'on_leave').length
}
