import { create } from 'zustand';

interface SelectionState {
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  toggleId: (id: string) => void;
  clear: () => void;
}

export const useHRSelectionStore = create<SelectionState>((set, get) => ({
  selectedIds: [],

  setSelectedIds: ids => set({ selectedIds: ids }),

  toggleId: id => {
    const current = get().selectedIds;

    const exists = current.includes(id);

    set({
      selectedIds: exists ? current.filter(i => i !== id) : [...current, id],
    });
  },

  clear: () => set({ selectedIds: [] }),
}));
