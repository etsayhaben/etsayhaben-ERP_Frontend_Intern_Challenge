import { EmployeeForm } from '@/modules/hr/components/EmployeeForm'

export default function AddEmployeePage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Add Employee</h1>
            </div>
            <EmployeeForm mode="create" />
        </div>
    )
}