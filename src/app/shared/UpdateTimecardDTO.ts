


import { TimecardRowDTO } from './shared.module';

export interface UpdateTimecardDTO {
        EMPLID: string;
        TimecardID: string;
        TargetApprover: string;
        EmployeeSignature: boolean;
        ClientTimecardLastUpdateTimestamp: Date; // dbg ... We need to set this on save
        TimecardRows: TimecardRowDTO[];
}


