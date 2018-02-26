


import { TimecardRowDTO } from './shared.module';

export interface UpdateTimecardDTO {
        EMPLID: string;
        TimecardID: string;
        ApproverOPRID: string;
        EmployeeSignature: boolean;
        TimecardRows: TimecardRowDTO[];
}


