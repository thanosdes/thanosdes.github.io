import { HttpInterceptorFn } from '@angular/common/http';
import { API_KEY, BASE_URL } from '../../../environments/env';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(BASE_URL)) {
    req = req.clone({
      headers: req.headers.set('x-rapidapi-key', API_KEY),
    });
  }
  return next(req);
};
