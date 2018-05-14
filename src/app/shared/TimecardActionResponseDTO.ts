import { ActionType } from './shared';
import { ErrorStatus } from './ErrorStatus';

export class TimecardActionResponseDTO {
    action: ActionType;
    status:  ErrorStatus;
    messageText: String;
}
