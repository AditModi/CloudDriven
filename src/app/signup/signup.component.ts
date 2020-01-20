import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signstatus: string = 'signin'
  toVerifyEmail: boolean = false;
  userName: string;

  constructor( private route: Router) { }

  ngOnInit() {
  }

  onSignUp() {
    this.signstatus = 'signup';
  }

  onSignIn() {
    this.signstatus = 'signin';
  }

  singUpToAWS(email: HTMLInputElement,contactNo: HTMLInputElement,username: HTMLInputElement,password: HTMLInputElement) {
    
    this.userName = username.value;

    const user = {
      username: username.value,
      password: password.value,
      attributes: {
          email: email.value,          // optional
          phone_number: contactNo.value,   // optional - E.164 number convention
          // other custom attributes 
      }
    }

    
    Auth.signUp(user)
      .then(data => {
        console.log(data);
        this.toVerifyEmail = true;
        this.signstatus = "";
      })
      .catch(err => console.log(err));
  
  // Auth.resendSignUp(username).then(() => {
  //     console.log('code resent successfully');
  // }).catch(e => {
  //     console.log(e);
  // });

  }

  onVerify(verifycode: HTMLInputElement) {
    // After retrieving the confirmation code from the user
    Auth.confirmSignUp(this.userName, verifycode.value, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true    
      }).then(data => {
        console.log(data)
        this.toVerifyEmail = false;
        this.signstatus = 'signin'
      })
        .catch(err => console.log(err));
  }

  signInToAWS(email: HTMLInputElement, password: HTMLInputElement ) {

    const authInfo = {
      username: email.value,
      password: password.value
    }

    Auth.signIn(authInfo).then(user => {
      console.log(user);
      this.route.navigate(['/dashboard'])
    })
      .catch(err => console.log(err));

  }


}
