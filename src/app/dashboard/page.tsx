'use client'

// ── ROUTING + GLOBAL STATE ────────────────────────────────────────
// Reads BOTH the inventory and HR Zustand stores to display
// department-filtered counts for both modules.

import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '@/modules/inventory/api/inventoryApi'
import { useInventoryFilterStore } from '@/modules/inventory/store/inventoryFilterStore'
import { fetchEmployees } from '@/modules/hr/api/hrApi'
import { useEmployeeFilterStore } from '@/modules/hr/stores/employeeFilterStore'

export default function DashboardPage() {
  const { data: items = [] } = useQuery({ queryKey: ['inventory'], queryFn: fetchItems })
  const selectedCategory = useInventoryFilterStore((s) => s.selectedCategory)

  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: fetchEmployees })
  const filter = useEmployeeFilterStore((s) => s.filter)

  const itemCount = selectedCategory
    ? items.filter((item) => item.category === selectedCategory).length
    : items.length

  const employeeCount = filter
    ? employees.filter((emp) => emp.department === filter).length
    : employees.length

  const onLeaveCount = employees.filter((emp) => emp.onLeave).length

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">
            Showing counts for: {selectedCategory ?? 'All categories'}
          </p>
          <p className="text-3xl font-bold">{itemCount}</p>
          <p className="text-sm text-gray-500">inventory items</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">
            Showing counts for: {filter ?? 'All departments'}
          </p>
          <p className="text-3xl font-bold">{employeeCount}</p>
          <p className="text-sm text-gray-500">employees</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Employees currently on leave</p>
          <p className="text-3xl font-bold text-yellow-600">{onLeaveCount}</p>
          <p className="text-sm text-gray-500">on leave</p>
        </div>
      </div>
    </div>
  )
}
