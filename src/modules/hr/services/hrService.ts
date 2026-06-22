// ── BUSINESS LOGIC ───────────────────────────────────────────────
// Sits between components and api/. Validation and calculations live
// here so they're reusable and testable without React.

import { EmployeeFormValues, Employee } from '../types'

export function validateEmployee(values: EmployeeFormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Invalid email format'
  if (!values.phone.trim()) errors.phone = 'Phone is required'
  if (!values.department.trim()) errors.department = 'Department is required'
  return errors
}

// Used by the navbar badge — counts employees currently on leave
export function countOnLeave(employees: Employee[]): number {
  return employees.filter((emp) => emp.onLeave).length
}
