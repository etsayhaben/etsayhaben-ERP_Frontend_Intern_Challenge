'use client'

// ── ROUTING + GLOBAL STATE ────────────────────────────────────────
// Completely different page from /inventory, but reads the SAME
// Zustand store (useInventoryFilterStore) that CategoryFilter writes to.

import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '@/modules/inventory/api/inventoryApi'
import { useInventoryFilterStore } from '@/modules/inventory/store/inventoryFilterStore'

export default function DashboardPage() {
  const { data: items = [] } = useQuery({ queryKey: ['inventory'], queryFn: fetchItems })
  const selectedCategory = useInventoryFilterStore((s) => s.selectedCategory)

  const count = selectedCategory
    ? items.filter((item) => item.category === selectedCategory).length
    : items.length

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="border rounded p-4 max-w-sm">
        <p className="text-sm text-gray-500">
          Showing counts for: {selectedCategory ?? 'All categories'}
        </p>
        <p className="text-3xl font-bold">{count}</p>
        <p className="text-sm text-gray-500">items</p>
      </div>
    </div>
  )
}