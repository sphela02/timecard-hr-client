


import { ChargeCodeStatus } from './shared.module';

export interface ChargeCodeDTO {
        TRCCode: string;
        ChargeCode: string;
        ChargeCodeDescription: string;
        Status: ChargeCodeStatus;
        ActivityCode: string;
        ActivityCodeDescription: string;
}


