import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HarrisHttpInterceptor, HarrisHttpInterceptorImpersonate, HarrisHttpInterceptorMockJSON } from './testing/harris-http-interceptor';
import { UserInfoService } from './userinfo/user-info.service';
import { CommonDataService } from './shared/common-data/common-data.service';
// import { IsApproverGuard } from './app-isapprover-guard';
import { GlobalErrorHandlerService } from './shared/global-error-handler/global-error-handler.service';
import { ProgressTrackerService } from './shared/progress-tracker/progress-tracker.service';
import { environment } from '../environments/environment';
import { UserProfileService } from './shared/user-profile/user-profile.service';
import { UserProfileComponent } from './shared/user-profile/user-profile/user-profile.component';
import { SharedModule } from './shared/shared.module';

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
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
  ],
  providers: [
    UserInfoService,
    UserProfileService,
    CommonDataService,
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
export class AppModule { }

// tslint:disable:max-line-length
// DBG ... If a 500 error happens during APP_INITIALIZER (ie, vrs getemployeeprofile returns 500), we just fail with a white screen.  Can we handle this better?
