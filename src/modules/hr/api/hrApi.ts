import { Employee, EmployeeFormValues } from "../types";

const STORAGE_KEY = "employees";

// Here the ms is the delay in milliseconds
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SEED_DATA: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    department: "Engineering",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    onLeave: false,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Amina Patel",
    department: "Human Resources",
    email: "amina.patel@example.com",
    phone: "+1-555-0456",
    onLeave: false,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Liam Nguyen",
    department: "Sales",
    email: "liam.nguyen@example.com",
    phone: "+1-555-0789",
    onLeave: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Sophia Kim",
    department: "Finance",
    email: "sophia.kim@example.com",
    phone: "+1-555-0310",
    onLeave: false,
    updatedAt: new Date().toISOString(),
  },
];

// "Read from the database"
function readDb(): Employee[] {
    if (typeof window === "undefined") return []; // guard for server-side rendering
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
        return SEED_DATA;
    }
    return JSON.parse(raw);
}

// "Write to the database"
function writeDb(employees: Employee[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}


//CRUD Operations
export async function fetchEmployees(): Promise<Employee[]> {
    //promise Employee means that the function will return a promise and the data will be similar to the Employee interface
    await delay(400);
    return readDb();

}

export async function fetchEmployeeById(id: string): Promise<Employee | undefined> {
    await delay(300);
    return readDb().find((employee) => employee.id === id);
}

export async function createEmployee(payload: EmployeeFormValues): Promise<Employee> {
    await delay(400);
    const employees = readDb();
    const newEmployee: Employee = {
        ...payload,
        id: crypto.randomUUID(),
        updatedAt: new Date().toISOString(),
        onLeave: false,
    };
    writeDb([...employees, newEmployee]);
    return newEmployee;
}

export async function updateEmployee(id: string, payload: Partial<EmployeeFormValues>): Promise<Employee> {
    await delay(400);
    const employees = readDb();
    const index = employees.findIndex((employee) => employee.id === id);
    if (index === -1) throw new Error("Employee not found");
    const updated = { ...employees[index], ...payload, updatedAt: new Date().toISOString() };
    employees[index] = updated;
    writeDb(employees);
    return updated;
}

export async function deleteEmployee(id: string): Promise<void> {
    await delay(300);
    writeDb(readDb().filter((employee) => employee.id !== id));
}