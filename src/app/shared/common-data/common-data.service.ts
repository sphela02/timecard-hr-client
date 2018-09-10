import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TimecardViewMode, AlertNotification, ApplicationArea, ApplicationMenuItem, ApplicationMenuType } from '../shared';
import { ApplicationViewInfo } from '../shared.module';
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

  private viewModeSource = new BehaviorSubject<ApplicationViewInfo>({
    Application: ApplicationArea.Timecard,
    ViewMode: TimecardViewMode.List
  });

  currentViewMode = this.viewModeSource.asObservable();
  private _menuLists$: BehaviorSubject<ApplicationMenuItem[]>[] = [];

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

  changeViewMode(viewMode: ApplicationViewInfo) {
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

  addMenuItems(menuType: ApplicationMenuType, newMenuItems: ApplicationMenuItem[]) {
    // Create the menu if it doesn't exist yet
    if (!this._menuLists$[menuType]) {
      this._menuLists$[menuType] = new BehaviorSubject<ApplicationMenuItem[]>([]);
    }

    let menuList: ApplicationMenuItem[] = this._menuLists$[menuType].value;
    menuList = menuList.concat(newMenuItems);

    // Sort the menu items
    menuList = lodash.sortBy(menuList, (m: ApplicationMenuItem) => [m.applicationArea, m.sortOrder]);

    // Publish the new menu item list
    this._menuLists$[menuType].next(menuList);

  } // end addMenuItems

  getMenu(menuType: ApplicationMenuType): BehaviorSubject<ApplicationMenuItem[]> {

    // Create the menu if it doesn't exist yet
    if (!this._menuLists$[menuType]) {
      this._menuLists$[menuType] = new BehaviorSubject<ApplicationMenuItem[]>([]);
    }

    // Return the menu as observable so subscriber can receive updates
    return this._menuLists$[menuType];
  } // end getMenu

  removeMenuItemsByApplicationArea(menuType: ApplicationMenuType, appAreaToRemove: ApplicationArea) {
    // Remove items from the menu if the menu exists
    if (this._menuLists$[menuType]) {

      const menuList: ApplicationMenuItem[] = this._menuLists$[menuType].value;
      lodash.remove(menuList, {applicationArea: appAreaToRemove});

      // Publish the updated menu item list
      this._menuLists$[menuType].next(menuList);
    } // end if menu defined

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
