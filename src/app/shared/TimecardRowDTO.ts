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


export interface TimecardRowDTO {
        RowSequenceNumber: number;
        TRCCode: string;
        ChargeCode: string;
        ActivityCode: string;
        WorkCode: string;
        Shift: string;
        DepartmentOverride: string;
        PLCCode: string;
        WO_ID: string;
        FPH: string;
        DailyHours: number[];
    }
