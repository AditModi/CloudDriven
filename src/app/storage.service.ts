import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FileUpload } from './file-upload';
import { FileUploadService } from './file-upload.service';

@Injectable()
export class StorageService {

  private src = new BehaviorSubject(0);
  UsedSpace = this.src.asObservable()
  files: Observable<Array<FileUpload>>;

  constructor(private uploadService:FileUploadService) {
    this.files=uploadService.getFiles()
   }

  calculateSpace(){
    var s=0;
    this.files.subscribe(d=>{
      d.forEach(f=>{
        s=s+f.size
        
      })
    })
    return s
  }

  change(size){
    this.src.next(size);
    console.log(size)
  }


}
