import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  parent:string=undefined
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
    for(i=0;i<this.selectedFiles.length;i++){
      file = this.selectedFiles.item(i);
      this.uploadService.uploadfile(file,this.parent);    
    }
    
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
    //var i
    //for(i=0;i<this.selectedFiles.length;i++){
      //console.log(this.selectedFiles.item(i).name)
    //}
  }

  msgFromChild(msg){
    this.parent=msg
    //console.log("FromUpload: "+msg)
  }

}
