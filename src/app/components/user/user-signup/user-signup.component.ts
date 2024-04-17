import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule ,FormGroup,Validators,FormControl } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  signupForm!: FormGroup;
  isSubmitting:boolean = false

  constructor(private fb:FormBuilder,private userService: UserService, private router: Router){  
    this.signupForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
      password: new FormControl('',[Validators.required]),
    })
  }

  onSubmit(){
    if(this.signupForm.valid){
      const formData = this.signupForm.value;
      this.isSubmitting = true;  
      this.userService.createUser(formData).subscribe((response)=>{
        Swal.fire({
          title: 'Success!',
          text: 'User Created successfully.',
          icon: 'success'
        }).then(()=>{
          this.router.navigate(['/login'])
        });
      })
      setTimeout(()=>{
        this.isSubmitting = false;
      },2000)

    }else{
      this.signupForm.markAllAsTouched()
    }
  }
}
