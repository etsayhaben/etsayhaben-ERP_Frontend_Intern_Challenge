import  { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchEmployees, deleteEmployee } from '../api/hrApi'
import { useEmployeeFilterStore } from '../stores/employeeFilterStore'
import {useSelectionStore} from '../stores/selectionStore'

export function useEmployees() {
    const queryClient = useQueryClient()

     const [search, setSearch] = useState('')

     const selectedDepartment = useEmployeeFilterStore((s) => s.selectedDepartment)
    
    const { data: employees = [], isLoading, isError } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => (await fetchEmployees())
    })

     const filtered = employees
    .filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()))
    .filter((employee) => !selectedDepartment || employee.department === selectedDepartment)


    async function removeEmployee(id: string) {
        await deleteEmployee(id)
        queryClient.invalidateQueries({ queryKey: ['employees'] }) // refetch list
    }

    return { employees: filtered, isLoading, isError, removeEmployee, search, setSearch, selectedDepartment }
}

