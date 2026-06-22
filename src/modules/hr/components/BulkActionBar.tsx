'use client';

import { useHR } from '../hooks/useHR';
import { useHRSelectionStore } from '../store/selectionStore';

export function BulkActionBar() {
  const { selectedIds, clear } = useHRSelectionStore();
  const { deleteSelected } = useHR();

  if (selectedIds.length === 0) return null;

  return (
    <div className="flex gap-3 p-3 border mb-3 bg-gray-50">
      <span>{selectedIds.length} selected</span>

      <button onClick={deleteSelected} className="text-red-600">
        Delete Selected
      </button>

      <button onClick={clear} className="text-gray-600">
        Clear
      </button>
    </div>
  );
}
