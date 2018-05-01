import { SearchType } from './shared.module';

export interface TimecardSearchDTO {
        EMPLID: string;
        BeginDate: Date;
        EndDate: Date;
        SearchAs: SearchType;
}


