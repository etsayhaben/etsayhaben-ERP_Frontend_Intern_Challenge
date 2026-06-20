'use client'

// Props-based input. The parent owns the local search state.

interface EmployeeSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function EmployeeSearchBar({ value, onChange }: EmployeeSearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search employees by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2 w-full max-w-xs"
    />
  )
}

