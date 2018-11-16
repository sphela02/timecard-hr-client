import { Subject } from 'rxjs/Subject';
import { ErrorStatus } from './ErrorStatus';

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
    Deny = 21,
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

  export enum rowChangeStatus { // dbg ... timecard only?
    Unchanged = 1,
    Changed = 2,
    Added = 3,
    Removed = 4
  }

  export interface RowMessage { // dbg ... timecard only?
    RowSequenceNumber: Number;
    messageText: String;
    messageType: AlertMessageType;
  }

  export interface ColumnMessage { // dbg ... timecard only?
    ColumnSequenceNumber: Number;
    messageText: String;
    messageType: AlertMessageType;
  }

  export interface AlertMessage { // dbg ... used by VRS as well? why?
    messageText: String;
    messageIcon: String;
    messageType: AlertMessageType;
    columnMessages: ColumnMessage[][];
    overallMessages: OverallMessage[];
    rowMessages: RowMessage[];
  }

  export interface OverallMessage {
    messageText: String;
    messageIcon: String;
    messageType: AlertMessageType;
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
    inputMaxLength: number;
    inputOptional: boolean;
    textareaId: string;
    textareaLabel: string;
    textareaOptional: boolean;
    cancelBtnText: string;
    hideCancelButton: boolean;
    altBtnText: string;
    confirmBtnText: string;
  }

  export enum AppMode {
    Dev = 0,
    Prod = 1,
    MockUse = 2,
    MockGenerate = 3
  }

  export enum AppViewPort {
    Mobile = '(max-width: 767px)',
    MobileLg = '(max-width: 799px)',
    Desktop = '(min-width: 768px)',
    DesktopLg = '(min-width: 800px)',
    ExtraSmall = '(max-width: 767px)',
    Small = '(min-width: 768px)',
    Medium = '(min-width: 992px)',
    Large = '(min-width: 1200px)',
    maxLarge = '(max-width: 1199px)',
    extraLarge = '(min-width: 1350px)',
    maxExtraLarge = '(max-width: 1349px)',
    heightSmall = '(min-height: 600px)',
  }

  export enum ApplicationArea {
    Timecard = 1,
    Notes = 2,
    VacationRequest = 3,
    VRSAuthorizations = 4,
    VRSMessages = 5,
    VRSTeamDrilldown = 6,
    EmployeeSelfService = 7,
    MainApp = 99,
  }

  export interface AlertNotification {
    alertMessage: string;
    alertType: AlertMessageType;
    itemsAffectedCount: number;
    actionURL: string;
  }

  export enum ApplicationMenuType {
    MainAppMenu = 1,
    ApprovalMenu = 2,
  }

  export interface ApplicationMenuItem {
    name: string;
    path: string;
    icon: string;
    role: string;
    applicationArea: ApplicationArea;
    sortOrder: number;
    subMenu?: ApplicationMenuItem[];
  }

  export interface UserProfileDashboardItem {
    title: string;
    descriptionText: string;
    actionButtonText: string;
    openDashboardItem$: Subject<boolean>;
    applicationArea: ApplicationArea;
  }

  export interface UserProfileDashboardWidget {
    widgetComponent: any;
    applicationArea: ApplicationArea;
  }

  export class ActionResponseDTO {
      action: ActionType;
      status: ErrorStatus;
      messageText: String;
  }

  export interface DiagnosticMessageGroup {
    providerName: string;
    diagnosticMessages: string[];
  }

  export interface ApplicationEnvironment {
    production: boolean;
    apiServiceURLs: {};
    AppMode: AppMode;
    allowDiagnostics: boolean;
    importModules: any[]; // dbg ... we should make this a generic module base class
  }

  export interface ChargeCodeTotalHours {
    TRCCode: string;
    ChargeCode: string;
    ActivityCode: string;
    Week1: number;
    Week2: number;
  }
