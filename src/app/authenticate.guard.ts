import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { UserService } from './user.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private loginService: LoginService, private userService: UserService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("Auth Guard Invoked");
    console.log("Activatetd Route:" + next.toString());
    if (next.toString().includes("login")) {
      if (!this.loginService.isLogged) {
        console.log("AUTH Guard active route has login");
        return true;
      } else
        return false;
    } else if (next.toString().includes("dashboard")) {
      console.log("In canActivate Dashboard");
      if (this.loginService.isLogged){
        return this.loginService.isLogged;
      }
      else{
        console.log("You aren't logged In. Please login to access dashboard");
        return false;
      }
    } else {
      alert("isLogged is:" + this.loginService.isLogged);
      return false;
    }
  }
}
