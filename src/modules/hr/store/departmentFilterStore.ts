// -- GLOBAL STATE (Zustand) --------------------------------------------------
// Shared between the HR page and Dashboard. They are unrelated routes, so
// this avoids prop drilling while keeping the selected department available.

import { create } from 'zustand'

interface DepartmentFilterState {
  selectedDepartment: string | null
  setDepartment: (department: string | null) => void
}

export const useDepartmentFilterStore = create<DepartmentFilterState>((set) => ({
  selectedDepartment: null,
  setDepartment: (department) => set({ selectedDepartment: department }),
}))

