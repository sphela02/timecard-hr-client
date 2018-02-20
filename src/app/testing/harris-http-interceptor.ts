import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AppMode } from '../shared/shared';

// HARRIS HTTP INTERCEPTOR
// Used to intercept all http requests and make manipulations, like:
// - Prepend the API server hostname
// - Replace an http url with a static JSON file to return - for offline dev mode
@Injectable()
export class HarrisHttpInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        switch (environment.AppMode) {
            case AppMode.MockUse:
                // Use mock data instead of the real request
                // Replace the URL with an equivalent json file and serve it from assets/testdata
                // Also, change any POST requests to GET requests, so this works.
                let mockURL: string;
                mockURL = request.url;
                mockURL = mockURL.replace(/(:|\/)+/gi, '-');
                mockURL = 'assets/testdata/' + mockURL + '.json';

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
                    url: environment.apiServiceURL + '/' + request.url
                });
            break;
        }

        return next.handle(request);
    }
}
