import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserInfoService } from './userinfo/user-info.service';

@Injectable()
export class IsApproverGuard implements CanActivate {

  constructor(private _userInfoService: UserInfoService) {}

  canActivate() {
    return this._userInfoService.getIsApprover();
  }
}
