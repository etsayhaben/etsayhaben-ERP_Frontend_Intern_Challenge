'use client';

import Link from 'next/link';
import { EmployeeTable } from '@/modules/hr/components/EmployeeTable';
import { SearchBar } from '@/modules/hr/components/SearchBar';
import { DepartmentFilter } from '@/modules/hr/components/DepartmentFilter';
import { BulkActionBar } from '@/modules/hr/components/BulkActionBar';
import { EmployeeForm } from '@/modules/hr/components/EmployeeForm';

export default function HRPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Human Resources</h1>

        <Link
          href="/hr/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Employee
        </Link>
      </div>

      <div className="flex gap-3">
        <SearchBar />
        <DepartmentFilter />
      </div>

      <BulkActionBar />

      <EmployeeTable />
    </div>
  );
}
