﻿export interface EmployeeProfileDTO         {}
export interface NoteDTO                    {}
export interface TimecardDaysDTO            {}
export interface TimecardDTO                {}
export interface TimecardHeaderDTO          {}
export interface TimecardRowDTO             {}
export interface TimecardSearchDTO          {}
export interface TRCCodesDTO                {}
export interface ValidateProjectActivityDTO {}
export interface ValidateShiftDTO           {}
export interface ValidationResponseDTO      {}

export enum HourType         {}
export enum ValidationStatus {}
export enum TimecardStatus   {}


export interface TimecardDTO {
        TimecardTRCCodes: TRCCodesDTO[];
        TimecardHeader: TimecardHeaderDTO;
        TimecardRows: TimecardRowDTO[];
        TimecardDays: TimecardDaysDTO[];
        TimecardNotes: NoteDTO[];
    }
