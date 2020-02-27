import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Auth } from "aws-amplify";
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';
import { FileUploadService } from '../file-upload.service';
import { FileUpload } from '../file-upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[StorageService]
})
export class UserProfileComponent implements OnInit {
  url = '';
  space;
  sflag
  uname:string="";
  fileUploads: Observable<Array<FileUpload>>;
  constructor(private router: Router,private logservice:LoginService,private uploadService:FileUploadService) { }
  user:any;
  ngOnInit() {
    this.uname=localStorage.getItem('user')
    //this.space=this.storageService.calculateSpace()
    //this.storageService.UsedSpace.subscribe(data=>this.space=data);
    this.sflag=false
    this.fileUploads=this.uploadService.getFiles()
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

  calculateSpace(){
    var s=0
    this.fileUploads.subscribe(data=>data.forEach(function(val){
      //console.log(val)
      s= s+val.size
    }))
    this.space=s
    this.sflag=true;
    
  }

}
