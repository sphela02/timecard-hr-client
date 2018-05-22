import { Injectable, ErrorHandler } from '@angular/core';
import * as toastr from 'toastr';
import { ProgressTrackerService } from '../progress-tracker/progress-tracker.service';
import { CommonDataService } from '../common-data/common-data.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private _progressTrackerService: ProgressTrackerService,
    private _commonDataService: CommonDataService,
  ) { }

  _pushErrorMessage(errorMessage: string) {

    // Don't show the same message twice in a row
    if (this._commonDataService.currentErrorMessages[this._commonDataService.currentErrorMessages.length - 1] !== errorMessage) {
      this._commonDataService.currentErrorMessages.push(errorMessage);
      // dbg ... the handleError() sends 2 messages at a time, so this duplicate suppression never works there.
    }

  }

  reportErrorMessage(errorMessage) {
    // Push a simple error message to the error list
    this._pushErrorMessage(errorMessage);
  } // end reportErrorMessage

  handleError(error) {
    // Default Error Handler for uncaught Errors

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
    // Push this error message to the list for the App to display it as needed.
    this._pushErrorMessage(error.message);
    this._pushErrorMessage(JSON.stringify(error.error));

    // Pop up the error message and the body
    // toastr.error(JSON.stringify(error.error)); // dbg
    // toastr.error(error.message); // dbg
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error; // dbg ... I don't think this works
 } // end handleError

}
