import { Employee, EmployeeFormValues } from '../types'

export function EmplyeeFormValidator(values: EmployeeFormValues): Record<string, string> {
    const errors: Record<string, string> = {}
    
    if (!values.name.trim()) {
        errors.name = 'Name is required'
    } else if (values.name.trim().length <= 3) {
        errors.name = 'Name must be greater than 3 characters'
    }
    
    if (!values.department.trim()) {
        errors.department = 'Department is required'
    }
    
    if (!values.email.trim()) {
        errors.email = 'Email is required'
    } else if (!isValidEmail(values.email.trim())) {
        errors.email = 'Please enter a valid email address (e.g., user@example.com)'
    }
    
    if (!values.phone.trim()) {
        errors.phone = 'Phone is required'
    } else if (values.phone.trim().length < 5) {
        errors.phone = 'Phone number must contain at least 5 digits'
    }
    
    return errors
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

