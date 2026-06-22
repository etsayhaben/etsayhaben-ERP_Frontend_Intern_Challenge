import { Employee, EmployeeFormValues } from '../types';

const STORAGE_KEY = 'hr_employees';

// fake delay (same pattern as inventory)
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// seed data (first run only)
const SEED_DATA: Employee[] = [
  {
    id: '1',
    name: 'Abebe Kebede',
    email: 'abebe@company.com',
    department: 'IT',
    position: 'Frontend Developer',
    onLeave: false,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Sara Mekonnen',
    email: 'sara@company.com',
    department: 'HR',
    position: 'HR Manager',
    onLeave: true,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
];

// read DB
function readDb(): Employee[] {
  if (typeof window === 'undefined') return [];

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }

  return JSON.parse(raw);
}

// write DB
function writeDb(data: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── API METHODS ─────────────────────────────

export async function fetchEmployees(): Promise<Employee[]> {
  await delay(400);
  return readDb();
}

export async function fetchEmployeeById(
  id: string,
): Promise<Employee | undefined> {
  await delay(300);
  return readDb().find(emp => emp.id === id);
}

export async function createEmployee(
  payload: EmployeeFormValues,
): Promise<Employee> {
  await delay(400);

  const employees = readDb();

  const newEmployee: Employee = {
    ...payload,
    id: crypto.randomUUID(),
    status: 'active',
    updatedAt: new Date().toISOString(),
  };

  writeDb([...employees, newEmployee]);

  return newEmployee;
}

export async function updateEmployee(
  id: string,
  payload: Partial<EmployeeFormValues>,
): Promise<Employee> {
  await delay(400);

  const employees = readDb();

  const index = employees.findIndex(e => e.id === id);

  if (index === -1) throw new Error('Employee not found');

  const updated: Employee = {
    ...employees[index],
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  employees[index] = updated;

  writeDb(employees);

  return updated;
}

export async function deleteEmployee(id: string): Promise<void> {
  await delay(300);

  const filtered = readDb().filter(e => e.id !== id);

  writeDb(filtered);
}
