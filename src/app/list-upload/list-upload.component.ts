import { Component, OnInit, Input, Output, EventEmitter,AfterViewChecked } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import * as $ from 'jquery'
import * as JSZip from 'jszip'
import * as JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver';
import { FileUpload } from '../file-upload';
import { FileUploadService } from '../file-upload.service';
import { int } from 'aws-sdk/clients/datapipeline';
import { Shared } from '../shared';
import { SharedService } from '../shared.service';


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
  isSingleClick: Boolean = true;


  fileUploads: Observable<Array<FileUpload>>;
  level: int
  @Output() public childEvent = new EventEmitter()
  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    this.level = 0


    $('.tosection2').click(function(){
      $('html, body').animate({
          scrollTop: $( $(this).attr('href') ).offset().top
      }, 500);
      return false;
  });




    //var str="bhaumik1/mydir/file.jpg"
    //var arr =  str.split('/')
    //console.log(arr)
    //console.log(arr.length)


  }

  background() {
    this.isSingleClick = true;
 setTimeout(()=>{
        if(this.isSingleClick){

        }
     },250);


  }

  traverse (file: FileUpload) {

    this.isSingleClick = false;

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

    alert('Double Click Event')
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

  download(path:string) {
    var zip = new JSZip()
    var count = 0
    var t=path.split('/')
    t.pop()
    var zipName = t.pop();
    var files: Array<FileUpload> = []
    this.fileUploads.subscribe(data => data.forEach(function (val) {
      if (val.name.startsWith(path) && !val.name.endsWith('/')) {
        files.push(val)
      }
    })
    )
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


