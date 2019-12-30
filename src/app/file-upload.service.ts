import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

//@Injectable({
  //providedIn: 'root'
//})
export class FileUploadService {

  FOLDER = 'SdpProject/';
 
  constructor() { }
 
  uploadfile(file) {
 
    const bucket = new S3(
      {
        accessKeyId: 'AKIA3LQVK65OYCOI5KSI',
        secretAccessKey: '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',
        region: 'ap-south-1'
      }
    );
 
    const params = {
      Bucket: 'mysdpproject',
      Key: this.FOLDER + file.name,
      Body: file
    };
 
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
 
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
}
