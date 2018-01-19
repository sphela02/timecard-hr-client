import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IUserInfo } from './user-info';

@Injectable()
export class UserInfoService {
  private _userInfoUrl: string;
  private _userObject;

  constructor(private _http: HttpClient) {
    this._userInfoUrl = environment.apiServiceURL + '/CurrentInfo';
  }

  getUserInfo(): Observable<IUserInfo[]> {
    return this._http.get<IUserInfo[]>(this._userInfoUrl)
      .catch(this.handleError)
      ;
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);  // dbg
    return Observable.throw(err.message);
  }

}
