import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Auth } from "aws-amplify";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = "bhaumik";

  constructor(private router: Router) {}

  ngOnInit() {}

  onLogOut() {
    Auth.signOut()
      .then(data => {
        console.log(data);
        console.log("You are successfully logged out");
        this.router.navigate(["/login"]);
      })
      .catch(err => console.log(err));
  }

}
