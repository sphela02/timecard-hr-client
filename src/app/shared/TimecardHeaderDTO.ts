﻿


import { TimecardStatus } from './shared.module';

export interface TimecardHeaderDTO {
        TimecardID: string;
        TimecardTitle: string;
        PayEndDate: Date;
        PeriodEndDate: Date;
        WeekEndDate: Date;
        isFutureWeek: boolean;
        isCurrentWeek: boolean;
        ScheduledHours: number;
        HoursWorked: number;
        OtherHours: number;
        DefaultShift: string;
        ScheduleID: string;
        TargetApprover: string;
        ApprovedBy: string;
        EmployeeID: string;
        EmployeeName: string;
        BusinessUnit: string;
        ApprovedDateTime: Date;
        TLSentDateTime: Date;
        LastUpdatedDateTime: Date;
        isExempt: boolean;
        isEmployee: boolean;
        isContractor: boolean;
        WorkGroup: string;
        CreatedBySource: string;
        ApprovedBySource: string;
        isLaborCorrection: boolean;
        isEmployeeSigned: boolean;
        isAllowedFPH: boolean;
        isAllowedEditShift: boolean;
        isAllowedPLC: boolean;
        isAllowedAltDepartment: boolean;
        isBreakRequired: boolean;
        TimecardStatus: TimecardStatus;
        TimecardStatusLabel: string;
}


