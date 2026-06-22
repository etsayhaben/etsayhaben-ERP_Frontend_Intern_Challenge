// ── API INTEGRATION ──────────────────────────────────────────────
// This file pretends to be a backend. Every function returns a Promise
// and has an artificial delay, so the rest of the app behaves EXACTLY
// like it would with a real server (loading states, async/await, etc).
// Swap localStorage for axios.get/post later and nothing else changes.

import { Employee, EmployeeFormValues } from '../types'

const STORAGE_KEY = 'employees'

// Fake network latency so loading spinners are actually visible
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Data used to "seed the database" the first time the app runs
const SEED_DATA: Employee[] = [
  { id: '1', name: 'Nahom Kasa', department: 'Sales', email: 'nahom@example.com', phone: '123-456-7890', onLeave: false, updatedAt: new Date().toISOString() },
  { id: '2', name: 'Beti Abera', department: 'Marketing', email: 'beti@example.com', phone: '987-654-3210', onLeave: true, updatedAt: new Date().toISOString() },
  { id: '3', name: 'Bob Johnson', department: 'Finance', email: 'bob@example.com', phone: '555-123-4567', onLeave: false, updatedAt: new Date().toISOString() },
  { id: '4', name: 'Sara Lee', department: 'Engineering', email: 'sara@example.com', phone: '555-987-6543', onLeave: true, updatedAt: new Date().toISOString() },
  { id: '5', name: 'David Kim', department: 'Sales', email: 'david@example.com', phone: '555-456-7890', onLeave: false, updatedAt: new Date().toISOString() },
]

// "Read from the database"
function readDb(): Employee[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA))
    return SEED_DATA
  }
  return JSON.parse(raw)
}

// "Write to the database"
function writeDb(employees: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
}

// ── Public "API" — same names/shapes you'd use with a real REST API ──

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
    onLeave: false,
    updatedAt: new Date().toISOString(),
  }
  writeDb([...employees, newEmployee])
  return newEmployee
}

export async function updateEmployee(id: string, payload: Partial<EmployeeFormValues>): Promise<Employee> {
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
