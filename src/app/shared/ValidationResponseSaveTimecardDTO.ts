


import { ErrorStatus } from './shared.module';
import { ValidationResponseTimecardRowDTO } from './shared.module';
import { ValidationResponseColumnDTO } from './shared.module';
import { ValidationResponseGenericDTO } from './shared.module';

export interface ValidationResponseSaveTimecardDTO {
        Status: ErrorStatus;
        Message: string;
        TimecardSaved: boolean;
        RowValidationObjects: ValidationResponseTimecardRowDTO[];
        ColumnValidationObjects: ValidationResponseColumnDTO[];
        OverallValidationObjects: ValidationResponseGenericDTO[];
}


