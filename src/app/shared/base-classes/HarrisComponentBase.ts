import { Injector, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { GlobalErrorHandlerService } from '../global-error-handler/global-error-handler.service';
import { ProgressTrackerService } from '../progress-tracker/progress-tracker.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { CommonDataService } from '../common-data/common-data.service';

import { ApplicationEnvironment } from '../shared';

export abstract class HarrisComponentBase implements OnDestroy {

    // Dependencies
    protected _commonDataService: CommonDataService;
    protected _errorHandlerService: GlobalErrorHandlerService;
    protected modal: NgbModal;
    protected _progressTrackerService: ProgressTrackerService;
    protected _userProfileService: UserProfileService;
    protected fb: FormBuilder;
    protected _router: Router;

    protected ngUnsubscribe: Subject<void> = new Subject<void>();

    // Injected environment, public for template use as well
    public Environment: ApplicationEnvironment;

    constructor(
        protected injector: Injector,
    ) {
        // Set up base dependency injections
        this._commonDataService = this.injector.get(CommonDataService);
        this._errorHandlerService = this.injector.get(GlobalErrorHandlerService);
        this.modal = this.injector.get(NgbModal);
        this._progressTrackerService = this.injector.get(ProgressTrackerService);
        this._userProfileService = this.injector.get(UserProfileService);
        this.fb = this.injector.get(FormBuilder);
        this._router = this.injector.get(Router);

        this.Environment = this.injector.get('ENVIRONMENT');

    }

    ngOnDestroy() {
        // Unsubscribe from any active subscriptions
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    } // end ngOnDestroy

} // end HarrisComponentBase
