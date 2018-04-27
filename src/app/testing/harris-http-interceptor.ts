import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AppMode } from '../shared/shared';
import { saveAs } from 'file-saver/FileSaver';
import * as CryptoJS from 'crypto-js';
import { CommonDataService } from '../shared/common-data/common-data.service';

// HARRIS HTTP INTERCEPTOR
// Used to intercept all http requests and make manipulations, like:
// - Prepend the API server hostname
// - Replace an http url with a static JSON file to return - for offline dev mode
// - Allow user impersonations for testing
@Injectable()
export class HarrisHttpInterceptorImpersonate implements HttpInterceptor {

    constructor(private _commonDataService: CommonDataService,
                ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // If we're impersonating, inject the header here
        if (this._commonDataService.impersonateUserID) {
            const headers: HttpHeaders = new HttpHeaders({
                'HarrisImpersonateUser': this._commonDataService.impersonateUserID
            });
            request = request.clone({
                headers,
            });

        }
        return next.handle(request);
    }
}
@Injectable()
export class HarrisHttpInterceptor implements HttpInterceptor {

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
            default:
                // Default use case is to prepend the URL with the API root and pass the request along.
                request = request.clone({
                    url: environment.apiServiceURL + request.url
                });
            break;
        }

        return next.handle(request).do(response => {
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

// dbg ... Separate out mock gen and mock use into a separate interceptor, so it can be removed for production.


