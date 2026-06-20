'use client'

// Small hook used by shared layout pieces that need HR stats without knowing
// how the API or business calculation works.

import { useQuery } from '@tanstack/react-query'
import { fetchEmployees } from '../api/employeeApi'
import { countEmployeesOnLeave } from '../services/employeeService'
import { useEmployeeStatsStore } from '@/shared/store/employeeStatsStore'

export function useEmployeeStats() {
  const setEmployeesOnLeaveCount = useEmployeeStatsStore((s) => s.setEmployeesOnLeaveCount)

  useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const result = await fetchEmployees()
      setEmployeesOnLeaveCount(countEmployeesOnLeave(result))
      return result
    },
  })
}

