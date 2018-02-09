export interface EmployeeProfileDTO         {}
export interface NoteDTO                    {}
export interface TimecardDaysDTO            {}
export interface TimecardDTO                {}
export interface TimecardHeaderDTO          {}
export interface TimecardRowDTO             {}
export interface TimecardSearchDTO          {}
export interface TRCCodesDTO                {}
export interface ValidateProjectActivityDTO {}
export interface ValidateShiftDTO           {}
export interface ValidationResponseDTO      {}

export enum HourType         {}
export enum ValidationStatus {}
export enum TimecardStatus   {}


export interface TRCCodesDTO {
        TRCCode: string;
        TRCDescription: string;
        IsIDLCode: boolean;
        IsDLCode: boolean;
        IsShiftEditable: boolean;
        IsFPHAvailable: boolean;
        HoursGrouping: HourType;
    }
