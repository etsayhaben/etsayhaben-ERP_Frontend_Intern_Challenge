// -- API INTEGRATION ---------------------------------------------------------
// Mirrors the Inventory module's fake backend. The UI talks to async functions
// here exactly as it would talk to a REST client later.

import { Employee, EmployeeFormValues, EmployeeStatus } from '../types'

const STORAGE_KEY = 'hr_employees'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const SEED_DATA: Employee[] = [
  {
    id: 'emp-1',
    name: 'Maya Bekele',
    email: 'maya.bekele@erp.example',
    phone: '+251 911 100 201',
    department: 'HR',
    role: 'People Operations Lead',
    employmentType: 'Full-time',
    status: 'active',
    startDate: '2022-02-14',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'emp-2',
    name: 'Noah Carter',
    email: 'noah.carter@erp.example',
    phone: '+251 911 100 202',
    department: 'Engineering',
    role: 'Frontend Engineer',
    employmentType: 'Full-time',
    status: 'on-leave',
    startDate: '2021-09-01',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'emp-3',
    name: 'Sara Ibrahim',
    email: 'sara.ibrahim@erp.example',
    phone: '+251 911 100 203',
    department: 'Finance',
    role: 'Payroll Specialist',
    employmentType: 'Full-time',
    status: 'active',
    startDate: '2023-01-09',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'emp-4',
    name: 'Liam Mensah',
    email: 'liam.mensah@erp.example',
    phone: '+251 911 100 204',
    department: 'Operations',
    role: 'Facilities Coordinator',
    employmentType: 'Contract',
    status: 'inactive',
    startDate: '2020-06-22',
    updatedAt: new Date().toISOString(),
  },
]

function readDb(): Employee[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA))
    return SEED_DATA
  }
  return JSON.parse(raw)
}

function writeDb(employees: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
}

export async function fetchEmployees(): Promise<Employee[]> {
  await delay(400)
  return readDb()
}

export async function fetchEmployeeById(id: string): Promise<Employee | undefined> {
  await delay(300)
  return readDb().find((employee) => employee.id === id)
}

export async function createEmployee(payload: EmployeeFormValues): Promise<Employee> {
  await delay(400)
  const employees = readDb()
  const newEmployee: Employee = {
    ...payload,
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
  }
  writeDb([...employees, newEmployee])
  return newEmployee
}

export async function updateEmployee(
  id: string,
  payload: Partial<EmployeeFormValues>
): Promise<Employee> {
  await delay(400)
  const employees = readDb()
  const index = employees.findIndex((employee) => employee.id === id)
  if (index === -1) throw new Error('Employee not found')

  const updated = { ...employees[index], ...payload, updatedAt: new Date().toISOString() }
  employees[index] = updated
  writeDb(employees)
  return updated
}

export async function deleteEmployee(id: string): Promise<void> {
  await delay(300)
  writeDb(readDb().filter((employee) => employee.id !== id))
}

export async function updateEmployeesStatus(ids: string[], status: EmployeeStatus): Promise<Employee[]> {
  await delay(400)
  const employees = readDb()
  const updatedEmployees = employees.map((employee) =>
    ids.includes(employee.id) ? { ...employee, status, updatedAt: new Date().toISOString() } : employee
  )
  writeDb(updatedEmployees)
  return updatedEmployees.filter((employee) => ids.includes(employee.id))
}

