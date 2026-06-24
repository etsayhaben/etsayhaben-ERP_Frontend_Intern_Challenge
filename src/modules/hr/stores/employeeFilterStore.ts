import { create } from 'zustand'

interface EmployeeFilterState {
    selectedDepartment: string
    setDepartment: (department: string) => void
}

export const useEmployeeFilterStore = create<EmployeeFilterState>((set) => {
    return {
        selectedDepartment: '',
        setDepartment: (department) => set({ selectedDepartment: department }),
    }
})