export interface Employee {
    id: string,
    name: string,
    department: string,
    email: string,
    phone: string,
    onLeave: boolean,
    updatedAt: string,
}

export type EmployeeFormValues = Omit<Employee, 'id' | 'onLeave' | 'updatedAt'>
