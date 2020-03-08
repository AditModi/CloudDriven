import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Shared } from '../shared';
import { FileUpload } from '../file-upload';
import * as JSZip from 'jszip'
import * as JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver';
import { FileUploadService } from '../file-upload.service';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-shared-list',
  templateUrl: './shared-list.component.html',
  styleUrls: ['./shared-list.component.css']
})
export class SharedListComponent implements OnInit {

  @Input() list:Shared[]
  uname = localStorage.getItem('user')
  dname: string;
  parent: string;
  showFile = false;
  level;
  fileUploads: Array<FileUpload[]>=[];
  @Output() public childEvent = new EventEmitter()
  constructor(private uploadService: FileUploadService,private sharedServ:SharedService) { }

  ngOnInit() {
    //console.log(this.list)
    this.level=1
    //alert("Share")
    this.parent=""
    ///this.uploadService.getSharedAll(this.list).subscribe(data=>{
     // this.fileUploads=data
   // })
    // for(let i=0;i<this.list.length;i++){
    //   this.uploadService.getShared(this.list[i].folder.name).subscribe(data=>{
    //     for(let j=0;j<data.length;j++){
    //       this.fileUploads.push(data[j])
    //       alert('In')
    //     }
    //   })
    // }

  }

  remove(folder:FileUpload){
    for(let l of this.list){
      if(l.folder.name==folder.name){
        l.users.splice(l.users.indexOf(this.uname),1)
        this.sharedServ.update(l).subscribe(data=>console.log(data))
      }
    }
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

  download(path:string) {
    var zip = new JSZip()
    var count = 0
    var t=path.split('/')
    t.pop()
    var zipName = t.pop();
    var files: Array<FileUpload> = []
    this.fileUploads.forEach(function (f) {
      f.forEach(function(val){
        if (val.name.startsWith(path) && !val.name.endsWith('/')) {
          files.push(val)
        }
      })

    })

    files.forEach(function (val) {
      var filename = val.name.split('/').pop()
      JSZipUtils.getBinaryContent(val.url, function (err, data) {
        if (err) {
          throw err; // or handle the error
        }
        zip.file(filename, data, { binary: true });
        count++;
        if (count == files.length) {
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            saveAs(content, zipName);
          })

        }
      })
    })
  }
}
