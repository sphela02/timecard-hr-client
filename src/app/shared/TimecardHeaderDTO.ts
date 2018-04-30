﻿


import { TimecardStatus } from './shared.module';

export interface TimecardHeaderDTO {
        TimecardID: string;
        PayEndDate: Date;
        PeriodEndDate: Date;
        WeekEndDate: Date;
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
        canLaborCorrect: boolean;
        canApprove: boolean; // dbg ... this needs to be added to the .NET DTO ... if timecard is current/LC and approve/unapprove allowed
        canSubmitReopen: boolean; // dbg ... this needs to be added to the .NET DTO ... if user is allowed to submit and reopen
        canDeleteLaborCorrection: boolean; // dbg ... this needs to be added to the .NET DTO ... if user is allowed to delete this LC
        canSetApprover: boolean; // dbg ... this needs to be added to the .NET DTO ... if user is allowed to set the timecard approver
        isLaborCorrection: boolean;
        isReadOnly: boolean;
        isEmployeeSigned: boolean;
        isAllowedFPH: boolean;
        isAllowedEditShift: boolean;
        isAllowedPLC: boolean;
        isAllowedAltDepartment: boolean;
        isBreakRequired: boolean;
        TimecardStatus: TimecardStatus;
        TimecardStatusLabel: string;
}


