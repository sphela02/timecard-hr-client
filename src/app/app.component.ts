import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './userinfo/user-info.service';
import { TimecardService } from './timecard/timecard.service';
import { EmployeeProfileDTO } from './shared/EmployeeProfileDTO';
import { Router } from '@angular/router';
import { CommonDataService } from './shared/common-data/common-data.service';

declare var $: any;

@Component({
  selector: 'tc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.css.navbar.css'],
  providers: [UserInfoService, TimecardService]
})
export class AppComponent implements OnInit {

    public pageTitle = 'Timecard';
    menuList: any;
    selected: any;
    errorMessage: string;
    userInfo: EmployeeProfileDTO;
    userToImpersonate: string;

    constructor(private _userInfoService: UserInfoService,
                private _commonDataService: CommonDataService,
                private _timecardService: TimecardService,
                private _router: Router,
            ) {
        this.menuList = [
            // {
            // 'name': 'Dashboard',
            // 'path': '/dashboard',
            // 'subMenu': []
            // },
            {
                'name': 'Timecards',
                'path': '/timecards',
                'icon': 'fa-clock-o',
                // Hide change approver until ready.
                // 'subMenu': [
                //     {
                //         'name': 'Change Approver',
                //     },
                // ]
            },
            {
                'name': 'Timecard Search',
                'path': '/timecard/search',
                'icon': 'fa-search',
            },
            {
                'name': 'Approvals',
                'path': '/vacation/request',
                'icon': 'fa-calendar-check-o',
            },

            {
            'name': 'Vacation',
            'path': '/vacation/request',
            'icon': 'fa-sun-o',
            'subMenu': [
                {
                    'name': 'Request',
                    'path': '/vacation/request',
                },
                {
                    'name': 'Vacation 2',
                    'path': '/vacation/request',
                },
                {
                    'name': 'Vacation 3',
                    'path': '/vacation/request',
                },
            ]
            }
        ];
    }

    retrieveCurrentUser() {

        this.userInfo = null;

        this._userInfoService.getUserInfo()
          .subscribe(userInfo => {
            this.userInfo = userInfo;
          },
          error => this.errorMessage = <any>error
        );

    } // end retrieveCurrentUser


    impersonateUser() {
        // Store the new impersonation
        this._commonDataService.impersonateUserID = this.userToImpersonate;
        // Tell the services to reset their data
        this._timecardService.resetAllData();
        this._userInfoService.resetAllData();
        // Re-retrieve the current user (which wipes out the user/components) and start the components back up
        // this._router.navigate(['/']);

        this.retrieveCurrentUser();

    } // end impersonateUser

    toggleNav(): void {
        // document.getElementById('sidebar').classList.toggle('active');
        // document.getElementById('sidebarCollapse').classList.toggle('active');
    }

    ngOnInit() {
        // dbg ... we can probably remove the user info from the dashboard maybe?

        this.retrieveCurrentUser();

        setTimeout(() => {
            // Sidebar initialization.
            $('#sidebarCollapse').sideNav();

            // Data Picker Initialization.
            $('.datepicker').pickadate();
        }, 0);
    }
} // end AppComponent

// dbg - From timecard edit, if you open the side menu, click Timecards, the menu doesn't collapse after the list loads.
