import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { EmployeeProfileDTO } from '../shared/EmployeeProfileDTO';
import { BenefitHoursDTO } from '../shared/BenefitHoursDTO';

@Injectable()
export class UserInfoService {
  private _userInfoUrl: string;
  private _userBenefitHoursUrl: string;
  private _userInfo; // Where we store the info once retrieved

  constructor(private _http: HttpClient) {
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

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);  // dbg
    return Observable.throw(err.message);
  }

}
