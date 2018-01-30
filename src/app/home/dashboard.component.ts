import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInfoService } from '../userinfo/user-info.service';
import { EmployeeProfileDTO } from '../userinfo/user-info';
import { TimecardDTO } from '../timecard/timecard';
import { TimecardService } from '../timecard/timecard.service';

@Component({
  selector: 'tc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   pageTitle: 'My Dashboard';
   errorMessage: string;
   apiEndPointURL: string = environment.apiServiceURL;
   userInfo: EmployeeProfileDTO;
   timecardDBG: TimecardDTO;
   availableTimeCardsDBG: TimecardDTO[] = [];

    constructor(private _userInfoService: UserInfoService,
                private _timeCardService: TimecardService) { }

  ngOnInit() {
    this._userInfoService.getUserInfo()
          .subscribe(userInfo => {
            this.userInfo = userInfo;

            // Get available timecards dbg
            this._timeCardService.getAvailableTimeCards(this.userInfo.EMPLID)
              .subscribe( response => {
                this.availableTimeCardsDBG = response;
              });

          },
          error => this.errorMessage = <any>error
        );

    // Get a timecard for testing dbg
    this._timeCardService.getTimeCardByDate().subscribe (
          response => {
              this.timecardDBG = response;
              console.log('DBG 35');
              console.log(this.timecardDBG); // dbg
          }
      );

  }

}
