import { AppMode, ApplicationEnvironment } from '../app/shared/shared';
import { VacationRequestModule } from '../app/vacation-request/vacation-request.module';
import { EmployeeSelfServiceModule } from '../app/employee-self-service/employee-self-service.module';
import { TimecardModule } from '../app/timecard/timecard.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// PRODUCTION BUILD STEPS FOR DEV:
// Map T:\ to \\mlbmblwebd1.cs.myharris.net\e$\netroot\mi-dev\wwwroot
// net use /persistent:yes /savecred t: \\mlbmblwebd1.cs.myharris.net\e$\netroot\mi-dev\wwwroot
// Run the following ...
// ng build --prod --output-path=T:\TimecardClient --base-href=/TimecardClient/
// BUILD COMMAND FOR GENERATING THE TEST CLIENT (for the .net API service project)
// (Assuming that the service root is ..\TimecardService\)
// ng build --environment=local --output-path=..\TimecardService\Timecard.TestClient --base-href=/

export const dbgApiServiceURL = 'https://mi-dev.harris.com/nexgen/timecardapi/api/v1/'; // dbg
export const dbgApiServiceURLGetEmployeeProfile = 'https://mi-dev.harris.com/nexgen/timecardapi/api/v1/'; // dbg

export const environment: ApplicationEnvironment = {
  production: false,
  apiServiceURLs: {
    'VRS':      'https://mi-dev.harris.com/DEV/VRSAPI/api/v1/Vacation/',
    'TIMECARD': 'https://mi-dev.harris.com/NexGen/timecardapi/api/v1/Timecard/',
    'EMPLOYEE': 'https://mi-dev.harris.com/NexGen/timecardapi/api/v1/Employee/',
    'ESS':      'https://mi-dev.harris.com/dev/EmpSelfServiceAPI/api/v1/EmployeeSelfService/',
  },
  AppMode: AppMode.Dev,
  allowDiagnostics: true,
  useOIDC: false,
  oidcRenewalWindow: (6 * 60 * 60),
  authClientSettings: null,
  environmentIsReady$: null,
  importModules: [
    VacationRequestModule,
    EmployeeSelfServiceModule,
    TimecardModule,
  ],
};

environment.environmentIsReady$ = new BehaviorSubject<boolean>(false);
