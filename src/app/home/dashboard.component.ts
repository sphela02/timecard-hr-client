import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInfoService } from '../userinfo/user-info.service';
import { EmployeeProfileDTO } from '../shared/EmployeeProfileDTO';

@Component({
  selector: 'tc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   pageTitle: 'My Dashboard';
   errorMessage: string;
   userInfo: EmployeeProfileDTO;

    constructor(private _userInfoService: UserInfoService) { }

  ngOnInit() {
    // dbg ... we can probably remove the user info from the dashboard maybe?
    this._userInfoService.getUserInfo()
          .subscribe(userInfo => {
            this.userInfo = userInfo;
          },
          error => this.errorMessage = <any>error
        );

  }

}
