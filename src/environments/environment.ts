import { AppMode } from '../app/shared/shared';
import { VacationRequestModule } from '../app/vacation-request/vacation-request.module';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// PRODUCTION BUILD STEPS FOR DEV:
// Map T:\ to \\mlbmblwebd1.cs.myharris.net\e$\netroot\mi-dev\wwwroot
// Run the following ...
// ng build --prod --output-path=T:\TimecardClient --base-href=/TimecardClient/
// BUILD COMMAND FOR GENERATING THE TEST CLIENT (for the .net API service project)
// (Assuming that the service root is ..\TimecardService\)
// ng build --environment=local --output-path=..\TimecardService\Timecard.TestClient --base-href=/

export const dbgApiServiceURL = 'https://mi-dev.harris.com/timecard/api/v1/'; // dbg
export const dbgApiServiceURLGetEmployeeProfile = 'https://mi-dev.harris.com/timecard/api/v1/'; // dbg

export const environment = {
  production: false,
  apiServiceURLs: {
    'VRS': 'https://mi-dev.harris.com/DEV/VRSAPI/api/v1/Vacation/',
    'TIMECARD': 'https://mi-dev.harris.com/timecard/api/v1/Timecard/',
    'EMPLOYEE': 'https://mi-dev.harris.com/timecard/api/v1/Employee/',
  },
  AppMode: AppMode.Dev,
  allowDiagnostics: true,
  importModules: [
    VacationRequestModule
  ],
};
