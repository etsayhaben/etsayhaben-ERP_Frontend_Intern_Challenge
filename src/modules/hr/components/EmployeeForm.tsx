'use client'

// One form component is reused for create and edit. Props decide the mode,
// while form fields and validation errors stay local to this component.

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { createEmployee, updateEmployee } from '../api/employeeApi'
import { DEPARTMENTS, validateEmployee } from '../services/employeeService'
import { Employee, EmployeeFormValues } from '../types'

interface EmployeeFormProps {
  mode: 'create' | 'edit'
  initialData?: Employee
}

const EMPTY_VALUES: EmployeeFormValues = {
  name: '',
  email: '',
  phone: '',
  department: 'HR',
  role: '',
  employmentType: 'Full-time',
  status: 'active',
  startDate: '',
}

export function EmployeeForm({ mode, initialData }: EmployeeFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [values, setValues] = useState<EmployeeFormValues>(initialData ?? EMPTY_VALUES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  function handleChange(field: keyof EmployeeFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const validationErrors = validateEmployee(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    setServerError('')

    try {
      if (mode === 'create') {
        await createEmployee(values)
      } else if (initialData) {
        await updateEmployee(initialData.id, values)
      }
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      router.push('/hr')
    } catch {
      setServerError('Failed to save employee. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Role</label>
        <input
          value={values.role}
          onChange={(e) => handleChange('role', e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Department</label>
          <select
            value={values.department}
            onChange={(e) => handleChange('department', e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Employment type</label>
          <select
            value={values.employmentType}
            onChange={(e) => handleChange('employmentType', e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={values.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="active">Active</option>
            <option value="on-leave">On leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Start date</label>
          <input
            type="date"
            value={values.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.startDate && <p className="text-red-600 text-sm">{errors.startDate}</p>}
        </div>
      </div>

      {serverError && <p className="text-red-600">{serverError}</p>}

      <button type="submit" disabled={submitting} className="bg-blue-600 text-white rounded px-4 py-2">
        {submitting ? 'Saving...' : mode === 'create' ? 'Add Employee' : 'Save Changes'}
      </button>
    </form>
  )
}

