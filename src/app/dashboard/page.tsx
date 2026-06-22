'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '@/modules/inventory/api/inventoryApi';
import { useInventoryFilterStore } from '@/modules/inventory/store/inventoryFilterStore';
import { useHRFilterStore } from '@/modules/hr/store/hrFilterStore';

export default function DashboardPage() {
  const { data: items = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchItems,
  });

  const selectedCategory = useInventoryFilterStore(s => s.selectedCategory);

  const selectedDepartment = useHRFilterStore(s => s.selectedDepartment);

  const count = selectedCategory
    ? items.filter(item => item.category === selectedCategory).length
    : items.length;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {}
      <div className="p-4 border rounded">
        <p className="text-sm text-gray-600">
          Selected Department:
          <span className="font-bold ml-2">
            {selectedDepartment || 'All Departments'}
          </span>
        </p>
      </div>

      {/* INVENTORY STATS */}
      <div className="border rounded p-4 max-w-sm">
        <p className="text-sm text-gray-500">
          Showing counts for: {selectedCategory ?? 'All categories'}
        </p>

        <p className="text-3xl font-bold">{count}</p>

        <p className="text-sm text-gray-500">items</p>
      </div>
    </div>
  );
}
