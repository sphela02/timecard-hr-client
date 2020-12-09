import { AppMode, ApplicationEnvironment } from '../app/shared/shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const environment: ApplicationEnvironment = {
  production: true,
  apiServiceURLs: {
    'EMPLOYEE': 'https://mi.harris.com/timecardapi/api/v1/Employee/',
  },
  AppMode: AppMode.Prod,
  allowDiagnostics: false,
  environmentIsReady$: null,
  importModules: [
  ],
  useOIDC: true,
  oidcRenewalWindow: (6 * 60 * 60),
  authClientSettings: {
    authority: 'https://sso.l3harris.com/ofisid/api/discovery',
    client_id: 'urn:AppName',
    redirect_uri: 'https://path.to.app/path/auth-callback',
    post_logout_redirect_uri: 'https://path.to.app/path/',
    response_type: 'code',
    scope: 'openid',
    filterProtocolClaims: true,
    loadUserInfo: false,
    client_secret: 'ReplaceThis123456',
    automaticSilentRenew: false
  },
  chatBotSettings: null,
  useChatBot: false,
};

environment.environmentIsReady$ = new BehaviorSubject<boolean>(false);
