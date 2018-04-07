import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module'; // material design cmpnts collection.

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardAddComponent } from './dashboard-add/dashboard-add.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { DashboardManageComponent } from './dashboard-manage/dashboard-manage.component';
import { AuthenticateGuard } from './authenticate.guard';
import { OnlyLoggedInUsersGuard } from './OnlyLoggedInUsersGuard'
import { Router } from '@angular/router';
import { UserService } from './user.service';
// Import the ButtonsModule


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SignUpComponent,
    PageNotFoundComponent,
    DashboardMenuComponent,
    DashboardAddComponent,
    DashboardViewComponent,
    DashboardManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [LoginService, AuthenticateGuard, UserService,OnlyLoggedInUsersGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  public msg;
  public userLoggedIn;
  constructor(public loginService: LoginService,
    private router: Router) {
    console.log("App module constructor called");
    this.msg = "HomePage";
    // this.userLoggedIn = this.loginService.isLogged;
    this.userLoggedIn = this.loginService.isLogged;
    console.log("userLoggedin:"+this.userLoggedIn);
  }

  Login(e){
    this.router.navigate(['login']);
    this.userLoggedIn = this.loginService.isLogged;
    //, { relativeTo: this.route })
  }

}
