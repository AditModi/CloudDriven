import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
 
  constructor(private uploadService: FileUploadService) { }
 
  ngOnInit() {
  }
 
  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file);
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
