'use client'

// ── GLOBAL STATE ─────────────────────────────────────────────────
// Reads a value WRITTEN by the inventory module's hook (useInventory).
// The Navbar has no idea HOW lowStockCount was calculated — it just
// displays whatever is currently in the store.

import Link from 'next/link'
import { useInventoryStatsStore } from '@/shared/store/inventoryStatsStore'

export function Navbar() {
    const lowStockCount = useInventoryStatsStore((s) => s.lowStockCount)

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
        </nav>
    )
}