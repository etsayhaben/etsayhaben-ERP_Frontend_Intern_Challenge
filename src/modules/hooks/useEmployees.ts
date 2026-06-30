
import { useQuery } from '@tanstack/react-query';
import { employeeService, Employee } from '@/modules/services/employeeService';

export const useEmployees = (filters: { 
  name?: string; 
  position?: string;
  department?: string;
}) => {
  return useQuery<Employee[]>({
    queryKey: ['employees', filters],
    queryFn: () => employeeService.getEmployees(filters),
    staleTime: 5 * 60 * 1000,
  });
};