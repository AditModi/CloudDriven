import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Auth } from "aws-amplify";
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';
import { FileUploadService } from '../file-upload.service';
import { FileUpload } from '../file-upload';
import { Observable } from 'rxjs';
import { lstat } from 'fs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [StorageService]
})
export class UserProfileComponent implements OnInit {


  url = '';
  dp:FileUpload;
  space;
  sflag
  uname: string = "";
  picflag=false;
  lflag=false;
  lst:Array<FileUpload>=[]
  fileUploads: Observable<Array<FileUpload>>;
  profile: Array<FileUpload>;
  constructor(private router: Router, private logservice: LoginService, private uploadService: FileUploadService) { }
  user: any;
  pic;
  type = 'PieChart';
   data = [
      ['Firefox', 45.0],
      ['IE', 26.8],
      ['Chrome', 12.8],
      ['Safari', 8.5],
      ['Opera', 6.2],
      ['Others', 0.7]
   ];
   columnNames = ['Browser', 'Percentage'];
   options = {
   };
   width = 550;
   height = 400;
  ngOnInit() {
    this.uname = localStorage.getItem('user')
    //this.space=this.storageService.calculateSpace()
    //this.storageService.UsedSpace.subscribe(data=>this.space=data);
    this.sflag = false
    this.fileUploads = this.uploadService.getFiles()
    this.uploadService.getProfile().subscribe(data=>{
      this.profile=data
    })
    console.log(this.profile)

    //this.getPhoto()

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.pic = event.target.files[0];
      this.picflag=true;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  public delete() {
    this.url = null;
    this.picflag=false;
  }

  calculateSpace() {
    var s = 0
    var list:FileUpload[]=[]
    this.fileUploads.subscribe(data => data.forEach(function (val) {
      //console.log(val)
      s = s + val.size
      if(!(val.name.endsWith('/'))){
        list.push(val)
      }
    }))
    this.lst = list.sort(function(a,b){
      return b.size-a.size
    })
    console.log(this.lst)
    this.space = s
    this.sflag = true;

  }

  getPhoto() {
    var files: FileUpload[];
    //this.profile.subscribe(data => {
    //files=data

  //})
}

  upload() {

    //console.log(file)
    this.uploadService.deleteFile(this.profile[1])
    if (this.pic) {

      this.uploadService.uploadfile(this.pic, "Profile/" + this.uname + "/");
      this.picflag=false;
      console.log("updated profile pic");
    }
  }

  deleteFile(file) {
    this.uploadService.deleteFile(file);
    this.lst.splice(this.lst.indexOf(file),1)
    //window.location.reload();
  }

}
