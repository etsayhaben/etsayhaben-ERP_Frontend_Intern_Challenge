import { create } from 'zustand';

interface HRStatsState {
  employeesOnLeave: number;
  setEmployeesOnLeave: (count: number) => void;
}

export const useHRStatsStore = create<HRStatsState>(set => ({
  employeesOnLeave: 0,
  setEmployeesOnLeave: count => set({ employeesOnLeave: count }),
}));
