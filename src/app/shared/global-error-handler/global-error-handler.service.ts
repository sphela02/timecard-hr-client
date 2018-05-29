import { Injectable, ErrorHandler } from '@angular/core';
import * as toastr from 'toastr';
import { ProgressTrackerService } from '../progress-tracker/progress-tracker.service';
import { CommonDataService } from '../common-data/common-data.service';
import { ApplicationErrorDTO } from '../ApplicationErrorDTO';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  errorMessageDisplay: any;

  constructor(
    private _progressTrackerService: ProgressTrackerService,
    private _commonDataService: CommonDataService,
  ) { }


  private _pushErrorMessage(errorMessage: any) {

    // Don't show the same message twice in a row
    if (this._commonDataService.currentErrorMessages[this._commonDataService.currentErrorMessages.length - 1] !== errorMessage) {
      this._commonDataService.currentErrorMessages.push(errorMessage);
      // dbg ... the handleError() sends 2 messages at a time, so this duplicate suppression never works there.
    }

  }

  handleHttpErrorResponse(error: HttpErrorResponse, ActionDescription: string) {

    // Turn off any loading indicators if an error occurs
    this._progressTrackerService.clearAllAppLoadingStatuses();

    if (error.status === 403) {
      const applicationError: ApplicationErrorDTO = error.error;
      this.reportApplicationError(applicationError, 'Not allowed to ' + ActionDescription);
    } else if (error.status === 500) {
      const applicationError: ApplicationErrorDTO = error.error;
      this.reportApplicationError(applicationError, 'Unable to ' + ActionDescription);
    } else {
      // Other error besides 403/500
      console.log(error);
      this.reportErrorMessage('Unable To ' + ActionDescription);
    } // end if error status is 403/500/etc

  } // end handleHttpErrorResponse

  reportApplicationError(applicationError: ApplicationErrorDTO, prefixMessage: string = null) {

    let errorMessage: string = '';
    errorMessage += applicationError.ErrorText;
    errorMessage += ' ( Error #' + applicationError.CorrelationID + ')';

    // Set message display array.
    this.errorMessageDisplay = {
      'prefix': prefixMessage,
      'message': errorMessage
    };

    this._pushErrorMessage(this.errorMessageDisplay);
  } // end reportApplicationError

  reportErrorMessage(errorMessage) {

    // Set message display array.
    this.errorMessageDisplay = {
      'prefix': '',
      'message': errorMessage
    };

    // Push a simple error message to the error list
    this._pushErrorMessage(this.errorMessageDisplay);
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
    // Set message display array.
    this.errorMessageDisplay = {
      'prefix': 'An unexpected error has occurred. Please refresh the browser. If the problem persists contact Service Desk.',
      'message': error.message
    };

    // If details exist add it to the message.
    error.error ? this.errorMessageDisplay['message'] += JSON.stringify(error.error) : this.errorMessageDisplay['message'] += '';

    this._pushErrorMessage(this.errorMessageDisplay);

    // Show error in console.
    console.error(error);

    // Pop up the error message and the body
    // toastr.error(JSON.stringify(error.error)); // dbg
    // toastr.error(error.message); // dbg
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error; // dbg ... I don't think this works
 } // end handleError

}
