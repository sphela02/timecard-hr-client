import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqIfDirective } from '../shared/mq-if/mq-if.directive';
import { ObjectFilter } from '../shared/pipes/objectFilter';
import { AppLandingComponent } from './app-landing/app-landing.component';
import { ApprovalMenuComponent } from './approval-menu/approval-menu.component';
import { RouterModule } from '@angular/router';

// export { ErrorStatus }    from './ErrorStatus';

export { ApplicationViewInfo } from './ApplicationViewInfoDTO';
export { ApproveInfoDTO } from './ApproveInfoDTO';
export { BenefitHourType } from './BenefitHourType';
export { ChargeCodeDTO } from './ChargeCodeDTO';
export { ChargeCodeStatus } from './ChargeCodeStatus';
export { EmployeeProfileDTO } from './EmployeeProfileDTO';
export { ErrorStatus } from './ErrorStatus';
export { FPHCodesDTO } from './FPHCodesDTO';
export { HourType }       from './HourType';
export { IValidationResponse } from './IValidationResponse';
export { NoteDTO } from './NoteDTO';
export { OvertimeAuthDTO } from './OvertimeAuthDTO';
export { SearchType } from './SearchType';
export { TCRole } from './TCRole';
export { TRCCodesDTO } from './TRCCodesDTO';
export { TimecardApproverSearchResultDTO } from './TimecardApproverSearchResultDTO';
export { TimecardApproverSearchDTO } from './TimecardApproverSearchDTO';
export { TimecardApproverSearchResultsDTO } from './TimecardApproverSearchResultsDTO';
export { TimecardDTO } from './TimecardDTO';
export { TimecardDaysDTO } from './TimecardDaysDTO';
export { TimecardHeaderDTO } from './TimecardHeaderDTO';
export { TimecardRowDTO } from './TimecardRowDTO';
export { TimecardSearchDTO } from './TimecardSearchDTO';
export { TimecardStatus } from './TimecardStatus';
export { TimecardSettingsDTO } from './TimecardSettingsDTO';
export { UpdateTimecardDTO } from './UpdateTimecardDTO';
export { UserRoleDTO } from './UserRoleDTO';
export { ValidateFPHDTO } from './ValidateFPHDTO';
export { ValidateProjectActivityDTO } from './ValidateProjectActivityDTO';
export { ValidateShiftDTO } from './ValidateShiftDTO';
export { ValidationResponseColumnDTO } from './ValidationResponseColumnDTO';
export { ValidationResponseGenericDTO } from './ValidationResponseGenericDTO';
export { ValidationResponseSaveTimecardDTO } from './ValidationResponseSaveTimecardDTO';
export { ValidationResponseTimecardRowDTO } from './ValidationResponseTimecardRowDTO';

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

