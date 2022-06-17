import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface LoginRequest{
  usernameOrEmail:string,
  password:string
}

export interface ResponseDTO{
  data:string,
  status:number,
  message:string
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private http: HttpClient) { }
  _urlBase='http://localhost:8080/v1/';


  postLogin(p:LoginRequest):Observable<ResponseDTO> {
    var url = this._urlBase + 'auth/signin';
    return this.http.post<ResponseDTO>(url,p).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
