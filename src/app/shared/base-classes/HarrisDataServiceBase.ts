import { CommonDataService } from '../common-data/common-data.service';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalErrorHandlerService } from '../global-error-handler/global-error-handler.service';
import { inject } from '@angular/core/testing';
import { ProgressTrackerService } from '../progress-tracker/progress-tracker.service';
import { UserProfileService } from '../user-profile/user-profile.service';

export class HarrisDataServiceBase {
    protected _commonDataService: CommonDataService;
    protected _http: HttpClient;
    protected _errorHandlerService: GlobalErrorHandlerService;
    protected modal: NgbModal;
    protected _progressTrackerService: ProgressTrackerService;
    protected _userProfileService: UserProfileService;

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
    }
} // end HarrisDataServiceBase
