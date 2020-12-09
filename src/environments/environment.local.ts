import { AppMode, ApplicationEnvironment } from '../app/shared/shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: ApplicationEnvironment = {
  production: false,
  // apiServiceURL: 'https://mi-dev.harris.com/timecard/api/v1/',
  apiServiceURLs: {
    'EMPLOYEE': 'https://mi-dev.harris.com/dev/timecardapi/api/v1/Employee/',
  },
  AppMode: AppMode.Dev,
  allowDiagnostics: true,
  baseHref: null,
  environmentIsReady$: null,
  importModules: [
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
