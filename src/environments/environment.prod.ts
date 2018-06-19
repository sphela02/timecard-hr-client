import { AppMode } from '../app/shared/shared';

export const environment = {
  production: true,
  apiServiceURLs: {
    'TIMECARD': 'https://mi.harris.com/timecardapi/api/v1/Timecard/',
    'EMPLOYEE': 'https://mi.harris.com/timecardapi/api/v1/Employee/',
  },
  AppMode: AppMode.Prod,
  allowDiagnostics: false,
  importModules: [],
};
