import { Injectable } from '@angular/core';
import { UserProfileDashboardItem, UserProfileDashboardWidget } from '../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  } // end addDashboardPopups

  getDashBoardPopups(): UserProfileDashboardItem[] {
    return this._dashBoardPopups;
  } // end getDashBoardPopups

} // end UserProfileService
