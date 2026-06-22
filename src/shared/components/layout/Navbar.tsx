'use client';

import Link from 'next/link';
import { useInventoryStatsStore } from '@/shared/store/inventoryStatsStore';
import { useHRStatsStore } from '@/shared/store/hrStatsStore';

export function Navbar() {
  const lowStockCount = useInventoryStatsStore(s => s.lowStockCount);

  const employeesOnLeave = useHRStatsStore(s => s.employeesOnLeave);

  return (
    <nav className="flex gap-6 p-4 border-b items-center">
      <Link href="/dashboard">Dashboard</Link>

      <Link href="/inventory" className="relative">
        Inventory
        {lowStockCount > 0 && (
          <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
            {lowStockCount}
          </span>
        )}
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-gray-700">HR</span>

        {employeesOnLeave > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            On Leave: {employeesOnLeave}
          </span>
        )}
      </div>
    </nav>
  );
}
