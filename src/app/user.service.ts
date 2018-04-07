import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from './user';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()//Tells angular that this service might itself inject dependencies.
export class UserService {
  constructor(private http: HttpClient) { }
  //'m0KIiYHy7b4A0IoyLnF88J0+avoXibdNKkG0WH3sa2qwc6D3sgTKiwEh2iUBRpw6F'
  loginUser(userInput): Observable<IUser[]> {
    let headers = new HttpHeaders({
      'userInput': userInput,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    });
    let params = new HttpParams().set('userInput', 'm0KIiYHy7b4A0IoyLnF88J0+avoXibdNKkG0WH3a2qwc6D3sgTKiwEh2iUBRpw6F');

    return this.http.get<IUser[]>(
      'http://localhost:8080/Restful/webapi/login/loginUser'// { params: params });
      , { headers }).catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Response error");
  }
}
