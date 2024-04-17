import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../Store/appState.inteface';
import { Observable } from 'rxjs';
import { userSelector } from '../../../Store/selectors';
import { IUser } from '../../../Model/User';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import * as UserActions from '../../../Store/user.actions';
import { LogoutService } from '../../../Services/logout.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [AsyncPipe,RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  user$: Observable<IUser | null>
  user: IUser | null | undefined


  constructor(private store:Store<IAppState>, private router: Router, private logoutService: LogoutService){
    this.user$ = this.store.pipe(select(userSelector))
    this.logoutService.getLogoutSignal().subscribe(()=>{
      localStorage.removeItem('token')
      router.navigate(['/login'])
    })
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token){
      console.log("no token");
      this.router.navigate(['/login']);
    }
    this.user$.subscribe((value)=>{
      console.log(value);
      this.user = value
    })
    if(token && !this.user){
      console.log("hee");
      this.store.dispatch(UserActions.getUser())
      
    }
  }





}


