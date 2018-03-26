


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
        ApprovedBy: string;
        EmployeeID: string;
        BusinessUnit: string;
        ApprovedDateTime: Date;
        TLSentDateTime: Date;
        isLaborCorrection: boolean;
        isEmployeeSigned: boolean;
        isAllowedFPH: boolean;
        isAllowedEditShift: boolean;
        isAllowedPLC: boolean;
        isBreakRequired: boolean;
        TimecardStatus: TimecardStatus;
        TimecardStatusLabel: string;
}


