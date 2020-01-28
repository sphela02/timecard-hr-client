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
// net use /persistent:yes /savecred t: \\mlbmblwebd1.cs.myharris.net\e$\netroot\mi-dev\wwwroot
// Run the following ...
// ng build --prod --output-path=T:\TimecardClient --base-href=/TimecardClient/
// BUILD COMMAND FOR GENERATING THE TEST CLIENT (for the .net API service project)
// (Assuming that the service root is ..\TimecardService\)
// ng build --environment=local --output-path=..\TimecardService\Timecard.TestClient --base-href=/

export const dbgApiServiceURL = 'https://mi-dev.harris.com/dev/timecardapi/api/v1/'; // dbg
export const dbgApiServiceURLGetEmployeeProfile = 'https://mi-dev.harris.com/dev/timecardapi/api/v1/'; // dbg

export const environment: ApplicationEnvironment = {
  production: false,
  apiServiceURLs: {
    'VRS':      'https://mi-dev.harris.com/AuthTest/VRSAPI/api/v1/Vacation/',
    'TIMECARD': 'https://mi-dev.harris.com/AuthTest/timecardapi/api/v1/Timecard/',
    'EMPLOYEE': 'https://mi-dev.harris.com/AuthTest/timecardapi/api/v1/Employee/',
    'ESS':      'https://mi-dev.harris.com/AuthTest/EmpSelfServiceAPI/api/v1/EmployeeSelfService/',
    'MSS':      'https://mi-dev.harris.com/AuthTest/ManagerSelfServiceAPI/api/v1/ManagerSelfService/',
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
  oidcRenewalWindow: 0,
  authClientSettings: {
    authority: 'https://sso.l3harris.com/ofisid/api/discovery',
    client_id: 'urn:mi-dev-authtest-Timecard2.0',
    redirect_uri: 'https://mi-dev.harris.com/AuthTest/Timecard/auth-callback',
    post_logout_redirect_uri: 'https://mi-dev.harris.com/AuthTest/Timecard/',
    response_type: 'code',
    scope: 'openid',
    filterProtocolClaims: true,
    loadUserInfo: false,
    client_secret: '44S7kG6BFrE5sda',
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://mi-dev.harris.com/AuthTest/Timecard/auth-callback?silent=true'
  },
  chatBotSettings: {
    botOptions: {
      koreAPIUrl: 'https://chatbot-tst.l3harris.com//api/',
      JWTUrl: 'https://chatbot-tst.l3harris.com/jwtservice/api/users/sts',
      clientId: 'cs-8434abc2-049e-5cfa-9931-40087a4272fe',
      clientSecret: 'Kc80o/QkpkvOCQiS+62lC1Hi4eK0U+r2G1Af1vibuFg=',
      botInfo: {
        name: 'HAL_Integrated_Test',
        _id: 'st-9fd6abd4-4119-55c4-9912-f0bd1bf8c1d9'
      }
    },
    allowIframe: false,
    isSendButton: false,
    isTTSEnabled: false,
    isSpeechEnabled: false,
    allowGoogleSpeech: false,
    allowLocation: false,
    loadHistory: true,
    messageHistoryLimit: 10,
    autoEnableSpeechAndTTS: false,
    minimizeMode: true
  },
  useChatBot: false,
};

environment.environmentIsReady$ = new BehaviorSubject<boolean>(false);
