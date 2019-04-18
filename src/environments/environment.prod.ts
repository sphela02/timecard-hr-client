import { AppMode, ApplicationEnvironment } from '../app/shared/shared';
import { VacationRequestModule } from '../app/vacation-request/vacation-request.module';
import { EmployeeSelfServiceModule } from '../app/employee-self-service/employee-self-service.module';

export const environment: ApplicationEnvironment = {
  production: true,
  apiServiceURLs: {
    'TIMECARD': 'https://mi.harris.com/timecardapi/api/v1/Timecard/',
    'EMPLOYEE': 'https://mi.harris.com/timecardapi/api/v1/Employee/',
    'VRS':      'https://mi.harris.com/VRSAPI/api/v1/Vacation/',
    'ESS':      'https://mi.harris.com/EmpSelfServiceAPI/api/v1/EmployeeSelfService/',
  },
  AppMode: AppMode.Prod,
  allowDiagnostics: false,
  importModules: [
    VacationRequestModule,
    EmployeeSelfServiceModule,
  ],
};
