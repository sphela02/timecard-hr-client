import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AppMode, ApplicationEnvironment } from '../shared/shared';
import { saveAs } from 'file-saver/FileSaver';
import * as CryptoJS from 'crypto-js';
import { CommonDataService } from '../shared/common-data/common-data.service';
import { AuthService } from '../authentication/auth.service';

// HARRIS HTTP INTERCEPTORS
// Used to intercept all http requests and make manipulations.

// - Include the user id token from authentication process
@Injectable()
export class HarrisHttpInterceptorAuthentication implements HttpInterceptor {

    Environment: ApplicationEnvironment;

  constructor(
            private _authService: AuthService,
            protected injector: Injector,
            ) {
    this.Environment = this.injector.get('ENVIRONMENT');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // If we're not using OIDC, don't do any auth here.
    if (!this.Environment.useOIDC) { return next.handle(request); }

    return this._authService.isLoggedIn().mergeMap((isLoggedIn: boolean) => {
        // If we're authenticated, inject Authorization header here
        if (isLoggedIn) {
            const headers = request.headers.set('Authorization', this._authService.getAuthorizationHeaderValue());
            request = request.clone({ headers });
        }
        return next.handle(request);
    }); // end mergeMap

  } // end intercept
} // end HarrisHttpInterceptorAuthentication

// - Allow user impersonations for testing
@Injectable()
export class HarrisHttpInterceptorImpersonate implements HttpInterceptor {

    constructor(private _commonDataService: CommonDataService,
                ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // If we're impersonating, inject the header here
        if (this._commonDataService.impersonateUserID$.value) {
            const headers = request.headers.set('HarrisImpersonateUser', this._commonDataService.impersonateUserID$.value);
            request = request.clone({
                headers,
            });

        }
        return next.handle(request);
    }
}

// - Prepend the API server hostname
@Injectable()
export class HarrisHttpInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const originalRequest: HttpRequest<any> = request;

        // If the URL starts with |key|, we use the key to find the right API URL prefix.
        if (request.url.startsWith('|')) {

            // STARTS WITH |key|, prepend with the API URL for that key
            const apiKey = request.url.substring(1, request.url.indexOf('|', 1));
            const newURL = environment.apiServiceURLs[apiKey] + request.url.substring(request.url.indexOf('|', 1) + 1);
            request = request.clone({
                url: newURL
            });

        } // end if url starts with |key|

        return next.handle(request);
    }
}

// - Replace an http url with a static JSON file to return - for offline dev mode or testing
@Injectable()
export class HarrisHttpInterceptorMockJSON implements HttpInterceptor {

    mockFileName(originalRequest: HttpRequest<any>): string {
        let mockName = originalRequest.url.replace(/(:|\/)+/gi, '-');
        if (originalRequest.body) {
            const sha1Hash: string[] = CryptoJS.SHA1(JSON.stringify(originalRequest.body));
            mockName = mockName + '.' + sha1Hash.toString();
        } else {
        }
        mockName  = mockName + '.json';

        return mockName;
    } // end mockFileName

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const originalRequest: HttpRequest<any> = request;

        // If we're running in MockUse mode, execute the JSON replacement
        switch (environment.AppMode) {
            case AppMode.MockUse:
                // Use mock data instead of the real request
                // Replace the URL with an equivalent json file and serve it from assets/testdata
                // Also, change any POST requests to GET requests, so this works.
                let mockURL: string;
                mockURL = 'assets/testdata/' + this.mockFileName(request);

                let mockMethod: string;
                mockMethod = request.method;
                if (mockMethod === 'POST') {
                    mockMethod = 'GET';
                    // dbg ... should we translate the arguments?
                }
                request = request.clone({
                    url: mockURL,
                    method: mockMethod
                });
            break;
        }

        return next.handle(request).do(response => {
            // If we're in MockGen, save the JSON responses for later use.
            if (environment.AppMode === AppMode.MockGenerate) {
                const myresponse: HttpResponse<any> = <HttpResponse<any>>response;
                if (myresponse.status === 200) {
                    const blob = new Blob(
                        [JSON.stringify(myresponse.body)],
                        { type: 'application/json' }
                    );
                    saveAs(blob, this.mockFileName(originalRequest));

                }
            }
        });
    }
}

