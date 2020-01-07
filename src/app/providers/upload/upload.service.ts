import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as sha256 from 'sha256' ;
import { ServerApiService } from '../server-api/server-api.service';
import { ToastrService } from 'ngx-toastr';

const s3bucket = require('../../../aws.json');
@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor( private serverApiService : ServerApiService ,
               private tostr : ToastrService ) { }

  async uploadFile(file) {





    const newFileName = await this.saveToAws(file);
    console.log(newFileName,'newFileName')
 await this.saveToAPI(newFileName)

    return newFileName;

}
  async saveToAws(file){
    const bucket = new S3(
      {
        accessKeyId: s3bucket.Access_key_ID,
        secretAccessKey: s3bucket.Secret_access_key,
        region: 'us-east-1'
      }
    );
    const fileName = file.name;

    const newFileName = sha256(fileName);

    const params = {
      Bucket: 'vuuple.com',
      Key: 'images/' + newFileName,
      Body: file
    };
    /**      if (err) {

      }
     */
    try {
    const data=   await bucket.upload(params)
      this.tostr.success('Successfully uploaded file.')
      console.log('Successfully uploaded file.', data);
      return newFileName;
    } catch (error) {
      console.log('There was an error uploading your file: ', error);
      this.tostr.error('There was an error uploading your file ')
      return false;
    }

  }
  async saveToAPI(fileName){
    const data = {
      "image": fileName
    }
    this.serverApiService.updateImage(data).subscribe(
      res => {
        console.log(res);
        //  window.location.reload();
        return fileName;
      })
    err => {
      this.tostr.error("something went wrong");
      console.log(err)
      return err;
    }
  }
}
