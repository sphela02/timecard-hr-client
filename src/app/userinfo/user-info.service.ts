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


@Injectable()
export class UserInfoService {
  private _userInfoUrl: string;
  private _userBenefitHoursUrl: string;
  private _userInfo; // Where we store the info once retrieved

  constructor(
    private _http: HttpClient,
    private modal: NgbModal,
  ) {
    this._userInfoUrl = 'Employee/getMyProfile';
    this._userBenefitHoursUrl = 'Employee/getBenefitHours';
  }

  getUserInfo(): Observable<EmployeeProfileDTO> {
    if (this._userInfo == null) {
      this._userInfo = this._http.get<EmployeeProfileDTO>(this._userInfoUrl,
                                            { withCredentials: true })
                                            .catch(this.handleError)
                                            ;
    }
    return this._userInfo;
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
  } // end resetAllData
}
