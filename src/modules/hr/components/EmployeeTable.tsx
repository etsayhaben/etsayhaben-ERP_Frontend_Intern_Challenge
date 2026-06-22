'use client';

import Link from 'next/link';
import { useHR } from '../hooks/useHR';
import { useHRSelectionStore } from '../store/selectionStore';

export function EmployeeTable() {
  const { employees, isLoading, isError, deleteEmployee } = useHR();

  const { selectedIds, toggleId } = useHRSelectionStore();

  if (isLoading) return <p>Loading employees...</p>;

  if (isError) return <p>Failed to load employees</p>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-b">
              {/* checkbox */}
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(emp.id)}
                  onChange={() => toggleId(emp.id)}
                />
              </td>

              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>

              <td>
                {emp.onLeave ? (
                  <span className="text-red-500">On Leave</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="flex gap-2">
                <Link href={`/hr/${emp.id}`} className="text-blue-600">
                  Edit
                </Link>

                <button
                  className="text-red-500"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
