import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { Router } from '@angular/router';

import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { integer } from 'aws-sdk/clients/cloudfront';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  color:ThemePalette='primary';
  selectedFiles: FileList;
  files:any=[]
  parent:string=undefined
  flag:integer=0
  constructor(private uploadService: FileUploadService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null){
      alert("Log in to upload files")
      this.router.navigate(['login'])
    }
  }

  upload() {
    var i
    var file
    for(i=0;i<this.files.length;i++){
      file = this.files[i];
      this.uploadService.uploadfile(file,this.parent);
    }
    this.files.splice(0,this.files.length)
    this.flag=1

  }

  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  //   var i
  //   for(i=0;i<this.selectedFiles.length;i++){
  //     console.log(this.selectedFiles.item(i).name)
  //   }


  //}

  uploadFile(event) {

    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
      console.log(element)

    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  msgFromChild(msg){
    this.parent=msg
    //console.log("FromUpload: "+msg)
  }

  filesPicked(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path:Array<String> = file.webkitRelativePath.split('/');
        //console.log(file)

        var fname=path.pop()


        var uploadPath = this.parent+path.join('/')+'/';
        console.log(i)
        console.log("path :"+uploadPath)
        console.log("File :"+fname)

      this.uploadService.CreateDiectory(uploadPath)
      this.uploadService.uploadfile(file,uploadPath);
    }
}


}
