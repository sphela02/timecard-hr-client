import { Subject } from 'rxjs/Subject';
import { ErrorStatus } from './ErrorStatus';
import { UserManagerSettings as oidcUserManagerSettings } from 'oidc-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
    RequestRework = 22,
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

  export interface FlexModalSelectionChoice {
    choiceValue: string;
    choiceText: string;
  }

  export interface FlexModalReturnData {
    inputValue: string;
    textareaValue: string;
    selectionValue: string;
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
    textareaMinLength: number;
    cancelBtnText: string;
    hideCancelButton: boolean;
    hideConfirmButton: boolean;
    showCloseButton: boolean;
    altBtnText: string;
    confirmBtnText: string;
    modalID: string;
    selectionID: string;
    selectionChoices: FlexModalSelectionChoice[];
    selectionPlaceHolderText: string;
    selectionOptional: boolean;
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
    Profile = 8,
    ESSModal = 9,
    ManagerSelfService = 10,
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
    domID?: string;
    subMenu?: ApplicationMenuItem[];
  }

  export enum UserProfileDashboardSection {
    SelfService = 1,
    ApprovalsDelegation = 2,
  }

  export interface UserProfileDashboardItem {
    title: string;
    descriptionText: string;
    actionButtonText: string;
    openDashboardItem$: Subject<boolean>;
    applicationArea: ApplicationArea;
    profileSection: UserProfileDashboardSection;
    id: string;
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

  export interface ChatBotInfo {
    name: string;
    _id: string;
    customData?: any;
  }

  export interface ChatBotOptions {
    koreAPIUrl: string;
    JWTUrl: string;
    userIdentity?: string;
    clientId: string;
    clientSecret: string;
    botInfo: ChatBotInfo;
  }

  export interface ChatBotSettings {
    botOptions: ChatBotOptions;
    allowIframe: boolean;
    isSendButton: boolean;
    isTTSEnabled: boolean;
    isSpeechEnabled: boolean;
    allowGoogleSpeech: boolean;
    allowLocation: boolean;
    loadHistory: boolean;
    messageHistoryLimit: number;
    autoEnableSpeechAndTTS: boolean;
    minimizeMode: boolean;
  }

  export interface DiagnosticMessageGroup {
    providerName: string;
    diagnosticMessages: string[];
  }

  export interface ApplicationEnvironment {
    production: boolean;
    apiServiceURLs: {};
    baseHref?: string;
    AppMode: AppMode;
    allowDiagnostics: boolean;
    importModules: any[]; // dbg ... we should make this a generic module base class
    useOIDC: boolean;
    oidcRenewalWindow: number;
    authClientSettings: oidcUserManagerSettings;
    environmentIsReady$: BehaviorSubject<boolean>;
    useChatBot: boolean;
    chatBotSettings: ChatBotSettings;
  }

  export interface ChargeCodeTotalHours { // dbg ... move to timecard
    TRCCode: string;
    ChargeCode: string;
    ActivityCode: string;
    Week1: number;
    Week2: number;
  }

  export interface ActionResult {
    status: ErrorStatus;
    message: string;
  } // end ActionResult

  export interface HopScotchTourStep {
    title?: string;
    content: string;
    target: any;
    placement: string;
    showPrevButton: boolean;
    arrowOffset?: any;
    xOffset?: number;
    yOffset?: number;
  } // end HopScotchTourStep

  export interface HopScotchTour {
      id: string;
      showSkip: boolean;
      steps: HopScotchTourStep[];
  } // end HopScotchTour
