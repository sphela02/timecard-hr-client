import { Component, OnInit, Input } from '@angular/core';
import { UserInfoService } from './userinfo/user-info.service';
import { TimecardService } from './timecard/timecard.service';
import { EmployeeProfileDTO } from './shared/EmployeeProfileDTO';
import { Router, NavigationStart, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonDataService } from './shared/common-data/common-data.service';
import { GlobalErrorHandlerService } from './shared/global-error-handler/global-error-handler.service';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs/Subject';
import {
    ApplicationArea,
    TimecardViewMode,
    AppViewPort,
    AlertMessageType,
    ApplicationMenuItem,
    ApplicationMenuType,
    DiagnosticMessageGroup
} from './shared/shared';
import * as lodash from 'lodash';
import { VacationRequestService } from './vacation-request/vacation-request.service';
import { VRSApplicationViewMode } from './vacation-request/_shared/shared.vrs';

declare var $: any;

// Variables for Hopscotch tour arrays.
declare var hopscotch: any;
declare var tour: any;

@Component({
  selector: 'tc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.css.navbar.css'],
})
export class AppComponent implements OnInit {
    public pageTitle = 'Timecard';
    menuList: ApplicationMenuItem[];
    selected: any;
    errorMessage: string;
    userInfo: EmployeeProfileDTO;
    userToImpersonate: string;
    diagnosticsMode: boolean;
    environment: any = environment;
    currentViewMode: any = null;
    tourActive: boolean = false;
    private _isApprover: boolean = false;
    private ngUnsubscribe$: Subject<void> = new Subject<void>();
    isApprover: boolean = false;
    AlertMessageType: typeof AlertMessageType = AlertMessageType;
    showApprovalsMenuItem: boolean = false;

    diagnosticMessageGroups: DiagnosticMessageGroup[] = [];

    constructor(private _userInfoService: UserInfoService,
                public _commonDataService: CommonDataService,
                private _timecardService: TimecardService,
                private _vacationRequestService: VacationRequestService,
                private _router: Router,
                public errorHandlerService: GlobalErrorHandlerService,
            ) {

        this._commonDataService.getMenu(ApplicationMenuType.ApprovalMenu).subscribe(approvalsMenu => {
            if (approvalsMenu.length) {
                this.showApprovalsMenuItem = true;
            } else {
                this.showApprovalsMenuItem = false;
            }

            // Set up any menu items
            this._initializeMenuItems();
        });

        // // Set up any menu items
        this._initializeMenuItems();

        _userInfoService.getIsApprover()
            .takeUntil(this.ngUnsubscribe$)
            .subscribe(x => {
                if (x !== null) {
                    this.isApprover = x;

                    // Set common data service variable.
                    this._commonDataService.isApprover = this.isApprover;
                } // end if not null
            }); // end subscribe getIsApprover

        // Subscribe to router events.
        _router.events.subscribe(routerEvent => {
            if (routerEvent instanceof NavigationStart) {
                if (hopscotch.getCurrTour()) {
                    hopscotch.endTour();
                    this.tourActive = true;
                }
            }
            if (routerEvent instanceof NavigationEnd) {
                if (this.tourActive) {
                    setTimeout(wait => {
                        hopscotch.startTour(tour[this.currentViewMode]);

                        hopscotch.listen('end', () => {
                            this.tourActive = false;
                            hopscotch.removeCallbacks();
                        });

                        hopscotch.listen('close', () => {
                            this.tourActive = false;
                            hopscotch.removeCallbacks();
                        });
                    }, 500);
                }
            }
        });
    }

    onDestroy() {
        this.ngUnsubscribe$.next();
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
        // Set the new impersonation ... services will reset their data when this happens.
        this._commonDataService.impersonateUser(this.userToImpersonate);

        // Give the services a chance to reset, then re-retrieve the current user and route back to default.
        setTimeout(() => {
            this.retrieveCurrentUser();
            // Take the user to their profile page for a fresh start
            this._router.navigate(['profile']);
        }, 0);

    } // end impersonateUser

    toggleNav(): void {
        // document.getElementById('sidebar').classList.toggle('active');
        // document.getElementById('sidebarCollapse').classList.toggle('active');
    }

    private _initializeMenuItems() {
        // Clear the main app menu items.
       this._commonDataService.removeMenuItemsByApplicationArea(ApplicationMenuType.MainAppMenu, ApplicationArea.MainApp);

        // Set up menu items for the app module
        const appMenuItems: ApplicationMenuItem[] = [];

        // Set approvalsMenuItem.
        if (this.showApprovalsMenuItem) {
            const approvalsMenuItem: ApplicationMenuItem = {
                name: 'Approvals',
                path: 'approvals',
                icon: 'fa-calendar-check-o',
                role: '',
                applicationArea: ApplicationArea.MainApp,
                sortOrder: 1,
            };

            appMenuItems.push(approvalsMenuItem);
        }

        // Add the menu items to the main list
        this._commonDataService.addMenuItems(ApplicationMenuType.MainAppMenu, appMenuItems);
    } // end _initializeMenuItems.

    ngOnInit() {
        this.retrieveCurrentUser();

        // watch for page title changes.
        this._commonDataService.currentPageTitle.subscribe(message => this.pageTitle = message);

        this._commonDataService.currentViewMode.subscribe(viewInfo => {
            if (viewInfo.Application === ApplicationArea.Timecard) {
                if (viewInfo.ViewMode === TimecardViewMode.None ||
                    viewInfo.ViewMode === TimecardViewMode.Display ||
                    viewInfo.ViewMode === TimecardViewMode.Edit) {
                        this.currentViewMode = 'tcDisplay';
                } else {
                    this.currentViewMode = TimecardViewMode[viewInfo.ViewMode];
                }
            } else if (viewInfo.Application === ApplicationArea.VacationRequest) {
                console.log(VRSApplicationViewMode[viewInfo.ViewMode]);
                if (viewInfo.ViewMode === VRSApplicationViewMode.ShowMyRequests) {
                        this.currentViewMode = 'vrsList';
                } else if (viewInfo.ViewMode === VRSApplicationViewMode.Search ||
                    viewInfo.ViewMode === VRSApplicationViewMode.ApproverSearch) {
                        this.currentViewMode = 'vrsSearch';
                } else {
                    this.currentViewMode = VRSApplicationViewMode[viewInfo.ViewMode];
                }
            }
        });

        setTimeout(() => {
            // Sidebar initialization
            $('#sidebarCollapse').sideNav();

            // Close-on-click for smaller screens
            $('body #sidebar a.nav-link').on('click', function() {
                if ( !window.matchMedia( AppViewPort.Large ).matches) {
                    $('#sidebar').velocity({
                        translateX: ['-100%', 0]
                    }, {
                        duration: 300,
                        queue: false,
                        easing: 'easeOutQuad'
                    });
                    $('#sidenav-overlay').remove();
                }
            });

            // Data Picker Initialization.
            $('.datepicker').pickadate();
        }, 0);

        this._commonDataService.getMenu(ApplicationMenuType.MainAppMenu).subscribe((newMenuList: ApplicationMenuItem[]) => {
            this.menuList = newMenuList;

            if (this.menuList.length) {
                // When navigation ends, see if we're still on "/"
                this._router.events.subscribe(routerEvent => {
                    if (routerEvent instanceof NavigationEnd) {

                        // If we're still at root, take them to the first menu item
                        if (routerEvent.url === '/') {
                            this._router.navigate([this.menuList[0].path]);
                        }

                    } // end if navigation end
                }); // end subscribe router events

            } // end if menu length
        }); // end subscribe getMenu

        this._commonDataService.getDiagnosticMessages().subscribe((messageGroups: DiagnosticMessageGroup[]) => {
            this.diagnosticMessageGroups = messageGroups;
        });
    } // end ngOnInit

    // Show error details when clicked.
    showErrorDetails(target) {
        // Change link label.
        $(target).parent().find('.hide').toggle();
        $(target).parent().find('.show').toggle();

        // Toggle error-details.
        $(target).siblings('.error-details').toggle();
    }

    startDiagnostics() {
        this._commonDataService.startDiagnostics();
        this.diagnosticsMode = true;
    } // end startDiagnostics

    endDiagnostics() {
        this._commonDataService.endDiagnostics();
        this.diagnosticsMode = false;
    } // end endDiagnostics

    startTour() {
        this.tourActive = true;
        // Hopscotch tour. Start the tour.
        hopscotch.startTour(tour[this.currentViewMode]);

        hopscotch.listen('end', () => {
            this.tourActive = false;
            hopscotch.removeCallbacks();
        });

        hopscotch.listen('close', () => {
            this.tourActive = false;
            hopscotch.removeCallbacks();
        });
    }
} // end AppComponent

// DBG ... Tasks/Considerations/Issues:
// tslint:disable:max-line-length

// SHORT-TERM:
// SP - Timecard Edit ... we should think about a "reload" button of some sort ... a way to discard changes and load clean, without needing to use the browser refresh and kill the app. Maybe wire up the route guard to make sure it's what they want?
// - Data services ... We should look into switching our "Subject" observables to "BehaviorSubject" observables, if that can solve future race conditions and remove the need for many of our setTimeout calls.
// - Notes ... We should put a confirm on a note deletion
// - Notes ... We should put some loading indicators in place so the user knows something is happening (note delete takes a while, and it's not obvious what's happening)
// - Timecard save/validate ... Revisit the validation/save Response messages and make sure that error, warning and info messages are all handled correctly.
// - Timecard Edit ... make sure that impersonating/reloading a new user on a timecard edit screen, after a failed initial user load, doesn't break the guard

// TESTING CONCERNS:
// - Timecard Edit ... Make sure the timecard edit route guard handles unsuccessful/invalid saves properly.
// - Labor Corrections ... For Diff, Test the hours changes rigorously, comparing 0 to empty and vice versa.
// - JS testing cycle ... Go through Timecard reloads, Timecard next/previous logic, approve/unapprove, create/delete LC, look at anything with jquery and/or viewchild.
// - HTTP ... Do slow DB interactions audit
// - HTTP ... Test all API calls for HTTP error and "200" failures ... make sure error handling looks good

// LONG-TERM:
// - Project Charge Popup ... for multiple new rows, would a "skip/discard" be possible? UX considerations too
// - Project Charge Popup ... for field limits, we should think long-term about how to know the right numbers for field lengths ... IE, coordinate with server code, rather than hard-code in HTML. My thought is an enum that gets generated from the API code and we use the same numbers.
// - Project Charge Popup ... think about "undo" capabilities? IE, undo the changes you started making without cancelling out of the popup ... This may tie back with the discard concept.

// HOUSEKEEPING:
// - Can we remove the dashboard component at this point?
// - For HTTP interceptors, separate the mock gen and mock use features into a separate interceptor, so it can be removed for production.

// NOT NECESSARY:
// - Project Charge Popup ... get confirmation before user hits cancel and discards changes? Not as easy as checking form row dirty, because the underlying row is likely already dirty.
