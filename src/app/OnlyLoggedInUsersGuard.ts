import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { UserService } from './user.service';
@Injectable()

export class OnlyLoggedInUsersGuard implements CanActivate {
    constructor(private loginService: LoginService) { };

    canActivate() {
        console.log("OnlyLoggedInUsers");
        if (this.loginService.isLogged) {
            return true;
        } else {
            window.alert("You don't have permission to view this page");
            return false;
        }
    }
}