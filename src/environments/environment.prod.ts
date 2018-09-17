import { AppMode } from '../app/shared/shared';
import { VacationRequestModule } from '../app/vacation-request/vacation-request.module';

export const environment = {
  production: true,
  apiServiceURLs: {
    'TIMECARD': 'https://mi.harris.com/timecardapi/api/v1/Timecard/',
    'EMPLOYEE': 'https://mi.harris.com/timecardapi/api/v1/Employee/',
    'VRS':      'https://mi.harris.com/VRSAPI/api/v1/Vacation/',
  },
  AppMode: AppMode.Prod,
  allowDiagnostics: false,
  importModules: [
    VacationRequestModule
  ],
};
