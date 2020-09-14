import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HarrisHttpInterceptor,
  HarrisHttpInterceptorImpersonate,
  HarrisHttpInterceptorAuthentication
} from './testing/harris-http-interceptor';
import { UserInfoService } from './userinfo/user-info.service';
import { CommonDataService } from './shared/common-data/common-data.service';
// import { IsApproverGuard } from './app-isapprover-guard';
import { GlobalErrorHandlerService } from './shared/global-error-handler/global-error-handler.service';
import { ProgressTrackerService } from './shared/progress-tracker/progress-tracker.service';
import { environment } from '../environments/environment';
import { UserProfileService } from './shared/user-profile/user-profile.service';
import { UserProfileComponent } from './shared/user-profile/user-profile/user-profile.component';
import { SharedModule } from './shared/shared.module';
import { GuidedTourService } from './shared/guided-tour/guided-tour.service';
import { ChatBotService } from './shared/chatbot/chatbot.service';
import { AuthService } from './authentication/auth.service';
import { ApplicationEnvironment } from './shared/shared';

// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { LanguageTranslationService } from './shared/language-translation/language-translation.service';

// Language Translation Service ... required for AOT compilation
export function translateLanguageFactory(_languageTranslationService: LanguageTranslationService) {
  return _languageTranslationService;
}

export function appWaitForServicesToBeReady(_commonDataService: CommonDataService) {
  return () => _commonDataService.appWaitForServicesToBeReady();
}

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
  ],
  imports: [
    ...environment.importModules, // Specific modules to import for the current environment.
    BrowserModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: translateLanguageFactory,
          deps: [LanguageTranslationService]
      }
    })
  ],
  providers: [
    AuthService,
    UserInfoService,
    UserProfileService,
    CommonDataService,
    ChatBotService,
    GuidedTourService,
    LanguageTranslationService,
    ProgressTrackerService,
    GlobalErrorHandlerService,
    {
      provide: 'ENVIRONMENT',
      useValue: environment
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HarrisHttpInterceptorAuthentication,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HarrisHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HarrisHttpInterceptorImpersonate,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appWaitForServicesToBeReady,
      multi: true,
      deps: [CommonDataService]
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HarrisHttpInterceptorMockJSON,
    //   multi: true
    // },
    // IsApproverGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private injector: Injector,
    private _userInfoService: UserInfoService,
  ) {
    // Get our environment
    const appEnvironment: ApplicationEnvironment = this.injector.get('ENVIRONMENT');
    // If a baseHref isn't defined, define it now.
    if (! appEnvironment.baseHref) {
      // Get base href dom elemend
      const bases = document.getElementsByTagName('base');
      let baseHref = bases[0].href;
      // Trim trailing slash
      if (baseHref.substring(baseHref.length - 1) === '/') {
        baseHref = baseHref.substring(0, baseHref.length - 1);
      }

      // Store the basehref in the environment
      appEnvironment.baseHref = baseHref;
    } // end if basehref empty

    // Mark that the environment is ready
    appEnvironment.environmentIsReady$.next(true);
  } // end constructor
} // end AppModule

// tslint:disable:max-line-length
// DBG ... If a 500 error happens during APP_INITIALIZER (ie, vrs getemployeeprofile returns 500), we just fail with a white screen.  Can we handle this better?
