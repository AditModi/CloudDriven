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
  @Input() level;
  qr_url:string;
  qr_flag:boolean;

  constructor(private uploadService: FileUploadService) { }
   
  ngOnInit() {
    this.qr_flag=false
  }
  delete(file) {
    this.uploadService.deleteFile(file);
    window.location.reload();
  }

  copyText(val: string){
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      console.log(val)
      alert("Link copied to clipboard!!")
    }

    generateQR(link:string){
      this.qr_flag=true
      this.qr_url=link
    }

}
