import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './userinfo/user-info.service';
import { TimecardService } from './timecard/timecard.service';
import { EmployeeProfileDTO } from './shared/EmployeeProfileDTO';

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

    constructor(private _userInfoService: UserInfoService) {
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
                'subMenu': [
                    {
                        'name': 'Change Approver',
                        'path': '/timecards',
                    },
                ]
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

    toggleNav(): void {
        // document.getElementById('sidebar').classList.toggle('active');
        // document.getElementById('sidebarCollapse').classList.toggle('active');
    }

    ngOnInit() {
        // dbg ... we can probably remove the user info from the dashboard maybe?
        this._userInfoService.getUserInfo()
          .subscribe(userInfo => {
            this.userInfo = userInfo;
          },
          error => this.errorMessage = <any>error
        );

        setTimeout(() => {
            // Sidebar initialization.
            $('#sidebarCollapse').sideNav();

            // Data Picker Initialization.
            $('.datepicker').pickadate();
        }, 0);
  }}
