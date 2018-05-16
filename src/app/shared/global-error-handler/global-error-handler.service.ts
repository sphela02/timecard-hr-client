import { Injectable, ErrorHandler } from '@angular/core';
import * as toastr from 'toastr';
import { ProgressTrackerService } from '../progress-tracker/progress-tracker.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private _progressTrackerService: ProgressTrackerService,
  ) { }

  handleError(error) {
    console.log(error); // dbg

    // Set toastr alert.
    toastr.options = {
      'closeButton': true,
      'tapToDismiss': false,
      'showDuration': '10000',
      'timeOut': '10000',
      'positionClass': 'toast-center',
      'preventDuplicates': true
    };

    // Turn off any loading indicators
    this._progressTrackerService.clearAllAppLoadingStatuses();
    // Pop up the error message and the body
    // toastr.error(JSON.stringify(error.error)); // dbg
    toastr.error(error.message); // dbg

    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error; // dbg ... I don't think this works
 } // end handleError

}
