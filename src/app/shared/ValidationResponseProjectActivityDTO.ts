


import { ValidationResponseGenericDTO } from './shared.module';

export interface ValidationResponseProjectActivityDTO {
        ProjectValidationResponses: ValidationResponseGenericDTO[];
        ActivityValidationResponses: ValidationResponseGenericDTO[];
        PLCValidationResponses: ValidationResponseGenericDTO[];
        isPLCRequired: boolean;
        isProjectRequired: boolean;
        isActivityRequired: boolean;
        ShowProject: boolean;
        ShowActivity: boolean;
}


