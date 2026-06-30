/*'use client';

import EmployeeRegisterForm from '@/modules/hr/adimin/components/RegisterUser';

export default function RegisterEmployeePage() {
  return <EmployeeRegisterForm />;
}*/
// page.tsx
/*'use client';

import EmployeeRegisterForm from './register-user';

export default function Page() {
  return <EmployeeRegisterForm />;
}*/
'use client'; // ✅ ADD THIS
import EmployeeManager from '@/modules/hr/adimin/components/RegisterUser'; // or wherever it is

export default function Page() {
  return <EmployeeManager />;
}