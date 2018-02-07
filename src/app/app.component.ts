import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './userinfo/user-info.service';
import { TimecardService } from './timecard/timecard.service';

@Component({
  selector: 'tc-root',
  templateUrl: './app.component.html',
  /*`
    <div class='wrapper'>
        <nav id='sidebar'>

            <div class='sidebar-header'>
                <h3>HTS</h3>
            </div>

            <ul class='list-unstyled components'>
                <li class='active'>
                    <a href='#timecardSubmenu' data-toggle='collapse' aria-expanded='false'>Timecard</a>
                    <ul class='collapse list-unstyled' id='timecardSubmenu'>
                        <li><a [routerLink]='['/timecard/search']'>Search</a></li>
                        <li><a href='#'>Timecard 2</a></li>
                        <li><a href='#'>Timecard 3</a></li>
                    </ul>
                </li>
                <li>
                    <a href='#vacationSubmenu' data-toggle='collapse' aria-expanded='false'>Vacation</a>
                    <ul class='collapse list-unstyled' id='vacationSubmenu'>
                        <li><a href='#'>Request</a></li>
                        <li><a href='#'>Vacation 2</a></li>
                        <li><a href='#'>Vacation 3</a></li>
                    </ul>
                </li>
            </ul>

        </nav>

        <div id='content' class='container'>

            <nav class='navbar navbar-default'>
                <div class='container-fluid'>

                    <div class='navbar-header'>
                        <button type='button' id='sidebarCollapse' class='navbar-btn'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>

                    <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                        <ul class='nav navbar-nav navbar-right'>
                            <li><a href='#'>Page</a></li>
                            <li><a href='#'>Page</a></li>
                            <li><a href='#'>Page</a></li>
                            <li><a href='#'>Page</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class='container'>
                <router-outlet></router-outlet>
            </div>

        </div>
     </div>
    `,*/
  styleUrls: ['./app.component.css', './app.component.css.navbar.css'],
  providers: [UserInfoService, TimecardService]
})
export class AppComponent implements OnInit {

    title = 'Timecard and VRS';
    menuList: any;
    selected: any;

    constructor() {
        this.title = 'Collapsible menu - Angular 2';
        this.menuList = [
            {
            'name': 'Dashboard',
            'path': '/dashboard',
            'subMenu': []
            },
            {
            'name': 'Timecards',
            'path': '/timecards',
            'subMenu': [
                {
                    'name': 'Timecard Main',
                    'path': '/timecards',
                },
                {
                    'name': 'Search',
                    'path': '/timecard/search',
                },
                {
                    'name': 'Timecard 3',
                    'path': '/timecard/search',
                },
            ]
            },
            {
            'name': 'Vacation',
            'path': '/vacation/request',
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
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('sidebarCollapse').classList.toggle('active');
    }

    ngOnInit(): void {
        document.getElementById('sidebarCollapse').addEventListener('click', (e: Event) =>  this.toggleNav());

    }
}
