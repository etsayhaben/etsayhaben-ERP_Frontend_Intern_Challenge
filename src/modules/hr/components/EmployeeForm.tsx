'use client';

import { useState } from 'react';
import { EmployeeFormValues, Employee } from '../types';
import { createEmployee, updateEmployee } from '../api/hrApi';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  mode: 'create' | 'edit';
  employee?: Employee;
  onSuccess?: () => void;
};

export function EmployeeForm({ mode, employee, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const initialForm: EmployeeFormValues =
    mode === 'edit' && employee
      ? {
          name: employee.name,
          email: employee.email,
          department: employee.department,
          position: employee.position,
          onLeave: employee.onLeave,
        }
      : {
          name: '',
          email: '',
          department: '',
          position: '',
          onLeave: false,
        };

  const [form, setForm] = useState<EmployeeFormValues>(initialForm);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const name = e.target.name as keyof EmployeeFormValues;

    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === 'create') {
      await createEmployee(form);
    } else if (mode === 'edit' && employee) {
      await updateEmployee(employee.id, form);
    }

    queryClient.invalidateQueries({ queryKey: ['employees'] });

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border px-2 py-1 w-full"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border px-2 py-1 w-full"
      />

      <input
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="Department"
        className="border px-2 py-1 w-full"
      />

      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        placeholder="Position"
        className="border px-2 py-1 w-full"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="onLeave"
          checked={form.onLeave}
          onChange={handleChange}
        />
        On Leave
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {mode === 'create' ? 'Create Employee' : 'Update Employee'}
      </button>
    </form>
  );
}
