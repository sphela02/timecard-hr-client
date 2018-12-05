import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqIfDirective } from './mq-if/mq-if.directive';
import { ObjectFilter } from './pipes/objectFilter';
import { AppLandingComponent } from './app-landing/app-landing.component';
import { ApprovalMenuComponent } from './approval-menu/approval-menu.component';
import { RouterModule } from '@angular/router';

// export { ErrorStatus }    from './ErrorStatus';

export { ApplicationViewInfo } from './ApplicationViewInfoDTO';
export { EmployeeProfileDTO } from './EmployeeProfileDTO';
export { ErrorStatus } from './ErrorStatus';
export { IValidationResponse } from './IValidationResponse';
export { SearchType } from './SearchType';
export { ValidationResponseGenericDTO } from './ValidationResponseGenericDTO'; // dbg decouple

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    MqIfDirective,
    ObjectFilter,
    AppLandingComponent,
    ApprovalMenuComponent,
  ],
  exports: [
    MqIfDirective,
    ObjectFilter,
    ApprovalMenuComponent,
  ]
})
export class SharedModule {}

