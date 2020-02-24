import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';


import { FileUpload } from '../file-upload';
import { FileUploadService } from '../file-upload.service';
import { int } from 'aws-sdk/clients/datapipeline';


@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  uname = localStorage.getItem('user')
  dname: string;
  parent: string;
  showFile = false;
  fileUploads: Observable<Array<FileUpload>>;
  level: int
  @Output() public childEvent = new EventEmitter()
  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    this.level = 0
    //var str="bhaumik1/mydir/file.jpg"
    //var arr =  str.split('/')
    //console.log(arr)
    //console.log(arr.length)

  }
  traverse(file: FileUpload) {

    this.level = this.level + 1
    if (this.level == 1) {
      this.parent = this.uname + "/"

    }
    else {
      this.parent = file.name
    }
    this.childEvent.emit(this.parent)
    console.log(this.parent)
    console.log(this.level)
  }

  revTraverse() {
    this.level = this.level - 1;
    if (this.level > 0) {
      var temp = this.parent.split('/')

      temp.pop();
      temp.pop();

      this.parent = temp.join('/') + '/';

      console.log("back:" + this.parent);
    }
    else {
      this.parent = undefined;
    }
    this.childEvent.emit(this.parent)
  }



  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();

    }
  }

  createDirectory() {
    //console.log(this.dname)
    this.uploadService.CreateDiectory(this.parent + this.dname + "/")

  }

  deleteDirectory(path) {
    var c = 0;
    //count number of items in directory
    this.fileUploads.subscribe(data => data.forEach(function (val) {
      
      if (val.name.startsWith(path) && val.name != path) {
        c = c + 1;
      }
    }))
    console.log(c)

    if (c == 0) {
      //Delete directory
      this.uploadService.DeleteDirectory(path)

      this.fileUploads.subscribe(data => {
        var i = data.indexOf(path)
        data.splice(i, 1);
      })
      //this.showFiles(true)
    }



    else {
      alert("Only empty directories can be deleted")
    }

  }
}


