// ── PROPS ────────────────────────────────────────────────────────
// Pure presentational component. Everything it needs comes from `employee`.

import { Employee } from '../types'

interface EmployeeDetailPanelProps {
  employee: Employee
}

export function EmployeeDetailPanel({ employee }: EmployeeDetailPanelProps) {
  return (
    <div className="bg-gray-50 text-gray-900 p-4 text-sm">
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Salary:</strong> ${employee.salary.toLocaleString()}</p>
      <p><strong>Status:</strong> {employee.status === 'on_leave' ? 'On leave' : 'Active'}</p>
      <p><strong>Hired:</strong> {new Date(employee.hiredAt).toLocaleDateString()}</p>
      <p><strong>Last updated:</strong> {new Date(employee.updatedAt).toLocaleString()}</p>
    </div>
  )
}
