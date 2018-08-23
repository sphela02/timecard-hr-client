import { Injectable } from '@angular/core';
import { UserProfileDashboardItem, UserProfileDashboardWidget, ApplicationArea } from '../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as lodash from 'lodash';

@Injectable()
export class UserProfileService {

  private _dashBoardPopups: UserProfileDashboardItem[] = [];
  private _dashBoardWidgets: UserProfileDashboardWidget[] = [];

  constructor() { } // end constructor

  addDashboardWidget(dashboardWidget: UserProfileDashboardWidget) {
    this._dashBoardWidgets.push(dashboardWidget);
  } // end addDashboardWidget

  getDashBoardWidgets(): UserProfileDashboardWidget[] {
    return this._dashBoardWidgets;
  } // end getDashBoardWidgets

  addDashboardPopup(dashboardPopup: UserProfileDashboardItem) {
    this._dashBoardPopups.push(dashboardPopup);
    // dbg ... sort by application area, like we do for app menu items?
  } // end addDashboardPopups

  deleteDashboardItemsByApplicationArea(appAreaToRemove: ApplicationArea) {
    lodash.remove(this._dashBoardPopups, {applicationArea: appAreaToRemove});
    lodash.remove(this._dashBoardWidgets, {applicationArea: appAreaToRemove});
  } // end deleteDashboardPopupsByApplicationArea

  getDashBoardPopups(): UserProfileDashboardItem[] {
    return this._dashBoardPopups;
  } // end getDashBoardPopups

} // end UserProfileService
