'use client'

// Wiring component: it calls the hook, then passes small pieces of state down
// as props while the department filter and bulk bar use global state directly.

import { useEmployees } from '../hooks/useEmployees'
import { DepartmentFilter } from './DepartmentFilter'
import { EmployeeSearchBar } from './EmployeeSearchBar'
import { EmployeeRow } from './EmployeeRow'
import { BulkEmployeeActionBar } from './BulkEmployeeActionBar'

export function EmployeeTable() {
  const {
    employees,
    isLoading,
    isError,
    isFetching,
    search,
    setSearch,
    refreshEmployees,
    removeEmployee,
  } = useEmployees()

  if (isLoading) return <p>Loading employees...</p>
  if (isError) {
    return (
      <p>
        Something went wrong.{' '}
        <button onClick={() => refreshEmployees()} className="text-blue-600">
          Retry
        </button>
      </p>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row">
          <EmployeeSearchBar value={search} onChange={setSearch} />
          <DepartmentFilter />
        </div>
        <button
          onClick={() => refreshEmployees()}
          className="border rounded px-4 py-2 text-sm w-fit"
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b font-semibold">
            <th className="p-2"></th>
            <th className="p-2">Name</th>
            <th className="p-2">Department</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeRow key={employee.id} employee={employee} onDelete={removeEmployee} />
          ))}
        </tbody>
      </table>

      {employees.length === 0 && <p className="mt-4 text-gray-500">No employees found.</p>}

      <BulkEmployeeActionBar />
    </div>
  )
}

