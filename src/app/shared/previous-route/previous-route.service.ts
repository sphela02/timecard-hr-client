import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Injectable()
export class PreviousRouteService {
    private previousUrl: string;
    private currentUrl: string;

  constructor(
    private _router: Router,
  ) {
    this.currentUrl = this._router.url;
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

}
