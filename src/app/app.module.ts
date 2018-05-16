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
import { VacationRequestModule } from './vacation-request/vacation-request.module';

import { AppRoutingModule } from './app-routing.module';
import { HarrisHttpInterceptor, HarrisHttpInterceptorImpersonate } from './testing/harris-http-interceptor';
import { UserInfoService } from './userinfo/user-info.service';
import { CommonDataService } from './shared/common-data/common-data.service';
import { IsApproverGuard } from './app-isapprover-guard';
import { GlobalErrorHandlerService } from './shared/global-error-handler/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TimecardModule,
    HomeModule,
    VacationRequestModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot()
  ],
  providers: [
    UserInfoService,
    CommonDataService,
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
    IsApproverGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
