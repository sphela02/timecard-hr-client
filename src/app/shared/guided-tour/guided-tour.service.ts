import { Injectable } from '@angular/core';
import { HopScotchTour } from '../shared';
import { Router, NavigationStart, ActivatedRoute, NavigationEnd } from '@angular/router';

// Variables for Hopscotch tour arrays.
declare var hopscotch: any;

@Injectable()
export class GuidedTourService {

  private _currentGuidedTour;
  private _tourActive: boolean = false;

  constructor(
    private _router: Router,
  ) {

    this._router.events.subscribe(routerEvent => {

      if (routerEvent instanceof NavigationStart) {
          if (hopscotch.getCurrTour()) {
              hopscotch.endTour();
              this._tourActive = true;
          }
      } // end if NavigationStart

      if (routerEvent instanceof NavigationEnd) {
          if (this._tourActive) {
              setTimeout(wait => {
                  hopscotch.startTour(this._currentGuidedTour);

                  hopscotch.listen('end', () => {
                      this._tourActive = false;
                      hopscotch.removeCallbacks();
                  });

                  hopscotch.listen('close', () => {
                      this._tourActive = false;
                      hopscotch.removeCallbacks();
                  });
              }, 500);
          }
      } // end if NavigationEnd

    }); // end subscribe router events

  } // end constructor

  setGuidedTour(guidedTour: HopScotchTour) {
    this._currentGuidedTour = guidedTour;
  } // end setGuidedTour

  startTour() {
    this._tourActive = true;
    // Hopscotch tour. Start the tour.
    hopscotch.startTour(this._currentGuidedTour);

    hopscotch.listen('end', () => {
        this._tourActive = false;
        hopscotch.removeCallbacks();
    });

    hopscotch.listen('close', () => {
        this._tourActive = false;
        hopscotch.removeCallbacks();
    });
  } // end startTour

} // end GuidedTourService
