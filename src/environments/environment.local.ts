import { AppMode, ApplicationEnvironment } from '../app/shared/shared';
import { VacationRequestModule } from '../app/vacation-request/vacation-request.module';
import { EmployeeSelfServiceModule } from '../app/employee-self-service/employee-self-service.module';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// PRODUCTION BUILD STEPS FOR DEV:
// Map T:\ to \\mlbmblwebd1.cs.myharris.net\e$\netroot\mi-dev\wwwroot
// Run the following ...
// ng build --prod --output-path=T:\TimecardClient --base-href=/TimecardClient/
// STEPS FOR MOCKGEN:
// ng serve -o --environment=local --live-reload=false
// Set your browser's default download folder to be where the JSON files are stored.

export const environment: ApplicationEnvironment = {
  production: false,
  // apiServiceURL: 'https://mi-dev.harris.com/timecard/api/v1/',
  apiServiceURLs: {
    'VRS':      'https://mi-dev.harris.com/DEV/VRSAPI/api/v1/Vacation/',
    'TIMECARD': 'https://mi-dev.harris.com/dev/timecardapi/api/v1/Timecard/',
    'EMPLOYEE': 'https://mi-dev.harris.com/dev/timecardapi/api/v1/Employee/',
    'ESS':      'http://localhost:9572/ESSAPI/api/v1/EmployeeSelfService/',
  },
  AppMode: AppMode.Dev,
  allowDiagnostics: true,
  importModules: [
    VacationRequestModule,
    EmployeeSelfServiceModule,
  ],
};
