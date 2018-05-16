import { Injectable, ErrorHandler } from '@angular/core';
import * as toastr from 'toastr';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

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

    // Pop up the error message and the body
    // toastr.error(JSON.stringify(error.error)); // dbg
    toastr.error(error.message); // dbg

    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    throw error; // dbg ... I don't think this works
 } // end handleError

}
