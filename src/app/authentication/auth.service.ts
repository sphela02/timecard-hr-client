import { Injectable, Injector } from '@angular/core';
import { UserManager } from 'oidc-client';
import { ApplicationEnvironment, AlertMessageType } from '../shared/shared';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OidcUserSession } from './_shared.auth';
import { CommonDataService } from '../shared/common-data/common-data.service';
import { GlobalErrorHandlerService } from '../shared/global-error-handler/global-error-handler.service';

@Injectable()
export class AuthService {

  // Diagnostics Info
  private _diagnosticsInterval: any;

  private manager: UserManager;
  private _userSession$: BehaviorSubject<OidcUserSession> = new BehaviorSubject<OidcUserSession>(null);
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _environment: ApplicationEnvironment;
  private _checkAgainInterval: number = 60; // default check interval is 60 seconds

  constructor(
    private injector: Injector,
    private router: Router,
    private _commonDataService: CommonDataService,
    private _errorHandlerService: GlobalErrorHandlerService,
  ) {

    // Get our environment
    this._environment = this.injector.get('ENVIRONMENT');

    this._environment.environmentIsReady$
          .filter(isReady => (isReady === true))
          .take(1).subscribe(x => {
      this._setupOIDC();
    });

    // Enable diagnostics on demand
    this._initializeDiagnostics();

  } // end constructor

  private _setupOIDC() {

    if (this._environment.useOIDC) {
      document.execCommand('ClearAuthenticationCache');

      // Setup login status monitor
      this._monitorLoginStatus();

      // Init user manager and get the user
      this.manager = new UserManager(this._environment.authClientSettings);

      // Get the initial user session
      this.manager.getUser().then(userSession => {
        // Null here means we're still in the login process.  Subsequent visits will have a valid user token
        this._userSession$.next(userSession);
        // Launch the auth process
        this._initializeAuthProcess();
      }); // end getUser.then

      setInterval(() => {
        this._monitorAuthRenewal();
      }, this._checkAgainInterval * 1000);
    } else {
      // We're not using OIDC, logged in is always true
      this._isLoggedIn$.next(true);
    } // end if useOIDC or not

  } // end _setupOIDC

  private _initializeDiagnostics() {
    this._commonDataService.getDiagnosticsMode().subscribe((diagnosticsMode: boolean) => {
      if (diagnosticsMode) {
        this._startAuthDiagnostics();
      } else {
        this._endAuthDiagnostics();
      } // end if diagnosticsMode
    }); // end subscribe
  } // end _initializeDiagnostics

  private _startAuthDiagnostics() {

    this._diagnosticsInterval = setInterval(() => {

      const authDiagnosticsMessages: string[] = [];

      // How much time left on the id token?
      if (this._userSession$.value) {
        const currentIdToken = this.parseJwt(this._userSession$.value.id_token);
        const secondsRemaining = currentIdToken['exp'] - (Date.now() / 1000);
        const timeLeftMessage = Math.round(secondsRemaining) + ' seconds remaining on ID token';
        authDiagnosticsMessages.push(timeLeftMessage);
      }

      // Check renewal
      authDiagnosticsMessages.push('Check Again In: ' + this._checkAgainInterval);

      // Client ID
      authDiagnosticsMessages.push('Client: ' + this._environment.authClientSettings.client_id);

      // Sort the messages and store them on common data for consumption
      authDiagnosticsMessages.sort();
      this._commonDataService.setDiagnosticMessages(this.constructor.name, authDiagnosticsMessages);

    }, 1000);

  } // end _startAuthDiagnostics

  private _endAuthDiagnostics() {

    if (this._diagnosticsInterval) {
      clearInterval(this._diagnosticsInterval);
      this._commonDataService.setDiagnosticMessages(this.constructor.name, []);
    }

  } // end _endAuthDiagnostics

  private _monitorAuthRenewal() {
    // Get the current user session and evaluate if we need to renew
    const userSession = (this._userSession$) ? this._userSession$.value : null;

    if (userSession) {
        // User session valid, see how long before our id token expires
        const currentIdToken = this.parseJwt(userSession.id_token);
        const secondsRemaining = currentIdToken['exp'] - (Date.now() / 1000);

        if (secondsRemaining <= this._environment.oidcRenewalWindow) {
          // Within the renewal window, let's try to renew
          // Store the current URI for post-login redirect
          this._storeOriginalURI();

          // Turn on silent nav mode for this check
          this._commonDataService.setSilentNavigationMode(true);

          const routerSubscription = this.router.events.subscribe(e => {
            if ((e instanceof NavigationCancel) || (e instanceof NavigationEnd)) {

              // Nav is either blocked or complete, we know if the test nav worked.

              // We're done listening to these router events
              routerSubscription.unsubscribe();

              // Turn off silent nav
              this._commonDataService.setSilentNavigationMode(false);

              // Did the nav succeed?
              if (e instanceof NavigationEnd) {
                // We were allowed to leave the page, do the signin and restore to the previous page
                // Start the signin process (redirect to the ID server)
                this.manager.signinRedirect();
              } else if (e instanceof NavigationCancel) {
                // Something blocked the auth renewal, we can try again later

                // Make sure we have enough time left, or raise some flags for the user
                // Our renewal time is now less than 10% of our target window.
                const secondsLeftForWarning = this._environment.oidcRenewalWindow * 0.10;

                if (secondsRemaining < (secondsLeftForWarning)) {
                  // Start warning the user.
                  this._errorHandlerService.popupAlertMessage(
                    'WARNING ... Your login session will expire in '
                    + Math.floor(secondsRemaining)
                    + ' seconds. You may lose your unsaved changes unless you save before that happens.',
                    AlertMessageType.Warning);
                } // end if less than 10% of renewal window left
              } // end if NavigationEnd
            } // end if NavigationCancel or NavigationEnd
          }); // end router subscribe

          // Fire off the test nav, see if we can leave.
          this.router.navigate(['/']);

        }

    } // end if userSession

  } // end _monitorAuthRenewal

  private _getRedirectURI(): string {
    const item = JSON.parse(localStorage.getItem('AuthRedirectURI'));
    if (item) {
      localStorage.removeItem('AuthRedirectURI');
      if (item.Expires >= Date.now()) {
        return item.RedirectURI;
      }
    }
    return null;
  }

  private _storeOriginalURI() {
    const item = {
      RedirectURI: window.location.href.replace (/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '/$1'),
      Expires: Date.now() + 150000
    };
    localStorage.setItem('AuthRedirectURI', JSON.stringify(item));
  }

  private _initializeAuthProcess() {
    let isLoggedIn: boolean;
    this._userSession$.take(1).subscribe(currentUserSession => {
      if (!currentUserSession) {
        // null user
        isLoggedIn = false;
      } else {
        isLoggedIn = this._userLoginIsValid(currentUserSession);
      } // end if current session null/valid

      if (window.document.URL.toLowerCase().indexOf('auth-callback') > 0) {
        this._completeAuthentication().then(() => {});
      } else if (!isLoggedIn) {
          // Store the original URI for post-login redirect
          this._storeOriginalURI();
          // Start the signin process (redirect to the ID server)
          this.manager.signinRedirect();
      } // end if not logged in

    }); // end subscribe user session

  } // end _initializeAuthProcess

  private _userLoginIsValid( userSession: OidcUserSession): boolean {
    let loginValid: boolean = false;

    if (userSession.expired) {
      loginValid = false;
    } else {
      const token = this.parseJwt(userSession.id_token);
      loginValid = (Date.now() / 1000 < token['exp']);
    }
    return loginValid;
  } // end _userLoginIsValid

  private _monitorLoginStatus() {

    this._userSession$
      .filter(session => session !== null)
      .subscribe(currentUserSession => {
        if (currentUserSession === null) {
          this._isLoggedIn$.next(false);
        } else {
          let isLoggedIn = this._userLoginIsValid(currentUserSession);
          if (isLoggedIn) {
            if (currentUserSession.profile.msExchExtensionAttribute18 === 'SHR') {
              this._errorHandlerService.popupAlertMessage(
                '<a target="_blank" href="https://portal.l3t.com/">'
                + 'You are on a shared account, click here to connect to the portal, using your <B>@l3harris.com</B> email address.</a>',
                AlertMessageType.Error,
                {
                  'timeOut': '0',
                  'positionClass': 'toast-center',
                  // 'showDuration': '0',
                });
              // Keep logged in as false, so system doesn't boot up.
              isLoggedIn = false;
            } // end if user is shared
          } // end if isLoggedIn
          this._isLoggedIn$.next(isLoggedIn);
        } // end if session is null or populated
      }); // end subscribe current user session

  } // end _monitorLoginStatus

  public isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  } // end isLoggedIn

  public getAuthorizationHeaderValue(): string {
    return `${this._userSession$.value.token_type} ${this._userSession$.value.id_token}`;
  }

  private _completeAuthentication(): Promise<void> {
    let url = this._getRedirectURI();
    return this.manager.signinRedirectCallback()
      .then(userSession => {
        this._userSession$.next(userSession);
        if ((url) && (url !== '/')) {
          // Restore the original requested URL, once the app is ready
          this._commonDataService.appWaitForServicesToBeReady().then(() => {
            url = url.replace(this._environment.baseHref, '');
            this.router.navigateByUrl(url);
          });
        }
      });
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );

    return JSON.parse(jsonPayload);
  } // end parseJwt

} // end AuthService
