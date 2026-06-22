'use client';

import { useHRFilterStore } from '../store/hrFilterStore';
import { DEPARTMENTS } from '../types';

export function DepartmentFilter() {
  const { selectedDepartment, setSelectedDepartment } = useHRFilterStore();

  return (
    <select
      value={selectedDepartment || ''}
      onChange={e => setSelectedDepartment(e.target.value || null)}
      className="border px-3 py-2 rounded"
    >
      <option value="">All Departments</option>

      {DEPARTMENTS.map(dept => (
        <option key={dept} value={dept}>
          {dept}
        </option>
      ))}
    </select>
  );
}
