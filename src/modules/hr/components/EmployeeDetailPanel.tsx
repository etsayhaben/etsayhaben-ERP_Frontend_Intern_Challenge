// Pure presentational component. Everything it needs comes from props.

import { Employee } from '../types'

interface EmployeeDetailPanelProps {
  employee: Employee
}

export function EmployeeDetailPanel({ employee }: EmployeeDetailPanelProps) {
  return (
    <div className="bg-gray-50 p-4 text-sm grid gap-1 sm:grid-cols-2">
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
      <p><strong>Employment:</strong> {employee.employmentType}</p>
      <p><strong>Start date:</strong> {employee.startDate}</p>
      <p><strong>Status:</strong> {employee.status}</p>
      <p><strong>Last updated:</strong> {new Date(employee.updatedAt).toLocaleString()}</p>
    </div>
  )
}

