import { AppMode, ApplicationEnvironment } from '../app/shared/shared';
import { VacationRequestModule } from '../app/vacation-request/vacation-request.module';
import { EmployeeSelfServiceModule } from '../app/employee-self-service/employee-self-service.module';
import { TimecardModule } from '../app/timecard/timecard.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MssModule } from '../app/manager-self-service/mss.module';

export const environment: ApplicationEnvironment = {
  production: true,
  apiServiceURLs: {
    'TIMECARD': 'https://mi.harris.com/timecardapi/api/v1/Timecard/',
    'EMPLOYEE': 'https://mi.harris.com/timecardapi/api/v1/Employee/',
    'VRS':      'https://mi.harris.com/VRSAPI/api/v1/Vacation/',
    'ESS':      'https://mi.harris.com/EmpSelfServiceAPI/api/v1/EmployeeSelfService/',
    'MSS':      'https://mi.harris.com/ManagerSelfServiceAPI/api/v1/ManagerSelfService/'
  },
  AppMode: AppMode.Prod,
  allowDiagnostics: false,
  environmentIsReady$: null,
  importModules: [
    VacationRequestModule,
    EmployeeSelfServiceModule,
    TimecardModule,
    MssModule
  ],
  useOIDC: true,
  oidcRenewalWindow: (6 * 60 * 60),
  authClientSettings: {
    authority: 'https://sso.l3harris.com/ofisid/api/discovery',
    client_id: 'urn:mi-Timecard2.0',
    redirect_uri: 'https://mi.harris.com/timecard/auth-callback',
    post_logout_redirect_uri: 'https://mi.harris.com/Timecard/',
    response_type: 'code',
    scope: 'openid',
    filterProtocolClaims: true,
    loadUserInfo: false,
    client_secret: 'r66T266jpKjkAXR',
    automaticSilentRenew: false
  },
  chatBotSettings: {
    botOptions: {
      koreAPIUrl: 'https://chatbot.l3harris.com/api/',
      JWTUrl: 'https://chatbot.l3harris.com/jwtservice/api/users/sts',
      clientId: 'cs-ffb8b693-6774-5027-84da-86ca36727ba8',
      clientSecret: 'aGDoLy8fOXHuwOrHgyvKJ9akZ+BktAWi8ZtFqQ9ZKFM=',
      botInfo: {
        name: 'HAL',
        _id: 'st-87b86482-81fc-5fb7-917e-d8a7cb7fd4de'
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
