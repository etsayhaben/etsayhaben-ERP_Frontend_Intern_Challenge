// -- GLOBAL STATE (Zustand) --------------------------------------------------
// Written by the HR module and read by the Navbar badge.

import { create } from 'zustand'

interface EmployeeStatsState {
  employeesOnLeaveCount: number
  setEmployeesOnLeaveCount: (count: number) => void
}

export const useEmployeeStatsStore = create<EmployeeStatsState>((set) => ({
  employeesOnLeaveCount: 0,
  setEmployeesOnLeaveCount: (count) => set({ employeesOnLeaveCount: count }),
}))

