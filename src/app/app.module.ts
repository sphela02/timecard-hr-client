import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TimecardModule } from './timecard/timecard.module';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { HarrisHttpInterceptor, HarrisHttpInterceptorImpersonate, HarrisHttpInterceptorMockJSON } from './testing/harris-http-interceptor';
import { UserInfoService } from './userinfo/user-info.service';
import { CommonDataService } from './shared/common-data/common-data.service';
import { IsApproverGuard } from './app-isapprover-guard';
import { GlobalErrorHandlerService } from './shared/global-error-handler/global-error-handler.service';
import { ProgressTrackerService } from './shared/progress-tracker/progress-tracker.service';
import { environment } from '../environments/environment';
import { UserProfileService } from './shared/user-profile/user-profile.service';
import { UserProfileComponent } from './shared/user-profile/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
  ],
  imports: [
    ...environment.importModules, // Specific modules to import for the current environment.
    BrowserModule,
    FormsModule,
    TimecardModule,
    HomeModule,
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
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HarrisHttpInterceptorMockJSON,
    //   multi: true
    // },
    IsApproverGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
