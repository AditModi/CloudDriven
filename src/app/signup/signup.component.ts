import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { FileUploadService } from '../file-upload.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signstatus: string = 'signin'
  toVerifyEmail: boolean = false;
  userName: string;

  constructor( private route: Router,private uploadService:FileUploadService,private logservice:LoginService) { }

  ngOnInit() {
    if(localStorage.getItem('user')!=null){
      alert("You are already logged in!")
      this.route.navigate(['dashboard'])
    }
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
        this.uploadService.CreateDiectory(this.userName+"/")
        this.uploadService.CreateDiectory("Profile/"+this.userName+'/')

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
      localStorage.setItem('user',authInfo.username)
      this.logservice.change(true)
      this.route.navigate(['/dashboard'])
    })
      .catch(err => console.log(err));
    
      

  }

  CreateDiectory() {
    const params = {
      Bucket: this.uploadService.BUCKET,
      Key: this.userName,
      ACL: 'public-read'
    }

    this.uploadService.getS3Bucket().putObject(params, function (err, data) {
      if (err) {
        console.log(err)
      }
      else {
        console.log(data)
      }
    })
  }

}
