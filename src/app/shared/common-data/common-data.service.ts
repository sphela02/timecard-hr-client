import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TimecardViewMode, AlertNotification, ApplicationArea, ApplicationMenuItem } from '../shared';
import * as lodash from 'lodash';
import { Observable } from 'rxjs/Observable';

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
  private _menuList$: BehaviorSubject<ApplicationMenuItem[]> = new BehaviorSubject<ApplicationMenuItem[]>([]);

  // List of observables for services that want us to wait for them to be ready.
  // We delay app initialization until all services are ready.
  private _servicesAreReady$: Observable<boolean>[] = [];
  private _servicesAreReady: boolean[] = [];
  private _readyServicesCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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
    let menuList: ApplicationMenuItem[] = this._menuList$.value;
    menuList = menuList.concat(newMenuItems);
    // Sort the menu items
    menuList.sort((a: ApplicationMenuItem, b: ApplicationMenuItem) => {
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
    }); // end sort

    // Publish the new menu item list
    this._menuList$.next(menuList);

  } // end addMenuItems

  getMenu(): BehaviorSubject<ApplicationMenuItem[]> {
    return this._menuList$;
  }

  removeMenuItemsByApplicationArea(appAreaToRemove: ApplicationArea) {
    const menuList: ApplicationMenuItem[] = this._menuList$.value;
    lodash.remove(menuList, {applicationArea: appAreaToRemove});
    // Publish the updated menu item list
    this._menuList$.next(menuList);
  } // end removeMenuItemsByApplicationArea

  waitForServiceToBeReady(serviceIsReady$: Observable<boolean>) {
    const serviceIndex: number = this._servicesAreReady$.length;
    // Default to false
    this._servicesAreReady.push(false);
    // Subscribe to changes
    this._servicesAreReady$.push(serviceIsReady$);
    setTimeout(() => {
      serviceIsReady$.subscribe((serviceIsReady: boolean) => {
        // Update the ready flag for this service
        this._servicesAreReady[serviceIndex] = serviceIsReady;
        // Update the number of ready services
        this._readyServicesCount$.next(
          lodash.sumBy(this._servicesAreReady, function(o) { return (o === true) ? 1 : 0; })
        );

      });

    }, 0);

  } // end registerLoadingService

  appWaitForServicesToBeReady(): Promise<any> {

    return new Promise((resolve, reject) => {

      this._readyServicesCount$.subscribe(readyCount => {
        // Once all services are ready, resolve.
        if (readyCount === this._servicesAreReady.length) {
          resolve();
        }
      });

    }); // end new promise
  } // end appWaitForServicesToBeReady

} // end CommonDataService
