import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './shared/user-profile/user-profile/user-profile.component';
import { AppLandingComponent } from './shared/app-landing/app-landing.component';
import { ApplicationMenuType } from './shared/shared';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'approvals',
    component: AppLandingComponent,
    data: [{appMenuType: ApplicationMenuType.ApprovalMenu}],
  },
  // { path: '', redirectTo: 'timecards', pathMatch: 'full'},
  // { path: '**', redirectTo: 'timecards', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
