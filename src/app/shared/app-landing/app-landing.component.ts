import { Component, OnInit } from '@angular/core';
import { ApplicationMenuType, ApplicationMenuItem } from '../shared';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { CommonDataService } from '../common-data/common-data.service';

@Component({
  selector: 'tc-app-landing',
  template: ''
})
export class AppLandingComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _commonDataService: CommonDataService,
  ) { }

  ngOnInit() {

    // If we're coming in with a menu type, redirect to the first item in that menu
    this._route.params.subscribe(newParams => {
      const appMenuType: ApplicationMenuType = (this._route.snapshot.data[0]) ? this._route.snapshot.data[0]['appMenuType'] : null ;
      if (appMenuType) {
        this._commonDataService.getMenu(appMenuType).subscribe((appMenu: ApplicationMenuItem[]) => {
          // If there's a menu with items, go to the first one
          if (appMenu) {
            if (appMenu.length) {
              this._router.navigate([appMenu[0].path]);
            } else {
              // No items for this menu, go back to root.
              this._router.navigate(['/']);
            } // end if menu length
          } else {
              // Menu doesn't exist, go back to root.
              this._router.navigate(['/']);
          } // end if menu exists
        }); // end subscribe getmenu
      } // end if app menu type
    }); // end subscribe route params

  } // end ngOnInit

} // end AppLandingComponent
