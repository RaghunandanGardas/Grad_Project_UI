import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserData } from '../Models/UserData';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Field } from '../Models/Field';
import 'rxjs/add/operator/map';
import { ReadPropExpr } from '@angular/compiler';

@Injectable()
export class UserService {
  public output;
  public headers;
  constructor(private http: HttpClient) {

  }
  getUsers(): Observable<Field[]> {
    return this.http.get('')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getFields(JWTToken, userId, requestType): Observable<Field[]> {
    let uID = userId;
    let JWT_Token: string = JWTToken;
    let getFieldsResponse: Field[];// = new Array(5);
    let headers = new HttpHeaders({
      'jwtToken': JWT_Token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'type': requestType
    });
    return this.http.get('http://localhost:8080/Restful/webapi/user/' + userId +
      '/GetFields', { headers: headers })
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw(error.message || 'Server error'));
    // this.http.get('http://localhost:8080/Restful/webapi/user/' + userId +
    //   '/GetFields', { headers: headers }).map(response => response).subscribe(
    //     users => {
    //       this.output = users;
    //       getFieldsResponse = new Array(this.output.length);
    //       for (var i = 0; i < this.output.length; i++) {
    //         //console.log("In userService we just set hasFields to true");
    //         this.hasFields = true;
    //         let f: Field;
    //         f = new Field();
    //         f.fieldId = this.output[i].fieldId;
    //         if (requestType == 'all') {
    //           f.fieldName = this.output[i].fieldName;
    //           f.fieldDecrypted = this.output[i].fieldDecrypted;
    //         }
    //         getFieldsResponse[i] = f;
    //         //console.log(getFieldsResponse[i].fieldId + "," + getFieldsResponse[i].fieldName + "," + getFieldsResponse[i].fieldDecrypted); // 1, "string", false
    //       }
    //     }),
    //   error => {
    //     console.log("ERROR:" + error);
    //   };
    // //return this.output;
  }

  addField(JWTToken, userId, parameter) {
    let uID = userId;
    let JWT_Token: string = JWTToken;

    //let parameter = JSON.stringify(x);
    console.log("JWT:" + JWT_Token);
    console.log("userID in addField():" + userId);
    let params = new HttpParams().set('userId', userId);
    console.log("sending http post request to AddField: " + [parameter]);
    const headers = new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'userId': userId,
      'jwtToken': JWT_Token
    });
    const options = {
      headers
    };
    return this.http.post('http://localhost:8080/Restful/webapi/user/'
      + userId + '/addField',
      parameter, options)
      .subscribe(response => console.log(response));
  }

  modifyField(JWTToken, userId, userField) {
    let uID = userId;
    let JWT_Token = JWTToken;
    const headers = new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'userId': userId,
      'jwtToken': JWT_Token
    });
    const options = {
      headers
    };
    return this.http.put('http://localhost:8080/Restful/webapi/user/' + userId +
      '/modifyField', userField, options).map((response: Response) => response)
      .catch((error: any) => Observable.throw(error.message || 'Server error'));
  }

  deleteField(JWTToken, userId, selectedFieldId) {
    let uID = userId;
    let JWT_Token = JWTToken;
    const headers = new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'userId': userId,
      'jwtToken': JWT_Token
    });
    let parameter = JSON.stringify(selectedFieldId);
    const options = {
      headers
    };
    return this.http.put('http://localhost:8080/Restful/webapi/user/' + userId +
      '/deleteField', parameter, options).subscribe(response => response);
  }


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Response error");
  }
}
