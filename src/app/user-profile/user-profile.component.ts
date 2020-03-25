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
      ['Image', 0.0],
      ['Pdf', 0.0],
      ['Other',0.0]
   ];
   columnNames = ['Space', 'Percentage'];
   options = {
    backgroundColor: { fill:'transparent' }
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
    var img=0;
    var pdf=0;
    var oth=0;
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
    this.lst.forEach(function(val){
      if(val.name.endsWith('jpg') || val.name.endsWith('png')){
        img = img + val.size;
      }
      if(val.name.endsWith('pdf')){
        pdf = pdf + val.size;
      }
    })
    //console.log(img)
    //console.log(pdf)
    oth = s-img-pdf;
    img = (img/s)*100
    pdf=(pdf/s)*100
    oth=(oth/s)*100
    //console.log(img+" "+pdf+" "+oth)
    this.data[0][1]=img;
    this.data[1][1]=pdf;
    this.data[2][1]=oth
    this.space = s
    this.sflag = true;
    var h=document.getElementById("heightset");
    h.style.height='1100px';
    console.log(h.style.height)

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
