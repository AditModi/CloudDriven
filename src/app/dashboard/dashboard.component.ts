import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Auth } from "aws-amplify";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  uname:string="";
  constructor(private router: Router) {}
  user:any;
  ngOnInit() {
    // if( Auth.currentSession()==null ){
    //   console.log("not logged in")
    //   this.router.navigate(['/login'])
    // }
    // else{
      //this.user = Auth.currentUserInfo()
      //this.user.then(data=>this.uname=data.username)
   // }
    this.uname=localStorage.getItem('user')
    if(this.uname==null){
      alert("You are not logged in")
      this.router.navigate(['login'])
    }

  }

  onLogOut() {
    Auth.signOut()
      .then(data => {
        console.log(data);
        console.log("You are successfully logged out");
        localStorage.removeItem('user')
        this.router.navigate(["/login"]);
      })
      .catch(err => console.log(err));
  }

}
