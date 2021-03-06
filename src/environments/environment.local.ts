import { AppMode, ApplicationEnvironment } from '../app/shared/shared';
import { VacationRequestModule } from '../app/vacation-request/vacation-request.module';
import { EmployeeSelfServiceModule } from '../app/employee-self-service/employee-self-service.module';
import { TimecardModule } from '../app/timecard/timecard.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MssModule } from '../app/manager-self-service/mss.module';

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
    'VRS':      'http://localhost/VRS.API/api/v1/Vacation/',
    'TIMECARD': 'http://localhost/TC.API/api/v1/Timecard/',
    'EMPLOYEE': 'http://localhost/TC.API/api/v1/Employee/',
    'ESS':      'http://localhost/ESS.API/api/v1/EmployeeSelfService/',
    'MSS':      'http://localhost/MSS.API/api/v1/ManagerSelfService/',
  },
  AppMode: AppMode.Dev,
  allowDiagnostics: true,
  baseHref: null,
  environmentIsReady$: null,
  importModules: [
    VacationRequestModule,
    EmployeeSelfServiceModule,
    TimecardModule,
    MssModule,
  ],
  useOIDC: true,
  oidcRenewalWindow: (1 * 60 * 60),
  authClientSettings: {
    authority: 'https://sso.l3harris.com/ofisid/api/discovery',
    client_id: 'urn:LOCALHOST-Timecard2.0_2',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'code',
    scope: 'openid',
    filterProtocolClaims: true,
    loadUserInfo: false,
    client_secret: 'fneKC73t556VbJR',
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/auth-callback?silent=true'
  },
  chatBotSettings: null,
  useChatBot: false,
};

environment.environmentIsReady$ = new BehaviorSubject<boolean>(false);
