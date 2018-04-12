import { TimecardHeaderDTO } from './TimecardHeaderDTO';
import { UpdateTimecardDTO } from './UpdateTimecardDTO';

export enum ActionType {
    Right = 1,
    Left = 2,
    Up = 3,
    Down = 4,
    Open = 5,
    Close = 6,
    Previous = 7,
    Next = 8,
    Edit = 9,
    View = 10,
    None = 11,
    Save = 12,
    Delete = 13,
    Reopen = 14,
    CreateLaborCorrection = 15,
  }

  export enum AlertMessageType {
    Ok = 1,
    Warning = 2,
    Error = 3,
  }

  export enum TimecardViewMode {
    None = 0,
    List = 1,
    View = 2,
    Search = 3,
    Edit = 4
  }

  export interface RowMessage {
    RowSequenceNumber: Number;
    messageText: String;
  }

  export interface AlertMessage {
    messageText: String;
    messageIcon: String;
    messageType: AlertMessageType;
    rowMessages: RowMessage[];
  }

  export interface TimecardAction {
    timecardHeader: TimecardHeaderDTO;
    timecardUpdate: UpdateTimecardDTO;
    timecardAction: ActionType;
  }

  export enum AppMode {
    Dev = 0,
    Prod = 1,
    MockUse = 2,
    MockGenerate = 3
  }

  export enum TimecardListMode {
    Available = 1,
    Search = 2,
  }

  export enum TimecardDisplayMode {
    Daily = 1,
    Weekly = 2,
  }

  export enum AppViewPort {
    Mobile = '(max-width: 768px)',
    Desktop = '(min-width: 768px)',
  }
