import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule ,FormGroup,Validators,FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent {
  loginForm!: FormGroup
  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      const formData = this.loginForm.value;
      console.log('Login Success',formData);
      
    }else{
      this.loginForm.markAllAsTouched()
    }
  }
}
