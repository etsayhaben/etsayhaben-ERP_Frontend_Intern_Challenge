'use client'

// - employee and onDelete come in as props from the table.
// - isExpanded and confirmOpen are local to the row.
// - selectedIds comes from global state shared with BulkEmployeeActionBar.

import Link from 'next/link'
import { useState } from 'react'
import { Employee } from '../types'
import { useEmployeeSelectionStore } from '../store/employeeSelectionStore'
import { EmployeeDetailPanel } from './EmployeeDetailPanel'

interface EmployeeRowProps {
  employee: Employee
  onDelete: (id: string) => void
}

export function EmployeeRow({ employee, onDelete }: EmployeeRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const selectedIds = useEmployeeSelectionStore((s) => s.selectedIds)
  const toggleId = useEmployeeSelectionStore((s) => s.toggleId)
  const isSelected = selectedIds.includes(employee.id)
  const isOnLeave = employee.status === 'on-leave'

  return (
    <>
      <tr
        className={`border-b cursor-pointer ${isOnLeave ? 'bg-amber-50' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="p-2" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" checked={isSelected} onChange={() => toggleId(employee.id)} />
        </td>
        <td className="p-2 font-medium">{employee.name}</td>
        <td className="p-2">{employee.department}</td>
        <td className="p-2">{employee.role}</td>
        <td className="p-2 capitalize">{employee.status.replace('-', ' ')}</td>
        <td className="p-2" onClick={(e) => e.stopPropagation()}>
          <span className="space-x-2">
            <Link href={`/hr/${employee.id}`} className="text-blue-600">
              Edit
            </Link>
            {confirmOpen ? (
              <>
                <button onClick={() => onDelete(employee.id)} className="text-red-600">
                  Confirm
                </button>
                <button onClick={() => setConfirmOpen(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setConfirmOpen(true)} className="text-red-600">
                Delete
              </button>
            )}
          </span>
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={6} className="p-0">
            <EmployeeDetailPanel employee={employee} />
          </td>
        </tr>
      )}
    </>
  )
}

