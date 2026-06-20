// Shared shape used by every file in this module - the single source of truth.
export type Department = 'Engineering' | 'HR' | 'Finance' | 'Operations' | 'Sales' | 'Marketing'

export type EmployeeStatus = 'active' | 'on-leave' | 'inactive'

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  department: Department
  role: string
  employmentType: 'Full-time' | 'Part-time' | 'Contract'
  status: EmployeeStatus
  startDate: string
  updatedAt: string
}

// Used by the form - id/updatedAt are set by the "backend", not the user.
export type EmployeeFormValues = Omit<Employee, 'id' | 'updatedAt'>

