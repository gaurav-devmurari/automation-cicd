import { isPlatformBrowser } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token )})
  // console.log({ 'request from interceptor': req.url });

  // return next(req);
  return next(req).pipe(
    tap({
      next: (result) => {
        if (result.type === HttpEventType.Response) {
          console.log(
            req.url,
            'returned a response with status',
            result.status
          );
        }

      },
      error: (error) => {
        if (error.status === 401 || error.status === 403) {
          // localStorage.clear();
          // this.router.navigate(['/']);
        } else {
          // this.router.navigate(['/']);
        }
      },
    }),
    map((event) => {
      if (event instanceof HttpResponse && event.body) {
        // Return only the data from the response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = event.body as any;
        return event.clone({ body: data.data });
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      // Handle errors here
      if (error.status === 401 || error.status === 403) {
        // localStorage.clear();
        // this.router.navigate(['/']);
      } else {
        // this.router.navigate(['/']);
      }
      // Re-throw the error so that it can be handled by the caller
      return throwError(() => error);
    })
  );
}
