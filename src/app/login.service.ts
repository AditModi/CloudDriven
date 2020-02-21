import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//@Injectable({
  //providedIn: 'root'
//})
export class LoginService {
  private src = new BehaviorSubject(false);
  isLoggedIn=this.src.asObservable();
  constructor() {
    this.change(localStorage.getItem('user')!=null)
   }

  change(flag:boolean){
    this.src.next(flag);
  }
}
