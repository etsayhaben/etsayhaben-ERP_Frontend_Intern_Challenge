import { EmployeeTable } from '@/modules/hr/components/EmployeeTable'
import Link from 'next/link'

export default function EmployeePage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Employees</h1>
                <Link href="/hr/add" className="bg-blue-600 text-white rounded px-4 py-2">
                    + Add Employee
                </Link>
            </div>
            <EmployeeTable />
        </div>
    )
}