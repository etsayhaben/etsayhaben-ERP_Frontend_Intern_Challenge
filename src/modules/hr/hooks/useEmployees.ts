'use client'

// This hook is the bridge: it calls the API layer, manages LOCAL state
// (search text), and reads/writes GLOBAL state (department filter, stats).

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteEmployee as apiDeleteEmployee, fetchEmployees } from '../api/employeeApi'
import { useDepartmentFilterStore } from '../store/departmentFilterStore'
import { useEmployeeStatsStore } from '@/shared/store/employeeStatsStore'
import { countEmployeesOnLeave } from '../services/employeeService'

export function useEmployees() {
  const queryClient = useQueryClient()

  // LOCAL STATE - only this directory page cares about search text.
  const [search, setSearch] = useState('')

  // GLOBAL STATE - department filter is shared with /dashboard.
  const selectedDepartment = useDepartmentFilterStore((s) => s.selectedDepartment)

  // GLOBAL STATE - write the on-leave count for the Navbar badge.
  const setEmployeesOnLeaveCount = useEmployeeStatsStore((s) => s.setEmployeesOnLeaveCount)

  // SERVER STATE - React Query handles fetching, caching, refetching.
  const { data: employees = [], isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const result = await fetchEmployees()
      setEmployeesOnLeaveCount(countEmployeesOnLeave(result))
      return result
    },
  })

  const filtered = employees
    .filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()))
    .filter((employee) => !selectedDepartment || employee.department === selectedDepartment)

  async function removeEmployee(id: string) {
    await apiDeleteEmployee(id)
    queryClient.invalidateQueries({ queryKey: ['employees'] })
  }

  return {
    employees: filtered,
    allEmployees: employees,
    isLoading,
    isError,
    isFetching,
    search,
    setSearch,
    refreshEmployees: refetch,
    removeEmployee,
  }
}

