import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = 'http://145.14.157.177:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.endpoint}`);
  }

  getUser(id): Observable<any> {
    const API_URL = `${this.endpoint}/read-user/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }), catchError(this.errorMgmt)
    );
  }

  addUser(data: User): Observable<any> {
    const API_URL = `${this.endpoint}/add-user`;
    return this.http.post(API_URL, data).pipe(
      catchError(this.errorMgmt)
    );
  }

  updateUser(id, data: User): Observable<any> {
    const API_URL = `${this.endpoint}/update-user/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
