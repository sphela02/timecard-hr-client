


import { TimecardRowDTO } from './shared.module';

export interface UpdateTimecardDTO {
        EMPLID: string;
        TimecardID: string;
        TargetApprover: string;
        EmployeeSignature: boolean;
        ClientTimecardLastUpdateTimestamp: Date;
        TimecardRows: TimecardRowDTO[];
        AuditNote: string;
}


