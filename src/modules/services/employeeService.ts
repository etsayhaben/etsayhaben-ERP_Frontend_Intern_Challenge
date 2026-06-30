export interface Employee {
  id: string;
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

const STORAGE_KEY = 'employees';

export const employeeService = {
  getEmployees: async (params?: { name?: string; position?: string; department?: string }) => {
    try {
      // ✅ Critical: Check if we are in the browser (prevents SSR errors)
      if (typeof window === 'undefined') {
        return [];
      }

      const storedData = localStorage.getItem(STORAGE_KEY);
      let employees: Employee[] = [];

      if (storedData) {
        const parsed = JSON.parse(storedData);
        
        // ✅ Zustand persist saves data as { state: { employees: [...] }, version: 0 }
        // Extract the array properly
        if (parsed && parsed.state && Array.isArray(parsed.state.employees)) {
          employees = parsed.state.employees;
        } 
        // Fallback: if someone manually saved a raw array, handle that too
        else if (Array.isArray(parsed)) {
          employees = parsed;
        }
      }

      // 🔍 Search by full name (combining firstName + lastName)
      if (params?.name) {
        const search = params.name.toLowerCase();
        employees = employees.filter((emp) =>
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search)
        );
      }

      // 🏢 Filter by Position
      if (params?.position) {
        employees = employees.filter((emp) => emp.position === params.position);
      }

      // 🏢 Filter by Department
      if (params?.department) {
        employees = employees.filter((emp) => emp.department === params.department);
      }

      return employees;
    } catch (error) {
      console.error('Failed to load employees from localStorage:', error);
      return [];
    }
  },
};