import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_HTTP_BASE_URL } from './api-http-base-url';

@Injectable({ providedIn: 'root' })
export class ApiHttpService extends HttpClient {
  constructor(
    protected httpHandler: HttpHandler,
    @Inject(API_HTTP_BASE_URL) protected baseUrl: string
  ) {
    super(httpHandler);
  }

  override get<T>(url: string, options?: any) {
    return super.get(`${this.baseUrl}${url}`, options) as Observable<T>;
  }

  override post<T = any>(url: string, body: any, options?: any) {
    return super.post(`${this.baseUrl}${url}`, body, options) as Observable<T>;
  }

  override put<T = any>(url: string, body: any, options?: any) {
    return super.put(`${this.baseUrl}${url}`, body, options) as Observable<T>;
  }

  override delete<T>(url: string, options?: any): Observable<T> {
    return super
      .delete<T>(`${this.baseUrl}${url}`, options)
      .pipe(catchError((err) => of(err)));
  }
}
