import { create } from 'zustand';

interface HRFilterState {
  selectedDepartment: string | null;
  setSelectedDepartment: (dept: string | null) => void;
}

export const useHRFilterStore = create<HRFilterState>(set => ({
  selectedDepartment: null,
  setSelectedDepartment: dept => set({ selectedDepartment: dept }),
}));
