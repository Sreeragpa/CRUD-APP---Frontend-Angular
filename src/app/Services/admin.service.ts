import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserLoginFormData } from '../Model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:4000/api/';
  constructor(private http: HttpClient) { }

  login(formData:IUserLoginFormData){
    console.log("In admin Service");
    return this.http.post(this.apiUrl + '/admin/login',formData,this.getHttpOptions())
  }

  getUsers(){
    console.log("In Admin Service get Users");
    const adminAccessToken = localStorage.getItem('adminAccessToken');
    return this.http.get(this.apiUrl + '/users',this.getHttpOptionsWithToken(adminAccessToken))
    
  }

  updateUser(id:string,userData: any){
    console.log("Update userdata from service",userData,id);
    const adminAccessToken = localStorage.getItem('adminAccessToken');
    return this.http.put(this.apiUrl + `/user/${id}`,userData,this.getHttpOptionsWithToken(adminAccessToken))
  }

  deleteUser(id:string){
    const adminAccessToken = localStorage.getItem('adminAccessToken');
    return this.http.delete(this.apiUrl + `/user/${id}`,this.getHttpOptionsWithToken(adminAccessToken))
  }
  createUser(userData: IUser): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'user', userData, this.getHttpOptions());
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
