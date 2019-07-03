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
import { GuidedTourService } from '../../guided-tour/guided-tour.service';

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
    private _guidedTourService: GuidedTourService,
  ) {
    // Set page title.
    this._commonDataService.changePageTitle('Profile');
   }

  ngOnInit() {

    this._guidedTourService.setGuidedTour(
      {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Welcome',
                // tslint:disable-next-line:max-line-length
                content: 'My Profile includes timecard approver and delegate settings and employee information including employee ID, department, and more.  Add or update emergency contacts, office location, phone, other personnel settings.',
                target: 'page-title',
                placement: 'bottom',
                showPrevButton: false
            },
            {
                title: 'Employee Information and Settings',
                content: 'Select a panel below to update employee information or change settings.',
                target: 'profile-body',
                placement: 'top',
                showPrevButton: true,
            }
        ]
    },

    );

    // Set current view mode in commonDataService.
    this._commonDataService.changeViewMode({
      Application: ApplicationArea.Profile,
      ViewMode: 0,
    });

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
