'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchEmployeeById } from '@/modules/hr/api/hrApi';
import { EmployeeForm } from '@/modules/hr/components/EmployeeForm';

export default function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: employee, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => fetchEmployeeById(id),
  });

  if (isLoading) return <p>Loading...</p>;

  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>

      <EmployeeForm
        mode="edit"
        employee={employee}
        onSuccess={() => router.push('/hr')}
      />
    </div>
  );
}
