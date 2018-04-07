import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }
  public errorMsg;
  ngOnInit() {
  }

  signUp() {
    var userId = (<HTMLInputElement>document.getElementById("userId")).value;
    var password1 = (<HTMLInputElement>document.getElementById("password")).value;
    var password2 = (<HTMLInputElement>document.getElementById("password1")).value;
    if (userId.length > 3) {
      if (password1 == password2) {
        if (password1.length > 3) {
          console.log((<HTMLInputElement>document.getElementById("userId")).value);
          var password = (<HTMLInputElement>document.getElementById("password")).value + "/79jjy";
          let userInput = this.loginService.encryptString(userId + ":" + password);
          console.log("I'm sending from angular:" + userInput);
          var userSignUp: boolean;
          userSignUp = false;
          this.loginService.signUp(userInput)
            .subscribe(
              data => {
                userSignUp = true;
                alert("Succesfully Signed Up");
                console.log('success', data)
              },
              error => {
                console.log('UserSignUp Failed:', error)
              }
            );
          setTimeout(() => {
            if (userSignUp) {
              this.router.navigate(['./login']);
            } else {
              alert("Unable to sign up. Please try again with different user Name.")
              this.pageRefresh();
            }
          },
            100);
        } else {
          alert("Password cannot be less than 4 characters. Please try again.");
          this.pageRefresh();
        }
      } else {
        alert("Passwords do not match. Please try again.");
        this.pageRefresh();
      }
    } else {
      alert("UserId cannot be less than 4 characters. Please try again.");
      this.pageRefresh();
    }

  }

  pageRefresh() {
    location.reload();
  }

}
setTimeout