'use client'

// ── ROUTING + GLOBAL STATE ────────────────────────────────────────
// Completely different page from /inventory and /hr, but reads the SAME
// Zustand stores (useInventoryFilterStore, useEmployeeFilterStore) that
// CategoryFilter and DepartmentFilter write to.

import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '@/modules/inventory/api/inventoryApi'
import { fetchEmployees } from '@/modules/hr/api/hrApi'
import { useInventoryFilterStore } from '@/modules/inventory/store/inventoryFilterStore'
import { useEmployeeFilterStore } from '@/modules/hr/store/employeeFilterStore'

export default function DashboardPage() {
  const { data: items = [] } = useQuery({ queryKey: ['inventory'], queryFn: fetchItems })
  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: fetchEmployees })

  const selectedCategory = useInventoryFilterStore((s) => s.selectedCategory)
  const selectedDepartment = useEmployeeFilterStore((s) => s.selectedDepartment)

  const itemCount = selectedCategory
    ? items.filter((item) => item.category === selectedCategory).length
    : items.length

  const employeeCount = selectedDepartment
    ? employees.filter((employee) => employee.department === selectedDepartment).length
    : employees.length

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        <div className="border rounded p-4 max-w-sm">
          <p className="text-sm text-gray-500">
            Inventory — {selectedCategory ?? 'All categories'}
          </p>
          <p className="text-3xl font-bold">{itemCount}</p>
          <p className="text-sm text-gray-500">items</p>
        </div>

        <div className="border rounded p-4 max-w-sm">
          <p className="text-sm text-gray-500">
            Employees — {selectedDepartment ?? 'All departments'}
          </p>
          <p className="text-3xl font-bold">{employeeCount}</p>
          <p className="text-sm text-gray-500">employees</p>
        </div>
      </div>
    </div>
  )
}
