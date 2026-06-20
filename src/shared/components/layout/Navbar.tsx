'use client'

// ── GLOBAL STATE ─────────────────────────────────────────────────
// Reads a value WRITTEN by the inventory module's hook (useInventory).
// The Navbar has no idea HOW lowStockCount was calculated — it just
// displays whatever is currently in the store.

import Link from 'next/link'
import { useInventoryStatsStore } from '@/shared/store/inventoryStatsStore'
import { useEmployeeStatsStore } from '@/shared/store/employeeStatsStore'
import { useEmployeeStats } from '@/modules/hr/hooks/useEmployeeStats'

export function Navbar() {
    useEmployeeStats()

    const lowStockCount = useInventoryStatsStore((s) => s.lowStockCount)
    const employeesOnLeaveCount = useEmployeeStatsStore((s) => s.employeesOnLeaveCount)

    return (
        <nav className="flex gap-6 p-4 border-b">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/inventory" className="relative">
                Inventory
                {lowStockCount > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                        {lowStockCount}
                    </span>
                )}
            </Link>
            <Link href="/hr" className="relative">
                HR
                {employeesOnLeaveCount > 0 && (
                    <span className="ml-2 bg-amber-600 text-white text-xs rounded-full px-2 py-0.5">
                        {employeesOnLeaveCount}
                    </span>
                )}
            </Link>
        </nav>
    )
}
