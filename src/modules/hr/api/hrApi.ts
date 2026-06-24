// ── API INTEGRATION ──────────────────────────────────────────────
// This file pretends to be a backend. Every function returns a Promise
// and has an artificial delay, so the rest of the app behaves EXACTLY
// like it would with a real server (loading states, async/await, etc).
// Swap localStorage for axios.get/post later and nothing else changes.

import { Employee, EmployeeFormValues } from '../types'

const STORAGE_KEY = 'hr_employees'

// Fake network latency so loading spinners are actually visible
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Data used to "seed the database" the first time the app runs
const SEED_DATA: Employee[] = [
  { id: '1', name: 'Amina Tesfaye', email: 'amina@company.com', department: 'Engineering', role: 'Frontend Engineer', salary: 65000, status: 'active', hiredAt: '2023-02-14', updatedAt: new Date().toISOString() },
  { id: '2', name: 'Daniel Bekele', email: 'daniel@company.com', department: 'Sales', role: 'Account Executive', salary: 48000, status: 'on_leave', hiredAt: '2022-09-01', updatedAt: new Date().toISOString() },
  { id: '3', name: 'Hanna Girma', email: 'hanna@company.com', department: 'Marketing', role: 'Content Strategist', salary: 52000, status: 'active', hiredAt: '2024-01-20', updatedAt: new Date().toISOString() },
]

// "Read from the database"
function readDb(): Employee[] {
  if (typeof window === 'undefined') return [] // guard for server-side rendering
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
  await delay(400)              // GET /employees
  return readDb()
}

export async function fetchEmployeeById(id: string): Promise<Employee | undefined> {
  await delay(300)              // GET /employees/:id
  return readDb().find((employee) => employee.id === id)
}

export async function createEmployee(payload: EmployeeFormValues): Promise<Employee> {
  await delay(400)              // POST /employees
  const employees = readDb()
  const newEmployee: Employee = {
    ...payload,
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
  }
  writeDb([...employees, newEmployee])
  return newEmployee
}

export async function updateEmployee(id: string, payload: Partial<EmployeeFormValues>): Promise<Employee> {
  await delay(400)              // PATCH /employees/:id
  const employees = readDb()
  const index = employees.findIndex((employee) => employee.id === id)
  if (index === -1) throw new Error('Employee not found')
  const updated = { ...employees[index], ...payload, updatedAt: new Date().toISOString() }
  employees[index] = updated
  writeDb(employees)
  return updated
}

export async function deleteEmployee(id: string): Promise<void> {
  await delay(300)              // DELETE /employees/:id
  writeDb(readDb().filter((employee) => employee.id !== id))
}
