// -- GLOBAL STATE (Zustand) --------------------------------------------------
// Shared by row checkboxes and the bulk action bar.

import { create } from 'zustand'

interface EmployeeSelectionState {
  selectedIds: string[]
  toggleId: (id: string) => void
  clearSelection: () => void
}

export const useEmployeeSelectionStore = create<EmployeeSelectionState>((set) => ({
  selectedIds: [],
  toggleId: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((existingId) => existingId !== id)
        : [...state.selectedIds, id],
    })),
  clearSelection: () => set({ selectedIds: [] }),
}))

