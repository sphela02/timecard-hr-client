import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// export { ErrorStatus }    from './ErrorStatus';
export { HourType }       from './HourType';
export { TimecardStatus } from './TimecardStatus';

export { ChargeCodeStatus } from './ChargeCodeStatus';
export { EmployeeProfileDTO } from './EmployeeProfileDTO';
export { ErrorStatus } from './ErrorStatus';
export { FPHCodesDTO } from './FPHCodesDTO';
export { IValidationResponse } from './IValidationResponse';
export { NoteDTO } from './NoteDTO';
export { TRCCodesDTO } from './TRCCodesDTO';
export { TimecardDTO } from './TimecardDTO';
export { TimecardDaysDTO } from './TimecardDaysDTO';
export { TimecardHeaderDTO } from './TimecardHeaderDTO';
export { TimecardRowDTO } from './TimecardRowDTO';
export { TimecardSearchDTO } from './TimecardSearchDTO';
export { TimecardSettingsDTO } from './TimecardSettingsDTO';
export { UpdateTimecardDTO } from './UpdateTimecardDTO';
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
  declarations: []
})
export class SharedModule {}

