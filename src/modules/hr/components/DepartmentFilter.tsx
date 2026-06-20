'use client'

// Reads and writes the Zustand store directly. No props needed because the
// selected department is also used by Dashboard.

import { useDepartmentFilterStore } from '../store/departmentFilterStore'
import { DEPARTMENTS } from '../services/employeeService'

export function DepartmentFilter() {
  const selectedDepartment = useDepartmentFilterStore((s) => s.selectedDepartment)
  const setDepartment = useDepartmentFilterStore((s) => s.setDepartment)

  return (
    <select
      value={selectedDepartment ?? ''}
      onChange={(e) => setDepartment(e.target.value || null)}
      className="border rounded px-3 py-2"
    >
      <option value="">All departments</option>
      {DEPARTMENTS.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  )
}

