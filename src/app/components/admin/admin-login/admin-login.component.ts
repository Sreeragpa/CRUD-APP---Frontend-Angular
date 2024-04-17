import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { Observable, catchError, filter, map, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{
  loginForm!: FormGroup;
  error: string | null = null;
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router){
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }
  adminToken: string = ''

  onSubmit(){
    
    if(this.loginForm.valid){
      const formData = this.loginForm.value;

      this.adminService.login(formData).pipe(
        map((response:any)=>response.accessToken as string),
        catchError(error=>{
          console.log(error);
          if(error.status == 401)
           this.error = "Invalid Credentials"
           return new Observable<string>();
        }),
        tap(accessToken=>{
          console.log(accessToken);
          
          if(accessToken){
            localStorage.setItem('adminAccessToken',accessToken);
            this.router.navigate(['/admin'])
          }
        })
      ).subscribe();
      
    }else{
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('adminAccessToken');
    if(token){
      this.router.navigate(['/admin'])
    }
  }

}
