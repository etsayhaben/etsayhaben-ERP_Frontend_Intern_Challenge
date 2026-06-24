// Shared shape used by every file in this module — the single source of truth.
export interface Employee {
    id: string
    name: string
    email: string
    department: 'Engineering' | 'Sales' | 'Marketing' | 'HR' | 'Finance'
    role: string
    salary: number
    status: 'active' | 'on_leave'   // status === 'on_leave' = counted by the Navbar badge
    hiredAt: string
    updatedAt: string
}

// Used by the form — id/updatedAt are set by the "backend", not the user.
export type EmployeeFormValues = Omit<Employee, 'id' | 'updatedAt'>
