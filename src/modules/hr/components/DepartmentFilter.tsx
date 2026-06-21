'use client'

// ── GLOBAL STATE ─────────────────────────────────────────────────
// Reads and writes the Zustand store DIRECTLY. No props needed —
// any component anywhere can use this store the same way.

import { useEmployeeFilterStore } from '../store/employeeFilterStore'

const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance']

export function DepartmentFilter() {
  const selectedDepartment = useEmployeeFilterStore((s) => s.selectedDepartment)
  const setDepartment = useEmployeeFilterStore((s) => s.setDepartment)

  return (
    <select
      value={selectedDepartment ?? ''}
      onChange={(e) => setDepartment(e.target.value || null)}
      className="border rounded px-3 py-2 bg-white text-gray-900"
    >
      <option value="">All departments</option>
      {DEPARTMENTS.map((department) => (
        <option key={department} value={department}>{department}</option>
      ))}
    </select>
  )
}
