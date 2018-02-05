import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { EmployeeProfileDTO } from './user-info';

@Injectable()
export class UserInfoService {
  private _userInfoUrl: string;
  private _userInfo; // Where we store the info once retrieved

  constructor(private _http: HttpClient) {
    this._userInfoUrl = environment.apiServiceURL + 'Employee/getMyProfile';
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

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);  // dbg
    return Observable.throw(err.message);
  }

}
