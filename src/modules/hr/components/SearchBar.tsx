'use client'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
}

export function SearchBar({value, onChange}: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Search by name..."
            className="border rounded px-3 py-2 w-full max-w-xs"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}