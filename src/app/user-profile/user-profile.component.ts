import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Auth } from "aws-amplify";
import { LoginService } from '../login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  url = '';
  uname:string="";
  constructor(private router: Router,private logservice:LoginService) { }
  user:any;
  ngOnInit() {
    this.uname=localStorage.getItem('user')
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  public delete(){
    this.url = null;
  }

}
