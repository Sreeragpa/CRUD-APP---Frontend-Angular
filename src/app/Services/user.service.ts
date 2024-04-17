import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserLoginFormData } from '../Model/User';



@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  private apiUrl = 'http://localhost:4000/api/';

  constructor(private http: HttpClient) {}

  createUser(userData: IUser): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'user', userData, this.getHttpOptions());
  }

  loginUser(UserLoginFormData: IUserLoginFormData): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'user/login',
      UserLoginFormData,
      this.getHttpOptions()
    );
  }

  getUser() {
    // throw new Error('Method not implemented.');
    const token = localStorage.getItem('token');
    const options = this.getHttpOptionsWithToken(token);
    return this.http.get<any>(this.apiUrl + 'user', options);
  }

  uploadProfile(imgUrl: any){

    const token = localStorage.getItem('token');
    // const options = { headers: new HttpHeaders({
    //   'Content-Type': 'multipart/form-data',
    //   'Authorization': `${token}`,
    // })}
   
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }),
    };
    
    console.log("In service",imgUrl);
    // const options = this.getHttpOptionsWithToken(token);
    const formdataa = new FormData();
    const urlll = {
      "url":imgUrl
    }
    formdataa.append('img',imgUrl)
    return this.http.post(this.apiUrl + `user/uploadprofile`,urlll,options)
  }



  private getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private getHttpOptionsWithToken(token: string | null): { headers: HttpHeaders } {
    if (!token) {
      throw new Error('No token available.');
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token,
      }),
    };
  }
}
