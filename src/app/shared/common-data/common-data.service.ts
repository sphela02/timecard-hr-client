import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import {
  AlertNotification,
  ApplicationArea,
  ApplicationMenuItem,
  ApplicationMenuType,
  DiagnosticMessageGroup
} from '../shared';
import { ApplicationViewInfo } from '../shared.module';
import * as lodash from 'lodash';
import { Observable } from 'rxjs/Observable';
import { TimecardViewMode } from '../../timecard/_shared/shared.tc'; // dbg ... decouple from tc

@Injectable()
export class CommonDataService {

  public impersonateUserID$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public currentErrorMessages: string[] = [];
  public defaultBatchWarningTimeInMinutes = 240;
  public alertNotificationGroups: AlertNotification[][] = [];
  public alertNotificationCount: number = 0;
  public isApprover: boolean;

  private _approvalNotificationCountsByArea: number[] = [];
  public approvalNotificationCount: number = 0;

  private pageTitleSource = new BehaviorSubject<string>('Timecard'); // dbg ... more neutral name?
  currentPageTitle = this.pageTitleSource.asObservable();

  private viewModeSource = new BehaviorSubject<ApplicationViewInfo>({ // dbg ... decouple
    Application: ApplicationArea.Timecard,
    ViewMode: TimecardViewMode.List
  });

  currentViewMode = this.viewModeSource.asObservable();
  private _menuLists$: BehaviorSubject<ApplicationMenuItem[]>[] = [];

  // Lists of diagnostic messages, organized by app area
  private _diagnosticMessageGroups: DiagnosticMessageGroup[] = [];
  private _diagnosticMessageGroups$: BehaviorSubject<DiagnosticMessageGroup[]> = new BehaviorSubject<DiagnosticMessageGroup[]>([]);

  // List of observables for services that want us to wait for them to be ready.
  // We delay app initialization until all services are ready.
  private _servicesAreReady$: Observable<boolean>[] = [];
  private _servicesAreReady: boolean[] = [];
  private _readyServicesCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Diagnostics mode
  private _diagnosticModeActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Component Creation Registry logic
  private _newComponentRegistered$: Subject<Object> = new Subject<Object>();

  deleteErrorMessageByIndex(errorIndex: number) {
    this.currentErrorMessages.splice(errorIndex, 1);
  }

  changePageTitle(title: string) {
    this.pageTitleSource.next(title);
  }

  changeViewMode(viewMode: ApplicationViewInfo) {
    this.viewModeSource.next(viewMode);
  }

  updateApprovalCount(newApprovalCount: number, applicationArea: ApplicationArea) {
    this._approvalNotificationCountsByArea[applicationArea] = newApprovalCount;
    // Update the number of approval notifications ... Sum up each area
    this.approvalNotificationCount = 0;
    this._approvalNotificationCountsByArea.forEach((approvalCount: number) => {
      this.approvalNotificationCount += approvalCount;
    });
  } // end updateAlertNotifications

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

  setDiagnosticMessages(providerName: string, diagnosticMessages: string[]) {

    const newDiagnosticGroup: DiagnosticMessageGroup = {
      diagnosticMessages: diagnosticMessages,
      providerName: providerName
    };

    // Add or replace the diagnostic messages for this provider
    const providerIndex: number = lodash.findIndex(this._diagnosticMessageGroups, { 'providerName': providerName });
    if (providerIndex === -1) {
      this._diagnosticMessageGroups.push(newDiagnosticGroup);
    } else {
      this._diagnosticMessageGroups[providerIndex] = newDiagnosticGroup;
    }

    // Publish the new information
    this._diagnosticMessageGroups$.next(this._diagnosticMessageGroups);

  } // end setDiagnosticMessages

  getDiagnosticMessages(): Observable<DiagnosticMessageGroup[]> {
    return this._diagnosticMessageGroups$.asObservable();
  } // end getDiagnosticMessages

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
      serviceIsReady$
          .skipWhile(ready => ready === false)
          .first()
          .subscribe((serviceIsReady: boolean) => {
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

  startDiagnostics() {
    this._diagnosticModeActive$.next(true);
  } // end startDiagnostics

  endDiagnostics() {
    this._diagnosticModeActive$.next(false);
  } // end endDiagnostics

  getDiagnosticsMode(): Observable<boolean> {
    return this._diagnosticModeActive$.asObservable();
  } // end getDiagnosticsMode

  registerComponentCreation(newComponent: Object) {
    this._newComponentRegistered$.next(newComponent);
  } // end registerComponentCreation

  listenForCreatedComponents(): Observable<Object> {
    return this._newComponentRegistered$.asObservable();
  } // end listenForCreatedComponents

} // end CommonDataService
