


import { ErrorStatus } from './shared.module';
import { ValidationResponseTimecardRowDTO } from './shared.module';

export interface ValidationResponseSaveTimecardDTO {
        Status: ErrorStatus;
        Message: string;
        TimecardSaved: boolean;
        ValidationObjects: ValidationResponseTimecardRowDTO[];
}


