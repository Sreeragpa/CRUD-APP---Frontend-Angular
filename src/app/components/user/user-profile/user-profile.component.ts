import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../Store/appState.inteface';
import { Observable } from 'rxjs';
import { IUser } from '../../../Model/User';
import { userSelector } from '../../../Store/selectors';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../../../Services/user.service';
import * as UserActions from '../../../Store/user.actions';

import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getUser, userProfileUpdateSuccess } from '../../../Store/user.actions';

interface UploadProfileResponse {
  data: IUser;
  message: string;
}
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AsyncPipe, FileUploadModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user$: Observable<IUser | null>;
  user!: IUser;
  fileError!: string;
  fileloading: boolean = false;
  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private userService: UserService,
    private fireStorage: AngularFireStorage
  ) {
    this.user$ = this.store.pipe(select(userSelector));
  }
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login'])
      return
    }
    this.user$.subscribe((value) => {
      this.user = value!;

      if (!value?.name) {
        // this.router.navigate(['/login']);
        this.store.dispatch(UserActions.getUser())
      }

     
    });
  }

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const blob = new Blob([event.target.result], { type: file.type });
      const fileType: string = file.type;

      console.log(blob);

      if (fileType.split('/')[0] !== 'image') {
        this.fileError = 'Upload Images Only';
        // event.target.value = '';
        console.log('Upload Images Only');
        return;
      }
      const myFormdata = new FormData();
      console.log(myFormdata);

      myFormdata.append('file', file, 'gd.png');

      console.log(file);

      // this.userService.uploadProfile(blob).subscribe(()=>{
      //   console.log("hehehhe");

      // })
      console.log(myFormdata);
    }
  }

  async onUpload($event: FileUploadEvent) {
    // console.log($event);
    this.fileloading = true;
    const file = $event.files[0];

    if (file) {
      const path = `files/${file.name}`;
      const uploadedFile = await this.fireStorage.upload(path, file);
      const downloadURL = await uploadedFile.ref.getDownloadURL();
      console.log('urll', downloadURL);

      this.userService.uploadProfile(downloadURL).subscribe((res) => {
        const { data } = res as UploadProfileResponse;

        this.fileloading = false;

        this.store.dispatch(userProfileUpdateSuccess({ user: data }));
      });
    }
  }
}
