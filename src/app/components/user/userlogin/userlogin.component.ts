import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule ,FormGroup,Validators,FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../../../Store/user.actions';
import { errorSelector, isLoadingSelector } from '../../../Store/selectors';
import { Observable } from 'rxjs';
import { IAppState } from '../../../Store/appState.inteface';
import { AsyncPipe, CommonModule } from '@angular/common';




@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,AsyncPipe,CommonModule],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent implements OnInit {
  loginForm!: FormGroup
  isLoading$: Observable<boolean>
  loginError$: Observable<any>
  constructor(private fb: FormBuilder, private store: Store<IAppState>,private router : Router){
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })

    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.loginError$ = this.store.pipe(select(errorSelector))
  
  }

  

  onSubmit(){
    this.loginError$.subscribe((error)=>{
      console.log("error from onSumbit",error);
      
    })
    if(this.loginForm.valid){   
      const formData = this.loginForm.value;
      console.log("Login Dispatched",formData);
      this.store.dispatch(UserActions.loginUser({formData:formData}))
      
    }else{
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.router.navigate(['/'])
    }
  }

}
