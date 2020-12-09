import { AppMode, ApplicationEnvironment } from '../app/shared/shared';
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

////
//// GET BASE HREF TO KNOW WHICH ENVIRONMENT, AND SET OIDC settings
////
const bases = document.getElementsByTagName('base');
export let baseHref = bases[0].href;
export let oidcSecret = null;
export let oidcClientID = null;
if (bases.length > 0) {
    if (baseHref.substring(baseHref.length - 1) === '/') {
      baseHref = baseHref.substring(0, baseHref.length - 1);
    }
    const urlPath = bases[0].attributes[0].nodeValue;
    switch (urlPath) {
      case '/':
        if (baseHref.indexOf('localhost') > 0) {
          oidcSecret = 'fneKC73t556VbJR';
          oidcClientID = 'urn:LOCALHOST-Timecard2.0_2';
        } else {
          console.log('ENVIRONMENT ... Unknown base locale', urlPath, baseHref);
        }
        break;
      default:
        console.log('ENVIRONMENT ... Unknown base locale', urlPath, baseHref);
        break;
      } // end switch urlPath
} // end if bases length

export const environment: ApplicationEnvironment = {
  production: false,
  apiServiceURLs: {
    'EMPLOYEE': 'https://mi-dev.harris.com/dev/timecardapi/api/v1/Employee/',
  },
  AppMode: AppMode.Dev,
  allowDiagnostics: true,
  translationDebugMode: true,
  baseHref: null,
  environmentIsReady$: null,
  importModules: [
  ],
  useOIDC: true,
  oidcRenewalWindow: (1 * 60 * 60),
  authClientSettings: {
    authority: 'https://sso.l3harris.com/ofisid/api/discovery',
    client_id: oidcClientID,
    redirect_uri: baseHref + '/auth-callback',
    post_logout_redirect_uri: baseHref,
    response_type: 'code',
    scope: 'openid',
    filterProtocolClaims: true,
    loadUserInfo: false,
    client_secret: oidcSecret,
    automaticSilentRenew: true,
    silent_redirect_uri: baseHref
  },
  chatBotSettings: {
    botOptions: {
      koreAPIUrl: 'https://chatbot-dev.l3harris.com//api/',
      JWTUrl: 'https://chatbot-dev.l3harris.com/jwtservice/api/users/sts',
      clientId: 'cs-e5d15a97-d72f-52e7-9cb5-b72b462ac3f1',
      clientSecret: 'drW6JJF/HlHzJ0eqZ9wu39bMSOcTwbg4psVosrE+Q6g=',
      botInfo: {
        name: 'HAL_Integrated_Dev',
        _id: 'st-bf635b27-35e5-5c14-9165-07763a1c028d'
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
  useChatBot: true,
};

environment.environmentIsReady$ = new BehaviorSubject<boolean>(false);
