export enum ErrorStatus      {}
export enum HourType         {}
export enum TimecardStatus   {}

export interface EmployeeProfileDTO         {}
export interface FPHCodesDTO                {}
export interface IValidationResponse        {}
export interface NoteDTO                    {}
export interface TRCCodesDTO                {}
export interface TimecardDTO                {}
export interface TimecardDaysDTO            {}
export interface TimecardHeaderDTO          {}
export interface TimecardRowDTO             {}
export interface TimecardSearchDTO          {}
export interface TimecardSettingsDTO        {}
export interface UpdateTimecardDTO          {}
export interface ValidateFPHDTO             {}
export interface ValidateProjectActivityDTO {}
export interface ValidateShiftDTO           {}
export interface ValidationResponseDTO      {}


export interface ValidateProjectActivityDTO {
        EMPLID: string;
        TimecardID: string;
        ProjectCode: string;
        ActivityCode: string;
        IsLaborCorrection: boolean;
    }
