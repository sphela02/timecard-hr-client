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
            // {
            // 'name': 'Vacation',
            // 'path': '/vacation/request',
            // 'icon': 'fa-sun-o',
            // 'subMenu': [
            //     {
            //         'name': 'Request',
            //         'path': '/vacation/request',
            //     },
            //     {
            //         'name': 'Vacation 2',
            //         'path': '/vacation/request',
            //     },
            //     {
            //         'name': 'Vacation 3',
            //         'path': '/vacation/request',
            //     },
            // ]
            // }
        ];

        // add approver menus
        if (this._userInfoService.getIsApprover()) {
            this.menuList.push(
                {
                    'name': 'Approvals',
                    'path': '/timecard/approvals',
                    'icon': 'fa-calendar-check-o',
                },
            );
            this.menuList.push(
                {
                    'name': 'Approver Search',
                    'path': '/timecard/approver-search',
                    'icon': 'fa-search',
                },
            );
        }
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

        this.retrieveCurrentUser();

        // watch for page title changes.
        this._commonDataService.currentPageTitle.subscribe(message => this.pageTitle = message);

        setTimeout(() => {
            // Sidebar initialization.
            $('#sidebarCollapse').sideNav();

            // Data Picker Initialization.
            $('.datepicker').pickadate();
        }, 0);
    }

} // end AppComponent

// DBG ... Tasks/Considerations/Issues:
// tslint:disable:max-line-length

// SHORT-TERM:
// SP - Labor Corrections ... Make sure labor correction create/delete returns correct error codes, line 228 of tc-main-comp has an override
// SP - Labor Corrections ... When collecting the note before create/delete, make sure button text/mode is correct for both actions
// JC - Timecard Edit ... If target approver is changed, and dirty timecard is then abandoned, the change persists in the timecard object, because it was done direct via ngModal.  We'll need to do an object reset in this case, or bind the approver field to the reactive form instead.
// MM - Timecard Edit ... make sure approve button is only available on a pristine timecard ... any edits should hide/disable the approve button and show/enable the save button, and the save should show a reminder message to still approve it (similar mechanism to how the sign/submit reminder works).
// SP - Timecard Edit ... we should think about a "reload" button of some sort ... a way to discard changes and load clean, without needing to use the browser refresh and kill the app. Maybe wire up the route guard to make sure it's what they want?
// MM - Timecard Edit ... Revisit status messages after actions like reopening, labor corrections, approve/unapprove, etc ... Similar approach to timecard save successful
// - App/Navigation ... Shrink your browser a bit in desktop mode, Edit a timecard, open the side menu, click Timecards to go back to the list ... the menu doesn't collapse after you click list and load the page.
// - Data services ... We should look into switching our "Subject" observables to "BehaviorSubject" observables, if that can solve future race conditions and remove the need for many of our setTimeout calls.
// - Notes ... We should put a confirm on a note deletion
// - Notes ... Edit/Delete permissions are sometimes distinct, so we may need to wire in separate booleans on the Note DTO for whether we can edit or delete.
// - Timecard save/validate ... Revisit the validation/save Response messages and make sure that error, warning and info messages are all handled correctly.

// TESTING CONCERNS:
// - Timecard Edit ... Make sure the timecard edit route guard handles unsuccessful/invalid saves properly.
// - Notes ... Are we happy with when to allow new notes and note edits? On timecard status or should we use the timecard editable field?  Let's compare against Peoplesoft ... suspicion is that We shouldn't be able to edit/add timecard notes on an approved timecard, let's make sure that lines up. Also, when can we add them? Open/Pending/LC?  If it's complicated, should we bring in a 3rd boolean for adding notes on the TC Header?
// - Labor Corrections ... For Diff, Test the hours changes rigorously, comparing 0 to empty and vice versa.
// - Labor Corrections ... From a testing POV, we don't really have a way to test what the note/title looks like after an LC deletion (because it's only in an archive.)
// - Notes ... 4/6/2018 ... after next pSoft refresh, verify that the sphela02->sphelan name change doesn't break editability for notes.
// - JS testing cycle ... Go through Timecard reloads, Timecard next/previous logic, approve/unapprove, create/delete LC, look at anything with jquery and/or viewchild.
// - HTTP ... Do slow DB interactions audit
// - HTTP ... Test all API calls for HTTP error and "200" failures ... make sure error handling looks good

// LONG-TERM:
// - Project Charge Popup ... for multiple new rows, would a "skip/discard" be possible? UX considerations too
// - Project Charge Popup ... for field limits, we should think long-term about how to know the right numbers for field lengths ... IE, coordinate with server code, rather than hard-code in HTML. My thought is an enum that gets generated from the API code and we use the same numbers.
// - Project Charge Popup ... think about "undo" capabilities? IE, undo the changes you started making without cancelling out of the popup ... This may tie back with the discard concept.
// - Timecard Edit ... Revisit when the next/previous buttons for the timecard edit screen, to advance through the list. Hide the buttons if there is no list? When we bring this back, we need to handle when we're at the beginning/end of the list. Also, make sure the edit guard kicks in, even through we may not be leaving the component.

// HOUSEKEEPING:
// - Can we remove the dashboard component at this point?
// - For HTTP interceptors, separate the mock gen and mock use features into a separate interceptor, so it can be removed for production.

// NOT NECESSARY:
// - Project Charge Popup ... get confirmation before user hits cancel and discards changes? Not as easy as checking form row dirty, because the underlying row is likely already dirty.
