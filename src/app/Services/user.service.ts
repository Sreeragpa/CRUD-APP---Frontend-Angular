import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../_model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api/';
  
  constructor(private http:HttpClient) {  }

  createUser(userData: User): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    ;    
    return this.http.post<any>(this.apiUrl + 'user', userData,options);
  }
}
