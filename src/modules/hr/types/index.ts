// Shared shape used by every file in this module — the single source of truth.
export interface Employee {
    id: string
    name: string
    department: string
    email: string
    phone: string
    onLeave: boolean
    updatedAt: string
}

// Used by the form — id/onLeave/updatedAt are set by the "backend", not the user.
export type EmployeeFormValues = Omit<Employee, 'id' | 'updatedAt'>
