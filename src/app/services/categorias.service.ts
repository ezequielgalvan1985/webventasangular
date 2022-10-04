import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ConfigService } from '../config/config';
import { TokenService } from './token.service';


export interface CategoriaDTO{
  id:number,
  nombre:string,
  descripcion:string,
  estado:string
}

export interface ResponseDTO{
  data:string,
  status:number,
  message:string
}
export interface ErrorDTO{
  error:number,
  message:string
}
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  _configService!:ConfigService;
  _urlBase='http://localhost:8080/v1/';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  _currentError!:ErrorDTO;
constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location:Location,
    private tokenService:TokenService,

    ) {


    }


  post(p:CategoriaDTO):Observable<ResponseDTO> {
    var url = this._urlBase + 'categorias';
    return this.http.post<ResponseDTO>(url,p).pipe(catchError(this.handleError));;
  }

  patch(p:CategoriaDTO):Observable<ResponseDTO> {
    var url = this._urlBase + 'categorias';
    return this.http.patch<ResponseDTO>(url,p).pipe(catchError(this.handleError));;
  }

  delete(p:number):Observable<ResponseDTO> {
    var url = this._urlBase + 'categorias/'+p;
    return this.http.delete<ResponseDTO>(url);
  }

  get(p:number):Observable<CategoriaDTO> {
    var url = this._urlBase + 'categorias/'+p;
    return this.http.get<CategoriaDTO>(url);
  }


  findAll():Observable<Array<CategoriaDTO>> {
    var url = this._urlBase + 'categorias';


    return this.http.get<Array<CategoriaDTO>>(url);
  }

  findById(p:number):Observable<CategoriaDTO>{
    var url = this._urlBase + 'categorias/'+p;
    return this.http.get<CategoriaDTO>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {


    if (error.status===401){
      //this._snackBar.open('Sesion de usuario expirada, por favor volver a loguearse', 'cerrar',{horizontalPosition: this.horizontalPosition,verticalPosition: this.verticalPosition,});
      alert('Sesion de usuario expirada, por favor volver a loguearse');
      console.error('Sesion de usuario expirada, por favor volver a loguearse', error.error);
    }

    if (error.status===404){
      //this._snackBar.open('Sesion de usuario expirada, por favor volver a loguearse', 'cerrar',{horizontalPosition: this.horizontalPosition,verticalPosition: this.verticalPosition,});
      alert('Pagina no existe');
      console.error('Pagina no existe', error.error);
    }
    if (error.status===403){

      console.error('No tiene privilegios', error.error);

    }

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
