import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Notyf } from 'notyf';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('this is server side error');
          console.log({ error });
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          const notyf = new Notyf();
          if (error.error.message) {
            notyf.error(error.error.message);
          } else if (error.status == 401) {
            notyf.error('Unauthorized !!');
          } else {
            notyf.error(error.message);
          }
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
