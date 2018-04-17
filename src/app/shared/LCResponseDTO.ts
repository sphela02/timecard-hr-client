


import { ErrorStatus } from './shared.module';

export interface LCResponseDTO {
        Status: ErrorStatus;
        Message: string;
        TimecardID: string;
        TCID: string; // dbg for dev purposes only
}


