import { Injector, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmployeeProfileDTO } from '../shared/EmployeeProfileDTO';
import {
  ActionResult,
} from '../shared/shared';
import { ErrorStatus } from '../shared/ErrorStatus';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HarrisDataServiceBase } from '../shared/base-classes/HarrisDataServiceBase';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class UserInfoService extends HarrisDataServiceBase {
  private _userInfoUrl: string;
  private _isApproverUrl: string;
  private _userInfo$: BehaviorSubject<EmployeeProfileDTO> = new BehaviorSubject<EmployeeProfileDTO>(null);
  private _userInfo: EmployeeProfileDTO;
  private _userInfoRetrieved$: BehaviorSubject<ActionResult> = new BehaviorSubject<ActionResult>(null);
  private _userInfoIsRetrieving: boolean = false;
  private _isApprover: boolean = null;
  private _isApprover$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    protected injector: Injector,
    private _authService: AuthService,
  ) {

    // Call the base class constructor
    super(injector);

    this._userInfoUrl = '|EMPLOYEE|getMyProfile';
    this._isApproverUrl = '|EMPLOYEE|HasApproverRole/';

    // Retrieve the user info at startup
    this.getUserInfo();

    // Set up impersonation listeners, so we know when to reset data for a new user
    this._commonDataService.impersonateUserID$.skip(1).distinctUntilChanged().subscribe((newUserID: string) => {
      // Reset all stored data when the user changes.
      this.resetAllData();
    }); // end subscribe

  } // end constructor

  retrieveUserInfo(): Observable<ActionResult> {

    // Once we're authenticated, start the user retrieval
    if (!this._userInfoIsRetrieving) {
      // Mark that we're waiting on retrieval
      this._userInfoIsRetrieving = true;

      // Wait for user to be logged in, then retrieve user
      this._authService.isLoggedIn().filter(x => (x === true)).subscribe((isLoggedIn: boolean) => {
        // Retrieve the user info
        this._retrieveUserInfo();
      });

    } // end if we're not retrieving yet

    return this._userInfoRetrieved$.asObservable();
  } // end retrieveUserInfo

  private _retrieveUserInfo() {
    // Have we already retrieved the user info, or is already being retrieved?
    if (!this._userInfo) {
      // We don't have the user info yet, retrieve it now, store it and send it.
      this._http.get<EmployeeProfileDTO>(this._userInfoUrl,
                                          { withCredentials: true })
              .subscribe(response => {
                // Finished retrieving (success)
                this._userInfoIsRetrieving = false;

                // Store the object for next time, and send it back to the caller
                this._userInfo = response;
                this._userInfo$.next(this._userInfo);
                this._userInfoRetrieved$.next({
                  status: ErrorStatus.OK,
                  message: 'User Retrieved OK'
                });
              },
              (error: HttpErrorResponse) => {
                // Finished retrieving (error, but still done)
                this._userInfoIsRetrieving = false;
                // Null out user and mark that retrieve was a failure
                this._userInfo$.next(null);
                this._userInfoRetrieved$.next({
                  status: ErrorStatus.ApplicationError,
                  message: 'User retrieve failed ... ' + error.message
                });
                // Handle the Error response
                this._errorHandlerService.handleHttpErrorResponse(error, 'retrieve the current user.');

              }
            ); // end subscribe
    } // end if not user info and not retrieving yet

  } // end _retrieveUserInfo

  getUserInfo(): Observable<EmployeeProfileDTO> {

    // Do we already have a valid user info object?
    if ((!this._userInfo)) {
      // Retrieve the user
      this.retrieveUserInfo();
    }

    // Return the observable to the caller ... the object will return after retrieval completes
    return this._userInfo$;
  } // end getUserInfo

  public getIsApprover(forceRefresh: boolean = false): Observable<boolean> {
    this._authService.isLoggedIn().filter(x => (x === true)).subscribe((isLoggedIn: boolean) => {
      this._getIsApprover(forceRefresh);
    }); // end subscribe isLoggedIn

    // Return the observable to the caller ... we'll send back the object momentarily
    return this._isApprover$.asObservable();
  } // end getIsApprover

  // dbg ... this should move to timecard service (client/server), since it's a timecard approver check.
  private _getIsApprover(forceRefresh: boolean = false) {
    // Is the user an approver?

    // If we don't have the answer yet, or if we need to refresh, get it now.
    if ((this._isApprover === null) || forceRefresh) {
      // Mark internal answer as false by default to prevent double lookups
      this._isApprover = false;
      // Retrieve the answer now and store it.
      this._http.get<boolean>(this._isApproverUrl,
                                          { withCredentials: true })
              .subscribe(response => {
                // Store the object for next time, and send it back to the caller
                this._isApprover = response;
                this._isApprover$.next(this._isApprover);
              },
              (error: HttpErrorResponse) =>
                this._errorHandlerService.handleHttpErrorResponse(error, 'determine if current user is an approver.')
            );
    } // end if

  } // _getIsApprover

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);  // dbg
    return Observable.throw(err.message);
  }

  resetAllData() {
    // Wipe out all stored data, like going back to an app start
    this._userInfo = null;
    this._userInfo$.next(null);
    this._userInfoRetrieved$.next(null);
    this.getIsApprover(true);
  } // end resetAllData
}
