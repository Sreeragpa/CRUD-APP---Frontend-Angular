import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }

  private logoutSubject = new Subject<void>();

  emitLogout(){
    console.log("in logout service");
    
    this.logoutSubject.next();
  }

  getLogoutSignal(){
    return this.logoutSubject.asObservable();
  }
}
