import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login.service';
import { JWT_Token } from '../user';
import { Router, ActivatedRoute } from '@angular/router'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { AppModule } from '../app.module';
import * as abc from '../../../node_modules/jssha/src/sha.js';
import * as aes from '../../../node_modules/crypto-js'
declare var require: any;
declare var jsSHA: any;
declare var jsAES: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input('parentName') public childParent;
  @Output() public childEvent = new EventEmitter();
  shaObj: any;
  hashedPassword: string;
  public JWTToken: JWT_Token;
  public errorMsg;
  public isClicked;// = false;
  public userLoggedIn;// = false;
  constructor(private loginService: LoginService, private router: Router,
    private route: ActivatedRoute) {
    this.isClicked = false;
    this.userLoggedIn = false;
    console.log("Login Componenet Constructor called");
  }

  ngOnInit() {
    this.isClicked = false;
    this.userLoggedIn = false;
    this.JWTToken = null;
    console.log("Login Componenet NGOnInit called");
  }

  login() {

    if ((<HTMLInputElement>document.getElementById("userId")).value.length > 3
      && (<HTMLInputElement>document.getElementById("password")).value.length > 3) {
      let userPassword = (<HTMLInputElement>document.getElementById("password")).value + "/79jjy";
      this.loginService.loginUser((<HTMLInputElement>document.getElementById("userId")).value, userPassword)
        .subscribe(data => {
          this.JWTToken = data;
          this.isClicked = true;
          console.log("We check for JWT Tokena here")
          if (this.JWTToken) {
            console.log("We check for JWT Tokena nd it is yes.")
            this.loginService.JWTToken = this.JWTToken;
            console.log("Login User Succesful with token:" + this.loginService.JWTToken);
            this.loginService.isLogged = true;
          } else {
            console.log("It is null");
          }
        });
      setTimeout(() => {
        if (this.loginService.isLogged == true) {
          this.router.navigate(['dashboard'], { relativeTo: this.route });
        } else {
          alert("Please enter correct details.")
          this.pageRefresh();
        }
      },
        100);
    } else {
      alert("Please enter correct values for UserId and password.");
      this.pageRefresh();
    }

  }
  pageRefresh() {
    location.reload();
  }
}
