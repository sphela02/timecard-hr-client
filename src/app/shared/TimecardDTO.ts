﻿


import { TRCCodesDTO } from './shared.module';
import { TimecardHeaderDTO } from './shared.module';
import { TimecardRowDTO } from './shared.module';
import { TimecardDaysDTO } from './shared.module';
import { NoteDTO } from './shared.module';
import { IValidationResponse } from './shared.module';
import { OvertimeAuthDTO } from './OvertimeAuthDTO';

export interface TimecardDTO {
        OvertimeAuthData: OvertimeAuthDTO; // dbg ... temp placeholder
        OvertimeAuthorization: string;
        isReadOnly: boolean;
        CanApproveUnapprove: boolean;
        CanDeleteLC: boolean;
        CanSubmitReopen: boolean;
        CanChangeApprover: boolean;
        CanLaborCorrect: boolean;
        TimecardTRCCodes: TRCCodesDTO[];
        TimecardHeader: TimecardHeaderDTO;
        TimecardRows: TimecardRowDTO[];
        TimecardDays: TimecardDaysDTO[];
        TimecardNotes: NoteDTO[];
        ValidationMessages: IValidationResponse[];
}


