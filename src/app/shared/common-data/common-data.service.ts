import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TimecardViewMode, AlertNotification, ApplicationArea } from '../shared';


@Injectable()
export class CommonDataService {

  public impersonateUserID: string = '';
  public currentErrorMessages: string[] = [];
  public observableDiagnosticMessages: string[] = [];
  public defaultBatchWarningTimeInMinutes = 240;
  public alertNotificationGroups: AlertNotification[][] = [];
  public alertNotificationCount: number = 0;

  private pageTitleSource = new BehaviorSubject<string>('Timecard');
  currentPageTitle = this.pageTitleSource.asObservable();

  private viewModeSource = new BehaviorSubject<TimecardViewMode>(TimecardViewMode.List);
  currentViewMode = this.viewModeSource.asObservable();

  constructor() { }

  deleteErrorMessageByIndex(errorIndex: number) {
    this.currentErrorMessages.splice(errorIndex, 1);
  }

  changePageTitle(title: string) {
    this.pageTitleSource.next(title);
  }

  changeViewMode(viewMode: TimecardViewMode) {
    this.viewModeSource.next(viewMode);
  }

  updateAlertNotifications(newNotifications: AlertNotification[], applicationArea: ApplicationArea) {
    this.alertNotificationGroups[applicationArea] = newNotifications;
    // Update the number of alert notifications ... each alert can have one or more items.
    this.alertNotificationCount = 0;
    this.alertNotificationGroups.forEach((notificationGroup: AlertNotification[]) => {
      notificationGroup.forEach((notification: AlertNotification) => {
        this.alertNotificationCount += notification.itemsAffectedCount;
      });
    });
  } // end updateAlertNotifications
}
