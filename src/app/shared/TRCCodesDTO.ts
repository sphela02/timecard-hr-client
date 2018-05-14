


import { HourType } from './shared.module';

export interface TRCCodesDTO {
        TRCCode: string;
        TRCDescription: string;
        IsIDLCode: boolean;
        IsDLCode: boolean;
        IsShiftEditable: boolean;
        IsFPHAvailable: boolean;
        HoursGrouping: HourType;
}


