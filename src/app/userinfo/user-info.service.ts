import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { EmployeeProfileDTO } from '../shared/EmployeeProfileDTO';
import { BenefitHoursDTO } from '../shared/BenefitHoursDTO';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TimecardChangeApproverMainComponent } from '../timecard/timecard-change-approver-main/timecard-change-approver-main.component';

import { Subject } from 'rxjs/Subject'; // dbg - replace with behavior subjects
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GlobalErrorHandlerService } from '../shared/global-error-handler/global-error-handler.service';

@Injectable()
export class UserInfoService {
  private _userInfoUrl: string;
  private _userBenefitHoursUrl: string;
  private _isApproverUrl: string;
  private _userInfo$: BehaviorSubject<EmployeeProfileDTO> = new BehaviorSubject<EmployeeProfileDTO>(null);
  private _userInfo: EmployeeProfileDTO;
  private _isApprover: boolean = null;
  private _isApprover$: Subject<boolean> = new Subject<boolean>(); // dbg replace with behavior subject

  constructor(
    private _http: HttpClient,
    private modal: NgbModal,
    private _errorHandlerService: GlobalErrorHandlerService,
  ) {
    this._userInfoUrl = 'Employee/getMyProfile';
    this._userBenefitHoursUrl = 'Employee/getBenefitHours';
    this._isApproverUrl = 'Employee/HasApproverRole/';

    // Retrieve the user info immediately
    this.getUserInfo();

  }

  getUserInfo(): Observable<EmployeeProfileDTO> {

    // Have we already retrieved the user info?
    if (!this._userInfo) {
      // We don't have the user info yet, retrieve it now, store it and send it.
      this._http.get<EmployeeProfileDTO>(this._userInfoUrl,
                                          { withCredentials: true })
              .subscribe(response => {
                // Store the object for next time, and send it back to the caller
                this._userInfo = response;
                this._userInfo$.next(this._userInfo);
              },
              error => {
                console.log(error);
                this._errorHandlerService.reportErrorMessage('Unable To Retrieve the current logged on User');
              });
    }

    // Return the observable to the caller ... we'll send back the object momentarily
    return this._userInfo$;
  }

  getIsApprover(): Observable<boolean> {

    // Have we already retrieved the user info?
    if (this._isApprover != null) {
      // Send the user info back to the requester, after we return the observable.
      setTimeout(() => {
        this._isApprover$.next(this._isApprover);
      }, 0);
    } else {
      // We don't have the user info yet, retrieve it now and store it.
      this._http.get<boolean>(this._isApproverUrl,
                                          { withCredentials: true })
              .subscribe(response => {
                // Store the object for next time, and send it back to the caller
                this._isApprover = response;
                this._isApprover$.next(this._isApprover);
              });
    }

    // Return the observable to the caller ... we'll send back the object momentarily
    return this._isApprover$;
  }

  getUserBenefitHours(emplID: string): Observable<BenefitHoursDTO[]> {
    return this._http.get<BenefitHoursDTO[]>(this._userBenefitHoursUrl + '/' + emplID,
                                          { withCredentials: true })
                                          .catch(this.handleError);
  }

  popupChangeApprovers() {
    // changed on the popup? Easier for user to get out if they didn't mean to get here.
    const modalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      centered: true
    };

    // Open the modal popup for project summary info, pass in the row
    const popupModalRef = this.modal.open(TimecardChangeApproverMainComponent, modalOptions);

    // Subscribe to cancelClicked, in case we need it.
    popupModalRef.componentInstance.cancelClicked.subscribe(event => {
      // Cancel was clicked ... do anything necessary here.

    });

    // Subscribe to saveClicked, in case we need it.
    popupModalRef.componentInstance.saveClicked.subscribe(event => {
      // Save was clicked ... do anything necessary here.

    });

  } // end popupChangeApprovers

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);  // dbg
    return Observable.throw(err.message);
  }

  resetAllData() {
    // Wipe out all stored data, like going back to an app start
    this._userInfo = null;
    this._userInfo$.next(null);
  } // end resetAllData
}
