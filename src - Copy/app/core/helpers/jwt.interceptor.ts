import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import {NGXLogger} from "ngx-logger";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private logger:NGXLogger
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
      this.logger.info("intercepted here jwt");
        if (environment.defaultauth === 'springboot') {
            // add authorization header with jwt token if available
            let token = this.authenticationService.getToken();
            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }
        return next.handle(request);
    }
}
