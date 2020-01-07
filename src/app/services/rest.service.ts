import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParameterCodec, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {isNetworkProblem} from './network';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  forceLogout: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  get<T>(url: string, param: {} | null): Observable<T> {
    let queryParams: string = '';
    if (param != null) {
      for (const key in param) {
        if (param.hasOwnProperty(key) && param[key]) {
          queryParams += `${key}=${param[key]}&`;
        }
      }
    }
    queryParams = queryParams.slice(0, -1);
    const params = new HttpParams({
      fromString: queryParams,
      encoder: new CustomEncoder()
    });
    const options: { headers: HttpHeaders; responseType: 'json'; withCredentials: boolean; params: HttpParams } = {
      headers: this.headersForJson(),
      params: params,
      responseType: 'json',
      withCredentials: true
    };
    return this.http.get<T>(url, options);
  }

  post(url: string, body: {} | null, isFormData?: boolean, errorHandler: ErrorHandler = this.handleError): Observable<{}> {
    const options: { headers: HttpHeaders; responseType: 'json'; withCredentials: boolean } = {
      headers: isFormData ? this.headersForFormData() : this.headersForJson(),
      responseType: 'json',
      withCredentials: true
    };
    return this.http.post(url, isFormData ? body : JSON.stringify(body), options).pipe(
      catchError(o => errorHandler(o)),);
  }

  put(url: string, body: {}, isFormData?: boolean, errorHandler: ErrorHandler = this.handleError): Observable<{}> {
    const options = {
      headers: isFormData ? this.headersForFormData() : this.headersForJson(),
      withCredentials: true
    };
    return this.http.put(url, isFormData ? body : JSON.stringify(body), options).pipe(
      catchError(o => {
        return errorHandler(o);
      }));
  }

  private headersForJson() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Cache-Control', 'no-cache')
      .append('Pragma', 'no-cache')
      .append('Access-Control-Allow-Origin', '*');
  }

  private headersForFormData() {
    return new HttpHeaders()
      .append('enctype', 'multipart/form-data')
      .append('Cache-Control', 'no-cache')
      .append('Pragma', 'no-cache')
      .append('Access-Control-Allow-Origin', '*');
  }

  private handleError<T>(error: HttpErrorResponse): Observable<T> {
    if (error.status === 401) {
      this.forceLogout.next(true);
      return throwError(error);
    } else if (error.status === 403 || error.status === 409) {
      return throwError(error);
    } else if (isNetworkProblem(error)) {
      return throwError(error);
    } else {
      const errorMsg = error.error && error.error.message ? error.error.message : (error.message) ? error.message : `${error.status} - ${error.statusText}`;
      return throwError(errorMsg);
    }
  }

  private handleHttpErrorResponse = (error: {}) => {
    if (error instanceof HttpErrorResponse) {
      const response = error as HttpErrorResponse;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.startsWith('application/json')) {
        return throwError(new HttpErrorResponse({
          error: typeof response.error === 'string' ? JSON.parse(response.error) : response.error,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
          url: response.url ? response.url : undefined
        }));
      }
    }
    return throwError(error);
  }
}

export type ErrorHandler = (res: HttpErrorResponse) => Observable<{}>;

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
