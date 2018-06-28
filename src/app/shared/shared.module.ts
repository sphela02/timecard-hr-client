import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqIfDirective } from '../shared/mq-if/mq-if.directive';
import { ObjectFilter } from '../shared/pipes/objectFilter';

// export { ErrorStatus }    from './ErrorStatus';

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
    CommonModule
  ],
  declarations: [
    MqIfDirective,
    ObjectFilter
  ],
  exports: [
    MqIfDirective,
    ObjectFilter
  ]
})
export class SharedModule {}

