'use client'

// ── REUSABLE FRONTEND LOGIC ──────────────────────────────────────
// Returns a copy of `value` that only updates after it has stopped
// changing for `delay` ms. Used to debounce search filtering so the
// input stays instant while the (potentially expensive) work runs less.

import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer) // cancel if value changes before delay elapses
  }, [value, delay])

  return debounced
}
