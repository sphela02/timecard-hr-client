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
  private _userObject; // dbg ... I think this is unneeded

  constructor(private _http: HttpClient) {
    this._userInfoUrl = environment.apiServiceURL + 'Employee/getMyProfile';
  }

  getUserInfo(): Observable<EmployeeProfileDTO> {
    return this._http.get<EmployeeProfileDTO>(this._userInfoUrl , { withCredentials: true })
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError)
      ;
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);  // dbg
    return Observable.throw(err.message);
  }

}
