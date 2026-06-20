'use client'

// ── ROUTING + GLOBAL STATE ────────────────────────────────────────
// Completely different page from /inventory, but reads the SAME
// Zustand store (useInventoryFilterStore) that CategoryFilter writes to.

import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '@/modules/inventory/api/inventoryApi'
import { useInventoryFilterStore } from '@/modules/inventory/store/inventoryFilterStore'
import { fetchEmployees } from '@/modules/hr/api/employeeApi'
import { countEmployeesForDepartment } from '@/modules/hr/services/employeeService'
import { useDepartmentFilterStore } from '@/modules/hr/store/departmentFilterStore'

export default function DashboardPage() {
  const { data: items = [] } = useQuery({ queryKey: ['inventory'], queryFn: fetchItems })
  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: fetchEmployees })
  const selectedCategory = useInventoryFilterStore((s) => s.selectedCategory)
  const selectedDepartment = useDepartmentFilterStore((s) => s.selectedDepartment)

  const count = selectedCategory
    ? items.filter((item) => item.category === selectedCategory).length
    : items.length

  const employeeCount = countEmployeesForDepartment(employees, selectedDepartment)
  const employeesOnLeave = employees.filter((employee) => employee.status === 'on-leave').length

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded p-4 max-w-sm">
          <p className="text-sm text-gray-500">
            Showing counts for: {selectedCategory ?? 'All categories'}
          </p>
          <p className="text-3xl font-bold">{count}</p>
          <p className="text-sm text-gray-500">items</p>
        </div>

        <div className="border rounded p-4 max-w-sm">
          <p className="text-sm text-gray-500">
            Showing employees for: {selectedDepartment ?? 'All departments'}
          </p>
          <p className="text-3xl font-bold">{employeeCount}</p>
          <p className="text-sm text-gray-500">
            employees, {employeesOnLeave} currently on leave
          </p>
        </div>
      </div>
    </div>
  )
}
