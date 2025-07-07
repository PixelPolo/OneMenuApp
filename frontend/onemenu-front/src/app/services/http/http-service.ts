/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private apiURL: string = environment.API_URL;

  private readonly VERBOSE = false;

  // Home test
  homeTest(): Observable<string> {
    return this.http.get(this.apiURL + '/', { responseType: 'text' });
  }

  // GET
  get<T = any>(path: string): Observable<T> {
    if (this.VERBOSE) console.log(`GET on ${path}`);
    return this.http.get<T>(this.apiURL + path);
  }

  // POST
  post<T = any>(path: string, data: any): Observable<T> {
    if (this.VERBOSE) console.log(`POST on ${path}`);
    return this.http.post<T>(this.apiURL + path, data);
  }

  // PUT
  put<T = any>(path: string, data: any): Observable<T> {
    if (this.VERBOSE) console.log(`PUT on ${path}`);
    return this.http.put<T>(this.apiURL + path, data);
  }

  // DELETE
  delete<T = any>(path: string): Observable<T> {
    if (this.VERBOSE) console.log(`DELETE on ${path}`);
    return this.http.delete<T>(this.apiURL + path);
  }
}
