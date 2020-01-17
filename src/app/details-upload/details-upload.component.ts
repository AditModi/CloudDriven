import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../file-upload';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {
  @Input() fileUpload: FileUpload;
  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
  }
  delete(file) {
    this.uploadService.deleteFile(file);
  }

}
