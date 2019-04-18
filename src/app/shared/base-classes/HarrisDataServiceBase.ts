import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GlobalErrorHandlerService } from '../global-error-handler/global-error-handler.service';
import { ProgressTrackerService } from '../progress-tracker/progress-tracker.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { CommonDataService } from '../common-data/common-data.service';

import { ApplicationEnvironment } from '../shared';

export abstract class HarrisDataServiceBase {

    // Diagnostics Info
    private _diagnosticsInterval: any;

    // Dependencies
    protected _commonDataService: CommonDataService;
    protected _http: HttpClient;
    protected _errorHandlerService: GlobalErrorHandlerService;
    protected modal: NgbModal;
    protected _progressTrackerService: ProgressTrackerService;
    protected _userProfileService: UserProfileService;

    // Injected environment, public for template use as well
    public Environment: ApplicationEnvironment;

    constructor(
        protected injector: Injector,
    ) {
        // Set up base dependency injections
        this._commonDataService = this.injector.get(CommonDataService);
        this._http = this.injector.get(HttpClient);
        this._errorHandlerService = this.injector.get(GlobalErrorHandlerService);
        this.modal = this.injector.get(NgbModal);
        this._progressTrackerService = this.injector.get(ProgressTrackerService);
        this._userProfileService = this.injector.get(UserProfileService);

        this.Environment = this.injector.get('ENVIRONMENT');

        // Set up diagnostics listeners
        this._initializeDiagnostics();

    }

    public startSubscriberDiagnostics () {
        // Set up an interval to track observable subscriber counts
        this._diagnosticsInterval = setInterval(() => {

          const subscriberCountMessages: string[] = [];

          // Go through all fields on this object, looking for subjects (even within arrays)
          Object.keys(this).forEach(fieldName => {
            // Each field
            if (typeof this[fieldName] === 'object') {
              // Field is an object, check the type
              if (this[fieldName] instanceof Subject) {
                // Field is a subject
                const thisSubject: Subject<any> = this[fieldName];
                // Subject ... log the observer count if not zero
                if (thisSubject.observers.length) {
                  subscriberCountMessages.push(fieldName + ' = ' + thisSubject.observers.length);
                } // end if observers attached
              } else if (this[fieldName] instanceof Array) {
                // Field is an array (not sure of the type though)
                const thisArray: Array<any> = this[fieldName];
                // Check each element
                for (const prop in thisArray) {
                  if (thisArray[prop] instanceof Subject) {
                    // Element is a subject, log the length
                    const thisSubject: Subject<any> = thisArray[prop];
                    if (thisSubject.observers.length) {
                      const message: string = fieldName + '(' + prop +  ') = ' + thisSubject.observers.length;
                      subscriberCountMessages.push(message);
                    } // end if observers attached
                  } // end if array element is subject
                } // end for each element
              } // end if field is array or subject
            } // end if field is object
          }); // end for each field

          // Sort the messages and store them on common data for consumption
          subscriberCountMessages.sort();
          this._commonDataService.setDiagnosticMessages(this.constructor.name, subscriberCountMessages);

        }, 1000);

      } // end startSubscriberDiagnostics

      public endSubscriberDiagnostics() {
        if (this._diagnosticsInterval) {
          clearInterval(this._diagnosticsInterval);
          this._commonDataService.setDiagnosticMessages(this.constructor.name, []);
        }
      } // end endSubscriberDiagnostics

      private _initializeDiagnostics() {
        this._commonDataService.getDiagnosticsMode().subscribe((diagnosticsMode: boolean) => {
          if (diagnosticsMode) {
            this.startSubscriberDiagnostics();
          } else {
            this.endSubscriberDiagnostics();
          } // end if diagnosticsMode
        }); // end subscribe
      } // end _initializeDiagnostics

} // end HarrisDataServiceBase
