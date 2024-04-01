import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorpageComponent } from './components/core/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserloginComponent } from './components/user/userlogin/userlogin.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, children: [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'login', component: UserloginComponent, outlet: 'primary' },
        { path: 'admin', redirectTo: "admin/login",pathMatch: 'full' },
        { path: 'admin/login', component: AdminLoginComponent, outlet: 'primary' },
        { path: 'signup', component: UserSignupComponent, outlet: 'primary' },
    ] },
    {path:'**',loadComponent:()=>import('./components/core/errorpage/errorpage.component').then(m=>m.ErrorpageComponent)}, //Lazy Loading

];
