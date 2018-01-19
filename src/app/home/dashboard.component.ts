import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInfoService } from '../userinfo/user-info.service';
import { IUserInfo, IUser } from '../userinfo/user-info';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   pageTitle: 'My Dashboard';
   errorMessage: string;
   apiEndPointURL: string = environment.apiServiceURL;
   userInfo: IUserInfo[] = [];

    constructor(private _userInfoService: UserInfoService) { }

  ngOnInit() {
    this._userInfoService.getUserInfo()
          .subscribe(userInfo => {
            this.userInfo = userInfo;
          },
          error => this.errorMessage = <any>error
        );
  }

}
