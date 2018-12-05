import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ObjectFilter } from '../../pipes/objectFilter';
import { EmployeeProfileDTO } from '../../EmployeeProfileDTO';
import { UserProfileService } from '../user-profile.service';
import { UserInfoService } from '../../../userinfo/user-info.service';
import { UserProfileDashboardItem, UserProfileDashboardWidget, UserProfileDashboardSection } from '../../shared';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonDataService } from '../../common-data/common-data.service';

@Component({
  selector: 'tc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // App Data
  public userInfo: EmployeeProfileDTO = null;

  UserProfileDashboardSection: typeof UserProfileDashboardSection = UserProfileDashboardSection;

  dashboardPopups: UserProfileDashboardItem[];
  dashboardWidgets: UserProfileDashboardWidget[];

  constructor(
    private _userInfoService: UserInfoService,
    private _userProfileService: UserProfileService,
    private _commonDataService: CommonDataService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modal: NgbModal,
  ) {
    // Set page title.
    this._commonDataService.changePageTitle('Profile');
   }

  ngOnInit() {

    this.dashboardPopups = this._userProfileService.getDashBoardPopups();

    this.dashboardWidgets = this._userProfileService.getDashBoardWidgets();

    this._userInfoService.getUserInfo()
    .subscribe(userInfo => {
      this.userInfo = userInfo;
    }
  ); // end subscribe

  } // end ngOnInit

} // end UserProfileComponent
