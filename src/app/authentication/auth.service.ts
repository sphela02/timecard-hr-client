import { Injectable, Injector } from '@angular/core';
import { UserManager } from 'oidc-client';
import { ApplicationEnvironment } from '../shared/shared';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OidcUserSession } from './_shared.auth';
import { CommonDataService } from '../shared/common-data/common-data.service';

@Injectable()
export class AuthService {

  private manager: UserManager;
  private _userSession$: BehaviorSubject<OidcUserSession> = new BehaviorSubject<OidcUserSession>(null);
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private injector: Injector,
    private router: Router,
    private _commonDataService: CommonDataService,
  ) {
    // Get our environment
    const environment: ApplicationEnvironment = this.injector.get('ENVIRONMENT');

    if (environment.useOIDC) {
      // Setup login status monitor
      this._monitorLoginStatus();

      // Init user manager and get the user
      this.manager = new UserManager(environment.authClientSettings);

      // Get the initial user session
      this.manager.getUser().then(userSession => {
        // Null here means we're still in the login process.  Subsequent visits will have a valid user token
        this._userSession$.next(userSession);
        // Launch the auth process
        this._initializeAuthProcess();
      }); // end getUser.then

      this._monitorAuthRenewal();
    } else {
      // We're not using OIDC, logged in is always true
      this._isLoggedIn$.next(true);
    } // end if useOIDC or not

  } // end constructor

  private _monitorAuthRenewal() {
    let authCheckTimeout;

    this._userSession$.subscribe(userSession => {
      if (userSession) {
        // User session valid, see how long before our id token expires
        const currentIdToken = this.parseJwt(userSession.id_token);
        let secondsRemaining = currentIdToken['exp'] - (Date.now() / 1000);

        // Check if we already have a timeout running for checking auth
        if (authCheckTimeout) {
          return;
        }
        authCheckTimeout = setTimeout(() => {
          secondsRemaining = currentIdToken['exp'] - (Date.now() / 1000);

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
              } // end if NavigationEnd
            } // end if NavigationCancel or NavigationEnd
          }); // end router subscribe

          // Fire off the test nav, see if we can leave.
          this.router.navigate(['/']);

        }, (secondsRemaining / 2) * 1000);
      }
    }); // end subscribe user session
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
          const isLoggedIn = this._userLoginIsValid(currentUserSession);
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
    const url = this._getRedirectURI();
    return this.manager.signinRedirectCallback()
      .then(userSession => {
        this._userSession$.next(userSession);
        if (url !== '/') {
          // Restore the original requested URL, once the app is ready
          this._commonDataService.appWaitForServicesToBeReady().then(() => {
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
  }

}
