import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { DashboardAddComponent } from './dashboard-add/dashboard-add.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { DashboardManageComponent } from './dashboard-manage/dashboard-manage.component';
import { AuthenticateGuard } from './authenticate.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthenticateGuard],
        children: [{
            path: 'dashboard',
            canActivate: [AuthenticateGuard],
            component: DashboardComponent,
            children: [
                { path: '', component: DashboardAddComponent },
                { path: 'home', component: DashboardAddComponent },
                { path: 'manage', component: DashboardManageComponent },
                { path: 'view', component: DashboardViewComponent }
            ]
        }]
    },
    { path: 'signup', component: SignUpComponent },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

export const routingComponents = [DashboardComponent,
    LoginComponent,
    DashboardAddComponent,
    DashboardViewComponent];