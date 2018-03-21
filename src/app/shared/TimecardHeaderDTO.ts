


import { TimecardStatus } from './shared.module';

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
        isLaborCorrection: boolean;
        isAllowedFPH: boolean;
        isAllowedEditShift: boolean;
        isAllowedPLC: boolean;
        isBreakRequired: boolean;
        TimecardStatus: TimecardStatus;
        TimecardStatusLabel: string;
}


