


import { TRCCodesDTO } from './shared.module';
import { TimecardHeaderDTO } from './shared.module';
import { TimecardRowDTO } from './shared.module';
import { TimecardDaysDTO } from './shared.module';
import { NoteDTO } from './shared.module';
import { IValidationResponse } from './shared.module';

export interface TimecardDTO {
        OvertimeAuthorization: string;
        TimecardTRCCodes: TRCCodesDTO[];
        TimecardHeader: TimecardHeaderDTO;
        TimecardRows: TimecardRowDTO[];
        TimecardDays: TimecardDaysDTO[];
        TimecardNotes: NoteDTO[];
        ValidationMessages: IValidationResponse[];
}


