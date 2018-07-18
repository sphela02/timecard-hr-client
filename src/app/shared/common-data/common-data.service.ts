import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TimecardViewMode, AlertNotification, ApplicationArea, ApplicationMenuItem } from '../shared';


@Injectable()
export class CommonDataService {

  public impersonateUserID$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public currentErrorMessages: string[] = [];
  public observableDiagnosticMessages: string[] = [];
  public defaultBatchWarningTimeInMinutes = 240;
  public alertNotificationGroups: AlertNotification[][] = [];
  public alertNotificationCount: number = 0;
  public isApprover: boolean;

  private pageTitleSource = new BehaviorSubject<string>('Timecard');
  currentPageTitle = this.pageTitleSource.asObservable();

  private viewModeSource = new BehaviorSubject<TimecardViewMode>(TimecardViewMode.List);
  currentViewMode = this.viewModeSource.asObservable();
  menuList: ApplicationMenuItem[] = [];


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

  impersonateUser(userToImpersonate: string) {
    // Store/broadcast the new userID to impersonate with
    this.impersonateUserID$.next(userToImpersonate);
  } // end impersonateUser

  addMenuItems(newMenuItems: ApplicationMenuItem[]) {
    this.menuList = this.menuList.concat(newMenuItems);
    // Sort the menu items
    this.menuList.sort((a: ApplicationMenuItem, b: ApplicationMenuItem) => {
      // This is kind of a hack, but we prioritize app areas based on which ones come first in the enum.
      if (a.applicationArea === b.applicationArea) {
        if (a.sortOrder > b.sortOrder) {
          return 1;
        } else {
          return -1;
        }
      } else if (ApplicationArea[a.applicationArea] > ApplicationArea[b.applicationArea]) {
        return 1;
      } else {
        return -1;
      }
    });
  } // end addMenuItems

} // end CommonDataService
