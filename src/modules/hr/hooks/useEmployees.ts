'use client'

// This hook is the bridge: it calls the API layer, manages LOCAL state
// (search text), and reads/writes GLOBAL state (department filter, stats).

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchEmployees, deleteEmployee as apiDeleteEmployee } from '../api/hrApi'
import { useEmployeeFilterStore } from '../store/employeeFilterStore'
import { useHrStatsStore } from '@/shared/store/hrStatsStore'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { countOnLeave } from '../services/hrService'

export function useEmployees() {
  const queryClient = useQueryClient()

  // LOCAL STATE — only this hook/component cares about the search text.
  // `search` updates instantly (drives the input); `debouncedSearch`
  // lags ~300ms behind and is what we actually filter on.
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search)

  // GLOBAL STATE — department filter is shared with /dashboard
  const selectedDepartment = useEmployeeFilterStore((s) => s.selectedDepartment)

  // GLOBAL STATE — write the on-leave count for the Navbar badge
  const setOnLeaveCount = useHrStatsStore((s) => s.setOnLeaveCount)

  // SERVER STATE — React Query handles fetching, caching, refetching
  const { data: employees = [], isLoading, isError } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const result = await fetchEmployees()
      setOnLeaveCount(countOnLeave(result)) // side-effect: update global stat
      return result
    },
  })

  // Combine local search + global department filter on the fetched data
  const filtered = employees
    .filter((employee) => employee.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter((employee) => !selectedDepartment || employee.department === selectedDepartment)

  async function removeEmployee(id: string) {
    await apiDeleteEmployee(id)
    queryClient.invalidateQueries({ queryKey: ['employees'] }) // refetch list
  }

  return { employees: filtered, isLoading, isError, search, setSearch, removeEmployee }
}
