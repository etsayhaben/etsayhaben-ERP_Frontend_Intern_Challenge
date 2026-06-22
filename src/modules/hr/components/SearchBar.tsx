'use client';

import { useHR } from '../hooks/useHR';

export function SearchBar() {
  const { search, setSearch } = useHR();

  return (
    <input
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search employees..."
      className="border px-3 py-2 rounded w-full"
    />
  );
}
