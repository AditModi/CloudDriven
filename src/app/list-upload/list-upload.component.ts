import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from '../file-upload';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<Array<FileUpload>>;
 
  constructor(private uploadService: FileUploadService) { }
 
  ngOnInit() {
  }
 
  showFiles(enable: boolean) {
    this.showFile = enable;
 
    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }

}
