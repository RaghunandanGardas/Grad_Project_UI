import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input('parentName') public childParent;
  @Output() public childEvent = new EventEmitter();
  public count = 0;
  public userDetails :  IUser[];
  public  JWTToken = "ss";
  public errorMsg;
  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    //this._userService.loginUser("m0KIiYHy7b4A0IoyLnF88J0+avoXibdNKkG0WH3a2qwc6D3sgTKiwEh2iUBRpw6F").subscribe(data => this.userDetails = data);
  }

  fireEvent() {
    this.childEvent.emit('hey Parent' + this.count++);
  }

  login() {
    this._userService.loginUser((
      (<HTMLInputElement>document.getElementById("textbox")).value))
      .subscribe(
        data => this.userDetails = data,
        error => this.errorMsg = error);
    this.JWTToken=this.userDetails[0].JWTToken;
  }
  greet(event) {
    var userName = ((<HTMLInputElement>document.getElementById("login")).value);
    var Password = ((<HTMLInputElement>document.getElementById("pwd")).value);
    alert("UID:" + userName + ",PWD:" + Password);
    console.log(event);
  }
}
