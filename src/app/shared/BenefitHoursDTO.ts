


import { BenefitHourType } from './shared.module';

export interface BenefitHoursDTO {
        PlanType: BenefitHourType;
        HourBucket: string;
        HoursAvailable: number;
}


