import { TimecardHeaderDTO } from './TimecardHeaderDTO';
import { UpdateTimecardDTO } from './UpdateTimecardDTO';
import { NoteDTO } from './NoteDTO';

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
    DeleteLaborCorrection = 16,
    Display = 17,
    Approve = 18,
    UndoApproval = 19,
    UpdateApprovers = 20,
  }

  export enum AlertMessageType {
    Ok = 1,
    OkMin = 2,
    Warning = 3,
    WarningMin = 4,
    Error = 5,
    ErrorMin = 6,
    Info = 7,
    InfoMin = 8
  }

  export enum TimecardViewMode {
    None = 0,
    List = 1,
    Display = 2,
    Search = 3,
    Edit = 4,
    ApproverList = 5,
    ApproverSearch = 6
  }

  export enum rowChangeStatus {
    Unchanged = 1,
    Changed = 2,
    Added = 3,
    Removed = 4
  }
  export interface OriginalLCDailyCountArray {
    dailyCounts: number[];
  }
  export interface LaborCorrectionDiffSummary {
    columnsChanged: boolean[];
    rowsChanged: rowChangeStatus[];
    rowsRemoved: boolean[]; // string-indexed array of booleans
    originalDailyCounts: OriginalLCDailyCountArray[]; // sequence-indexed array of number arrays
  }

  export interface RowMessage {
    RowSequenceNumber: Number;
    messageText: String;
  }

  export interface ColumnMessage {
    ColumnSequenceNumber: Number;
    messageText: String;
  }

  export interface AlertMessage {
    messageText: String;
    messageIcon: String;
    messageType: AlertMessageType;
    columnMessages: ColumnMessage[];
    overallMessages: OverallMessage[];
    rowMessages: RowMessage[];
  }

  export interface OverallMessage {
    messageText: String;
    messageIcon: String;
    messageType: AlertMessageType;
  }

  export interface TimecardAction {
    timecardHeader: TimecardHeaderDTO;
    timecardUpdate: UpdateTimecardDTO;
    timecardAction: ActionType;
    modalReturnData: FlexModalReturnData;
  }

  export interface FlexModalReturnData {
    inputValue: string;
    textareaValue: string;
  }
  export interface FlexModalContent {
    modalTitle: string;
    modalSubTitle: string;
    messageText: string;
    inputId: string;
    inputLabel: string;
    textareaId: string;
    textareaLabel: string;
    cancelBtnText: string;
    altBtnText: string;
    confirmBtnText: string;
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
    ExtraSmall = '(max-width: 767px)',
    Small = '(min-width: 768px)',
    Medium = '(min-width: 992px)',
    Large = '(min-width: 1200px)',
  }

  export enum ApplicationArea {
    Timecard = 1,
    Notes = 2,
  }

  export interface AlertNotification {
    alertMessage: string;
    alertType: AlertMessageType;
    itemsAffectedCount: number;
    actionURL: string;
  }
