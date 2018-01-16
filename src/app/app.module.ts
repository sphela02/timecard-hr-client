import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimecardModule } from "./timecard/timecard.module";
import { HomeModule } from "./home/home.module";
import { VacationRequestModule } from "./vacation-request/vacation-request.module";

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TimecardModule,
    HomeModule,
    VacationRequestModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
