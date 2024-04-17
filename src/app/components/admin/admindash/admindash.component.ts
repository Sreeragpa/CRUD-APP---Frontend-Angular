import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../Services/admin.service';
import { Observable, catchError, map, tap } from 'rxjs';
import { IUser } from '../../../Model/User';
import { LogoutService } from '../../../Services/logout.service';
import { Modal } from 'flowbite';
import { SearchComponent } from '../search/search.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admindash',
  standalone: true,
  imports: [SearchComponent,FormsModule,DeleteConfirmationModalComponent,ReactiveFormsModule],
  templateUrl: './admindash.component.html',
  styleUrl: './admindash.component.css'
})
export class AdmindashComponent implements OnInit {
  error: string | undefined = undefined;
  users?: IUser[];
  colItems : string[] = ["Name","Email","Phone","Actions"];

  user : IUser | null = null;

  filteredUsers?: IUser[]
  userToDelete: string | any = ''
  updateForm!: FormGroup;
  addUserForm!: FormGroup;


  constructor(private router: Router, private adminService:AdminService, private logutService: LogoutService, private fb: FormBuilder){

    this.logutService.getLogoutSignal().subscribe(()=>{
      localStorage.removeItem('adminAccessToken');
      router.navigate(['/admin/login'])
    })


    this.updateForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    })

    this.addUserForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
      password: new FormControl('',[Validators.required,Validators.minLength(10)]),
    })

     
  


  }






  ngOnInit(): void {
    // initFlowbite()

    const adminAccessToken = localStorage.getItem('adminAccessToken');
    if(!adminAccessToken){
      this.router.navigate(['/admin/login'])
    }else{
      this.adminService.getUsers().pipe(
        map((res: any)=>res.data as IUser[]),
        catchError(error =>{
          console.log(error);
          this.error = error
          return new Observable<IUser[]>();
        }),
        tap(users =>{
          console.log(users);
          this.users = users
          this.filteredUsers = this.users
        })
      ).subscribe()
    }
    
  }


  onSearch(query: string){
    this.filteredUsers  = this.users?.filter((user=>{
      const queryLower = query.toLowerCase()
      console.log(queryLower);
      console.log(user.name);
      
      return user.name.toLowerCase().includes(queryLower) || user.email.toLowerCase().includes(queryLower)
    }))
  }


  // Delete Modal
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  onDeleteButtonClick(id: any){
    this.userToDelete = id;
    const modalElement = this.deleteModal.nativeElement;
    modalElement.classList.remove('hidden')
    modalElement.classList.add('flex')
  }

  onCloseButtonClick(){
    this.userToDelete = ''
    const modalElement = this.deleteModal.nativeElement;
    modalElement.classList.add('hidden')
    modalElement.classList.remove('flex')
  }
  onYesButtonClick(){
    this.adminService.deleteUser(this.userToDelete).subscribe(()=>{
      this.filteredUsers = this.filteredUsers?.filter((user)=>{
        return user._id!= this.userToDelete
      })
      this.onCloseButtonClick()
    })
    
  }

  // Edit User Modal
  @ViewChild('editModal') editModal! : ElementRef

  onEditButtonClick(user: IUser){
    this.user = user;
    this.createEditForm(user)
    const modalElement = this.editModal.nativeElement;
    modalElement.classList.remove('hidden')
    modalElement.classList.add('flex')
  }

  onEditCloseClick(){
    const modalElement = this.editModal.nativeElement;
    modalElement.classList.add('hidden')
    modalElement.classList.remove('flex')
  }

  onUpdateButtonClick(id: any){
    if(this.updateForm.valid){
      const formData = this.updateForm.value;
      this.adminService.updateUser(id,formData).subscribe((res)=>{
        this.onEditCloseClick()
        Swal.fire({
          title: 'Success!',
          text: 'User updated successfully.',
          icon: 'success'
        }).then(()=>{
          location.reload()
        });
      },
      (error)=>{
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error'
        });
      }
      )

      // New Method
      const observer = {
        next: (value: any) => {this.onEditCloseClick()
          Swal.fire({
            title: 'Success!',
            text: 'User updated successfully.',
            icon: 'success'
          })},
        error: (error: any) => { 
          Swal.fire({
            title: 'Error!',
            text: 'An Error occured',
            icon: 'error'
          });
        },
        complete: () => { 
           location.reload()
        }
      };

      
    }else{
      this.updateForm.markAllAsTouched()    }
  }

  createEditForm(user: any){
    this.updateForm.get('name')?.setValue(user.name);
    this.updateForm.get('email')?.setValue(user.email);
    this.updateForm.get('phone')?.setValue(user.phone);
  }


  // Add User
  @ViewChild("addUserModal") addUserModal!: ElementRef
  addUserSubmit(){
    if(this.addUserForm.valid){
      const formData = this.addUserForm.value
      this.adminService.createUser(formData).subscribe((response)=>{
        console.log(response.data);
        this.users?.push(response.data)
        
        Swal.fire({
          title: 'Success!',
          text: 'User Created successfully.',
          icon: 'success'
        }).then(()=>{
          const toggleButton = document.getElementById('addUser-modal-closebtn');
          toggleButton?.click()
        });
      })
      console.log(this.addUserForm.value);
    }
    
  }



  testfn(){
    console.log(this.addUserForm.value);
    
  }

}
