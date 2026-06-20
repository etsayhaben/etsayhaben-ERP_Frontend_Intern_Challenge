'use client'

// Rendered separately from the table, but reads the same store as each row's
// checkbox. Mutations invalidate the employee query so lists and badges update.

import { useQueryClient } from '@tanstack/react-query'
import { deleteEmployee, updateEmployeesStatus } from '../api/employeeApi'
import { useEmployeeSelectionStore } from '../store/employeeSelectionStore'

export function BulkEmployeeActionBar() {
  const selectedIds = useEmployeeSelectionStore((s) => s.selectedIds)
  const clearSelection = useEmployeeSelectionStore((s) => s.clearSelection)
  const queryClient = useQueryClient()

  if (selectedIds.length === 0) return null

  async function refreshEmployees() {
    clearSelection()
    await queryClient.invalidateQueries({ queryKey: ['employees'] })
  }

  async function handleBulkDelete() {
    await Promise.all(selectedIds.map((id) => deleteEmployee(id)))
    refreshEmployees()
  }

  async function handleBulkLeave() {
    await updateEmployeesStatus(selectedIds, 'on-leave')
    refreshEmployees()
  }

  async function handleBulkActive() {
    await updateEmployeesStatus(selectedIds, 'active')
    refreshEmployees()
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
      <span>{selectedIds.length} employee(s) selected</span>
      <button onClick={handleBulkLeave} className="text-amber-200 font-bold">Mark on leave</button>
      <button onClick={handleBulkActive} className="text-green-200 font-bold">Mark active</button>
      <button onClick={handleBulkDelete} className="text-red-300 font-bold">Delete selected</button>
      <button onClick={clearSelection}>Cancel</button>
    </div>
  )
}

