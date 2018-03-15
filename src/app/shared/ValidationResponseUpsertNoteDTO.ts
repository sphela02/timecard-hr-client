import { ErrorStatus, NoteDTO } from './shared.module';

export interface ValidationResponseUpsertNoteDTO {
    Status: ErrorStatus;
    Message: string;
    Note: NoteDTO;
}
