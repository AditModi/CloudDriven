import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from '../file-upload';
import { FileUploadService } from '../file-upload.service';
import { int } from 'aws-sdk/clients/datapipeline';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  uname=localStorage.getItem('user')
  showFile = false;
  fileUploads: Observable<Array<FileUpload>>;
  level:int
  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    this.level=0
  }
  traverse(){
    this.level=this.level+1
  }

  // CreateDiectory() {
  //   const params = {
  //     Bucket: this.uploadService.BUCKET,
  //     Key: this.uploadService.FOLDER,
  //     ACL: 'public-read'
  //   }

  //   this.uploadService.getS3Bucket().putObject(params, function (err, data) {
  //     if (err) {
  //       console.log(err)
  //     }
  //     else {
  //       console.log(data)
  //     }
  //   })
  // }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }

}
