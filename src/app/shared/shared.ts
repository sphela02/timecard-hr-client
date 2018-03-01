import { TimecardHeaderDTO } from './TimecardHeaderDTO';

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
    View = 10
  }

  export enum TimecardViewMode {
    None = 0,
    List = 1,
    Detail = 2,
    Search = 3,
    Edit = 4
  }

  export interface TimecardHeaderAction {
    timecardHeader: TimecardHeaderDTO;
    timecardAction: ActionType;
  }

  export enum AppMode {
    Dev = 0,
    Prod = 1,
    MockUse = 2,
    MockGenerate = 3
  }
