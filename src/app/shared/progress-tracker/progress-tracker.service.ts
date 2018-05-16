import { Injectable } from '@angular/core';
import { ApplicationArea } from '../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProgressTrackerService {

  appLoadingStatuses$: BehaviorSubject<boolean>[] = [];

  constructor() { }

  setAppLoadingStatus(appArea: ApplicationArea, loadingStatus: boolean) {

    // Set the loading status and broadcast to anyone listening
    if (!this.appLoadingStatuses$[appArea]) {
      // Subject not created yet for this app area, create it now
      this.appLoadingStatuses$[appArea] = new BehaviorSubject<boolean>(loadingStatus);
    } else {
      // Subject already in place, publish the new value to it
      this.appLoadingStatuses$[appArea].next(loadingStatus);
    } // end if subject created yet for this app area

  } // end setAppLoadingStatus

  getAppLoadingStatus(appArea: ApplicationArea): Observable<boolean> {

    // If the subject hasn't been set yet, default to false
    if (!this.appLoadingStatuses$[appArea]) {
      this.appLoadingStatuses$[appArea] = new BehaviorSubject<boolean>(false);
    }

    return this.appLoadingStatuses$[appArea];
  } // end getAppLoadingStatus

} // end ProgressTrackerService
