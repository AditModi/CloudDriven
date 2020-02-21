import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  logFlag;
  constructor(private login:LoginService,private router:Router) { }

  ngOnInit() {
    this.login.isLoggedIn.subscribe(data=>this.logFlag=data);
  }

  logout(){
    
      Auth.signOut()
        .then(data => {
          console.log(data);
          console.log("You are successfully logged out");
          localStorage.removeItem('user')
          this.login.change(false)
          
        })
        .catch(err => console.log(err));
    
  }

  
  

}
