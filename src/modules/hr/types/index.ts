export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  onLeave: boolean;
  status: 'active' | 'inactive';
  updatedAt: string;
}

export interface EmployeeFormValues {
  name: string;
  email: string;
  department: string;
  position: string;
  onLeave: boolean;
}

export const DEPARTMENTS = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];
