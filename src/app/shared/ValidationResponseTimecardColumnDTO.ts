


import { ErrorStatus } from './shared.module';
import { IValidationResponse } from './shared.module';

export interface ValidationResponseTimecardColumnDTO {
        Status: ErrorStatus;
        Message: string;
        ColSequenceNumber: number;
        ErrorCount: number;
        ColValidationObjects: IValidationResponse[];
}


