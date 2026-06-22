'use client';

import { useRouter } from 'next/navigation';
import { EmployeeForm } from '@/modules/hr/components/EmployeeForm';

export default function AddEmployeePage() {
  const router = useRouter();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>

      <EmployeeForm mode="create" onSuccess={() => router.push('/hr')} />
    </div>
  );
}
