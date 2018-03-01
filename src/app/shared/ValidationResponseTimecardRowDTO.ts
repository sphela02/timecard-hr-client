


import { ErrorStatus } from './shared.module';
import { IValidationResponse } from './shared.module';

export interface ValidationResponseTimecardRowDTO {
        Status: ErrorStatus;
        Message: string;
        RowSequenceNumber: number;
        ErrorCount: number;
        RowValidationObjects: IValidationResponse[];
}


