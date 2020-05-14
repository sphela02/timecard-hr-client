import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationMenuType, ApplicationMenuItem } from '../shared';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { CommonDataService } from '../common-data/common-data.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'tc-app-landing',
  template: ''
})
export class AppLandingComponent implements OnInit, OnDestroy {

  stopListeningToAll$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _commonDataService: CommonDataService,
  ) { }

  ngOnInit() {

    // If we're coming in with a menu type, redirect to the first item in that menu
    this._route.params.takeUntil(this.stopListeningToAll$).subscribe(newParams => {
      const appMenuType: ApplicationMenuType = (this._route.snapshot.data[0]) ? this._route.snapshot.data[0]['appMenuType'] : null ;
      if (appMenuType) {
        this._commonDataService.getMenu(appMenuType).takeUntil(this.stopListeningToAll$).subscribe((appMenu: ApplicationMenuItem[]) => {
          // If there's a menu with items, go to the first one
          if (appMenu) {
            if (appMenu.length) {
              this._router.navigate([appMenu[0].path]);
            } else {
              // No items for this menu, go back to the profile page, which always exists.
              this._router.navigate(['/profile']);
            } // end if menu length
          } else {
              // Menu doesn't exist, go back to profile page.
              this._router.navigate(['/profile']);
          } // end if menu exists
        }); // end subscribe getmenu
      } // end if app menu type
    }); // end subscribe route params

  } // end ngOnInit

  ngOnDestroy(): void {
    this.stopListeningToAll$.next(true);
  }

} // end AppLandingComponent
