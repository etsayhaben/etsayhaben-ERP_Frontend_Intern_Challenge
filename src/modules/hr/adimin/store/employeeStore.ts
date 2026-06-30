
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface EmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  position: string;
  department: string;
  salary: string;
  address: string;
  status: 'active' | 'on leave';
}

export interface Employee extends EmployeeInput {
  id: string;
}

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: EmployeeInput) => void;
  updateEmployee: (id: string, updatedData: Partial<EmployeeInput>) => void;
  deleteEmployee: (id: string) => void;
  deleteAllEmployees: () => void;
}

const STORAGE_KEY = 'employees';

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    // ✅ Removed the unused 'get' parameter
    (set) => ({
      employees: [],

      addEmployee: (employee: EmployeeInput) => {
        const newEmployee: Employee = {
          ...employee,
          id: Date.now().toString(),
        };
        set((state) => ({
          employees: [...state.employees, newEmployee],
        }));
      },

      updateEmployee: (id: string, updatedData: Partial<EmployeeInput>) => {
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === id ? { ...emp, ...updatedData } : emp
          ),
        }));
      },

      deleteEmployee: (id: string) => {
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
        }));
      },

      deleteAllEmployees: () => {
        set({ employees: [] });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);