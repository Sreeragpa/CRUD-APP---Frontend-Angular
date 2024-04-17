import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorpageComponent } from './components/core/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserloginComponent } from './components/user/userlogin/userlogin.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdmindashComponent } from './components/admin/admindash/admindash.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, children: [
        // { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: '', component: UserDashboardComponent, outlet: 'primary' },
        { path: 'login', component: UserloginComponent, outlet: 'primary' },
        { path: 'profile', component: UserProfileComponent, outlet: 'primary' },
        { path: 'admin', component:AdmindashComponent, outlet: 'primary'},
        { path: 'admin/login', component: AdminLoginComponent, outlet: 'primary' },
        { path: 'signup', component: UserSignupComponent, outlet: 'primary' },
    ] },
    {path:'**',loadComponent:()=>import('./components/core/errorpage/errorpage.component').then(m=>m.ErrorpageComponent)}, //Lazy Loading

];
