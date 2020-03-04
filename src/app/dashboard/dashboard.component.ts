import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Auth } from "aws-amplify";
import { LoginService } from '../login.service';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  uname:string="";
  profile;
  constructor(private router: Router,private logservice:LoginService,private uploadService:FileUploadService) {}
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
    this.uploadService.getProfile().subscribe(data=>{
      this.profile=data
    })

  }

  onLogOut() {
    Auth.signOut()
      .then(data => {
        console.log(data);
        console.log("You are successfully logged out");
        localStorage.removeItem('user')
        this.logservice.change(false)
        this.router.navigate(["/login"]);
      })
      .catch(err => console.log(err));
  }

}
