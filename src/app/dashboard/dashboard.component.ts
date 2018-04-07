import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { JWT_Token } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public JWTToken:JWT_Token;
  public userId: string;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {
    this.JWTToken = this.loginService.JWTToken;
    this.userId = this.loginService.userId;
    console.log("DashboardCmp constructor called!");
  }
  ngOnInit() {
    this.JWTToken=this.loginService.JWTToken;
    this.userId=this.loginService.userId;
    console.log("set jwttoken and user id in ngonint in dashboardCompoonent :"+this.JWTToken.JWTToken);
  }
  showAdd() {
    //Page Not Found
    this.router.navigate(['home'], { relativeTo: this.route })
  }
  showManage() {
    this.router.navigate(['manage'], { relativeTo: this.route })
  }
  showView() {
    this.router.navigate(['view'], { relativeTo: this.route })
  }
}
