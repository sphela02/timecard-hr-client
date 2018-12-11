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
import { ApplicationArea } from '../../../shared/shared';
import { ObjectFilter } from '../../pipes/objectFilter';
import { EmployeeProfileDTO } from '../../EmployeeProfileDTO';
import { UserProfileService } from '../user-profile.service';
import { UserInfoService } from '../../../userinfo/user-info.service';
import { ProgressTrackerService } from '../../../shared/progress-tracker/progress-tracker.service';
import { UserProfileDashboardItem, UserProfileDashboardWidget, UserProfileDashboardSection } from '../../shared';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonDataService } from '../../common-data/common-data.service';

declare var $: any;

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
    private _progressTrackerService: ProgressTrackerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modal: NgbModal,
  ) {
    // Set page title.
    this._commonDataService.changePageTitle('Profile');
   }

  ngOnInit() {

    // Subscribe to isLoading from ess service to display loading spinner as needed.
    this._progressTrackerService.getAppLoadingStatus(ApplicationArea.Profile).subscribe((isLoadingTimecard: boolean) => {
      // Timecard loading or not
      if (isLoadingTimecard) {
        $('body').addClass('loading');
      } else {
        $('body.loading').removeClass('loading');
      }

    });

    this.dashboardPopups = this._userProfileService.getDashBoardPopups();

    this.dashboardWidgets = this._userProfileService.getDashBoardWidgets();

    this._userInfoService.getUserInfo()
    .subscribe(userInfo => {
      this.userInfo = userInfo;
    }
  ); // end subscribe

  } // end ngOnInit

} // end UserProfileComponent
