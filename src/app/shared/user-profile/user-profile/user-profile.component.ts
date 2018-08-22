import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { EmployeeProfileDTO } from '../../EmployeeProfileDTO';
import { UserProfileService } from '../user-profile.service';
import { UserInfoService } from '../../../userinfo/user-info.service';
// import { ViewContainerRefDirective } from '../../view-container-ref/view-container-ref'; 
// import { VcrDebugComponent } from '../../vcr-debug/vcr-debug.component'; 
import { UserProfileDashboardItem, UserProfileDashboardWidget } from '../../shared';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // App Data
  public userInfo: EmployeeProfileDTO = null;
  // @ViewChild(ViewContainerRefDirective) vcdRef: ViewContainerRefDirective; 
  // @ViewChild('bobDBG') vcRef: ViewContainerRefDirective; 
  // @ViewChild('bobDBG', {read: ViewContainerRef}) vcRef: ViewContainerRef; 
  // @ViewChildren('bobDBG') componentsToShow: QueryList<ElementRef>; 

  // VcrDebugComponent
  // HelloWorldComponent = VcrDebugComponent; // dbg 

  dashboardPopups: UserProfileDashboardItem[];
  dashboardWidgets: UserProfileDashboardWidget[];

  constructor(
    private _userInfoService: UserInfoService,
    private _userProfileService: UserProfileService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modal: NgbModal,
  ) { }

  dbgTest() {
    console.log("DBG 43 dbgTest");
  }

  ngOnInit() {

    this.dashboardPopups = this._userProfileService.getDashBoardPopups();

    this.dashboardWidgets = this._userProfileService.getDashBoardWidgets();

    this._userInfoService.getUserInfo()
    .subscribe(userInfo => {
      this.userInfo = userInfo;

      // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VcrDebugComponent); 

      // const viewContainerRef: ViewContainerRef = this.vcRef.viewContainerRef; 

      // const componentRef = this.vcRef.createComponent(componentFactory); 

    }
  ); // end subscribe

  } // end ngOnInit

} // end UserProfileComponent
