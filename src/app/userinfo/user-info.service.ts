import { Injector, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { EmployeeProfileDTO } from '../shared/EmployeeProfileDTO';
import { BenefitHoursDTO } from '../shared/BenefitHoursDTO';
import { ActionType } from '../shared/shared';
import { ErrorStatus } from '../shared/ErrorStatus';
import { Subject } from 'rxjs/Subject'; // dbg - replace with behavior subjects
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GlobalErrorHandlerService } from '../shared/global-error-handler/global-error-handler.service';
import { ApplicationErrorDTO } from '../shared/ApplicationErrorDTO';
import { CommonDataService } from '../shared/common-data/common-data.service';
import { HarrisDataServiceBase } from '../shared/base-classes/HarrisDataServiceBase';

@Injectable()
export class UserInfoService extends HarrisDataServiceBase {
  private _userInfoUrl: string;
  private _userBenefitHoursUrl: string;
  private _isApproverUrl: string;
  private _userInfo$: BehaviorSubject<EmployeeProfileDTO> = new BehaviorSubject<EmployeeProfileDTO>(null);
  private _userInfo: EmployeeProfileDTO;
  private _userInfoIsRetrieving: boolean = false;
  private _isApprover: boolean = null;
  private _isApprover$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    protected injector: Injector,
  ) {

    // Call the base class constructor
    super(injector);

    this._userInfoUrl = '|EMPLOYEE|getMyProfile';
    this._userBenefitHoursUrl = '|EMPLOYEE|getBenefitHours';
    this._isApproverUrl = '|EMPLOYEE|HasApproverRole/';

    // Retrieve the user info at startup
    this.getUserInfo();

    // Set up impersonation listeners, so we know when to reset data for a new user
    this._commonDataService.impersonateUserID$.distinctUntilChanged().subscribe((newUserID: string) => {
      // Reset all stored data when the user changes.
      this.resetAllData();
    }); // end subscribe

  }

  getUserInfo(): Observable<EmployeeProfileDTO> {

    // Have we already retrieved the user info, or is already being retrieved?
    if ((!this._userInfo) && (!this._userInfoIsRetrieving)) {
      // We don't have the user info yet, retrieve it now, store it and send it.
      this._userInfoIsRetrieving = true;

      this._http.get<EmployeeProfileDTO>(this._userInfoUrl,
                                          { withCredentials: true })
              .subscribe(response => {
                // Finished retrieving (success)
                this._userInfoIsRetrieving = false;

                // Store the object for next time, and send it back to the caller
                this._userInfo = response;
                this._userInfo$.next(this._userInfo);

              },
              (error: HttpErrorResponse) => {
                // Finished retrieving (error, but still done)
                this._userInfoIsRetrieving = false;
                // Handle the Error response
                this._errorHandlerService.handleHttpErrorResponse(error, 'retrieve the current user.');

              }
            ); // end subscribe
    }

    // Return the observable to the caller ... we'll send back the object momentarily
    return this._userInfo$;
  }

  // dbg ... this should move to timecard service (client/server), since it's a timecard approver check.
  getIsApprover(forceRefresh: boolean = false): Observable<boolean> {
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

    // Return the observable to the caller ... we'll send back the object momentarily
    return this._isApprover$;
  }

  getUserBenefitHours(emplID: string): Observable<BenefitHoursDTO[]> {
    return this._http.get<BenefitHoursDTO[]>(this._userBenefitHoursUrl + '/' + emplID,
                                  { withCredentials: true })
                                  .catch((error: HttpErrorResponse) =>
                                  Observable.throw(
                                    this._errorHandlerService.handleHttpErrorResponse(
                                      error,
                                      'retrieve benefit hours for user (' + emplID + ').'
                                    )
                                  ) // end throw
                                ); // end catch
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);  // dbg
    return Observable.throw(err.message);
  }

  resetAllData() {
    // Wipe out all stored data, like going back to an app start
    this._userInfo = null;
    this._userInfo$.next(null);
    this.getIsApprover(true);
  } // end resetAllData
}
