import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import * as _ from 'lodash';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private toastService: ToastService){

    }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
       let errorMessage="";
        if(error && error.error && error.error.data)
        {
            let apiErrorMessage = _.join(error.error.data,"<br>");
            this.toastService.error(apiErrorMessage);
        }
       else if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // Optionally log the error to an external server
        console.error(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
