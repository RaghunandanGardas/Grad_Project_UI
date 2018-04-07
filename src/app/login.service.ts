import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JWT_Token } from './user';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { UserData } from '../Models/UserData'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var require: any

@Injectable()//Tells angular that this service might itself inject dependencies.
export class LoginService {
  public JWTToken: JWT_Token;
  public userId: string;
  public isLogged: boolean;
  constructor(private http: HttpClient) {
    this.isLogged = false;
  }
  //'m0KIiYHy7b4A0IoyLnF88J0+avoXibdNKkG0WH3sa2qwc6D3sgTKiwEh2iUBRpw6F'
  //loginUser(userInput): Observable<JWT_Token[]> {

  loginUser(userId, password): Observable<JWT_Token> {
    let userInput = this.encryptString(userId + ":" + password);
    let headers = new HttpHeaders({
      'userInput': userInput,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    });
    this.userId = userId;
    console.log("Log in attempt being made for user: " + this.userId);
    //headers.append('userInput', userInput);
    return this.http.get<JWT_Token>(
      'http://localhost:8080/Restful/webapi/login/loginUser'// { params: params });
      , { headers: headers });
  }

  signUp(userInput) {
    let headers = new HttpHeaders({
      'userInput': userInput,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
      'Access-Control-Allow-Credentials': 'true'
    });
    return this.http.get<string>(
      'http://localhost:8080/Restful/webapi/login/createAccount'// { params: params });
      , { headers: headers, observe: 'response' }).catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    console.log("EROR HANDLER INVOKED");
    return Observable.throw(error.message || "Server Response error");
  }
  encryptString(stringToEncrypt) {
    console.log("-----------------------------------------");
    var CryptoJS = require("crypto-js");
    var secret = "ssshhhhhhhhhhh!!!!";
    var encrypted = CryptoJS.AES.encrypt(stringToEncrypt, secret);
    encrypted = encrypted.toString();
    console.log("Cipher text: " + encrypted);
    console.log("-----------------------------------------");
    return encrypted;

  }
}
