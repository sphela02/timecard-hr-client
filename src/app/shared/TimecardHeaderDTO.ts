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


export interface TimecardHeaderDTO {
        TimecardID: string;
        PayEndDate: Date;
        WeekEndDate: Date;
        ScheduledHours: number;
        HoursWorked: number;
        OtherHours: number;
        DefaultShift: string;
        ScheduleID: string;
        TargetApprover: string;
        EmployeeID: string;
        ApprovedDateTime: Date;
        TLSentDateTime: Date;
        TimecardStatus: TimecardStatus;
        TimecardStatusLabel: string;
    }
